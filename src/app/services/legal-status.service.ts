
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { LegalStatus } from '@interfaces/legal-status'

@Injectable()
export class LegalStatusService {

  constructor(private _http: Http) { }

  public getLegalStatuses(): Observable<LegalStatus[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.LEGAL_STATUS_URL + '?no_page', options).pipe(
      map((response: Response) => <LegalStatus[]>response.json()),
      catchError(this.handleError),);

  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
