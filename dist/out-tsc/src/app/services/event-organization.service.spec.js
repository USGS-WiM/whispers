"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_organization_service_1 = require("./event-organization.service");
describe('EventOrganizationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_organization_service_1.EventOrganizationService]
        });
    });
    it('should be created', testing_1.inject([event_organization_service_1.EventOrganizationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-organization.service.spec.js.map