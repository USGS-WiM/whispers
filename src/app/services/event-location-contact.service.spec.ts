import { TestBed, inject } from '@angular/core/testing';

import { EventLocationContactService } from './event-location-contact.service';

describe('EventLocationContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventLocationContactService]
    });
  });

  it('should be created', inject([EventLocationContactService], (service: EventLocationContactService) => {
    expect(service).toBeTruthy();
  }));
});
