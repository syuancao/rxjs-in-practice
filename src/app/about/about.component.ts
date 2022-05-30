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

  ngOnInit() {}
}
