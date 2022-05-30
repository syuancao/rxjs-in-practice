import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../model/type';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[] | undefined> = this.subject.asObservable();
}
