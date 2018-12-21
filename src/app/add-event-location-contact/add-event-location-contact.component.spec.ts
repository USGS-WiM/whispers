import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventLocationContactComponent } from './add-event-location-contact.component';

describe('AddEventLocationContactComponent', () => {
  let component: AddEventLocationContactComponent;
  let fixture: ComponentFixture<AddEventLocationContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventLocationContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventLocationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
