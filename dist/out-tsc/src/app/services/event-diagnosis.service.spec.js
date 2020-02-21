"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_diagnosis_service_1 = require("./event-diagnosis.service");
describe('EventDiagnosisService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_diagnosis_service_1.EventDiagnosisService]
        });
    });
    it('should be created', testing_1.inject([event_diagnosis_service_1.EventDiagnosisService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-diagnosis.service.spec.js.map