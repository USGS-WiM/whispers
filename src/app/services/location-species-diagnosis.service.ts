
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { LocationSpeciesDiagnosis } from '@interfaces/location-species-diagnosis';

@Injectable({
  providedIn: 'root'
})
export class LocationSpeciesDiagnosisService {

  constructor(private _http: Http) { }

  public create(formValue): Observable<LocationSpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL, formValue, options).pipe(
      map((response: Response) => <LocationSpeciesDiagnosis>response.json()),
      catchError(this.handleError),);

  }

  public update(formValue): Observable<LocationSpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <LocationSpeciesDiagnosis>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}