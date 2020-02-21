"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sex_bias_service_1 = require("./sex-bias.service");
describe('SexBiasService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [sex_bias_service_1.SexBiasService]
        });
    });
    it('should be created', testing_1.inject([sex_bias_service_1.SexBiasService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=sex-bias.service.spec.js.map