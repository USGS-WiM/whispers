
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';

@Injectable()
export class AdministrativeLevelOneService {

  constructor(private _http: Http) { }

  public queryAdminLevelOnes(countryID): Observable<AdministrativeLevelOne[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_ONES_URL + '?no_page&slim&country=' + countryID, options).pipe(
      map((response: Response) => <AdministrativeLevelOne[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError),);
  }

  public getAdminLevelOnes(): Observable<AdministrativeLevelOne[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_ONES_URL + '?no_page', options).pipe(
      map((response: Response) => <AdministrativeLevelOne[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
