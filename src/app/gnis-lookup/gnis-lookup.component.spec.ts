import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnisLookupComponent } from './gnis-lookup.component';

describe('GnisLookupComponent', () => {
  let component: GnisLookupComponent;
  let fixture: ComponentFixture<GnisLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnisLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnisLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
