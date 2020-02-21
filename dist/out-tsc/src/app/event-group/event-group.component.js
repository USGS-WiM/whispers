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
var app_field_help_text_1 = require("@app/app.field-help-text");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var confirm_component_1 = require("@app/confirm/confirm.component");
var collections_1 = require("@angular/cdk/collections");
var material_2 = require("@angular/material");
var router_1 = require("@angular/router");
var event_groups_datasource_1 = require("@app/event-group/event-groups.datasource");
var results_count_service_1 = require("@services/results-count.service");
var event_group_service_1 = require("@services/event-group.service");
var event_group_management_component_1 = require("@app/event-group-management/event-group-management.component");
var event_group_management_service_1 = require("@services/event-group-management.service");
var EventGroupComponent = /** @class */ (function () {
    function EventGroupComponent(eventGroupService, resultsCountService, eventGroupManagementService, router, route, dialog, snackBar) {
        var _this = this;
        this.eventGroupService = eventGroupService;
        this.resultsCountService = resultsCountService;
        this.eventGroupManagementService = eventGroupManagementService;
        this.router = router;
        this.route = route;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.errorMessage = '';
        this.orderParams = '';
        this.displayedColumns = [
            'select',
            'id',
            'category',
            'comment',
            'events'
        ];
        this.initialSelection = [];
        this.allowMultiSelect = false;
        this.selection = new collections_1.SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.docsOnThisPage = [];
        this.resultsCountService.eventGroupResultsCount.subscribe(function (count) {
            _this.eventGroupCount = count;
            // this.refreshTable();
        });
    }
    EventGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new event_groups_datasource_1.EventGroupsDataSource(this.eventGroupService);
        this.dataSource.loadEventGroups('', 1, 20);
        // the following block triggers the reloading of the eventGroups after a change is made to an event group
        this.eventGroupSubscription = this.eventGroupManagementService.getEventGroupReload().subscribe(function (response) {
            _this.dataSource.loadEventGroups('', 1, 20);
        });
        this.eventGroupService.getEventGroupCategories()
            .subscribe(function (eventGroupCategories) {
            _this.eventGroupCategories = eventGroupCategories;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventGroupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.tap(function () { return _this.loadEventGroupsPage(); }))
            .subscribe();
    };
    EventGroupComponent.prototype.loadEventGroupsPage = function () {
        this.orderParams = this.sort.active;
        if (this.sort.direction === 'desc') {
            this.orderParams = '-' + this.sort.active;
        }
        this.dataSource.loadEventGroups(this.orderParams, this.paginator.pageIndex + 1, this.paginator.pageSize);
    };
    EventGroupComponent.prototype.refreshTable = function () {
        this.dataSource.loadEventGroups('', 1, 20);
    };
    EventGroupComponent.prototype.selectEvent = function (event) {
        this.router.navigate(["../event/" + event.id], { relativeTo: this.route });
    };
    EventGroupComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EventGroupComponent.prototype.updateSelectedEventGroup = function (eventGroup) {
        if (eventGroup === undefined || eventGroup === null) {
            this.eventGroupManagementService.setSelectedEventGroup(null);
        }
        else {
            this.eventGroupManagementService.setSelectedEventGroup(eventGroup);
        }
    };
    EventGroupComponent.prototype.openEventGroupManagementDialog = function (selectedAction) {
        var _this = this;
        this.eventGroupManagementDialogRef = this.dialog.open(event_group_management_component_1.EventGroupManagementComponent, {
            disableClose: true,
            data: {
                action: selectedAction,
                eventGroup: this.selection.selected[0]
            }
        });
        this.eventGroupManagementDialogRef.afterClosed()
            .subscribe(function () {
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventGroupComponent.prototype.deleteEventGroup = function (id) {
        var _this = this;
        this.eventGroupService.delete(id)
            .subscribe(function () {
            _this.openSnackBar('Event Group successfully deleted', 'OK', 5000);
            // clear selection
            _this.selection.deselect(id);
            _this.updateSelectedEventGroup(null);
            _this.refreshTable();
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Event Group not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventGroupComponent.prototype.openEventGroupDeleteConfirm = function (eventGroup) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Event Group Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this Event Group?\nThis action cannot be undone.',
                confirmButtonText: 'Yes, Delete Event Group',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventGroup(eventGroup.id);
            }
        });
    };
    EventGroupComponent.prototype.isAllSelected = function () {
        var numSelected = this.docsOnThisPage.length;
        var numRows = this.dataSource.eventGroupList.length;
        return (numSelected === numRows);
    };
    EventGroupComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            (this.docsOnThisPage.length = 0,
                this.dataSource.eventGroupList.forEach(function (row) { return _this.selection.deselect(row.id); })) :
            this.dataSource.eventGroupList.forEach(function (row) {
                _this.selection.select(row.id);
                _this.docsOnThisPage.push(row);
            });
    };
    EventGroupComponent.prototype.eventGroupIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventGroupIDTooltip; return string; };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], EventGroupComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], EventGroupComponent.prototype, "sort", void 0);
    EventGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-event-group',
            templateUrl: './event-group.component.html',
            styleUrls: ['./event-group.component.scss']
        }),
        __metadata("design:paramtypes", [event_group_service_1.EventGroupService,
            results_count_service_1.ResultsCountService,
            event_group_management_service_1.EventGroupManagementService,
            router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog,
            material_2.MatSnackBar])
    ], EventGroupComponent);
    return EventGroupComponent;
}());
exports.EventGroupComponent = EventGroupComponent;
//# sourceMappingURL=event-group.component.js.map