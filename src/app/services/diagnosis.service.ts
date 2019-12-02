
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Diagnosis } from '@interfaces/diagnosis';

@Injectable()
export class DiagnosisService {

  constructor(private _http: Http) { }

  // retrieves all diaagnoses from the diagnoses table
  public getDiagnoses(): Observable<Diagnosis[]> {

    // options parameter containing headers for the HTTP request
    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.DIAGNOSES_URL + '?no_page', options).pipe(
      map((response: Response) => <Diagnosis[]>response.json()),
      catchError(this.handleError),);
  }

  // queries diagnoses by diagnosis type
  public queryDiagnoses(diagnosisQueryString): Observable<any[]> {

    // options parameter containing headers for the HTTP request
    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.DIAGNOSES_URL + '?no_page&' + diagnosisQueryString, options).pipe(
      map((response: Response) => <any[]>response.json()),
      catchError(this.handleError),);
  }

  // posts a request for a new diagnosis to be added to database
  public requestNew(formValue): Observable<any> {

    // options parameter containing headers for the HTTP request
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
    });

    return this._http.post(APP_SETTINGS.DIAGNOSES_URL + 'request_new/', formValue, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  // error handling function
  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
