import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { DiagnosisBasis } from '@interfaces/diagnosis-basis';

@Injectable()
export class DiagnosisBasisService {

  constructor(private _http: Http) { }

  public getDiagnosisBases(): Observable<DiagnosisBasis[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.DIAGNOSIS_BASES_URL + '?no_page', options)
      .map((response: Response) => <DiagnosisBasis[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
