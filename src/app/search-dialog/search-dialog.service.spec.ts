import { TestBed, inject } from '@angular/core/testing';

import { SearchDialogService } from './search-dialog.service';

describe('SearchDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchDialogService]
    });
  });

  it('should be created', inject([SearchDialogService], (service: SearchDialogService) => {
    expect(service).toBeTruthy();
  }));
});
