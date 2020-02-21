"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var country_service_1 = require("./country.service");
describe('CountryService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [country_service_1.CountryService]
        });
    });
    it('should be created', testing_1.inject([country_service_1.CountryService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=country.service.spec.js.map