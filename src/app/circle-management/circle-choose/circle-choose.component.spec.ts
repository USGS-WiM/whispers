import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleChooseComponent } from './circle-choose.component';

describe('CircleChooseComponent', () => {
  let component: CircleChooseComponent;
  let fixture: ComponentFixture<CircleChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
