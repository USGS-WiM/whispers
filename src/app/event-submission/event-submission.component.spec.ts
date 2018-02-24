import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubmissionComponent } from './event-submission.component';

describe('EventSubmissionComponent', () => {
  let component: EventSubmissionComponent;
  let fixture: ComponentFixture<EventSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
