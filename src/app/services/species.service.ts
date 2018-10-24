import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Species } from '@interfaces/species';

@Injectable()
export class SpeciesService {

  constructor(private _http: Http) { }

  public querySpecies(speciesQuery): Observable<Species[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SPECIES_URL + speciesQuery + '?no_page', options)
      .map((response: Response) => <Species[]>response.json())
      .catch(this.handleError);
  }

  public getSpecies(): Observable<Species[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SPECIES_URL + '?no_page', options)
      .map((response: Response) => <Species[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
