import React from 'react';
import './App.css';

export const PAGE_SIZE = 40;

const NotesList = ({ notes, onNoteSelection, selectedNote, getPaginatedNotes, setNotes, setStartIdx, startIdx }) => {

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

    return (
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
                    {note.new ? 'Add new note' : note.title}
                  </span>
                ))
              : null}
          </div>  
    );
}

export default NotesList;