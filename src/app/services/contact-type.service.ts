
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { ContactType } from '@interfaces/contact-type';

@Injectable()
export class ContactTypeService {

  constructor(private _http: Http) { }

  public getContactTypes(): Observable<ContactType[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.CONTACT_TYPES_URL + '?no_page', options).pipe(
      map((response: Response) => <ContactType[]>response.json()),
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
