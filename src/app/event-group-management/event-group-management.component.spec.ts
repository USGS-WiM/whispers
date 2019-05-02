import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupManagementComponent } from './event-group-management.component';

describe('EventGroupManagementComponent', () => {
  let component: EventGroupManagementComponent;
  let fixture: ComponentFixture<EventGroupManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGroupManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
