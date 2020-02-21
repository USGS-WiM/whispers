"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var land_ownership_service_1 = require("./land-ownership.service");
describe('LandOwnershipService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [land_ownership_service_1.LandOwnershipService]
        });
    });
    it('should be created', testing_1.inject([land_ownership_service_1.LandOwnershipService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=land-ownership.service.spec.js.map