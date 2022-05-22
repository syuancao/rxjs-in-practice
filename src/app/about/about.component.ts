import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // const interval$ = interval(1000);
    // interval$.subscribe((val) => console.log('stream 1 => ' + val));
    // interval$.subscribe((val) => console.log('stream 2 => ' + val));
    const interval$ = timer(3000, 1000);
    interval$.subscribe((val) => console.log('stream 1 => ' + val));
    const click$ = fromEvent(document, 'click');
    click$.subscribe((event) => console.log(event));
  }
}
