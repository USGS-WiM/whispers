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

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventDetail } from '@interfaces/event-detail';

@Injectable()
export class EventService {

  constructor(private _http: Http) { }

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
    if (eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }
    if (eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }
    if (eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }
    if (eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }
    if (eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }
    if (eventQuery.administrative_level_two.length > 0) {
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

    if (eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two.length > 0) {
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

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + 'get_count/' + queryString, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
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

    if (eventQuery.event_type.length > 0) {
      queryString = queryString + '&event_type=' + eventQuery.event_type;
    }

    if (eventQuery.diagnosis.length > 0) {
      queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
    }

    if (eventQuery.diagnosis_type.length > 0) {
      queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
    }

    if (eventQuery.species.length > 0) {
      queryString = queryString + '&species=' + eventQuery.species;
    }

    if (eventQuery.administrative_level_one.length > 0) {
      queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
    }

    if (eventQuery.administrative_level_two.length > 0) {
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

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString, options)
      .map((response: Response) => <EventSummary[]>response.json())
      .catch(this.handleError);
  }


  // TEMPORARY function to retrieve hard-coded sample event data from local disk
  // public getTestData(): any[] {
  //   return APP_UTILITIES.SAMPLE_EVENT_DATA;
  // }

  // public getSampleEventDetail(eventID): any {

  //   for (const event of APP_UTILITIES.SAMPLE_EVENT_DETAIL_DATA) {
  //     if (event.id === Number(eventID)) {
  //       return event;
  //     }
  //   }

  // }

  // Function for retrieving event details given event id
  public getEventDetails(eventID): Observable<EventDetail> {

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

    return this._http.get(APP_SETTINGS.EVENT_DETAILS_URL + eventID + '?no_page', options)
      .map((response: Response) => <EventDetail>response.json())
      .catch(this.handleError);
  }

  public getUserDashboardEventSummaries(): Observable<EventSummary[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    })

    return this._http.get(APP_SETTINGS.EVENTS_SUMMARIES_URL + 'user_events?no_page', options)
      .map((response: Response) => <EventSummary[]>response.json())
      .catch(this.handleError);

  }


  public create(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EVENTS_URL, formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<Event> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <Event>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
