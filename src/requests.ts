import { ajax } from 'rxjs/ajax';
import { NoteModel } from './Note';
import { Observable, map, catchError, of } from 'rxjs';

export const getAllNotes: () => Observable<NoteModel[]> = () => {
  return ajax.get('http://localhost:8080/v1/notes').pipe(
    map((res) => res.response as NoteModel[]),
    catchError((error) => of(error))
  );
};

export const getPaginatedNotes: (start: number, end: number) => Observable<NoteModel[]> = (
  start,
  end
) => {
  return ajax.get(`http://localhost:8080/v1/paginated/notes?start=${start}&end=${end}`).pipe(
    map((res) => res.response as NoteModel[]),
    catchError((error) => of(error))
  );
};
