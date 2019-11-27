
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { SpeciesDiagnosis } from '@interfaces/species-diagnosis';

@Injectable({
  providedIn: 'root'
})
export class SpeciesDiagnosisService {

  constructor(private http: Http) { }

  public getSpeciesDiagnosis(): Observable<SpeciesDiagnosis[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.get(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + '?no_page', options).pipe(
      map((response: Response) => <SpeciesDiagnosis[]>response.json()),
      catchError(this.handleError),);

  }

  public create(formValue): Observable<SpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this.http.post(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL, formValue, options).pipe(
      map((response: Response) => <SpeciesDiagnosis>response.json()),
      catchError(this.handleError),);

  }

  public update(formValue): Observable<SpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.put(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <SpeciesDiagnosis>response.json()),
      catchError(this.handleError),);
  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.delete(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + id + '/', options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
