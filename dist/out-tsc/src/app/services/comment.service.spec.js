"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var comment_service_1 = require("./comment.service");
describe('CommentService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [comment_service_1.CommentService]
        });
    });
    it('should be created', testing_1.inject([comment_service_1.CommentService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=comment.service.spec.js.map