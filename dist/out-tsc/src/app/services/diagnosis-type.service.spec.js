"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var diagnosis_type_service_1 = require("./diagnosis-type.service");
describe('DiagnosisTypeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [diagnosis_type_service_1.DiagnosisTypeService]
        });
    });
    it('should be created', testing_1.inject([diagnosis_type_service_1.DiagnosisTypeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=diagnosis-type.service.spec.js.map