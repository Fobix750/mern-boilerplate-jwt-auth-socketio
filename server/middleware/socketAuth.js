const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");

const mode = process.env.NODE_ENV || "production";
const secretOrKey =
  mode === "production" ? process.env.JWT_KEY_PROD : process.env.JWT_KEY_DEV;

const socketAuth = async (socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) next();
  jwt.verify(token, secretOrKey, async (err, payload) => {
    if (err) next(new Error(err));
    try {
      const user = await User.findOne({ name: payload.sub });

      if (user) {
        socket.user = {
          _id,
          username,
          email,
          role,
          createdAt,
          updatedAt
        } = user;
        next();
      } else {
        console.log("User not found");
        next();
      }
    } catch (errUser) {
      next(new Error(errUser));
    }
  });
};

module.exports = socketAuth;
