
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';


import { Organization } from '@interfaces/organization';

@Injectable()
export class OrganizationService {

  constructor(private _http: Http) { }

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  public getOrganizations(): Observable<Organization[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ORGANIZATIONS_URL + '?no_page&slim', options).pipe(
      map((response: Response) => <Organization[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError));
  }

  public getLaboratories(): Observable<Organization[]> {

    let options;
    if (this.isloggedIn) {
      options = new RequestOptions({
        headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
      });
    } else {
      options = new RequestOptions({
        headers: APP_SETTINGS.MIN_JSON_HEADERS
      });
    }

    return this._http.get(APP_SETTINGS.ORGANIZATIONS_URL + '?no_page&slim&laboratory=True', options).pipe(
      map((response: Response) => <Organization[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError));
  }

  public requestNew(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
    });

    return this._http.post(APP_SETTINGS.ORGANIZATIONS_URL + 'request_new/', formValue, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
