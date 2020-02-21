"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var create_contact_service_1 = require("./create-contact.service");
describe('CreateContactService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [create_contact_service_1.CreateContactService]
        });
    });
    it('should be created', testing_1.inject([create_contact_service_1.CreateContactService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=create-contact.service.spec.js.map