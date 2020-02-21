"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var species_service_1 = require("./species.service");
describe('SpeciesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [species_service_1.SpeciesService]
        });
    });
    it('should be created', testing_1.inject([species_service_1.SpeciesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=species.service.spec.js.map