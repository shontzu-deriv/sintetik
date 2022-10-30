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
let tick =0;

io.on("connection", (socket) => {
  setInterval(function () {
    val = Math.floor((Math.random() * 100) + 1);
    // socket.emit("hello", val);
    socket.emit('hello', {
      tick: tick++,
      val: val
    });
    console.log(`tick: ${tick}  val: ${val}`);
  }, 1000);

});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
