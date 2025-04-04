import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { addNote, deleteNote, editNote, getPaginatedNotes } from './requests.ts';
import { NoteModel } from './models.tsx';
import { Logo, Edit, Editor, Close, Save, Delete } from 'notatnik_app_fe_static';
import { strArraysEqual } from './utils.ts';

const PAGE_SIZE = 40;

const App = () => {
  const _isMounted = useRef(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel>();
  const [startIdx, setStartIdx] = useState(0);
  const [editableContents, setEditableContents] = useState('');
  const [editableContentsChanged, setEditableContentsChanged] = useState(false);

  useEffect(() => {
    if (!_isMounted.current) {
      _isMounted.current = true;
      getPaginatedNotes(startIdx, PAGE_SIZE).subscribe({
        next: (val) => {
          if (!val.length) return;
          setNotes((prev) => [{ title: '', contents: [], new: true }, ...prev, ...val]);
        },
        error: (err) => console.error(err),
      });
    }
  }, [startIdx]);

  useEffect(() => {
    const newContents = editableContents.split('<br/>');
    const oldContents = selectedNote?.contents;

    if (selectedNote && editableContents && !strArraysEqual(newContents, oldContents)) {
      setEditableContentsChanged(true);
    }
  }, [editableContents, selectedNote]);

  const saveEditableContents = () => {
    if (selectedNote.new) {
      const newSelectedContents = editableContents.replaceAll('</div>', '').split('<div>');
      const newSelectedNote: NoteModel = { title: selectedNote.title, contents: newSelectedContents[0] === '<br/>' || newSelectedContents[0] === '' ? newSelectedContents.slice(1) : newSelectedContents  };

      addNote(newSelectedNote).subscribe({
        next: (val) => {
          setNotes(prev => [...prev, val].sort((a, b) => a.title.localeCompare(b.title)));
          setSelectedNote({ title: '', contents: [], new: true });
        }
      });
    } else {
      const newSelectedContents = editableContents.split('<br>');
      const newSelectedNote: NoteModel = { title: selectedNote.title, contents: newSelectedContents };

      editNote(newSelectedNote).subscribe({
        next: (val) => {
          const updatedNotes = notes.map((n: NoteModel) => {
            if (n.title === val.title) n.contents = val.contents;
            return n;
          });
          setNotes(updatedNotes);
        }
      });
    }

    setEditableContents('');
  }

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
    const contents = (selectedNote.contents.length && selectedNote.contents.reduce((tot, str) => tot + '<br/>' + str)) || '<br/>';
    setEditableContents(contents);
  }

  const removeSelectedNote = () => {
    deleteNote(selectedNote).subscribe({
      next: (val) => {
        if (val) {
          setNotes(prev => prev.filter(n => n !== selectedNote));
          setSelectedNote(null);
        }
      },
      error: (err) => console.error(err),
    });
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
                    {note.new ? 'Add new note' : note.title}
                  </span>
                ))
              : null}
          </div>
          {selectedNote && (
            <div className="note-wrapper">
              <span className="note-title-wrapper">
                {selectedNote.new ?
                  <input placeholder={'Add new note'} onChange={e => setSelectedNote(prev => ({ ...prev, title: e.target.value }))} value={selectedNote.title}/>
                  :
                  selectedNote.title}
              </span>
              <div className='edit-note-contents-icon'>
                {editableContents ? 
                  (
                    <>
                      <div onClick={() => setEditableContents('')}>
                        <Close width={30} />
                      </div>
                      {editableContentsChanged && (
                        <div onClick={() => saveEditableContents()}>
                          <Save width={30} />
                        </div>
                      )}
                    </>
                  )
                  :
                  <>
                    <div onClick={editSelectedNote}>
                      <Edit width={30} />
                    </div>
                    <div onClick={removeSelectedNote}>
                      <Delete width={30} />
                    </div>
                  </>
                  }
              </div>
              <div className="break" />

              <div className="note-contents-wrapper">
                {/* https://www.npmjs.com/package/react-simple-wysiwyg */}
                {editableContents ?
                  <Editor text={editableContents} setText={setEditableContents}/>
                  :
                  <div dangerouslySetInnerHTML={{ __html: selectedNote.contents.map((line, i) => (
                    `<span key={line-${i}}>${line}<br /></span>`
                  ))}}/>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
