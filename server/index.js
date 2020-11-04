// Require dependecies
const express = require("express");
const helmet = require("helmet");
const socketio = require("socket.io");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { join } = require("path");
const { readFileSync } = require("fs");

// Create Express Application
const app = express();

// Config
require("dotenv").config();
const config = require("./config/config");
const isDev = process.env.NODE_ENV !== "production";
const secretOrKey = isDev ? process.env.JWT_KEY_DEV : process.env.JWT_KEY_PROD;
const whitelist = config.cors.whitelist;

// Connect Mongoose Database & register Schemas
require("./config/database")();
require("./models/User");

// Initialize Passport
require("./middleware/passportJWT")(passport);

// Express Middleware
app.use(passport.initialize());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(origin + "Origin now allowed."));
      }
    }
  })
);

// Routes
const routes = require("./routes");
app.use("/", routes);

// Serve dist files if the app is in production mode
if (!isDev) {
  app.use(express.static(join(__dirname, "../client/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(join(__dirname, "../client/dist/index.html"));
  });
}

//Start Web Server
const port = isDev ? config.webserver.port_dev : config.webserver.port;
app.listen(port, () => {
  console.log(`Web Server started @:${port} as HTTPS`);
});

// Create http/https server for socket.io
const ioPort = config.socketio.port;
let server = null;
if (isDev) {
  const http = require("http");
  server = http.createServer(app);
} else {
  const https = require("https");
  const httpsOptions = {
    key: readFileSync(join(__dirname + "/config/certs/key.pem")),
    cert: readFileSync(join(__dirname + "/config/certs/cert.pem"))
  };
  server = https.createServer(httpsOptions, app);
}

const io = socketio(server);
require("./config/socketio")(io); //Sockets Handler

// Auth Middleware
const socketAuth = require("./middleware/socketAuth");
io.use(socketAuth);

// Start Socket Server
server.listen(ioPort, () => {
  console.log(`Socket Server started @${ioPort}`);
});
