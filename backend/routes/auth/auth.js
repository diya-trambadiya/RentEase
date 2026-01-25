const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // Assuming you have a User model
const router = express.Router();

// POST route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id }, // Payload with user ID
      process.env.JWT_SECRET, // Your secret key (make sure to set this in your .env)
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Send the user data and the token back
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/login", (req, res) => {
  // login logic here
});

// Export the router to be used in the server.js
module.exports = router;
