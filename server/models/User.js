const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define Schemas
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

userSchema.methods.registerUser = (newUser, cb) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) console.log(err);
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

userSchema.methods.comparePasswords = async function (pwToCompare, cb) {
  bcrypt.compare(pwToCompare, this.password, (err, match) => {
    if (err) return cb(err);
    cb(null, match);
  });
};

const mode = process.env.NODE_ENV || 'production';
const secretOrKey =
  mode === 'production' ? process.env.JWT_KEY_PROD : process.env.JWT_KEY_DEV;

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
