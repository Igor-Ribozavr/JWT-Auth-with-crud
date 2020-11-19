const { Schema, model } = require('mongoose');


const schemaUsers = new Schema({
  email: String,
  firstName: String,
  lastName:String,
  passport: String,
});

const User = model('users', schemaUsers);
module.exports = User;
