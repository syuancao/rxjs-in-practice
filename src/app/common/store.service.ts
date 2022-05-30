import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course } from '../model/type';
import { createHttpObservable } from './util';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[] | undefined> = this.subject.asObservable();

  init() {
    const https$ = createHttpObservable('/api/courses');

    https$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map((res: any) => Object.values(res['payload'])),
      )
      .subscribe((courses: any) => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((course) => course?.filter((course) => course.category === category)),
    );
  }
}
