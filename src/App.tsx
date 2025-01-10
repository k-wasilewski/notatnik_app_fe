import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getPaginatedNotes } from './requests.ts';
import { NoteModel } from './models.tsx';
import { Logo, Edit, Editor, Close } from 'notatnik_app_fe_static';

const PAGE_SIZE = 40;

const App = () => {
  const _isMounted = useRef(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel>();
  const [startIdx, setStartIdx] = useState(0);
  const [editableContents, setEditableContents] = useState('');

  useEffect(() => {
    if (!_isMounted.current) {
      _isMounted.current = true;
      getPaginatedNotes(startIdx, PAGE_SIZE).subscribe({
        next: (val) => {
          if (!val.length) return;
          setNotes((prev) => [...prev, ...val]);
        },
        error: (err) => console.error(err),
      });
    }
  }, [startIdx]);

  const onScroll = (evt) => {
    const target = evt.target;

    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      getPaginatedNotes(startIdx + PAGE_SIZE, PAGE_SIZE).subscribe({
        next: (val) => {
          if (!val.length) return;
          setNotes((prev) => [...prev, ...val]);
          setStartIdx((prev) => prev + PAGE_SIZE);
        },
        error: (err) => console.error(err),
      });
    }
  };

  const onNoteSelection = (note: NoteModel) => {
    setSelectedNote(note);
    setEditableContents('');
  }

  const editSelectedNote = () => {
    const contents = selectedNote.contents.reduce((tot, str) => tot + '<br/>' + str)
    setEditableContents(contents);
  }

  return (
    <>
      <div className="wrapper">
        <Logo width={100} />
        <div className="notes-wrapper">
          <div className="notes-list" data-testid="notes-list" onScroll={onScroll}>
            {notes.length
              ? notes.map((note, i) => (
                  <span
                    key={`note-${i}`}
                    className={`note-title-list ${
                      note.title === selectedNote?.title && 'selected-note-title'
                    }`}
                    onClick={() => onNoteSelection(note)}
                  >
                    {note.title}
                  </span>
                ))
              : null}
          </div>
          {selectedNote && (
            <div className="note-wrapper">
              <span className="note-title-wrapper">{selectedNote.title}</span>
              <div className='edit-note-contents-icon'>
                {editableContents ? 
                  <div onClick={() => setEditableContents('')}>
                    <Close width={30} />
                  </div>
                  : 
                  <div onClick={editSelectedNote}>
                    <Edit width={30} />
                  </div>}
              </div>
              <div className="break" />

              <div className="note-contents-wrapper">
                {editableContents ?
                  <Editor text={editableContents} setText={setEditableContents}/>
                  :
                  selectedNote.contents.map((line, i) => (
                    <span key={`line-${i}`}>
                      {line}
                      <br />
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
