import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';

import { EventType } from '@interfaces/event-type';

@Injectable()
export class EventTypeService {

  constructor(private _http: Http) { }

  public getEventTypes(): Observable<EventType[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENT_TYPES_URL + '?no_page', options)
      .map((response: Response) => <EventType[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
