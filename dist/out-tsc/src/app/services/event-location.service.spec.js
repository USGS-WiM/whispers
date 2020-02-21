"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_location_service_1 = require("./event-location.service");
describe('EventLocationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_location_service_1.EventLocationService]
        });
    });
    it('should be created', testing_1.inject([event_location_service_1.EventLocationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-location.service.spec.js.map