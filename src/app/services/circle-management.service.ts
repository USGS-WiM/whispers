import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';


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
