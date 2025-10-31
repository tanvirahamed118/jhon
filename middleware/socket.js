const { Server } = require("socket.io");
let io;
function init(server) {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
  return io;
}
function getIo() {
  if (!io)
    throw new Error("Socket.io not initialized. Call init(server) first.");
  return io;
}

module.exports = { init, getIo };
