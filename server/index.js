const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


let val;


io.on("connection", (socket) => {
  setInterval(function () {
    val = Math.floor((Math.random() * 100) + 1);
    socket.emit("hello", val);
    console.log(val);
  }, 1000);

});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
