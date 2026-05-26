const express = require("express");

const http = require("http");

app.use(cors({
  origin: "*",
  credentials: true
}));


const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("HiveMind API Running");
});

let onlineUsers = 0;

let votes = {
  optionA: 0,
  optionB: 0,
};

io.on("connection", (socket) => {

  console.log("User Connected 🔥");

  onlineUsers++;

  io.emit("online_users", onlineUsers);

  io.emit("vote_update", votes);

  socket.on("join_room", (room) => {

    socket.join(room);

    console.log(`User joined room: ${room}`);

  });

  socket.on("send_message", (data) => {

    io.to(data.room).emit(
      "receive_message",
      data
    );

  });

  socket.on("vote", (option) => {

    if (option === "A") {
      votes.optionA++;
    }

    if (option === "B") {
      votes.optionB++;
    }

    io.emit("vote_update", votes);

  });

  socket.on("disconnect", () => {

    console.log("User Disconnected ❌");

    onlineUsers--;

    io.emit("online_users", onlineUsers);

  });

});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});