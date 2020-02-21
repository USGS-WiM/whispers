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
var material_1 = require("@angular/material");
var core_2 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var event_service_1 = require("@services/event.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var router_1 = require("@angular/router");
var user_events_datasource_1 = require("@app/user-events/user-events.datasource");
var results_count_service_1 = require("@services/results-count.service");
var UserEventsComponent = /** @class */ (function () {
    function UserEventsComponent(eventService, resultsCountService, router, route) {
        var _this = this;
        this.eventService = eventService;
        this.resultsCountService = resultsCountService;
        this.router = router;
        this.route = route;
        this.orderParams = '';
        this.displayedColumns = [
            'id',
            'event_type',
            'affected_count',
            'start_date',
            'end_date',
            'locations',
            'species',
            'eventdiagnoses',
            'permission_source'
        ];
        resultsCountService.userEventsResultsCount.subscribe(function (count) {
            _this.eventCount = count;
        });
    }
    UserEventsComponent.prototype.ngOnInit = function () {
        this.dataSource = new user_events_datasource_1.UserEventsDataSource(this.eventService);
        this.dataSource.loadEvents('', 1, 5);
    };
    UserEventsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.tap(function () { return _this.loadEventsPage(); }))
            .subscribe();
        // this.paginator.page
        //   .pipe(
        //     tap(() => this.loadEventsPage())
        //   )
        //   .subscribe();
    };
    UserEventsComponent.prototype.eventIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip; return string; };
    UserEventsComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    UserEventsComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    UserEventsComponent.prototype.eventStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventStartDateTooltip; return string; };
    UserEventsComponent.prototype.eventEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventEndDateTooltip; return string; };
    UserEventsComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    UserEventsComponent.prototype.locationsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationsTooltip; return string; };
    UserEventsComponent.prototype.generalTableSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.generalTableSpeciesTooltip; return string; };
    UserEventsComponent.prototype.permissionSourceTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.permissionSourceTooltip; return string; };
    UserEventsComponent.prototype.loadEventsPage = function () {
        this.orderParams = this.sort.active;
        if (this.sort.direction === 'desc') {
            this.orderParams = '-' + this.sort.active;
        }
        this.dataSource.loadEvents(this.orderParams, this.paginator.pageIndex + 1, this.paginator.pageSize);
    };
    UserEventsComponent.prototype.selectEvent = function (event) {
        this.router.navigate(["../event/" + event.id], { relativeTo: this.route });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], UserEventsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], UserEventsComponent.prototype, "sort", void 0);
    UserEventsComponent = __decorate([
        core_1.Component({
            selector: 'app-user-events',
            templateUrl: './user-events.component.html',
            styleUrls: ['./user-events.component.scss']
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [event_service_1.EventService,
            results_count_service_1.ResultsCountService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], UserEventsComponent);
    return UserEventsComponent;
}());
exports.UserEventsComponent = UserEventsComponent;
//# sourceMappingURL=user-events.component.js.map