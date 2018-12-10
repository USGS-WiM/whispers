import { TestBed, inject } from '@angular/core/testing';

import { LocationSpeciesDiagnosisService } from './location-species-diagnosis.service';

describe('LocationSpeciesDiagnosisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationSpeciesDiagnosisService]
    });
  });

  it('should be created', inject([LocationSpeciesDiagnosisService], (service: LocationSpeciesDiagnosisService) => {
    expect(service).toBeTruthy();
  }));
});
