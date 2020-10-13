import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationDetailsComponent } from './view-notification-details.component';

describe('ViewNotificationDetailsComponent', () => {
  let component: ViewNotificationDetailsComponent;
  let fixture: ComponentFixture<ViewNotificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNotificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
