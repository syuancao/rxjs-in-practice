import { Component, OnInit } from '@angular/core';
import { interval, map, mergeWith } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const interval1$ = interval(1000);

    const interval2$ = interval1$.pipe(map((val) => 10 * val));

    interval2$.pipe(mergeWith(interval1$)).subscribe(console.log);
  }
}
