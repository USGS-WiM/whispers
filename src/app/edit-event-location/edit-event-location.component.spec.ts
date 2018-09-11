import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventLocationComponent } from './edit-event-location.component';

describe('EditEventLocationComponent', () => {
  let component: EditEventLocationComponent;
  let fixture: ComponentFixture<EditEventLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
