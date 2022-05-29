import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/type';

import {
  concat,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Lesson } from '../model/type';
import { ActivatedRoute } from '@angular/router';
import { createHttpObservable } from '../common/util';

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

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
  }

  ngAfterViewInit() {
    const searchLessons$ = fromEvent<any>(this.input?.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search)),
    );

    const initialLessons$ = this.loadLessons();
    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`,
    ).pipe(map((res: any) => res['payload']));
  }
}
