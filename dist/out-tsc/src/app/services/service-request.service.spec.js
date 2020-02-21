"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var service_request_service_1 = require("./service-request.service");
describe('ServiceRequestService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [service_request_service_1.ServiceRequestService]
        });
    });
    it('should be created', testing_1.inject([service_request_service_1.ServiceRequestService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=service-request.service.spec.js.map