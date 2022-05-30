import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const subject = new ReplaySubject();

    const series$ = subject.asObservable();

    series$.subscribe((val) => console.log('first sub:' + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);

    // subject.complete();

    setTimeout(() => {
      series$.subscribe((val) => console.log('second sub:' + val));
      subject.next(4);
    }, 3000);
  }
}
