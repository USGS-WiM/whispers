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
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var collections_1 = require("@angular/cdk/collections");
var material_2 = require("@angular/material");
var event_service_1 = require("@services/event.service");
var router_1 = require("@angular/router");
var search_dialog_component_1 = require("@search-dialog/search-dialog.component");
var search_dialog_service_1 = require("@app/search-dialog/search-dialog.service");
var app_settings_1 = require("@app/app.settings");
var app_field_help_text_1 = require("@app/app.field-help-text");
var events_datasource_1 = require("@app/events/events.datasource");
var results_count_service_1 = require("@services/results-count.service");
var confirm_component_1 = require("@confirm/confirm.component");
var event_group_management_component_1 = require("@app/event-group-management/event-group-management.component");
var event_group_management_service_1 = require("@services/event-group-management.service");
var current_user_service_1 = require("@services/current-user.service");
var EventsComponent = /** @class */ (function () {
    function EventsComponent(snackBar, eventService, resultsCountService, searchDialogService, currentUserService, eventGroupManagementService, router, route, dialog) {
        var _this = this;
        this.snackBar = snackBar;
        this.eventService = eventService;
        this.resultsCountService = resultsCountService;
        this.searchDialogService = searchDialogService;
        this.currentUserService = currentUserService;
        this.eventGroupManagementService = eventGroupManagementService;
        this.router = router;
        this.route = route;
        this.dialog = dialog;
        this.resultsLoading = false;
        this.selectedEventGroup = null;
        this.orderParams = '';
        this.initialSelection = [];
        this.allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.docsOnThisPage = [];
        this.displayedColumns = [
            'select',
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
        // tslint:disable-next-line:max-line-length
        this.currentSearchQuery = sessionStorage.getItem('currentSearch') ? JSON.parse(sessionStorage.getItem('currentSearch')) : app_settings_1.APP_SETTINGS.DEFAULT_SEARCH_QUERY;
        this.currentDisplayQuery = sessionStorage.getItem('currentDisplayQuery') ? JSON.parse(sessionStorage.getItem('currentDisplayQuery')) : app_settings_1.APP_SETTINGS.DEFAULT_DISPLAY_QUERY;
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        resultsCountService.eventQueryResultsCount.subscribe(function (count) {
            _this.eventCount = count;
        });
        this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(function (searchQuery) {
            // this.resultsLoading = true;
            searchQuery.and_params = [];
            if (searchQuery.diagnosis_type_includes_all === true) {
                searchQuery.and_params.push('diagnosis_type');
            }
            if (searchQuery.diagnosis_includes_all === true) {
                searchQuery.and_params.push('diagnosis_type');
            }
            if (searchQuery.species_includes_all === true) {
                searchQuery.and_params.push('species');
            }
            if (searchQuery.administrative_level_one_includes_all === true) {
                searchQuery.and_params.push('administrative_level_one');
            }
            if (searchQuery.administrative_level_two_includes_all === true) {
                searchQuery.and_params.push('administrative_level_two');
            }
            _this.currentSearchQuery = searchQuery;
            _this.dataSource.queryEvents(searchQuery, '', 1, 5);
            if (_this.searchDialogRef) {
                _this.searchDialogRef.close();
            }
        });
        this.selectedEventGroupSubscription = this.eventGroupManagementService.getSelectedEventGroup().subscribe(function (selectedEventGroup) {
            _this.selectedEventGroup = selectedEventGroup;
        });
        this.searchQuerySubscription = this.searchDialogService.getDisplayQuery().subscribe(function (displayQuery) {
            _this.currentDisplayQuery = displayQuery;
            console.log('New display query: ' + _this.currentDisplayQuery);
            console.log('Current Display Query adminlevelOne length: ' + _this.currentDisplayQuery.administrative_level_one.length);
            console.log(' Current Display Query Event types: ' + _this.currentDisplayQuery.event_type);
        });
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.currentSearchQuery.and_params = [];
        if (this.currentSearchQuery.diagnosis_type_includes_all === true) {
            this.currentSearchQuery.and_params.push('diagnosis_type');
        }
        if (this.currentSearchQuery.diagnosis_includes_all === true) {
            this.currentSearchQuery.and_params.push('diagnosis_type');
        }
        if (this.currentSearchQuery.species_includes_all === true) {
            this.currentSearchQuery.and_params.push('species');
        }
        if (this.currentSearchQuery.administrative_level_one_includes_all === true) {
            this.currentSearchQuery.and_params.push('administrative_level_one');
        }
        if (this.currentSearchQuery.administrative_level_two_includes_all === true) {
            this.currentSearchQuery.and_params.push('administrative_level_two');
        }
        // replace this direct call to the service with a call of the query function of the dataSource, allow it to do the actual query
        this.dataSource = new events_datasource_1.EventsDataSource(this.eventService);
        this.dataSource.queryEvents(this.currentSearchQuery, '-start_date', 1, 5);
    };
    EventsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.tap(function () {
            _this.docsOnThisPage.length = 0;
            _this.loadEventsPage();
        }))
            .subscribe();
    };
    EventsComponent.prototype.eventIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip; return string; };
    EventsComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    EventsComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    EventsComponent.prototype.eventStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventStartDateTooltip; return string; };
    EventsComponent.prototype.eventEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventEndDateTooltip; return string; };
    EventsComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    EventsComponent.prototype.locationsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationsTooltip; return string; };
    EventsComponent.prototype.generalTableSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.generalTableSpeciesTooltip; return string; };
    EventsComponent.prototype.permissionSourceTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.permissionSourceTooltip; return string; };
    EventsComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EventsComponent.prototype.openEventGroupManagementDialog = function (selectedAction) {
        var _this = this;
        this.eventGroupManagementDialogRef = this.dialog.open(event_group_management_component_1.EventGroupManagementComponent, {
            disableClose: true,
            data: {
                action: selectedAction,
                selectedEvents: this.selection.selected,
                eventGroup: this.selectedEventGroup
            }
        });
        this.eventGroupManagementDialogRef.afterClosed()
            .subscribe(function () {
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventsComponent.prototype.loadEventsPage = function () {
        this.orderParams = this.sort.active;
        if (this.sort.direction === 'desc') {
            this.orderParams = '-' + this.sort.active;
        }
        this.dataSource.queryEvents(this.currentSearchQuery, this.orderParams, this.paginator.pageIndex + 1, this.paginator.pageSize);
    };
    EventsComponent.prototype.selectEvent = function (event) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Open event ' + event.id,
                // tslint:disable-next-line:max-line-length
                message: 'Navigate to event details page for Event ' + event.id + '?',
                confirmButtonText: 'GO',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.navigateToEvent(event);
            }
        });
    };
    EventsComponent.prototype.showEventGroupSelectionInfo = function () {
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Event Group Selection Help',
                message: 'You can update your Event Group selection on the Event Groups tab.',
                confirmButtonText: 'OK',
                messageIcon: 'info',
                titleIcon: 'info',
                showCancelButton: false
            }
        });
    };
    EventsComponent.prototype.navigateToEvent = function (event) {
        this.router.navigate(["../event/" + event.id], { relativeTo: this.route });
    };
    EventsComponent.prototype.openSearchDialog = function () {
        this.searchDialogRef = this.dialog.open(search_dialog_component_1.SearchDialogComponent, {
            minWidth: '60%',
            data: {
                query: this.currentDisplayQuery
            }
        });
    };
    EventsComponent.prototype.isAllSelected = function () {
        var numSelected = this.docsOnThisPage.length;
        var numRows = this.dataSource.eventList.length;
        return (numSelected === numRows);
    };
    EventsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            (this.docsOnThisPage.length = 0,
                this.dataSource.eventList.forEach(function (row) { return _this.selection.deselect(row.id); })) :
            this.dataSource.eventList.forEach(function (row) {
                _this.selection.select(row.id);
                _this.docsOnThisPage.push(row);
            });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EventsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EventsComponent.prototype, "sort", void 0);
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'app-event-table',
            templateUrl: './events.component.html',
            styleUrls: ['./events.component.scss']
        }),
        __metadata("design:paramtypes", [material_2.MatSnackBar,
            event_service_1.EventService,
            results_count_service_1.ResultsCountService,
            search_dialog_service_1.SearchDialogService,
            current_user_service_1.CurrentUserService,
            event_group_management_service_1.EventGroupManagementService,
            router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map