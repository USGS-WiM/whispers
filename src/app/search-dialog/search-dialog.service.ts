import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchDialogService {

  private searchQuery = new Subject<any>();

  setSearchQuery(query: any) {
    this.searchQuery.next(query);
  }

  getSearchQuery(): Observable<any> {
    return this.searchQuery.asObservable();
  }


  constructor() { }
}
