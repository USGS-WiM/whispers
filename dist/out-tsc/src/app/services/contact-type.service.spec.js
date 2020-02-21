"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var contact_type_service_1 = require("./contact-type.service");
describe('ContactTypeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [contact_type_service_1.ContactTypeService]
        });
    });
    it('should be created', testing_1.inject([contact_type_service_1.ContactTypeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=contact-type.service.spec.js.map