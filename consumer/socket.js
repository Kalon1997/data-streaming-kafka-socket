const socketIo = require("socket.io");
let io;

const startServer = async (server) => {
  try {
    io = socketIo(server); // you can change the cors to your own domain
    console.log("🚀 ~ file: socket.js:7 ~ startServer - inside socket ")

    io.on("connection", async (socket) => {
      console.log("New connection !!");

      // console.log(`New connection socketId : ${socket.id}`);

      // socket.on("disconnect", function () {
      //   console.log("user disconnected");
      // });

    });
  } catch (err) {
    console.log("socket errr \n", err);
    process.exit(1);
  }
};

const emit = async (key, value) => {
  console.log("🚀 ~ file: socket.js:24 ~ inside socket emit ~ key, value:", key, value)
  io.emit(key, JSON.stringify(value));
};

module.exports = {
  startServer,
  emit
};
