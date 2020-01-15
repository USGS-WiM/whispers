import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPublicReportComponent } from './event-public-report.component';

describe('EventPublicReportComponent', () => {
  let component: EventPublicReportComponent;
  let fixture: ComponentFixture<EventPublicReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPublicReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPublicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
