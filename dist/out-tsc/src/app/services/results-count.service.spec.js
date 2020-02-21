"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var results_count_service_1 = require("./results-count.service");
describe('ResultsCountService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [results_count_service_1.ResultsCountService]
        });
    });
    it('should be created', testing_1.inject([results_count_service_1.ResultsCountService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=results-count.service.spec.js.map