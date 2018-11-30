import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { SexBias } from '@interfaces/sex-bias';


@Injectable()
export class SexBiasService {

  constructor(private _http: Http) { }

  public getSexBiases(): Observable<SexBias[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SEX_BIASES_URL + '?no_page', options)
      .map((response: Response) => <SexBias[]>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }


}
