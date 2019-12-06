import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSummaryReportComponent } from './event-summary-report.component';

describe('EventSummaryReportComponent', () => {
  let component: EventSummaryReportComponent;
  let fixture: ComponentFixture<EventSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
