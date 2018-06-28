import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubmissionConfirmComponent } from './event-submission-confirm.component';

describe('EventSubmissionConfirmComponent', () => {
  let component: EventSubmissionConfirmComponent;
  let fixture: ComponentFixture<EventSubmissionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubmissionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubmissionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
