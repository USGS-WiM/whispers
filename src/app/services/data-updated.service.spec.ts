import { TestBed, inject } from '@angular/core/testing';

import { DataUpdatedService } from './data-updated.service';

describe('DataUpdatedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataUpdatedService]
    });
  });

  it('should be created', inject([DataUpdatedService], (service: DataUpdatedService) => {
    expect(service).toBeTruthy();
  }));
});
