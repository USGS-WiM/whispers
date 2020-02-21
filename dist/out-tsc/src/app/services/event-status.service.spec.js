"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_status_service_1 = require("./event-status.service");
describe('EventStatusService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_status_service_1.EventStatusService]
        });
    });
    it('should be created', testing_1.inject([event_status_service_1.EventStatusService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-status.service.spec.js.map