import { TestBed, inject } from '@angular/core/testing';

import { DiagnosisCauseService } from './diagnosis-cause.service';

describe('DiagnosisCauseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiagnosisCauseService]
    });
  });

  it('should be created', inject([DiagnosisCauseService], (service: DiagnosisCauseService) => {
    expect(service).toBeTruthy();
  }));
});
