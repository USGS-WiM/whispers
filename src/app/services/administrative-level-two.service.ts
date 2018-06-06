import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';


@Injectable()
export class AdministrativeLevelTwoService {

  constructor(private _http: Http) { }

  public queryAdminLevelTwos(adminLevelOneID): Observable<AdministrativeLevelTwo[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_TWOS_URL + '?administrativelevelone=' + adminLevelOneID, options)
      .map((response: Response) => <AdministrativeLevelTwo[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  public getAdminLevelTwos(): Observable<AdministrativeLevelTwo[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ADMINISTRATIVE_LEVEL_TWOS_URL, options)
      .map((response: Response) => <AdministrativeLevelTwo[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
