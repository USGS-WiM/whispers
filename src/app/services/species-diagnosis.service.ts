import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

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

    return this.http.get(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + '?no_page', options)
      .map((response: Response) => <SpeciesDiagnosis[]>response.json())
      .catch(this.handleError);

  }

  public create(formValue): Observable<SpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this.http.post(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL, formValue, options)
      .map((response: Response) => <SpeciesDiagnosis>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<SpeciesDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.put(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <SpeciesDiagnosis>response.json())
      .catch(this.handleError);
  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.delete(APP_SETTINGS.LOCATION_SPECIES_DIAGNOSIS_URL + id + '/', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }
}
