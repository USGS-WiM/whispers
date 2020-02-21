"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CirclesDataSource = /** @class */ (function () {
    function CirclesDataSource(circleService) {
        this.circleService = circleService;
        this.circlesSubject = new rxjs_1.BehaviorSubject([]);
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.circlesList = [];
    }
    CirclesDataSource.prototype.loadCircles = function (orderParams, pageNumber, pageSize) {
        var _this = this;
        if (pageNumber === void 0) { pageNumber = 1; }
        if (pageSize === void 0) { pageSize = 20; }
        this.loadingSubject.next(true);
        this.circleService.getCircles(orderParams, pageNumber, pageSize).pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), operators_1.finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (results) {
            _this.circlesSubject.next(results);
            _this.circlesList = results;
        });
    };
    CirclesDataSource.prototype.connect = function (collectionViewer) {
        console.log('Connecting data source');
        return this.circlesSubject.asObservable();
    };
    CirclesDataSource.prototype.disconnect = function (collectionViewer) {
        this.circlesSubject.complete();
        this.loadingSubject.complete();
    };
    return CirclesDataSource;
}());
exports.CirclesDataSource = CirclesDataSource;
//# sourceMappingURL=circles.datasource.js.map