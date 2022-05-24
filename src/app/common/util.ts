import { Observable } from 'rxjs';
import { Course } from '../model/type';

export function createHttpObservable(url: string): Observable<Record<string, Course[]>> {
  return new Observable((observer) => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
