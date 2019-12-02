
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

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

    return this._http.get(APP_SETTINGS.SPECIES_URL + speciesQuery + '?no_page', options).pipe(
      map((response: Response) => <Species[]>response.json()),
      catchError(this.handleError),);
  }

  public getSpecies(): Observable<Species[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SPECIES_URL + '?no_page&slim', options).pipe(
      map((response: Response) => <Species[]>response.json()),
      catchError(this.handleError),);
  }

  public requestNew(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
    });

    return this._http.post(APP_SETTINGS.SPECIES_URL + 'request_new/', formValue, options).pipe(
      map((response: Response) => <Species[]>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
