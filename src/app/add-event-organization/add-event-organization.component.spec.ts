import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventOrganizationComponent } from './add-event-organization.component';

describe('AddEventOrganizationComponent', () => {
  let component: AddEventOrganizationComponent;
  let fixture: ComponentFixture<AddEventOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
