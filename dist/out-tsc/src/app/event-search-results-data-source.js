"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var material_1 = require("@angular/material");
var EventSearchResultsDataSource = /** @class */ (function () {
    function EventSearchResultsDataSource(eventService) {
        this.eventService = eventService;
        // paginator: MatPaginator;
        // sort: MatSort;
        this.resultsSubject = new rxjs_1.BehaviorSubject([]);
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    EventSearchResultsDataSource.prototype.connect = function (collectionViewer) {
        return this.resultsSubject.asObservable();
    };
    EventSearchResultsDataSource.prototype.disconnect = function (collectionViewer) {
        this.resultsSubject.complete();
        this.loadingSubject.complete();
    };
    EventSearchResultsDataSource.prototype.loadResults = function (eventQuery) {
        var _this = this;
        this.loadingSubject.next(true);
        this.eventService.queryEvents(eventQuery)
            .pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), operators_1.finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (eventSummaries) {
            _this.resultsSubject.next(eventSummaries);
        }, function (error) {
            // this.errorMessage = <any>error;
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EventSearchResultsDataSource.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EventSearchResultsDataSource.prototype, "sort", void 0);
    return EventSearchResultsDataSource;
}());
exports.EventSearchResultsDataSource = EventSearchResultsDataSource;
//# sourceMappingURL=event-search-results-data-source.js.map