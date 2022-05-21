import { Component, ElementRef, ViewChild } from '@angular/core';
import { Course } from '../model/course';

import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  course$: Observable<Course> | undefined;
  lessons$: Observable<Lesson[]> | undefined;

  @ViewChild('searchInput', { static: true }) input: ElementRef | undefined;

  constructor() {}
}
