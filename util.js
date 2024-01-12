function isValidUUID(str) {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return uuidRegex.test(str);
  }
  
module.exports = {
    isValidUUID
}  
  