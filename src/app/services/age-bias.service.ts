
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { AgeBias } from '@interfaces/age-bias';

@Injectable()
export class AgeBiasService {

  constructor(private _http: Http) { }

  public getAgeBiases(): Observable<AgeBias[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.AGE_BIASES_URL + '?no_page', options).pipe(
      map((response: Response) => <AgeBias[]>response.json()),
      catchError(this.handleError),);

  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
