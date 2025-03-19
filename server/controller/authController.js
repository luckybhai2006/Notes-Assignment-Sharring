const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Verify password (assuming you have a method for that)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token (include user id in the payload)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user info
    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login };
