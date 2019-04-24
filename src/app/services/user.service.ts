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

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }

  public getUserDetail(userID): Observable<User[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.USERS_URL + userID + '/', options)
      .map((response: Response) => <User[]>response.json())
      .catch(this.handleError);
  }

  public queryUserByEmail(emailArray): Observable<any> {

    // add message(?)
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.USERS_URL + 'verify_email/', emailArray, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  public updateUser(formValue): Observable<User> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.USERS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);

  }

  public createNew(formValue): Observable<User> {

    // add message(?)
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.USERS_URL, formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  public requestNew(formValue): Observable<User> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
    });

    // const options = new RequestOptions({
    //   headers: APP_SETTINGS.MIN_JSON_HEADERS
    // });

    return this._http.post(APP_SETTINGS.USERS_URL + 'request_new/', formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
