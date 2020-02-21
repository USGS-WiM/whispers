"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_type_service_1 = require("./event-type.service");
describe('EventTypeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_type_service_1.EventTypeService]
        });
    });
    it('should be created', testing_1.inject([event_type_service_1.EventTypeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-type.service.spec.js.map