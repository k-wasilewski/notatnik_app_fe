import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './requests.ts';
import { NoteModel } from './Note.tsx';

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
      <img src={require('./favicon.png')} width='100px' alt='logo'/>
      <div className='notes-wrapper'>
        <div className='notes-list'>
          {notes.length && notes.map(note => (
            <span className='note-title-list' onClick={() => setSelectedNote(note)}>{note.title}</span>
          ))}
          {/* todo: infinite scroll */}
        </div>
        {selectedNote && (
          <div className='note-wrapper'>
            <span className='note-title-wrapper'>{selectedNote.title}</span>
            <div className='break'/>
            <div className='note-contents-wrapper'>{selectedNote.contents}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
