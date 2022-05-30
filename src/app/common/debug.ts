import { Observable, tap } from 'rxjs';

export const debug = (level: number, message: string) => (source: Observable<any>) =>
  source.pipe(
    tap((val) => {
      console.log(message + ': ' + val);
    }),
  );
