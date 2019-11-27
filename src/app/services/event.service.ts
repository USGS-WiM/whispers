
import {catchError,  map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError ,  Subject } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventDetail } from '@interfaces/event-detail';
import { PageData } from '@interfaces/page-data';
import { ResultsCountService } from '@services/results-count.service';

@Injectable()
export class EventService {
  // [x: string]: any;

  // _http for deprecated Http

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  constructor(private _http: Http,
    private http: HttpClient,
    private resultsCountService: ResultsCountService) { }

  public getEventDetailsCSV(eventID) {

    window.location.href = APP_SETTINGS.EVENT_DETAILS_URL + eventID + '/flat/?format=csv';

  }

  public getEventSummaryCSV(eventQuery) {


    let queryString = '?';

    if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
      queryString = queryString + '&affected_count=' + eventQuery.affected_count.toString();
    }
    if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
      queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
    }
    if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
      queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
    }

    //attempt to handle start date and end date that are referred to differently throughout the app
    if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
      queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
    }
    if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
      queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
    }

    if (eventQuery.event_type && eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species && eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
      queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
    }

    if (eventQuery.and_params) {
      if (eventQuery.and_params.length > 0) {
        queryString = queryString + '&and_params=' + eventQuery.and_params;
      }
    }
    if (eventQuery.complete === false) {
      queryString = queryString + '&complete=False';
    }
    if (eventQuery.complete === true) {
      queryString = queryString + '&complete=True';
    }

    queryString = queryString + '&format=csv';

    window.location.href = APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString;

  }

  public queryEventsCount(eventQuery): Observable<any> {

    // console.log(JSON.stringify(eventQuery));

    let queryString = '?no_page';

    if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
      queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
    }
    if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
      queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
    }
    if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
      queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
    }

    if (eventQuery.event_type && eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species && eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
      queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
    }

    if (eventQuery.and_params) {
      if (eventQuery.and_params.length > 0) {
        queryString = queryString + '&and_params=' + eventQuery.and_params;
      }
    }
    if (eventQuery.complete === false) {
      queryString = queryString + '&complete=False';
    }
    if (eventQuery.complete === true) {
      queryString = queryString + '&complete=True';
    }

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + 'get_count/' + queryString, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  public queryEvents(eventQuery): Observable<EventSummary[]> {

    // console.log(JSON.stringify(eventQuery));

    let queryString = '?no_page';

    if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
      queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
    }
    if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
      queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
    }
    if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
      queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
    }

    if (eventQuery.event_type && eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species && eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
      queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
    }

    if (eventQuery.and_params) {
      if (eventQuery.and_params.length > 0) {
        queryString = queryString + '&and_params=' + eventQuery.and_params;
      }
    }
    if (eventQuery.complete === false) {
      queryString = queryString + '&complete=False';
    }
    if (eventQuery.complete === true) {
      queryString = queryString + '&complete=True';
    }

    let options;

    if (this.isloggedIn) {
      options = new RequestOptions({
        headers: APP_SETTINGS.AUTH_JSON_HEADERS
      });

    } else {
      options = new RequestOptions({
        headers: APP_SETTINGS.JSON_HEADERS
      });

    }

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString, options).pipe(
      map((response: Response) => <EventSummary[]>response.json()),
      catchError(this.handleError),);
  }


  // Function for retrieving event details given event id
  public getEventDetails(eventID): Observable<EventDetail> {

    // TODO: update for use of HttpClient standard, and implement http interceptor

    /////////////////////////////////////////////////

    // do conditional for auth headers

    // let headers;
    // if (sessionStorage.username !== undefined) {
    //   headers = APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS;
    // } else {
    //   headers = APP_SETTINGS.JSON_HEADERS;
    // }

    // return this.http.get(APP_SETTINGS.EVENT_DETAILS_URL + eventID, {
    //   headers: headers,
    //   params: new HttpParams().set('no_page', null)
    // })
    //   .map((res: any) => {
    //     // const response = res.json();
    //     // return res.results;
    //     return <EventDetail>res.json();
    //   })
    //   .catch(this.handleError);

    ////////////////////////////////////////

    let options;
    if (sessionStorage.username !== undefined) {
      options = new RequestOptions({
        headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
      });
    } else {
      options = new RequestOptions({
        headers: APP_SETTINGS.JSON_HEADERS
      });
    }

    return this._http.get(APP_SETTINGS.EVENT_DETAILS_URL + eventID + '?no_page', options).pipe(
      map((response: Response) => <EventDetail>response.json()),
      catchError(this.handleEventDetailsError),);
  }

  public getUserDashboardEventSummaries(): Observable<EventSummary[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + 'user_events?no_page', options).pipe(
      map((response: Response) => <EventSummary[]>response.json()),
      catchError(this.handleError),);

  }

  public getUserEvents(orderParams = '', pageNumber = 1, pageSize = 10): Observable<any> {

    return this.http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + 'user_events', {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS,
      params: new HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString())
    }).pipe(
      map((res: any) => {
        // const response = res.json();
        this.resultsCountService.updateUserEventsResultsCount(res.count);
        return res.results;
      }));
    // .pipe(
    //   map(response => {
    //     response['payload'] = response;
    //     // this.resultsCountService.updateUserEventsResultsCount(response['payload'].count);
    //     return response['payload'].results;
    //     // set a value for length here with observable

    //   })
    // );
  }

  // below is the pagination version of the query events function. may eventually convert home page query to use this pagination approach
  public queryEventsPage(eventQuery, orderParams, pageNumber, pageSize): Observable<any[]> {

    let queryString = '?';

    if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
      queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
    }
    if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
      queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
    }
    if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
      queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
    }

    if (eventQuery.event_type && eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species && eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
      queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
    }

    if (eventQuery.and_params) {
      if (eventQuery.and_params.length > 0) {
        queryString = queryString + '&and_params=' + eventQuery.and_params;
      }
    }
    if (eventQuery.complete === false) {
      queryString = queryString + '&complete=False';
    }
    if (eventQuery.complete === true) {
      queryString = queryString + '&complete=True';
    }

    // tslint:disable-next-line:max-line-length
    return this.http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString, { headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS, params: new HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString()) }).pipe(
      map((res: any) => {
        // const response = res.json();
        this.resultsCountService.updateEventQueryResultsCount(res.count);
        return res.results;
      }));
  }

  public create(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EVENTS_URL, formValue, options).pipe(
      map((response: Response) => <Event>response.json()),
      catchError(this.handleError),);

  }

  public update(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <Event>response.json()),
      catchError(this.handleError),);
  }

  public patchUpdate(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <Event>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

  private handleEventDetailsError(error: Response) {
    console.error(error);
    return throwError(error);
  }

}
