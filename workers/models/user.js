const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number
  },
  username: {
    required: false,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const UserModel = mongoose.model('Data', UserSchema);

module.exports = UserModel;
