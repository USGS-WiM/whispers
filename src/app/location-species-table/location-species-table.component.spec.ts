import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSpeciesTableComponent } from './location-species-table.component';

describe('LocationSpeciesTableComponent', () => {
  let component: LocationSpeciesTableComponent;
  let fixture: ComponentFixture<LocationSpeciesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSpeciesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSpeciesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
