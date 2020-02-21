"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var circle_management_service_1 = require("./circle-management.service");
describe('CircleManagementService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [circle_management_service_1.CircleManagementService]
        });
    });
    it('should be created', testing_1.inject([circle_management_service_1.CircleManagementService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=circle-management.service.spec.js.map