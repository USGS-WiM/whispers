import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsShareComponent } from './event-details-share.component';

describe('EventDetailsShareComponent', () => {
  let component: EventDetailsShareComponent;
  let fixture: ComponentFixture<EventDetailsShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
