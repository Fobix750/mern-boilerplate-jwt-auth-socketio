const User = require('../../models/User');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(username, 'i') }
    });
    if (!user) {
      return res.json({ error: 'Username not found.' });
    }
    user.comparePasswords(password, function (err, matched) {
      if (err) {
        console.log(err);
        return res.json({ error: 'Unexpected Error.' });
      }
      if (!matched) {
        return res.json({ error: 'Password incorrect.' });
      }
      const token = user.generateJWT();
      const me = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      res.json({ token, me });
      console.log(user.username, 'just logged in.');
    });
  } catch (errExisUser) {
    return next(errExisUser);
  }
};
module.exports = login;
