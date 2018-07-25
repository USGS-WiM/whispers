import { TestBed, inject } from '@angular/core/testing';

import { DiagnosisBasisService } from './diagnosis-basis.service';

describe('DiagnosisBasisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiagnosisBasisService]
    });
  });

  it('should be created', inject([DiagnosisBasisService], (service: DiagnosisBasisService) => {
    expect(service).toBeTruthy();
  }));
});
