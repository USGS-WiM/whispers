import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';

@Injectable()
export class AdministrativeLevelOneService {

  constructor(private _http: Http) { }

  public queryAdminLevelOnes(adminLevelOneQuery): Observable<AdministrativeLevelOne[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.STATES_URL + adminLevelOneQuery, options)
      .map((response: Response) => <AdministrativeLevelOne[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getAdminLevelOnes(): Observable<AdministrativeLevelOne[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.STATES_URL, options)
      .map((response: Response) => <AdministrativeLevelOne[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
