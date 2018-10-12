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

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: Http) { }

  public create(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this.http.post(APP_SETTINGS.SERVICE_REQUEST_URL, formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json().error) || 'Server error');
  }
}
