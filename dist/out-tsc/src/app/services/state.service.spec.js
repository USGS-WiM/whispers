"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var state_service_1 = require("./state.service");
describe('StateService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [state_service_1.StateService]
        });
    });
    it('should be created', testing_1.inject([state_service_1.StateService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=state.service.spec.js.map