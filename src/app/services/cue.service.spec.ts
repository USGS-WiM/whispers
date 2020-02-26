import { TestBed, inject } from '@angular/core/testing';

import { CueService } from './cue.service';

describe('CueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CueService]
    });
  });

  it('should be created', inject([CueService], (service: CueService) => {
    expect(service).toBeTruthy();
  }));
});
