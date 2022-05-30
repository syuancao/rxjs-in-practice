import { Component, OnInit } from '@angular/core';
import { Store } from './common/store.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-in-practice';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.init();
  }
}
