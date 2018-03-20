import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";

import { APP_SETTINGS } from '../app.settings';

import { Event } from '@interfaces/event';

@Injectable()
export class EventService {

  constructor(private _http: Http) { }

  public queryEvents(eventQuery): Observable<Event[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENTS_URL + eventQuery, options)
      .map((response: Response) => <Event[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
