import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

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

    return this._http.post(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL, formValue, options)
      .map((response: Response) => <LocationSpeciesDiagnosis>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<LocationSpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <LocationSpeciesDiagnosis>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}