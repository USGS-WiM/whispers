import { TestBed, inject } from '@angular/core/testing';

import { CreateContactService } from './create-contact.service';

describe('CreateContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateContactService]
    });
  });

  it('should be created', inject([CreateContactService], (service: CreateContactService) => {
    expect(service).toBeTruthy();
  }));
});
