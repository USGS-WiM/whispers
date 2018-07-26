import { TestBed, inject } from '@angular/core/testing';

import { EventDiagnosisService } from './event-diagnosis.service';

describe('EventDiagnosisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDiagnosisService]
    });
  });

  it('should be created', inject([EventDiagnosisService], (service: EventDiagnosisService) => {
    expect(service).toBeTruthy();
  }));
});
