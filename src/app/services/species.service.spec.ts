import { TestBed, inject } from '@angular/core/testing';

import { SpeciesService } from './species.service';

describe('SpeciesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeciesService]
    });
  });

  it('should be created', inject([SpeciesService], (service: SpeciesService) => {
    expect(service).toBeTruthy();
  }));
});
