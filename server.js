const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");

const fyers = require("fyers-api-v2");
// const socket = require("socket.io");
const http = require("http");
const { socketConnection } = require("./utils/socket-io");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to MDT Server." });
});

app.get("/get-token", (req, res) => {
  let app_secret = "1W12NWTXPQ";
  let app_id = "3KDENVCVTW-100";
  let redirect_url = "http://localhost:3001/auth_code";
  // fyers.setAppId(app_id);
  // fyers.setRedirectUrl("http://localhost:3001/token");
  let url =
    "https://api.fyers.in/api/v2/generate-authcode?client_id=" +
    app_id +
    "&redirect_uri=" +
    redirect_url +
    "&response_type=code&state=sample_state";
  // let url = fyers.generateAuthCode();
  res.redirect(url);
});

app.get("/test/auth_code", function (req, res) {
  let result = {
    auth_code: req.query.auth_code,
  };
  res.json(result);
});

// api routes
require("./app/routes/angle.routes")(app);
require("./app/routes/fyers.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = config.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const server = http.createServer(app);
socketConnection(server);

// Socket setup
// const io = socket(server);

// const activeUsers = new Set();

// io.on("connection", function (socket) {
//   console.log("Made socket connection");
//   socket.emit("welcome", { message: "Welcome!", id: socket.id });
//   socket.on("user", function (data) {
//     console.log("new socket user", data);
//     socket.userId = data;
//     activeUsers.add(data);
//     io.emit("user", [...activeUsers]);
//   });

//   socket.on("disconnect", () => {
//     activeUsers.delete(socket.userId);
//     io.emit("user disconnected", socket.userId);
//   });

//   socket.on("my message", function (data) {
//     console.log(data);
//     io.emit("my message", data);
//   });
// });

// Just use it in development, at the first time execution!. Delete it in production
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// module.exports = io;
