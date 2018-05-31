import { TestBed, inject } from '@angular/core/testing';

import { ContactTypeService } from './contact-type.service';

describe('ContactTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactTypeService]
    });
  });

  it('should be created', inject([ContactTypeService], (service: ContactTypeService) => {
    expect(service).toBeTruthy();
  }));
});
