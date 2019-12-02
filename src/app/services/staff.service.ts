
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { Staff } from '@interfaces/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: Http) { }

  public getStaff(): Observable<Staff[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.get(APP_SETTINGS.STAFF_URL +  '?no_page', options).pipe(
      map((response: Response) => <Staff[]>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
