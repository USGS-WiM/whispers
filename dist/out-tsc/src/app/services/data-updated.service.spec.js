"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var data_updated_service_1 = require("./data-updated.service");
describe('DataUpdatedService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [data_updated_service_1.DataUpdatedService]
        });
    });
    it('should be created', testing_1.inject([data_updated_service_1.DataUpdatedService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=data-updated.service.spec.js.map