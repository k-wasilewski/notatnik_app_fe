import { ajax } from 'rxjs/ajax';
import { NoteModel } from './models';
import { Observable, map, catchError, of } from 'rxjs';

const API_BASE_URL = 'http://localhost:8080/v1';

export const getAllNotes: () => Observable<NoteModel[]> = () => ajax.get(`${API_BASE_URL}/notes`).pipe(
  map((res) => res.response as NoteModel[]),
  catchError((error) => of(error))
);

export const getPaginatedNotes: (start: number, end: number) => Observable<NoteModel[]> = (
  start,
  end
) => ajax.get(`${API_BASE_URL}/paginated/notes?start=${start}&end=${end}`).pipe(
  map((res) => res.response as NoteModel[]),
  catchError((error) => of(error))
);

export const editNote: (note: NoteModel) => Observable<NoteModel> = (note) =>
  ajax.put(`${API_BASE_URL}/edit/notes`, note).pipe(
    map(res => res.response as NoteModel),
    catchError(err => of(err))
  );

export const addNote: (note: NoteModel) => Observable<NoteModel> = (note) =>
  ajax.post(`${API_BASE_URL}/add/notes`, note).pipe(
    map(res => res.response as NoteModel),
    catchError(err => of(err))
  );

export const deleteNote: (note: NoteModel) => Observable<boolean> = (note) =>
  ajax.delete(`${API_BASE_URL}/delete/notes?title=${note.title}`).pipe(
    map(res => res.response as boolean),
    catchError(err => of(err))
  );
