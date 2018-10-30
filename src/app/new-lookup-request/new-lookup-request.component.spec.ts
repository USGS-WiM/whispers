import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLookupRequestComponent } from './new-lookup-request.component';

describe('NewLookupRequestComponent', () => {
  let component: NewLookupRequestComponent;
  let fixture: ComponentFixture<NewLookupRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLookupRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLookupRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
