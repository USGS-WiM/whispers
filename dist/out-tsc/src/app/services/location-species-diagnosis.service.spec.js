"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var location_species_diagnosis_service_1 = require("./location-species-diagnosis.service");
describe('LocationSpeciesDiagnosisService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [location_species_diagnosis_service_1.LocationSpeciesDiagnosisService]
        });
    });
    it('should be created', testing_1.inject([location_species_diagnosis_service_1.LocationSpeciesDiagnosisService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=location-species-diagnosis.service.spec.js.map