import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/type';

import { map, Observable, tap } from 'rxjs';
import { Lesson } from '../model/type';
import { ActivatedRoute } from '@angular/router';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course$: Observable<Record<string, Course[]>> | undefined;
  lessons$: Observable<Lesson[]> | undefined;

  @ViewChild('searchInput', { static: true }) input: ElementRef | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(`/api/courses/${courseId}`);

    const queryLessons$: Observable<Record<string, Lesson[]>> = createHttpObservable(
      `/api/lessons?courseId=${courseId}&pageSize=100`,
    );

    this.lessons$ = queryLessons$.pipe(
      tap(() => console.log('queryLessons HTTP request executed')),
      map((res) => Object.values(res['payload'])),
    );
  }
}
