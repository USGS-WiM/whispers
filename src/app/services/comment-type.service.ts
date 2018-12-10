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

import { CommentType } from '@interfaces/comment-type';

@Injectable()
export class CommentTypeService {

  constructor(private _http: Http) { }

  public getCommentTypes(): Observable<CommentType[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.COMMENT_TYPES_URL + '?no_page', options)
      .map((response: Response) => <CommentType[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
