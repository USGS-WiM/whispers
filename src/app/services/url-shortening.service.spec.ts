import { TestBed, inject } from '@angular/core/testing';

import { UrlShorteningService } from './url-shortening.service';

describe('UrlShorteningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlShorteningService]
    });
  });

  it('should be created', inject([UrlShorteningService], (service: UrlShorteningService) => {
    expect(service).toBeTruthy();
  }));
});
