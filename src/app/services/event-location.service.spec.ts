import { TestBed, inject } from '@angular/core/testing';

import { EventLocationService } from './event-location.service';

describe('EventLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventLocationService]
    });
  });

  it('should be created', inject([EventLocationService], (service: EventLocationService) => {
    expect(service).toBeTruthy();
  }));
});
