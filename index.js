const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { isValidUUID } = require('./util');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const usersDB = [];

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.get('/api/users', (req, res) => {
  res.status(200).json(usersDB);
});

app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const user = usersDB.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    return res.status(400).json({ error: 'Username, age and hobbies are required' });
  }

  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };

  usersDB.push(newUser);

  res.status(201).json(newUser);
});

app.put('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const userIndex = usersDB.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = {
    id: userId,
    ...req.body,
  };

  usersDB[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});


app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;


  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  const userIndex = usersDB.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  usersDB.splice(userIndex, 1);

  res.status(204).send();
});


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

