import { TestBed, inject } from '@angular/core/testing';

import { CircleService } from './circle.service';

describe('CircleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CircleService]
    });
  });

  it('should be created', inject([CircleService], (service: CircleService) => {
    expect(service).toBeTruthy();
  }));
});
