import { Injectable } from '@angular/core';
import clientStorage from '@app/client-storage';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class SearchFormService {

  private searchQuery = new Subject<any>();
  private displayQuery = new Subject<any>();

  setSearchQuery(query: any) {
    this.searchQuery.next(query);
    clientStorage.setItem('currentSearch', JSON.stringify(query));
  }

  getSearchQuery(): Observable<any> {
    return this.searchQuery.asObservable();
  }

  setDisplayQuery(query: any) {
    this.displayQuery.next(query);
    clientStorage.setItem('currentDisplayQuery', JSON.stringify(query));
  }

  getDisplayQuery(): Observable<any> {
    return this.displayQuery.asObservable();
  }

  constructor() {
      //this.searchQuery.next(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
      //this.displayQuery.next(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
  }

}
