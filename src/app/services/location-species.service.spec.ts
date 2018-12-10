import { TestBed, inject } from '@angular/core/testing';

import { LocationSpeciesService } from './location-species.service';

describe('LocationSpeciesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationSpeciesService]
    });
  });

  it('should be created', inject([LocationSpeciesService], (service: LocationSpeciesService) => {
    expect(service).toBeTruthy();
  }));
});
