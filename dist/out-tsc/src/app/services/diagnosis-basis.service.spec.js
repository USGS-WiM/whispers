"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var diagnosis_basis_service_1 = require("./diagnosis-basis.service");
describe('DiagnosisBasisService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [diagnosis_basis_service_1.DiagnosisBasisService]
        });
    });
    it('should be created', testing_1.inject([diagnosis_basis_service_1.DiagnosisBasisService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=diagnosis-basis.service.spec.js.map