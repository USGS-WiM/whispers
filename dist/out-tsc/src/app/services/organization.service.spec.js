"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var organization_service_1 = require("./organization.service");
describe('OrganizationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [organization_service_1.OrganizationService]
        });
    });
    it('should be created', testing_1.inject([organization_service_1.OrganizationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=organization.service.spec.js.map