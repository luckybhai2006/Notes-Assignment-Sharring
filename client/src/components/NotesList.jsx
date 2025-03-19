import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Noteslist.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

    const backendUrl = "https://notes-assignment-sharring-backend.onrender.com"
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        const res = await axios.get(`https://notes-assignment-sharring-backend.onrender.com/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
        setFilteredNotes(res.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);

  // Search functionality
  useEffect(() => {
    const results = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(results);
  }, [search, notes]);

  return (
    <div className="notes-container">
      {/* Header section containing the title and search bar */}
      <div className="notes-header">
        <h2 className="notes-title">All Notes</h2>
        <input
          type="text"
          placeholder="Search notes..."
          className="searching-bar"
          value={search}
          id='search'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes list section */}
      <div className="notes-list-container">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">No notes available</p>
        ) : (
          <ul className="notes-list">
            {filteredNotes.map((note) => (
              <li key={note._id} className="note-cards">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-description">{note.description}</p>
                <a 
  href={note.fileUrl.startsWith("http") ? note.fileUrl : `${backendUrl}${note.fileUrl}`} 
  target="_blank" 
  rel="noopener noreferrer" 
  id="notes-link"
>
                  View File
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesList;
