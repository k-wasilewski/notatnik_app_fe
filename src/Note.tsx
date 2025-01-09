import React from 'react';
import './Note.css';

export interface NoteModel {
  title: string;
  contents: string[];
}

const Note = ({ note, idx }) => {
  return (
    <div key={`note-${idx}`}>
      <div className="note-title">{note.title}</div>
      <div className="note-content">
        {note.contents.map((line, j) => (
          <div key={`note-${idx}-line-${j}`}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default Note;
