import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';

import { LandOwnership } from '@interfaces/land-ownership';

@Injectable()
export class LandOwnershipService {

  constructor(private _http: Http) { }


  public getLandOwnerships(): Observable<LandOwnership[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.LAND_OWNERSHIPS_URL + '?no_page', options)
      .map((response: Response) => <LandOwnership[]>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
