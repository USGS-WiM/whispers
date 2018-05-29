import { TestBed, inject } from '@angular/core/testing';

import { AgeBiasService } from './age-bias.service';

describe('AgeBiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgeBiasService]
    });
  });

  it('should be created', inject([AgeBiasService], (service: AgeBiasService) => {
    expect(service).toBeTruthy();
  }));
});
