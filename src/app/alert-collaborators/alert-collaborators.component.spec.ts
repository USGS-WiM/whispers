import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCollaboratorsComponent } from './alert-collaborators.component';

describe('AlertCollaboratorsComponent', () => {
  let component: AlertCollaboratorsComponent;
  let fixture: ComponentFixture<AlertCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
