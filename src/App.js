import { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './requests';

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes()
      .then(res => setNotes(res.data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className='text-wrapper'>
      <span className='text'>notes:</span>
      <br/>
      {notes.map(note => (
        <>
          {note.map(line => (
            <>
              {line}
              <br/>
            </>
          ))}
          <br/>
          <br/>
        </>
      ))}
    </div>
  );
}

export default App;
