import { TestBed, inject } from '@angular/core/testing';

import { CommentTypeService } from './comment-type.service';

describe('CommentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentTypeService]
    });
  });

  it('should be created', inject([CommentTypeService], (service: CommentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
