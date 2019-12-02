
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

import { Comment } from '@interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: Http) { }

  public create(formValue): Observable<Comment> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this.http.post(APP_SETTINGS.COMMENTS_URL, formValue, options).pipe(
      map((response: Response) => <Comment>response.json()),
      catchError(this.handleError),);

  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this.http.delete(APP_SETTINGS.COMMENTS_URL + id + '/', options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
