const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

const menuRoutes = require('./routes/menuRoutes');
const offerRoutes = require('./routes/offerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.send('Cafe Server is running!');
});

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5000;

// Create HTTP server for Express and Socket.io
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins during development
    methods: ["GET", "POST"]
  }
});

let activeMentors = 1; // Simulated active mentor tracker count

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  // Immediately send connection intent flag
  socket.emit('mentor_status', { available: activeMentors > 0 });

  // Generic broadcasting socket
  socket.on('send_message', (data) => {
    // Broadcast back to all generic generic tabs (emulating mentor reply or peer sync)
    // Send to everyone else EXCEPT sender
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server & Socket.io running on port ${PORT}`);
});
