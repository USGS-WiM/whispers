"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var species_diagnosis_service_1 = require("./species-diagnosis.service");
describe('SpeciesDiagnosisService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [species_diagnosis_service_1.SpeciesDiagnosisService]
        });
    });
    it('should be created', testing_1.inject([species_diagnosis_service_1.SpeciesDiagnosisService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=species-diagnosis.service.spec.js.map