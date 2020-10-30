module.exports = {
  database: {
    url: 'mongodb://localhost/boilerplate',
    dev_url: 'mongodb://localhost:27017/boilerplate'
  },
  webserver: {
    port: 80,
    port_dev: 8080
  },
  socketio: {
    port: 8090
  },
  cors: {
    whitelist: [
      'http://localhost:3000',
      'http://localhost:8090',
      'http://localhost:8000'
    ]
  }
};
