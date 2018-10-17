import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';

import { LocationSpecies } from '@interfaces/location-species';

@Injectable({
  providedIn: 'root'
})
export class LocationSpeciesService {

  constructor(private _http: Http) { }

  public getLocationSpecies(): Observable<LocationSpecies[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.LOCATION_SPECIES_URL + '?no_page', options)
      .map((response: Response) => <LocationSpecies[]>response.json())
      .catch(this.handleError);

  }

  public create(formValue): Observable<LocationSpecies> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.LOCATION_SPECIES_URL, formValue, options)
      .map((response: Response) => <LocationSpecies>response.json())
      .catch(this.handleError);

  }

  public update(formValue): Observable<LocationSpecies> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.LOCATION_SPECIES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <LocationSpecies>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
