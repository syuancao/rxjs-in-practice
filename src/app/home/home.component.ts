import { Component, OnInit } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { map, noop, Observable } from 'rxjs';
import { Course } from '../model/course';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses: Course[] | undefined;
  advancedCourses: Course[] | undefined;
  constructor() {}

  ngOnInit() {
    const https$ = createHttpObservable('/api/courses');

    const course$: Observable<Course[] | undefined> = https$.pipe(
      map((res: any) => Object.values(res['payload'])),
    );

    course$.subscribe({
      next: (courses) => {
        this.beginnerCourses = courses?.filter((course) => course.category === 'BEGINNER');
        this.advancedCourses = courses?.filter((course) => course.category === 'ADVANCED');
      },
      error: noop,
      complete: () => console.log('completed'),
    });
  }
}
