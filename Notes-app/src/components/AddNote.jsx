import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddNote.css";

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    const storedNotes = localStorage.getItem("notes");
    const notesArray = storedNotes ? JSON.parse(storedNotes) : [];
    const updatedNotes = [...notesArray, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    navigate("/");
  };

  return (
    <div className="add-note-container">
      <h2 className="add-note-title">Add New Note</h2>
      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Note title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            placeholder="Note content..."
          />
        </div>
        <button type="submit" className="submit-button">
          Save Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
