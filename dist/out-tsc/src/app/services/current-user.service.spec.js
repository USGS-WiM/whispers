"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var current_user_service_1 = require("./current-user.service");
describe('CurrentUserService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [current_user_service_1.CurrentUserService]
        });
    });
    it('should be created', testing_1.inject([current_user_service_1.CurrentUserService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=current-user.service.spec.js.map