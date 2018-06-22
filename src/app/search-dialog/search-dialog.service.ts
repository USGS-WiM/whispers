import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchDialogService {

  private searchQuery = new Subject<any>();
  private displayQuery = new Subject<any>();

  setSearchQuery(query: any) {
    this.searchQuery.next(query);
  }

  getSearchQuery(): Observable<any> {
    return this.searchQuery.asObservable();
  }

  setDisplayQuery(query: any) {
    this.displayQuery.next(query);
  }

  getDisplayQuery(): Observable<any> {
    return this.displayQuery.asObservable();
  }


  constructor() { }
}
