import { ajax } from 'rxjs/ajax';
import { NoteModel } from './models';
import { Observable, map, catchError, of } from 'rxjs';

const API_BASE_URL = 'http://localhost:8080';

export const getAllNotes: () => Observable<NoteModel[]> = () => ajax.get(`${API_BASE_URL}/v1/notes`).pipe(
  map((res) => res.response as NoteModel[]),
  catchError((error) => of(error))
);

export const getPaginatedNotes: (start: number, end: number) => Observable<NoteModel[]> = (
  start,
  end
) => ajax.get(`${API_BASE_URL}/v1/paginated/notes?start=${start}&end=${end}`).pipe(
  map((res) => res.response as NoteModel[]),
  catchError((error) => of(error))
);
