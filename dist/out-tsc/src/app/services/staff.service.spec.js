"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var staff_service_1 = require("./staff.service");
describe('StaffService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [staff_service_1.StaffService]
        });
    });
    it('should be created', testing_1.inject([staff_service_1.StaffService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=staff.service.spec.js.map