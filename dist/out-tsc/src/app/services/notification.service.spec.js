"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var notification_service_1 = require("./notification.service");
describe('NotificationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [notification_service_1.NotificationService]
        });
    });
    it('should be created', testing_1.inject([notification_service_1.NotificationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=notification.service.spec.js.map