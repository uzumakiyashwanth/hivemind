const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);

// Database Connection
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("HiveMind API Running");
});

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Online Users Counter
let onlineUsers = 0;

// Voting System
let votes = {
  optionA: 0,
  optionB: 0,
};

// Socket Connection
io.on("connection", (socket) => {

  console.log("User Connected 🔥");

  onlineUsers++;

  io.emit("online_users", onlineUsers);

  io.emit("vote_update", votes);

  // Join Room
  socket.on("join_room", (room) => {

    socket.join(room);

    console.log(`User joined room: ${room}`);

  });

  // Send Message
  socket.on("send_message", (data) => {

    io.to(data.room).emit(
      "receive_message",
      data
    );

  });

  // Voting
  socket.on("vote", (option) => {

    if (option === "A") {
      votes.optionA++;
    }

    if (option === "B") {
      votes.optionB++;
    }

    io.emit("vote_update", votes);

  });

  // Disconnect
  socket.on("disconnect", () => {

    console.log("User Disconnected ❌");

    onlineUsers--;

    io.emit("online_users", onlineUsers);

  });

});

// Port
const PORT = process.env.PORT || 8000;

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});