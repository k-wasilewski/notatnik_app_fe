import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './requests.ts';

export interface Note {
  title: string;
  contents: string[];
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes()
      .then(res => setNotes(res.data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className='text-wrapper'>
      <span className='text'>notes:</span>
      <br/>
      {notes.map((note, i) => (
        <div key={`note-${i}`}>
          <h4>{note.title}</h4>
          {note.contents.map((line, j) => (
            <div key={`note-${i}-line-${j}`}>
              {line}
              <br/>
            </div>
          ))}
          <br/>
          <br/>
        </div>
      ))}
    </div>
  );
}

export default App;
