import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
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
      tap(() => console.log('HTTP request executed')),
      map((res: any) => Object.values(res['payload'])),
      shareReplay(),
      catchError((err: any) =>
        of([
          {
            id: 0,
            description: 'RxJs In Practice Course',
            iconUrl:
              'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
            courseListIcon:
              'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
            longDescription:
              'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples',
            category: 'BEGINNER',
            lessonsCount: 10,
          },
        ]),
      ),
    );

    this.beginnerCourses$ = course$.pipe(
      map((course) => course?.filter((course) => course.category === 'BEGINNER')),
    );

    this.advancedCourses$ = course$.pipe(
      map((course) => course?.filter((course) => course.category === 'ADVANCED')),
    );
  }
}
