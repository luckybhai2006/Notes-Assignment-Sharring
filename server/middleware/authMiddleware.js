const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user object (contains `id`)
    console.log("Decoded Token User ID:", req.user.id); // Debugging log
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const Middleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
    const user = await user.findOne({ _id: decoded._id });
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user; // Attach user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = {authMiddleware, Middleware};
