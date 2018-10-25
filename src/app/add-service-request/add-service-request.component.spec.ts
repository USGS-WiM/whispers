import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceRequestComponent } from './add-service-request.component';

describe('AddServiceRequestComponent', () => {
  let component: AddServiceRequestComponent;
  let fixture: ComponentFixture<AddServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
