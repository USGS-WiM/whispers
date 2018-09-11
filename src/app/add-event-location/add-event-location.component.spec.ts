import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventLocationComponent } from './add-event-location.component';

describe('AddEventLocationComponent', () => {
  let component: AddEventLocationComponent;
  let fixture: ComponentFixture<AddEventLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
