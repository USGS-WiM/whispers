"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var search_results_summary_report_component_1 = require("./search-results-summary-report.component");
describe('SearchResultsSummaryReportComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [search_results_summary_report_component_1.SearchResultsSummaryReportComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(search_results_summary_report_component_1.SearchResultsSummaryReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=search-results-summary-report.component.spec.js.map