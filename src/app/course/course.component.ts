import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/type';

import {
  concat,
  debounceTime,
  distinctUntilChanged,
  first,
  forkJoin,
  fromEvent,
  map,
  Observable,
  switchMap,
  take,
} from 'rxjs';
import { Lesson } from '../model/type';
import { ActivatedRoute } from '@angular/router';
import { createHttpObservable } from '../common/util';

import { Store } from '../common/store.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: number | undefined;
  course$: Observable<Course | undefined> | undefined;
  lessons$: Observable<Lesson[]> | undefined;

  @ViewChild('searchInput', { static: true }) input: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];

    this.course$ = this.store
      .selectCourseById(typeof this.courseId === 'number' ? this.courseId : 0)
      .pipe(first());

    forkJoin(this.course$, this.loadLessons()).subscribe(console.log);
  }

  ngAfterViewInit() {
    const searchLessons$ = fromEvent<any>(this.input?.nativeElement, 'keyup').pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search: any) => this.loadLessons(search)),
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
