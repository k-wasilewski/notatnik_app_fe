import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getPaginatedNotes } from './requests.ts';
import { NoteModel } from './models.tsx';
import { Logo } from 'notatnik_app_fe_static';
import { strArraysEqual } from './utils.ts';
import NotesList from './NotesList.tsx';
import { PAGE_SIZE } from './NotesList.tsx';
import DeleteNoteModal from './DeleteNoteModal.tsx';
import SelectedNote from './SelectedNote.tsx';

const App = () => {
  const _isMounted = useRef(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel>();
  const [startIdx, setStartIdx] = useState(0);
  const [editableContents, setEditableContents] = useState('');
  const [editableContentsChanged, setEditableContentsChanged] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const onNoteSelection = (note: NoteModel) => {
    setSelectedNote(note);
    setEditableContents('');
  }

  return (
    <>
      <div className="wrapper">
        <Logo width={100} />
        <div className="notes-wrapper">
          <NotesList 
            notes={notes}
            selectedNote={selectedNote}
            onNoteSelection={onNoteSelection}
            getPaginatedNotes={getPaginatedNotes}
            setNotes={setNotes}
            setStartIdx={setStartIdx}
            startIdx={startIdx}
          />
          <SelectedNote 
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            editableContents={editableContents}
            setEditableContents={setEditableContents}
            setDeleteModalOpen={setDeleteModalOpen}
            editableContentsChanged={editableContentsChanged}
            setNotes={setNotes}
            notes
          />
        </div>
      </div>

      <DeleteNoteModal
        selectedNote={selectedNote}
        setNotes={setNotes}
        setSelectedNote={setSelectedNote}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
};

export default App;
