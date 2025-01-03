import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getPaginatedNotes } from './requests.ts';
import { NoteModel } from './Note.tsx';
import { Logo } from 'notatnik_app_fe_static';

const PAGE_SIZE = 40;

const App = () => {
  const _isMounted = useRef(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel>();
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    if (!_isMounted.current) {
      _isMounted.current = true;
      getPaginatedNotes(startIdx, PAGE_SIZE).subscribe({
        next: val => {
          if (!val.length) return;
          setNotes(prev => [...prev, ...val]);
        },
        error: err => console.error(err),
      });
    }
  }, [startIdx]);

  const onScroll = (evt) => {
    const target = evt.target;

    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      getPaginatedNotes(startIdx + PAGE_SIZE, PAGE_SIZE).subscribe({
        next: val => {
          if (!val.length) return;
          setNotes(prev => [...prev, ...val]);
          setStartIdx(prev => prev + PAGE_SIZE);
        },
        error: err => console.error(err),
      });
    }
  }

  return (
    <>
      <div className='wrapper'>
      <Logo />
        <div className='notes-wrapper'>
          <div className='notes-list' onScroll={onScroll}>
            {notes.length && notes.map((note, i) => (
              <span
                key={`note-${i}`}
                className={`note-title-list ${note.title === selectedNote?.title && 'selected-note-title'}`} 
                onClick={() => setSelectedNote(note)}
              >
                {note.title}
              </span>
            ))}
          </div>
          {selectedNote && (
            <div className='note-wrapper'>
              <span className='note-title-wrapper'>{selectedNote.title}</span>
              <div className='break'/>
              <div className='note-contents-wrapper'>
                {selectedNote.contents.map((line, i) => (
                  <span key={`line-${i}`}>
                    {line}
                    <br/>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
