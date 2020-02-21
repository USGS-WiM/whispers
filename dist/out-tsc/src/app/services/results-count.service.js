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
var ResultsCountService = /** @class */ (function () {
    function ResultsCountService() {
        this.userEventsResultsCountSource = new rxjs_1.BehaviorSubject('None');
        this.userEventsResultsCount = this.userEventsResultsCountSource.asObservable();
        this.eventQueryResultsCountSource = new rxjs_1.BehaviorSubject('None');
        this.eventQueryResultsCount = this.eventQueryResultsCountSource.asObservable();
        this.eventGroupResultsCountSource = new rxjs_1.BehaviorSubject('None');
        this.eventGroupResultsCount = this.eventGroupResultsCountSource.asObservable();
        this.circlesResultsCountSource = new rxjs_1.BehaviorSubject('None');
        this.circlesResultsCount = this.circlesResultsCountSource.asObservable();
    }
    ResultsCountService.prototype.updateUserEventsResultsCount = function (count) {
        this.userEventsResultsCountSource.next(count);
    };
    ResultsCountService.prototype.updateEventQueryResultsCount = function (count) {
        this.eventQueryResultsCountSource.next(count);
    };
    ResultsCountService.prototype.updateEventGroupResultsCount = function (count) {
        this.eventGroupResultsCountSource.next(count);
    };
    ResultsCountService.prototype.updateCirclesResultsCount = function (count) {
        this.circlesResultsCountSource.next(count);
    };
    ResultsCountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ResultsCountService);
    return ResultsCountService;
}());
exports.ResultsCountService = ResultsCountService;
//# sourceMappingURL=results-count.service.js.map