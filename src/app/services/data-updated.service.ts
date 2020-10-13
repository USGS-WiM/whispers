import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUpdatedService {

  private refreshTrigger = new BehaviorSubject('None');
  trigger = this.refreshTrigger.asObservable();

  constructor() { }

  triggerRefresh() {
    this.refreshTrigger.next('refresh');
  }
}
