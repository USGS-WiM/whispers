import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { APP_SETTINGS } from '@app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {

  constructor(
    private http: Http
  ) { }

  public generateShortURL(): Observable<any> {

    const encodedLongURL = encodeURIComponent(window.location.href);

    // Temporary, for testing
    // const encodedLongURL = encodeURIComponent('https://test.wim.usgs.gov/whispersdev/event/160587');

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this.http.get(APP_SETTINGS.GO_USA_GOV_SHORTEN_URL + '?login=' +
      APP_SETTINGS.GO_USA_GOV_USER + '&apiKey=' +
      APP_SETTINGS.GO_USA_GOV_API_KEY + '&longUrl=' + encodedLongURL, options
    )
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
