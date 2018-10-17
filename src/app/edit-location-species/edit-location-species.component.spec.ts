import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationSpeciesComponent } from './edit-location-species.component';

describe('EditLocationSpeciesComponent', () => {
  let component: EditLocationSpeciesComponent;
  let fixture: ComponentFixture<EditLocationSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocationSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
