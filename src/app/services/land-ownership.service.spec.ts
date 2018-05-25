import { TestBed, inject } from '@angular/core/testing';

import { LandOwnershipService } from './land-ownership.service';

describe('LandOwnershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandOwnershipService]
    });
  });

  it('should be created', inject([LandOwnershipService], (service: LandOwnershipService) => {
    expect(service).toBeTruthy();
  }));
});
