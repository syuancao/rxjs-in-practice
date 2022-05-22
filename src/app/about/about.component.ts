import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.addEventListener('click', (event) => {
      console.log(event);
      setTimeout(() => {
        console.log('finished...');
        let counter = 0;
        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);
      }, 3000);
    });
  }
}
