"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var cue_service_1 = require("./cue.service");
describe('CueService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [cue_service_1.CueService]
        });
    });
    it('should be created', testing_1.inject([cue_service_1.CueService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=cue.service.spec.js.map