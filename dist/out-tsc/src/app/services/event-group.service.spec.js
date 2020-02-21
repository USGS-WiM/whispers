"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var event_group_service_1 = require("./event-group.service");
describe('EventGroupService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [event_group_service_1.EventGroupService]
        });
    });
    it('should be created', testing_1.inject([event_group_service_1.EventGroupService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=event-group.service.spec.js.map