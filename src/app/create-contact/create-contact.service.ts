import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CreateContactService {

  private createdContact = new Subject<any>();

  setCreatedContact(contact: any) {
    this.createdContact.next(contact);
  }

  getCreatedContact(): Observable<any> {
    return this.createdContact.asObservable();
  }

  constructor() { }
}
