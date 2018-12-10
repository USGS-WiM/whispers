import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventDiagnosisComponent } from './add-event-diagnosis.component';

describe('AddEventDiagnosisComponent', () => {
  let component: AddEventDiagnosisComponent;
  let fixture: ComponentFixture<AddEventDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
