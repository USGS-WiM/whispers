import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Contact } from '@app/interfaces/contact';

@Injectable()
export class ContactService {

  constructor(private _http: Http) { }

  public getContacts(): Observable<Contact[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.CONTACTS_URL + 'user_contacts', options)
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.CONTACTS_URL, formValue, options)
      .map((response: Response) => <Contact>response.json())
      .catch(this.handleError);

  }

  public update(formValue: Contact): Observable<Contact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.CONTACTS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <Contact>response.json())
      .catch(this.handleError);
  }

  public remove(formValue: Contact): Observable<Contact> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.CONTACTS_URL + formValue.id + '/', options)
      .map((response: Response) => <Contact>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
