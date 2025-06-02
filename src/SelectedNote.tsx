import React from 'react';
import { Edit, Editor, Close, Save, Delete } from 'notatnik_app_fe_static';
import { NoteModel } from './models.tsx';
import { addNote, editNote } from './requests.ts';

const SelectedNote = ({ selectedNote, setSelectedNote, editableContents, setEditableContents, setDeleteModalOpen, editableContentsChanged, setNotes, notes }) => {

    const editSelectedNote = () => {
        const contents = (selectedNote.contents.length && selectedNote.contents.reduce((tot, str) => tot + '<br/>' + str)) || '<br/>';
        setEditableContents(contents);
    }

    const saveEditableContents = () => {
        if (selectedNote.new) {
            const newSelectedContents = editableContents.replaceAll('</div>', '').split('<div>');
            const newSelectedNote: NoteModel = { title: selectedNote.title, contents: newSelectedContents[0] === '<br/>' || newSelectedContents[0] === '' ? newSelectedContents.slice(1) : newSelectedContents  };

            if (newSelectedNote.title) {
                addNote(newSelectedNote).subscribe({
                next: (val) => {
                setNotes(prev => [...prev, val].sort((a, b) => a.title.localeCompare(b.title)));
                setSelectedNote({ title: '', contents: [], new: true });
                }
            });
            }
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

    return (
        <>
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
                    <div onClick={() => setDeleteModalOpen(true)}>
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
        </>
    );
}

export default SelectedNote;