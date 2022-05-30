import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Course } from '../model/type';
import { Store } from '../common/store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[] | undefined> = of([]);
  advancedCourses$: Observable<Course[] | undefined> = of([]);
  constructor(private store: Store) {}

  ngOnInit() {
    this.beginnerCourses$ = this.store.selectBeginnerCourses();

    this.advancedCourses$ = this.store.selectAdvancedCourses();
  }
}
