import { TestBed, inject } from '@angular/core/testing';

import { LegalStatusService } from './legal-status.service';

describe('LegalStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalStatusService]
    });
  });

  it('should be created', inject([LegalStatusService], (service: LegalStatusService) => {
    expect(service).toBeTruthy();
  }));
});
