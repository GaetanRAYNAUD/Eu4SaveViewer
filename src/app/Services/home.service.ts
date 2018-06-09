import { Injectable } from '@angular/core';
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  title: string = '';
  titleSubject = new Subject<string>();

  constructor() { }

  emitTitle() {
    this.titleSubject.next(this.title);
  }

}
