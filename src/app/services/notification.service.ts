import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, Subject, throwError, Notification } from 'rxjs';
import { Observable, Subject, throwError } from 'rxjs';
import { Notification } from '@interfaces/notification';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { ResultsCountService } from '@services/results-count.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private resultsCountService: ResultsCountService
  ) { }

  // uses the newer HttpClient method
  public getUserNotifications(): Observable<any> {

    return this.http.get(APP_SETTINGS.NOTIFICATIONS_URL, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {

        // establish unreadNotifications variable. first contains all notifications
        const unreadNotifications: Notification[] = Array.from(res.results);

        // splice out all the read notififcations
        for (let i = unreadNotifications.length - 1; i >= 0; i--) {
          if (unreadNotifications[i].read === true) {
            unreadNotifications.splice(i, 1);
          }
        }
        this.resultsCountService.updateUnreadNotificationsCount(unreadNotifications.length);

        return res.results;
      }));
  }

  public getUserCustomNotificationCues(): Observable<any> {

    return this.http.get(APP_SETTINGS.NOTIFICATION_CUE_CUSTOM_URL, {
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
        return res;
      }));
  }

  public updateUserStandardNotificationSettings(userID, body): Observable<any> {

    return this.http.patch(APP_SETTINGS.USERS_URL + userID + '/', body, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res;
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


  public deleteCustomNotificationCue(id): Observable<any> {

    return this.http.delete(APP_SETTINGS.NOTIFICATION_CUE_CUSTOM_URL + id + '/', {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        // return res.results;
      }));
  }


  public createCustomNotificationCue(customCueObject): Observable<any> {

    return this.http.post(APP_SETTINGS.NOTIFICATION_CUE_CUSTOM_URL, customCueObject, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res;
      }));
  }

  public updateCustomNotificationSettings(body): Observable<any> {
    //change URL

    return this.http.patch(APP_SETTINGS.NOTIFICATION_CUE_PREFERENCES_URL + body.id + '/', body, {
      headers: APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
    }).pipe(
      map((res: any) => {
        return res;
      }));
  }


  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }


}
