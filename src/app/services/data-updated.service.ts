import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUpdatedService {


  // TODO: make this work as a trigger
  private refreshTrigger = new BehaviorSubject('None');
  trigger = this.refreshTrigger.asObservable();

  constructor() { }

  triggerRefresh() {
    this.refreshTrigger.next('refresh');
  }
}
