"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var comment_type_service_1 = require("./comment-type.service");
describe('CommentTypeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [comment_type_service_1.CommentTypeService]
        });
    });
    it('should be created', testing_1.inject([comment_type_service_1.CommentTypeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=comment-type.service.spec.js.map