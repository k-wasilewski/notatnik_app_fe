import React from 'react';
import { Modal } from 'notatnik_app_fe_static';
import { deleteNote } from './requests.ts';

const DeleteNoteModal = ({ selectedNote, setNotes, setSelectedNote, deleteModalOpen, setDeleteModalOpen }) => {
    const removeSelectedNote = () => {
        deleteNote(selectedNote).subscribe({
        next: (val) => {
            if (val) {
            setNotes(prev => prev.filter(n => n !== selectedNote));
            setSelectedNote(null);
            setDeleteModalOpen(false);
            }
        },
        error: (err) => console.error(err),
        });
    }

    return (
        <Modal 
            content={
            <>
                <h4>{`Are you sure you want to delete ${selectedNote?.title}?`}</h4>
                <button onClick={() => setDeleteModalOpen(false)}>No</button>
                <button onClick={() => removeSelectedNote()}>Yes</button>
            </>
            } 
            isOpen={deleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)} 
            styles={{content: { width: '400px', height: '100px' }}} 
            label={`Are you sure you want to delete ${selectedNote?.title}?`}
        />
    );
}

export default DeleteNoteModal;