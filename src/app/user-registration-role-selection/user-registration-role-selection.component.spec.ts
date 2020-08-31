import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationRoleSelectionComponent } from './user-registration-role-selection.component';

describe('UserRegistrationRoleSelectionComponent', () => {
  let component: UserRegistrationRoleSelectionComponent;
  let fixture: ComponentFixture<UserRegistrationRoleSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationRoleSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationRoleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
