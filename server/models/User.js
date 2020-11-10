const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

// Define Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
});

userSchema.methods.registerUser = async (newUser, cb) => {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save(cb);
  } catch (err) {
    throw err;
  }
};

userSchema.methods.comparePasswords = async function (pwToCompare, cb) {
  try {
    const match = await bcrypt.compare(pwToCompare, this.password);
    if (!match) return cb('Wrong password entered by: ' + this.username);
    cb(null, match);
  } catch (err) {
    cb(err);
  }
};

const secretOrKey = config.auth.jwtSecret;

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, secretOrKey, {
    expiresIn: 604800 // 1 week in seconds
  });
};

const User = mongoose.model(
  'User',
  new mongoose.Schema(userSchema, { timestamps: true })
);

module.exports = User;
