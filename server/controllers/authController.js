const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Set JWT Cookie Helper
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // or 'strict'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  });
};

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user was created via Google and has no password
    if (!user.password) {
      return res.status(400).json({ message: 'Account created using Google. Please log in with Google.' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/auth/google
// @desc    Login/Signup with Google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    // Verify token with google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, name, picture, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
      });
    } else if (!user.googleId) {
      // User exists with email/pw, but logging in with Google. Link them.
      user.googleId = googleId;
      if (!user.avatar || user.avatar.includes('dicebear')) {
        user.avatar = picture;
      }
      await user.save();
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ message: 'Google Authentication failed' });
  }
};

// @route   GET /api/auth/profile
// @desc    Get current logged in user
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/auth/logout
// @desc    Log user out / clear cookie
// @access  Public
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // expire in 10s
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
