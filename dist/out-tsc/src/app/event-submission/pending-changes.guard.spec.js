"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var pending_changes_guard_1 = require("./pending-changes.guard");
describe('PendingChangesGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [pending_changes_guard_1.PendingChangesGuard]
        });
    });
    it('should ...', testing_1.inject([pending_changes_guard_1.PendingChangesGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=pending-changes.guard.spec.js.map