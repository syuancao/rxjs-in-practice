import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
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

  saveCourse(courseId: number, changes: any): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex((course) => course.id === courseId);
    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };
    this.subject.next(newCourses);

    return from(
      fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json',
        },
      }),
    );
  }
}
