import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpeciesDiagnosisComponent } from './view-species-diagnosis.component';

describe('ViewSpeciesDiagnosisComponent', () => {
  let component: ViewSpeciesDiagnosisComponent;
  let fixture: ComponentFixture<ViewSpeciesDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpeciesDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpeciesDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
