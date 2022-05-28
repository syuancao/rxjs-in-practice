import { Component, OnInit } from '@angular/core';
import { interval, map, mergeWith } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // const interval1$ = interval(1000);
    //
    // const sub = interval1$.subscribe(console.log);
    //
    // setTimeout(() => sub.unsubscribe(), 5000);

    const http$ = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);
  }
}
