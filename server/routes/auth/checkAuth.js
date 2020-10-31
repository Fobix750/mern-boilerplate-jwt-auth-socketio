const User = require('../../models/User');

const checkAuth = async (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
};
module.exports = checkAuth;
