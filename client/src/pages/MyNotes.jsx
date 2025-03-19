import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Mynotes.css';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        console.log("Stored Token:", token);
        console.log("Stored User ID:", userId);

        const res = await axios.get('https://notes-assignment-sharring-backend.onrender.com/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Full API Response:", res.data);

        const userNotes = res.data.filter(note => {
          const noteUserId = note.user && note.user._id ? note.user._id.toString() : note.user?.toString();
          console.log("Checking Note User ID:", noteUserId, "against", userId);
          return noteUserId === userId;
        });

        console.log("Filtered User Notes:", userNotes);

        setNotes(userNotes);
        setFilteredNotes(userNotes);
      } catch (err) {
        console.error('Error fetching user notes:', err);
      }
    };
    fetchUserNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, notes]);

  useEffect(() => {
    console.log("Notes state updated:", notes);
    console.log("Filtered Notes state updated:", filteredNotes);
  }, [notes, filteredNotes]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log("Deleting Note ID:", id);
      
      await axios.delete(`https://notes-assignment-sharring-backend.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Updating Note ID:", editingNote);
      console.log("Updated Title:", editTitle);
      console.log("Updated Description:", editDescription);

      await axios.put(`https://notes-assignment-sharring-backend.onrender.com/api/notes/${editingNote}`, {
        title: editTitle,
        description: editDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedNotes = notes.map(note =>
        note._id === editingNote ? { ...note, title: editTitle, description: editDescription } : note
      );

      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      setEditingNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  return (
    <div className="notes-container">
      <h2 className="notes-titles">My Uploaded Notes</h2>

      <input
        type="text"
        placeholder="Search my notes..."
        id="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredNotes.length === 0 ? (
        <p className="no-notes">No notes available...!!</p>
      ) : (
        <ul className="notes-list">
          {filteredNotes.map(note => (
            <li key={note._id} className="note-card">
              {editingNote === note._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button className='but' onClick={handleUpdate}>Save</button>
                  <button className='but' onClick={() => setEditingNote(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-description">{note.description}</p>
                  {note.fileUrl && (
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="note-link"
                    >
                      View File
                    </a>
                  )}
                  <div className="set">
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditingNote(note._id);
                        setEditTitle(note.title);
                        setEditDescription(note.description);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyNotes;
