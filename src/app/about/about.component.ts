import { Component, OnInit } from '@angular/core';
import { map, noop } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const https$ = createHttpObservable('/api/courses');

    const course$ = https$.pipe(map((res: any) => Object.values(res['payload'])));

    course$.subscribe({
      next: (courses) => console.log(courses),
      error: noop,
      complete: () => console.log('completed'),
    });
  }
}
