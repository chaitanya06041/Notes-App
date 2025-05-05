import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/EditNote.css";

export default function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    const notesArray = storedNotes ? JSON.parse(storedNotes) : [];

    const foundNote = notesArray.find((note) => note.id.toString() === id);
    if (foundNote) {
      setTitle(foundNote.title);
      setContent(foundNote.content);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    const storedNotes = localStorage.getItem("notes");
    const notesArray = storedNotes ? JSON.parse(storedNotes) : [];

    const updatedNotes = notesArray.map((note) =>
      note.id.toString() === id
        ? { ...note, title, content, updatedAt: new Date().toISOString() }
        : note
    );

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  return (
    <div className="edit-note-container">
      <div className="edit-note-card">
        <h1 className="edit-note-title">Edit Note</h1>

        <form onSubmit={handleSave} className="edit-note-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
              placeholder="Enter note title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-textarea"
              placeholder="Write your content..."
            />
          </div>

          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
