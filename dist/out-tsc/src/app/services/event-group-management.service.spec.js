"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_group_management_service_1 = require("./event-group-management.service");
describe('EventGroupManagementService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_group_management_service_1.EventGroupManagementService]
        });
    });
    it('should be created', testing_1.inject([event_group_management_service_1.EventGroupManagementService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-group-management.service.spec.js.map