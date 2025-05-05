import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/NoteDetails.css";

export default function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    const notesArray = storedNotes ? JSON.parse(storedNotes) : [];

    const foundNote = notesArray.find((note) => note.id.toString() === id);
    if (foundNote) {
      setNote(foundNote);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
  
    const storedNotes = localStorage.getItem("notes");
    const notesArray = storedNotes ? JSON.parse(storedNotes) : [];
    const updatedNotes = notesArray.filter((note) => note.id.toString() !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!note) {
    return <p className="note-loading">Loading...</p>;
  }

  return (
    <div className="note-details-container">
      <div className="note-card-detail">
        <h1 className="note-title-detail">{note.title}</h1>

        <p className="note-date-detail">
          Created on {new Date(note.createdAt).toLocaleString()}
        </p>

        {note.updatedAt && (
          <p className="note-date-edited">
            <span className="edited-label">Edited</span> on{" "}
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        )}

        <p className="note-content-detail">{note.content}</p>

        <div className="note-actions">
          <button onClick={handleEdit} className="btn edit-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="btn delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
