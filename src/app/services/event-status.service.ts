import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';

import { EventStatus } from '@interfaces/event-status';

@Injectable({
  providedIn: 'root'
})
export class EventStatusService {

  constructor(private _http: Http) { }

  public getEventStatuses(): Observable<EventStatus[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENT_STATUSES_URL + '?no_page', options)
      .map((response: Response) => <EventStatus[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
