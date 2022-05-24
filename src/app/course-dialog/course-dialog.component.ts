import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/type';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { filter, from } from 'rxjs';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef | undefined;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(filter(() => this.form.valid)).subscribe((changes) => {
      const saveCourse$ = from(
        fetch(`/api/courses/${this.course.id}`, {
          method: 'PUT',
          body: JSON.stringify(changes),
          headers: {
            'content-type': 'application/json',
          },
        }),
      );

      saveCourse$.subscribe();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
