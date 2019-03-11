import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ResultsCountService {

  private countSource = new BehaviorSubject('None');
  resultsCount = this.countSource.asObservable();

  constructor() { }

  updateResultsCount(count) {
    this.countSource.next(count);
  }
  
}
