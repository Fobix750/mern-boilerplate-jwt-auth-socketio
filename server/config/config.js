require('dotenv').config();

module.exports = {
  isDev: process.env.NODE_ENV !== 'production',
  database: {
    url: 'mongodb://localhost/boilerplate',
    devURL: 'mongodb://localhost:27017/boilerplate'
  },
  webserver: {
    port: 80,
    portDev: 8080
  },
  socketio: {
    port: 8090
  },
  auth: {
    jwtSecret: process.env.JWT_KEY
  },
  cors: {
    whitelist: [
      'http://localhost:3000',
      'http://localhost:8090',
      'http://localhost:8000'
    ]
  }
};
