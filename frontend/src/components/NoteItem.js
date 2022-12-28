import React from "react";
import { useSelector } from "react-redux";

function NoteItem({ note }) {
  const { client } = useSelector((state) => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4 className="note-from">
        Note from: &nbsp;
        <span className="note-from-author">
          {note.isStaff ? <span>Staff</span> : <span>{client.name}</span>}
        </span>
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("en-us")}
      </div>
    </div>
  );
}

export default NoteItem;
