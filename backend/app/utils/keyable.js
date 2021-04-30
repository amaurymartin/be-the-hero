const { v4: uuidv4 } = require('uuid');

export default function keyable() {
  return uuidv4();
}
