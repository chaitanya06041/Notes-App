import { Link } from "react-router-dom";
import "./styles/NoteCard.css";

function NoteCard({ note }) {
  return (
    <Link to={`/note/${note.id}`} className="note-card">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-content">
        {note.content.length > 100
          ? note.content.slice(0, 100) + "..."
          : note.content}
      </p>

      <p className="note-date">
        {note.updatedAt ? (
          <>
            <span className="edited-label">Edited</span>{" "}
            {new Date(note.updatedAt).toLocaleString()}
          </>
        ) : (
          <>Created {new Date(note.createdAt).toLocaleString()}</>
        )}
      </p>
    </Link>
  );
}

export default NoteCard;
