let io;
const config = require("../app/config/config.js");
const jwt = require("jsonwebtoken");
// const sockets = require("socket.io");
exports.socketConnection = (server) => {
  console.log("in socket");
  io = require("socket.io")(server);
  io.use(function (socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwt.verify(
        socket.handshake.auth.token,
        config.auth.secret,
        function (err, decoded) {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          socket.user = decoded.id;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    console.info(`Client connected [id=${socket.user}]`);
    socket.emit("id", { socket_id: socket.id, user_id: socket.user });
    socket.join(socket.user);

    socket.on("disconnect", () => {
      socket.emit(`Client disconnected [id=${socket.id}]`);
    });
  });
  //   io.on("connection", function (socket) {
  //     console.log("Made socket connection");
  //     socket.emit("welcome", { message: "Welcome!", id: socket.id });
  //     socket.on("user", function (data) {
  //       console.log("new socket user", data);
  //       socket.userId = data;
  //       activeUsers.add(data);
  //       io.emit("user", [...activeUsers]);
  //     });

  //     socket.on("disconnect", () => {
  //       activeUsers.delete(socket.userId);
  //       io.emit("user disconnected", socket.userId);
  //     });

  //     socket.on("my message", function (data) {
  //       console.log(data);
  //       io.emit("my message", data);
  //     });
  //   });
};

exports.sendData = (Id, key, message) => {
  io.to(Id).emit(key, message);
};
exports.getData = (key) => {
  io.on(key);
};

exports.getRooms = () => io.sockets.adapter.rooms;
