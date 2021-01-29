
import {map} from 'rxjs/operators';
import { Injectable, Output } from '@angular/core';
import { Observable ,  BehaviorSubject, of } from 'rxjs';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { APP_SETTINGS } from '../app.settings';
import { User } from '@interfaces/user';
import { EventEmitter } from 'events';
import { CurrentUserService } from '@services/current-user.service';
import clientStorage from '@app/client-storage';

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
        clientStorage.setItem('username', username);
        clientStorage.setItem('password', password);
        clientStorage.setItem('first_name', self.user.first_name);
        clientStorage.setItem('last_name', self.user.last_name);
        clientStorage.setItem('email', self.user.email);
        clientStorage.setItem('is_staff', self.user.is_staff.toString());
        clientStorage.setItem('is_superuser', self.user.is_superuser.toString());
        clientStorage.setItem('is_active', self.user.is_active.toString());
        clientStorage.setItem('role', self.user.role.toString());
        clientStorage.setItem('organization', self.user.organization.toString());
        clientStorage.setItem('last_login', self.user.last_login);
        clientStorage.setItem('active_key', self.user.active_key);
        clientStorage.setItem('user_status', self.user.user_status);

        clientStorage.setItem('currentUser', JSON.stringify(self.user));

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
    clientStorage.removeItem('username');
    clientStorage.removeItem('password');
    clientStorage.removeItem('first_name');
    clientStorage.removeItem('last_name');
    clientStorage.removeItem('email');
    clientStorage.removeItem('is_staff');
    clientStorage.removeItem('is_superuser');
    clientStorage.removeItem('is_active');
    clientStorage.removeItem('role');
    clientStorage.removeItem('organization');
    clientStorage.removeItem('last_login');
    clientStorage.removeItem('active_key');
    clientStorage.removeItem('user_status');

    clientStorage.removeItem('currentUser');

    return of(true);

  }



}

