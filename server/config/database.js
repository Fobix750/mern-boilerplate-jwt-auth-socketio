const mongoose = require('mongoose');
const config = require('./config');
const mode = process.env.NODE_ENV || 'production';

const connect = async () => {
  try {
    await mongoose.connect(
      mode === 'production' ? config.database.url : config.database.dev_url,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );

    console.log('Successfully established MongoDB connection.');
  } catch (err) {
    console.error('MongoDB error:' + err.message);
    process.exit(1);
  }
};

module.exports = connect;
