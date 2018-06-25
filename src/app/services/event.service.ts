import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventDetail } from '@interfaces/event-detail';

@Injectable()
export class EventService {

  constructor(private _http: Http) { }

  public queryEvents(eventQuery): Observable<EventSummary[]> {

    let queryString = '?';

    // example of query string concat from lili
    // if (eventQuery.from_id !== null) {
    //   queryString = queryString + '&from_id=' + eventQuery.from_id.toString();
    // }

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENTS_URL + eventQuery, options)
      .map((response: Response) => <EventSummary[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // TEMPORARY function to retrieve hard-coded sample event data from local disk
  public getTestData(): any[] {
    return APP_UTILITIES.SAMPLE_EVENT_DATA;
  }

  public getSampleEventDetail(eventID): any {

    for (const event of APP_UTILITIES.SAMPLE_EVENT_DETAIL_DATA) {
      if (event.id === Number(eventID)) {
        return event;
      }
    }

  }

  public getUserDashboardEventSummaries(): Observable<EventSummary[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    })

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL, options)
      .map((response: Response) => <EventSummary[]>response.json())
      .catch(this.handleError);

  }


  public create(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EVENTS_URL, formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
