import React, { useState } from 'react';
import axios from 'axios';
import '../css/Uploadform.css'; // Import the CSS file

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true); // Show spinner

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('note', file);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      setLoading(false);
      return;
    }

    console.log("Token being sent:", token);

    try {
      const res = await axios.post(`https://notes-assignment-sharring-backend.onrender.com/api/notes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('File uploaded successfully:', res.data);

      // Clear input fields after successful upload
      setTitle('');
      setDescription('');
      setFile(null);
      document.querySelector('input[type="file"]').value = '';

    } catch (err) {
      console.error("Upload error:", err.response ? err.response.data : err.message);
      alert('Error during upload. Please try again.');
    } finally {
      setLoading(false); // Hide spinner after upload
    }
  };

  return (
    <div className="upload-form-wrapper">
      {loading && (
        <div className="upload-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className={`upload-form-container ${loading ? 'blur' : ''}`}>
        <h2 className="upload-form-title">Upload Notes</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  id='title'required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label>Select File</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <button type="submit" className="upload-button" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
