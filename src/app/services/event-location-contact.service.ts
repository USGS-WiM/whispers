import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { LocationContact } from '@app/interfaces/location-contact';

@Injectable({
  providedIn: 'root'
})
export class EventLocationContactService {

  constructor(private http: Http) { }

  public create(formValue): Observable<LocationContact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this.http.post(APP_SETTINGS.EVENT_LOCATION_CONTACTS_URL, formValue, options)
      .map((response: Response) => <LocationContact>response.json())
      .catch(this.handleError);

  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.delete(APP_SETTINGS.EVENT_LOCATION_CONTACTS_URL + id + '/', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
