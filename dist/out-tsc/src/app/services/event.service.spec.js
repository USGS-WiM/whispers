"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_service_1 = require("./event.service");
describe('EventService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_service_1.EventService]
        });
    });
    it('should be created', testing_1.inject([event_service_1.EventService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event.service.spec.js.map