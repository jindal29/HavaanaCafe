const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Database connection is executed before server starts at the bottom of the file

const app = express();

// Middleware
// Enable specific origin and credentials for cookies
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies for JWT

const menuRoutes = require('./routes/menuRoutes');
const offerRoutes = require('./routes/offerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const authRoutes = require('./routes/authRoutes');

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
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;

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

// Connect to Database and start server ONLY if successful
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server & Socket.io running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to database. Server not started.", err);
  process.exit(1);
});
