import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventGroupManagementService {

  private eventGroupReload = new Subject<any>();
  private selectedEventGroup = new Subject<any>();

  setEventGroupReload() {
    this.eventGroupReload.next();
  }

  getEventGroupReload(): Observable<any> {
    return this.eventGroupReload.asObservable();
  }

  setSelectedEventGroup(eventGroupID: number) {
    this.selectedEventGroup.next(eventGroupID);
  }

  getSelectedEventGroup(): Observable<any> {
    return this.selectedEventGroup.asObservable();
  }

  constructor() { }
}
