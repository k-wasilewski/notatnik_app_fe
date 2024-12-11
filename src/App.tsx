import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './requests.ts';
import Note, { NoteModel } from './Note.tsx';

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel>();

  useEffect(() => {
    getAllNotes().subscribe({
      next: val => setNotes(val),
      error: err => console.error(err),
    });
  }, []);

  return (
    <div className='wrapper'>
      <span className='notes-title'>Notatki:</span>
      <div className='notes-wrapper'>
        <div className='notes-list'>
          {notes.length && notes.map(note => (
            <span className='note-title' onClick={() => setSelectedNote(note)}>{note.title}</span>
          ))}
          {/* todo: infinite scroll */}
        </div>
        {selectedNote && (
          <div className='note-wrapper'>{selectedNote.contents}</div>
        )}
      </div>
    </div>
  );
}

export default App;
