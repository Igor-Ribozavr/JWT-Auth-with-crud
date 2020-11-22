const { Schema, model } = require('mongoose');

const schemaTokens = new Schema({
  userId: String,
  refreshToken: String,
});

const Token = model('Tokens', schemaTokens);
module.exports = Token;
