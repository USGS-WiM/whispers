"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var diagnosis_cause_service_1 = require("./diagnosis-cause.service");
describe('DiagnosisCauseService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [diagnosis_cause_service_1.DiagnosisCauseService]
        });
    });
    it('should be created', testing_1.inject([diagnosis_cause_service_1.DiagnosisCauseService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=diagnosis-cause.service.spec.js.map