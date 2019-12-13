
import {map} from 'rxjs/operators';
import { Injectable, Output } from '@angular/core';
import { Observable ,  BehaviorSubject, of } from 'rxjs';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { APP_SETTINGS } from '../app.settings';
import { User } from '@interfaces/user';
import { EventEmitter } from 'events';
import { CurrentUserService } from '@services/current-user.service';

@Injectable()

export class AuthenticationService {

  user: User;

  constructor(
    private _http: Http,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {

  }

  login(username: string, password: string) {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    });

    const self = this;
    return this._http.post(APP_SETTINGS.AUTH_URL, null, options).pipe(
      map((res: any) => {
        self.user = res.json();
        // if (self.user.is_staff || self.user.username == 'testuser') {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('first_name', self.user.first_name);
        sessionStorage.setItem('last_name', self.user.last_name);
        sessionStorage.setItem('email', self.user.email);
        sessionStorage.setItem('is_staff', self.user.is_staff.toString());
        sessionStorage.setItem('is_superuser', self.user.is_superuser.toString());
        sessionStorage.setItem('is_active', self.user.is_active.toString());
        sessionStorage.setItem('role', self.user.role.toString());
        sessionStorage.setItem('organization', self.user.organization.toString());
        sessionStorage.setItem('last_login', self.user.last_login);
        sessionStorage.setItem('active_key', self.user.active_key);
        sessionStorage.setItem('user_status', self.user.user_status);

        sessionStorage.setItem('currentUser', JSON.stringify(self.user));

        // self.userLoggedIn$.emit(res);
        // this.currentUser.emit(res);
        this.currentUserService.updateCurrentUser(self.user);
        // } else {

        //   alert('This user is not authorized!');
        // }
      }));

  }

  logout() {

    // this.router.navigate(['/login']);
    // this.router.navigateByUrl('login');
    this.user = undefined;
    this.currentUserService.updateCurrentUser({ 'username': '' });
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('first_name');
    sessionStorage.removeItem('last_name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('is_staff');
    sessionStorage.removeItem('is_superuser');
    sessionStorage.removeItem('is_active');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('organization');
    sessionStorage.removeItem('last_login');
    sessionStorage.removeItem('active_key');
    sessionStorage.removeItem('user_status');

    sessionStorage.removeItem('currentUser');

    return of(true);

  }



}

