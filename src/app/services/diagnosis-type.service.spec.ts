import { TestBed, inject } from '@angular/core/testing';

import { DiagnosisTypeService } from './diagnosis-type.service';

describe('DiagnosisTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiagnosisTypeService]
    });
  });

  it('should be created', inject([DiagnosisTypeService], (service: DiagnosisTypeService) => {
    expect(service).toBeTruthy();
  }));
});
