
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';

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

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  public getCircles(orderParams = '', pageNumber = 1, pageSize = 10): Observable<any> {

    return this.http.get(APP_SETTINGS.CIRCLES_URL, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS,
      params: new HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString())
    }).pipe(
      map((res: any) => {
        // const response = res.json();
        // this.resultsCountService.updateEventGroupResultsCount(res.count);
        return res.results;
      }));

  }

  public getAllUserCircles(): Observable<Circle[]> {

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
    return this._http.get(APP_SETTINGS.CIRCLES_URL + '?no_page', options).pipe(
      map((response: Response) => <Circle[]>response.json()),
      catchError(this.handleError));
  }

  public create(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.CIRCLES_URL, formValue, options).pipe(
      map((response: Response) => <Event>response.json()),
      catchError(this.handleError));

  }

  public update(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.CIRCLES_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <Event>response.json()),
      catchError(this.handleError));

  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.CIRCLES_URL + id + '/', options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
