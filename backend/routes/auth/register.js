const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); // Assuming you have a User model
const { body, validationResult } = require('express-validator');
const router = express.Router();

// POST request to register a new user
router.post(
  '/register',
  // Validation rules
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  async (req, res) => {
    const { fullName, email, phone, password } = req.body;

    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        fullName,
        email,
        phone,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      // Send a response
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          email: newUser.email,
          fullName: newUser.fullName,
          phone: newUser.phone,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);
router.post("/register", (req, res) => {
  // registration logic here
});


module.exports = router;
