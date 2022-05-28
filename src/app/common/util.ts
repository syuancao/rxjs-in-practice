import { Observable } from 'rxjs';
import { Course } from '../model/type';

export function createHttpObservable(url: string): Observable<Record<string, Course[]>> {
  return new Observable((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => response.json())
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}
