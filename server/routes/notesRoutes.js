const express = require('express');
const router = express.Router();
const multer = require('multer');
const Note = require('../models/NotesModel');
// const authMiddleware = require('../middleware/authMiddleware');
const { authMiddleware,Middleware } = require('../middleware/authMiddleware');
const { getNotes } = require('../controller/noteController');

router.get('/notes', Middleware, getNotes); 
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate('user', 'name email');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload a new note (Protected)
router.post('/upload', authMiddleware, upload.single('note'), async (req, res) => {
  const { title, description } = req.body;

  // Ensure the file is uploaded
  if (!req.file) return res.status(400).json({ message: 'File not uploaded' });

  const newNote = new Note({
    title,
    description,
    fileUrl: `https://notes-assignment-sharring-backend.onrender.com/uploads/${req.file.filename}`,
    user: req.user.id
  });
  try {
    // Save the note to the database
    await newNote.save();
    res.status(201).json({ message: 'Note uploaded successfully', note: newNote });
  } catch (err) {
    console.error('Error during file upload:', err); // Log the error
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single note by ID
router.get('/:id',authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('user', 'name');
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a note (Only owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    console.log("Note found:", note); // Debugging line

    if (!note) return res.status(404).json({ message: 'Note not found' });

    console.log("Note User ID:", note.user); // Debugging line
    console.log("Request User ID:", req.user.id); // Debugging line

    if (!note.user) {
      return res.status(400).json({ message: 'Note does not have an associated user' });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });

  } catch (err) {
    console.error("Error in delete route:", err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update a note (Protected)
// Make sure your PUT route is set up correctly on the server
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameter
    const { title, description } = req.body;
    
    const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    
    res.json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
