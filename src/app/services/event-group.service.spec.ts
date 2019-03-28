import { TestBed, inject } from '@angular/core/testing';

import { EventGroupService } from './event-group.service';

describe('EventGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventGroupService]
    });
  });

  it('should be created', inject([EventGroupService], (service: EventGroupService) => {
    expect(service).toBeTruthy();
  }));
});
