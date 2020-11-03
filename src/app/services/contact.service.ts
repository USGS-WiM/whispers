
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable, throwError, Subject } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Contact } from '@app/interfaces/contact';

@Injectable()
export class ContactService {

  constructor(private _http: Http) { }

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  public getContacts(): Observable<Contact[]> {
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

    return this._http.get(APP_SETTINGS.CONTACTS_URL + 'user_contacts/?no_page', options).pipe(
      map((response: Response) => <any[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError));
  }

  public getContactDetails(contactID): Observable<Contact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.CONTACTS_URL + contactID + '/', options).pipe(
      map((response: Response) => <Contact>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError));
  }

  public create(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.CONTACTS_URL, formValue, options).pipe(
      map((response: Response) => <Contact>response.json()),
      catchError(this.handleError));

  }

  public update(formValue: Contact): Observable<Contact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.CONTACTS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <Contact>response.json()),
      catchError(this.handleError));
  }

  public remove(formValue: Contact): Observable<Contact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.CONTACTS_URL + formValue.id + '/', options).pipe(
      map((response: Response) => <Contact>response.json()),
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
