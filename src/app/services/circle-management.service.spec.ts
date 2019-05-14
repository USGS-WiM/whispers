import { TestBed, inject } from '@angular/core/testing';

import { CircleManagementService } from './circle-management.service';

describe('CircleManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CircleManagementService]
    });
  });

  it('should be created', inject([CircleManagementService], (service: CircleManagementService) => {
    expect(service).toBeTruthy();
  }));
});
