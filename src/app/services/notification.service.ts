import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
  ) { }

  // uses the newer HttpClient method
  public getUserNotifications(): Observable<any> {

    return this.http.get(APP_SETTINGS.NOTIFICATIONS_URL, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res.results;
      }));
  }

  public updateNotification(body): Observable<any> {

    return this.http.patch(APP_SETTINGS.NOTIFICATIONS_URL + body.id + '/', body, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res.results;
      }));
  }

  public updateUserStandardNotificationSettings(userID, body): Observable<any> {

    return this.http.patch(APP_SETTINGS.USERS_URL + userID + '/', body, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res.results;
      }));
  }


  public deleteNotification(id): Observable<any> {

    return this.http.delete(APP_SETTINGS.NOTIFICATIONS_URL + id + '/', {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res.results;
      }));
  }

  public bulkUpdateNotifications(updateObject): Observable<any> {

    return this.http.post(APP_SETTINGS.NOTIFICATIONS_URL + 'bulk_update/', updateObject, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res.results;
      }));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }


}
