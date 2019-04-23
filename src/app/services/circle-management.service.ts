import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class CircleManagementService {

  private circleReload = new Subject<any>();

  setCircleReload() {
    this.circleReload.next();
  }

  getCircleReload(): Observable<any> {
    return this.circleReload.asObservable();
  }

  constructor() { }
}
