const mongoose = require("mongoose");
const config = require("./config");
const isDev = config.isDev;

const connect = async () => {
  try {
    await mongoose.connect(
      isDev ? config.database.devURL : config.database.url,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );

    console.log("Successfully established MongoDB connection.");
  } catch (err) {
    console.error("MongoDB error:" + err.message);
    process.exit(1);
  }
};

module.exports = connect;
