"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var county_service_1 = require("./county.service");
describe('CountyService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [county_service_1.CountyService]
        });
    });
    it('should be created', testing_1.inject([county_service_1.CountyService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=county.service.spec.js.map