import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubmissionSuccessComponent } from './event-submission-success.component';

describe('EventSubmissionSuccessComponent', () => {
  let component: EventSubmissionSuccessComponent;
  let fixture: ComponentFixture<EventSubmissionSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubmissionSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubmissionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
