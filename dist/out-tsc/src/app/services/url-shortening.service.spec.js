"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var url_shortening_service_1 = require("./url-shortening.service");
describe('UrlShorteningService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [url_shortening_service_1.UrlShorteningService]
        });
    });
    it('should be created', testing_1.inject([url_shortening_service_1.UrlShorteningService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=url-shortening.service.spec.js.map