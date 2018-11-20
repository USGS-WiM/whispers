import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '@interfaces/user';

@Injectable()
export class CurrentUserService {

  private userSource = new BehaviorSubject('None');
  currentUser = this.userSource.asObservable();

  constructor() { }

  updateCurrentUser(user) {
    this.userSource.next(user);
  }

}

