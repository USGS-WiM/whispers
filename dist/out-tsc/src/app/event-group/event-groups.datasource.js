"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var EventGroupsDataSource = /** @class */ (function () {
    function EventGroupsDataSource(eventService) {
        this.eventService = eventService;
        this.eventGroupsSubject = new rxjs_1.BehaviorSubject([]);
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.eventGroupList = [];
    }
    EventGroupsDataSource.prototype.loadEventGroups = function (orderParams, pageNumber, pageSize) {
        var _this = this;
        if (pageNumber === void 0) { pageNumber = 1; }
        if (pageSize === void 0) { pageSize = 20; }
        this.loadingSubject.next(true);
        this.eventService.getEventGroups(orderParams, pageNumber, pageSize).pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), operators_1.finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (results) {
            _this.eventGroupsSubject.next(results);
            _this.eventGroupList = results;
        });
    };
    EventGroupsDataSource.prototype.connect = function (collectionViewer) {
        console.log('Connecting data source');
        return this.eventGroupsSubject.asObservable();
    };
    EventGroupsDataSource.prototype.disconnect = function (collectionViewer) {
        this.eventGroupsSubject.complete();
        this.loadingSubject.complete();
    };
    return EventGroupsDataSource;
}());
exports.EventGroupsDataSource = EventGroupsDataSource;
//# sourceMappingURL=event-groups.datasource.js.map