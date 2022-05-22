import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const https$ = new Observable((observer) => {
      fetch('/api/courses')
        .then((response) => response.json())
        .then((body) => {
          observer.next(body);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });

    https$.subscribe({
      next: (courses) => console.log(courses),
      error: noop,
      complete: () => console.log('completed'),
    });
  }
}
