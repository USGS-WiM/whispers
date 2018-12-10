import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeciesDiagnosisComponent } from './add-species-diagnosis.component';

describe('EditSpeciesDiagnosisComponent', () => {
  let component: EditSpeciesDiagnosisComponent;
  let fixture: ComponentFixture<EditSpeciesDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpeciesDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpeciesDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
