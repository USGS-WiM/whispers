import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsSummaryReportComponent } from './search-results-summary-report.component';

describe('SearchResultsSummaryReportComponent', () => {
  let component: SearchResultsSummaryReportComponent;
  let fixture: ComponentFixture<SearchResultsSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
