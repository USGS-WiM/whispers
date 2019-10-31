import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { ServiceRequestResponse } from '@interfaces/service-request-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: Http) { }

  public getServiceRequestResponses(): Observable<ServiceRequestResponse[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this.http.get(APP_SETTINGS.SERVICE_REQUEST_RESPONSES_URL + '?no_page', options)
      .map((response: Response) => <ServiceRequestResponse[]>response.json())
      .catch(this.handleError);
  }

  public update(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.patch(APP_SETTINGS.SERVICE_REQUEST_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

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
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
