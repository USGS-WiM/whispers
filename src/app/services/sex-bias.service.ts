
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { SexBias } from '@interfaces/sex-bias';


@Injectable()
export class SexBiasService {

  constructor(private _http: Http) { }

  public getSexBiases(): Observable<SexBias[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SEX_BIASES_URL + '?no_page', options).pipe(
      map((response: Response) => <SexBias[]>response.json()),
      catchError(this.handleError),);

  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }


}
