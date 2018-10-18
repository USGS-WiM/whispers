import { TestBed, inject } from '@angular/core/testing';

import { SpeciesDiagnosisService } from './species-diagnosis.service';

describe('SpeciesDiagnosisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeciesDiagnosisService]
    });
  });

  it('should be created', inject([SpeciesDiagnosisService], (service: SpeciesDiagnosisService) => {
    expect(service).toBeTruthy();
  }));
});
