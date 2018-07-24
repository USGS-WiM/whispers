import { TestBed, inject } from '@angular/core/testing';

import { EventStatusService } from './event-status.service';

describe('EventStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventStatusService]
    });
  });

  it('should be created', inject([EventStatusService], (service: EventStatusService) => {
    expect(service).toBeTruthy();
  }));
});
