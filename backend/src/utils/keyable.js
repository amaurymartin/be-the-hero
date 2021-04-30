const { v4: uuidv4 } = require('uuid');

module.exports = function keyable() {
  return uuidv4();
};
