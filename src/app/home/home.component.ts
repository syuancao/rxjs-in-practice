import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { catchError, finalize, map, Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { Course } from '../model/type';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[] | undefined> = of([]);
  advancedCourses$: Observable<Course[] | undefined> = of([]);
  constructor() {}

  ngOnInit() {
    const https$ = createHttpObservable('/api/courses');

    const course$: Observable<Course[] | undefined> = https$.pipe(
      catchError((err: any) => {
        console.log('Error occurred', err);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Finalize executed..');
      }),
      tap(() => console.log('HTTP request executed')),
      map((res: any) => Object.values(res['payload'])),
      shareReplay(),
    );

    this.beginnerCourses$ = course$.pipe(
      map((course) => course?.filter((course) => course.category === 'BEGINNER')),
    );

    this.advancedCourses$ = course$.pipe(
      map((course) => course?.filter((course) => course.category === 'ADVANCED')),
    );
  }
}
