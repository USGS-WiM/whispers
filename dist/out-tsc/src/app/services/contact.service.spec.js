"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var contact_service_1 = require("./contact.service");
describe('ContactService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [contact_service_1.ContactService]
        });
    });
    it('should be created', testing_1.inject([contact_service_1.ContactService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=contact.service.spec.js.map