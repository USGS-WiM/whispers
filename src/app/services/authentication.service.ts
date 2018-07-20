import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { APP_SETTINGS } from '../app.settings';
import { User } from '@interfaces/user';
import { EventEmitter } from 'events';

import { BehaviorSubject } from 'rxjs';
import { CurrentUserService } from '@services/current-user.service';

@Injectable()

export class AuthenticationService {

  user: User;

  constructor(private _http: Http, private router: Router, private currentUserService: CurrentUserService) {

  }

  login(username: string, password: string) {
    const options = new RequestOptions({ headers: new Headers({ 'Authorization': 'Basic ' + btoa(username + ':' + password) }) });

    return this._http.post(APP_SETTINGS.AUTH_URL, null, options)
      .map((res: any) => {
        this.user = res.json();
        if (this.user.is_staff) {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('first_name', this.user.first_name);
          sessionStorage.setItem('last_name', this.user.last_name);
          sessionStorage.setItem('email', this.user.email);
          sessionStorage.setItem('is_staff', this.user.is_staff.toString());
          sessionStorage.setItem('is_superuser', this.user.is_superuser.toString());
          sessionStorage.setItem('is_active', this.user.is_active.toString());
          sessionStorage.setItem('role', this.user.role.toString());
          sessionStorage.setItem('organization', this.user.organization.toString());
          sessionStorage.setItem('last_login', this.user.last_login);
          sessionStorage.setItem('active_key', this.user.active_key);
          sessionStorage.setItem('user_status', this.user.user_status);

          // this.userLoggedIn$.emit(res);
          // this.currentUser.emit(res);
          this.currentUserService.updateCurrentUser(this.user);
        } else {
          // TODO: do something more professional here
          alert('This user is not authorized!');
        }
      });

  }

  logout() {

    this.router.navigate(['/login']);
    // this.router.navigateByUrl('login');
    this.user = undefined;
    this.currentUserService.updateCurrentUser({ 'first_name': 'Logged Out' });
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

    return Observable.of(true);

  }



}

