"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var legal_status_service_1 = require("./legal-status.service");
describe('LegalStatusService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [legal_status_service_1.LegalStatusService]
        });
    });
    it('should be created', testing_1.inject([legal_status_service_1.LegalStatusService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=legal-status.service.spec.js.map