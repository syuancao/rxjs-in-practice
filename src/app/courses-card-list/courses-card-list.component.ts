import { Component, Input } from '@angular/core';
import { Course } from '../model/type';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
})
export class CoursesCardListComponent {
  @Input()
  courses: Course[] | undefined;

  constructor() {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;
  }
}
