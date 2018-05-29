import { TestBed, inject } from '@angular/core/testing';

import { SexBiasService } from './sex-bias.service';

describe('SexBiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SexBiasService]
    });
  });

  it('should be created', inject([SexBiasService], (service: SexBiasService) => {
    expect(service).toBeTruthy();
  }));
});
