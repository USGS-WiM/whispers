import { TestBed, inject } from '@angular/core/testing';

import { ResultsCountService } from './results-count.service';

describe('ResultsCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsCountService]
    });
  });

  it('should be created', inject([ResultsCountService], (service: ResultsCountService) => {
    expect(service).toBeTruthy();
  }));
});
