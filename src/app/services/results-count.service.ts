import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ResultsCountService {

  private userEventsResultsCountSource = new BehaviorSubject('None');
  userEventsResultsCount = this.userEventsResultsCountSource.asObservable();

  private eventQueryResultsCountSource = new BehaviorSubject('None');
  eventQueryResultsCount = this.eventQueryResultsCountSource.asObservable();

  private eventGroupResultsCountSource = new BehaviorSubject('None');
  eventGroupResultsCount = this.eventGroupResultsCountSource.asObservable();

  private circlesResultsCountSource = new BehaviorSubject('None');
  circlesResultsCount = this.circlesResultsCountSource.asObservable();

  private unreadNotificationsCountSource = new BehaviorSubject('None');
  unreadNotificationsCount = this.unreadNotificationsCountSource.asObservable();

  constructor() { }

  updateUserEventsResultsCount(count) {
    this.userEventsResultsCountSource.next(count);
  }

  updateEventQueryResultsCount(count) {
    this.eventQueryResultsCountSource.next(count);
  }

  updateEventGroupResultsCount(count) {
    this.eventGroupResultsCountSource.next(count);
  }

  updateCirclesResultsCount(count) {
    this.circlesResultsCountSource.next(count);
  }

  updateUnreadNotificationsCount(count) {
    this.unreadNotificationsCountSource.next(count);
  }

}

