import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "./NoteCard";
import "./styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">My Notes</h1>
        <Link to="/add" className="add-note-button">
          + Add Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="empty-message">No notes yet. Add one!</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
