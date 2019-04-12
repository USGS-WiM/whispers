import { TestBed, inject } from '@angular/core/testing';

import { EventGroupManagementService } from './event-group-management.service';

describe('EventGroupManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventGroupManagementService]
    });
  });

  it('should be created', inject([EventGroupManagementService], (service: EventGroupManagementService) => {
    expect(service).toBeTruthy();
  }));
});
