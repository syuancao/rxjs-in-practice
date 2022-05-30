import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/type';

import { fromEvent, interval, map, Observable, throttle } from 'rxjs';
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

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, 'course value'),
    );

    setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
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
