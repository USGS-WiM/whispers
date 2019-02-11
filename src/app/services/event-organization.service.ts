import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { EventOrganization } from '@interfaces/event-organization';

@Injectable({
  providedIn: 'root'
})
export class EventOrganizationService {

  constructor(private _http: Http) { }

  public getEventOrganizations(): Observable<EventOrganization[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENT_ORGANIZATIONS_URL + '?no_page', options)
      .map((response: Response) => <EventOrganization[]>response.json())
      .catch(this.handleError);
  }

  public create(formValue): Observable<EventOrganization> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EVENT_ORGANIZATIONS_URL, formValue, options)
      .map((response: Response) => <EventOrganization>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<EventOrganization> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.EVENT_ORGANIZATIONS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <EventOrganization>response.json())
      .catch(this.handleError);
  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.EVENT_ORGANIZATIONS_URL + id + '/', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
