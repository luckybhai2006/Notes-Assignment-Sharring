const Note = require('../models/NotesModel');

// Get notes for the logged-in user
const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;  // Get the logged-in user's ID from the token
    const notes = await Note.find({ user: userId }); // Fetch notes only for the logged-in user
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

module.exports = { getNotes };
