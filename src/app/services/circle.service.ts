import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventDetail } from '@interfaces/event-detail';
import { PageData } from '@interfaces/page-data';
import { ResultsCountService } from '@services/results-count.service';
import { Circle } from '@interfaces/circle';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(
    private _http: Http,
    private http: HttpClient,
    private resultsCountService: ResultsCountService
  ) { }

  public getCircles(orderParams = '', pageNumber = 1, pageSize = 10): Observable<any> {

    return this.http.get(APP_SETTINGS.CIRCLES_URL, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS,
      params: new HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString())
    })
      .map((res: any) => {
        // const response = res.json();
        // this.resultsCountService.updateEventGroupResultsCount(res.count);
        return res.results;
      });

  }

  public getAllUserCircles(): Observable<Circle[]> {
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.CIRCLES_URL + '?no_page', options)
      .map((response: Response) => <Circle[]>response.json())
      .catch(this.handleError);
  }

  public create(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.CIRCLES_URL, formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.CIRCLES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);

  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.CIRCLES_URL + id + '/', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
