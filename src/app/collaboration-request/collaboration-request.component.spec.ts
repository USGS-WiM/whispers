import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationRequestComponent } from './collaboration-request.component';

describe('CollaborationRequestComponent', () => {
  let component: CollaborationRequestComponent;
  let fixture: ComponentFixture<CollaborationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
