"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var circle_service_1 = require("./circle.service");
describe('CircleService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [circle_service_1.CircleService]
        });
    });
    it('should be created', testing_1.inject([circle_service_1.CircleService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=circle.service.spec.js.map