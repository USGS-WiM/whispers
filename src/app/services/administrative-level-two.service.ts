
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';


@Injectable()
export class AdministrativeLevelTwoService {

  constructor(private _http: Http) { }

  public queryAdminLevelTwos(adminLevelOneID): Observable<AdministrativeLevelTwo[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_TWOS_URL + '?no_page&slim&administrativelevelone=' + adminLevelOneID, options).pipe(
      map((response: Response) => {
        const levelTwos = <AdministrativeLevelTwo[]>response.json()
        // Add adminLevelOneID to each adminLevelTwo
        levelTwos.forEach(levelTwo => levelTwo.administrative_level_one = adminLevelOneID)
        return levelTwos;
      }),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError),);
  }


  public getAdminLevelTwos(): Observable<AdministrativeLevelTwo[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_TWOS_URL + '?no_page', options).pipe(
      map((response: Response) => <AdministrativeLevelTwo[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
