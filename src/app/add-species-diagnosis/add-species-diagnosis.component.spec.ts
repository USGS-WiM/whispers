import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpeciesDiagnosisComponent } from './add-species-diagnosis.component';

describe('AddSpeciesDiagnosisComponent', () => {
  let component: AddSpeciesDiagnosisComponent;
  let fixture: ComponentFixture<AddSpeciesDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpeciesDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpeciesDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
