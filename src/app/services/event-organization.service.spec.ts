import { TestBed, inject } from '@angular/core/testing';

import { EventOrganizationService } from './event-organization.service';

describe('EventOrganizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventOrganizationService]
    });
  });

  it('should be created', inject([EventOrganizationService], (service: EventOrganizationService) => {
    expect(service).toBeTruthy();
  }));
});
