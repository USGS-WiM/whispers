import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleManagementComponent } from './circle-management.component';

describe('CircleManagementComponent', () => {
  let component: CircleManagementComponent;
  let fixture: ComponentFixture<CircleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
