"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var search_dialog_service_1 = require("./search-dialog.service");
describe('SearchDialogService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [search_dialog_service_1.SearchDialogService]
        });
    });
    it('should be created', testing_1.inject([search_dialog_service_1.SearchDialogService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=search-dialog.service.spec.js.map