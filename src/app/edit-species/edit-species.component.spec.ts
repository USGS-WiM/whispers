import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeciesComponent } from './edit-species.component';

describe('EditSpeciesComponent', () => {
  let component: EditSpeciesComponent;
  let fixture: ComponentFixture<EditSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
