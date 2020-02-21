"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var diagnosis_service_1 = require("./diagnosis.service");
describe('DiagnosisService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [diagnosis_service_1.DiagnosisService]
        });
    });
    it('should be created', testing_1.inject([diagnosis_service_1.DiagnosisService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=diagnosis.service.spec.js.map