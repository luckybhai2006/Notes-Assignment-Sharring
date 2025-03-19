const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
});

module.exports = mongoose.model('Note', NotesSchema);
