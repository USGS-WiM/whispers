"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var location_species_service_1 = require("./location-species.service");
describe('LocationSpeciesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [location_species_service_1.LocationSpeciesService]
        });
    });
    it('should be created', testing_1.inject([location_species_service_1.LocationSpeciesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=location-species.service.spec.js.map