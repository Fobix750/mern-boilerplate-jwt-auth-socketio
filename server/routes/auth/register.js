const User = require('../../models/User');
const { registerSchema } = require('../../config/joiSchema');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    console.log('Register failed. Reason:' + error.details[0].message);
    return res.json({ error: 'Failed to register...' });
  }
  try {
    const existingUser = await User.findOne({
      username: { $regex: new RegExp(username, 'i') }
    });

    if (existingUser) {
      return res.json({ error: 'Username already taken.' });
    }

    try {
      const existingMail = await User.findOne({
        email: { $regex: new RegExp(email, 'i') }
      });

      if (existingMail) {
        return res.json({ error: 'Email already in use.' });
      }

      try {
        const newUser = await new User({
          username,
          email,
          password
        });
        newUser.registerUser(newUser, (err, user) => {
          if (err) throw err;
          res.json({ message: 'Successfully registered, please login.' });
          console.log(newUser.username, 'just registered.');
        });
      } catch (errRegister) {
        return next(errRegister);
      }
    } catch (errExisMail) {
      return next(errExisMail);
    }
  } catch (errExisUser) {
    return next(errExisUser);
  }
};
module.exports = register;
