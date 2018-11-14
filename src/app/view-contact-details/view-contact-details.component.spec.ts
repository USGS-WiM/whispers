import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactDetailsComponent } from './view-contact-details.component';

describe('ViewContactDetailsComponent', () => {
  let component: ViewContactDetailsComponent;
  let fixture: ComponentFixture<ViewContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
