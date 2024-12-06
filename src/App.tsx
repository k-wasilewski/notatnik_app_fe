import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './requests.ts';
import Note, { NoteModel } from './Note.tsx';

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    getAllNotes()
      .then(res => setNotes(res.data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className='text-wrapper'>
      <span className='text'>Notatki:</span>
      <br/>
      {notes.map((note, i) => <Note note={note} idx={i} />)}
      {/* todo: infinite scroll */}
    </div>
  );
}

export default App;
