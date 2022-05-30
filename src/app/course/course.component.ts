import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/type';

import { forkJoin, fromEvent, interval, map, Observable, tap, throttle } from 'rxjs';
import { Lesson } from '../model/type';
import { ActivatedRoute } from '@angular/router';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../common/debug';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string | undefined;
  course$: Observable<Course> | undefined;
  lessons$: Observable<Lesson[]> | undefined;

  @ViewChild('searchInput', { static: true }) input: ElementRef | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];

    const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

    const lesson$ = this.loadLessons();

    forkJoin(course$, lesson$)
      .pipe(
        tap(([course, lessons]) => {
          console.log('course', course);
          console.log('lessons', lessons);
        }),
      )
      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input?.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        throttle(() => interval(500)),
      )
      .subscribe(console.log);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`,
    ).pipe(map((res: any) => res['payload']));
  }
}
