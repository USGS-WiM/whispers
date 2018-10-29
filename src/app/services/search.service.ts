import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Search } from '@app/interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http: Http) { }

  public getSearches(): Observable<Search[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SEARCH_URL + '?no_page', options)
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getPopularSearches(): Observable<Search[]> {

    // const options = new RequestOptions({
    //   headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    // });

    return this._http.get(APP_SETTINGS.SEARCH_URL  + '/top_ten' + '?no_page')
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getUserDashboardSearches(): Observable<Search[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SEARCH_URL  + 'user_searches' + '?no_page', options)
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.SEARCH_URL, formValue, options)
      .map((response: Response) => <Search>response.json())
      .catch(this.handleError);

  }

  public update(formValue: Search): Observable<Search> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.SEARCH_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <Search>response.json())
      .catch(this.handleError);
  }

  public delete(formValue: Search): Observable<Search> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.SEARCH_URL + formValue.id + '/', options)
      .map((response: Response) => <Search>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
