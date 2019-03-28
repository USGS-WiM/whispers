import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupComponent } from './event-group.component';

describe('EventGroupComponent', () => {
  let component: EventGroupComponent;
  let fixture: ComponentFixture<EventGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
