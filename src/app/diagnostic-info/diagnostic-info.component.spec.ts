import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticInfoComponent } from './diagnostic-info.component';

describe('DiagnosticInfoComponent', () => {
  let component: DiagnosticInfoComponent;
  let fixture: ComponentFixture<DiagnosticInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
