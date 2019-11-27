import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

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
    sessionStorage.setItem('currentDisplayQuery', JSON.stringify(query));
  }

  getDisplayQuery(): Observable<any> {
    return this.displayQuery.asObservable();
  }

  constructor() {
      //this.searchQuery.next(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
      //this.displayQuery.next(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
  }

}
