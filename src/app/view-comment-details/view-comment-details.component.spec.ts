import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentDetailsComponent } from './view-comment-details.component';

describe('ViewCommentDetailsComponent', () => {
  let component: ViewCommentDetailsComponent;
  let fixture: ComponentFixture<ViewCommentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
