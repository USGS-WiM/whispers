"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_location_contact_service_1 = require("./event-location-contact.service");
describe('EventLocationContactService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_location_contact_service_1.EventLocationContactService]
        });
    });
    it('should be created', testing_1.inject([event_location_contact_service_1.EventLocationContactService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-location-contact.service.spec.js.map