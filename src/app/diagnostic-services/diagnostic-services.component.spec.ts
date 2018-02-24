import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticServicesComponent } from './diagnostic-services.component';

describe('DiagnosticServicesComponent', () => {
  let component: DiagnosticServicesComponent;
  let fixture: ComponentFixture<DiagnosticServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
