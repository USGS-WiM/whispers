"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var age_bias_service_1 = require("./age-bias.service");
describe('AgeBiasService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [age_bias_service_1.AgeBiasService]
        });
    });
    it('should be created', testing_1.inject([age_bias_service_1.AgeBiasService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=age-bias.service.spec.js.map