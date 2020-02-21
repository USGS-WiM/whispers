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
var confirm_component_1 = require("@app/confirm/confirm.component");
var collections_1 = require("@angular/cdk/collections");
var material_2 = require("@angular/material");
var router_1 = require("@angular/router");
var results_count_service_1 = require("@services/results-count.service");
var circle_management_component_1 = require("@app/circle-management/circle-management.component");
var circles_datasource_1 = require("@app/circles/circles.datasource");
var circle_service_1 = require("@services/circle.service");
var circle_management_service_1 = require("@app/services/circle-management.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var CirclesComponent = /** @class */ (function () {
    function CirclesComponent(circleService, resultsCountService, circleManagementService, router, route, dialog, snackBar) {
        var _this = this;
        this.circleService = circleService;
        this.resultsCountService = resultsCountService;
        this.circleManagementService = circleManagementService;
        this.router = router;
        this.route = route;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.errorMessage = '';
        this.orderParams = '';
        this.displayedColumns = [
            'select',
            // 'id',
            'name',
            'description',
            'users'
        ];
        this.initialSelection = [];
        this.allowMultiSelect = false;
        this.selection = new collections_1.SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.docsOnThisPage = [];
        this.resultsCountService.circlesResultsCount.subscribe(function (count) {
            _this.circlesCount = count;
        });
    }
    CirclesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new circles_datasource_1.CirclesDataSource(this.circleService);
        this.dataSource.loadCircles('', 1, 10);
        // the following block triggers the reloading of the circles after a change is made to a circle
        this.circlesSubscription = this.circleManagementService.getCircleReload().subscribe(function (response) {
            _this.dataSource.loadCircles('', 1, 20);
        });
    };
    CirclesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.tap(function () { return _this.loadCirclesPage(); }))
            .subscribe();
    };
    CirclesComponent.prototype.loadCirclesPage = function () {
        this.orderParams = this.sort.active;
        if (this.sort.direction === 'desc') {
            this.orderParams = '-' + this.sort.active;
        }
        this.dataSource.loadCircles(this.orderParams, this.paginator.pageIndex + 1, this.paginator.pageSize);
    };
    CirclesComponent.prototype.refreshTable = function () {
        this.dataSource.loadCircles('', 1, 20);
    };
    CirclesComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    CirclesComponent.prototype.openCircleManagementDialog = function (selectedAction) {
        var _this = this;
        this.circleManagementDialogRef = this.dialog.open(circle_management_component_1.CircleManagementComponent, {
            disableClose: true,
            data: {
                action: selectedAction,
                circle: this.selection.selected[0]
            }
        });
        this.circleManagementDialogRef.afterClosed()
            .subscribe(function () {
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    CirclesComponent.prototype.deleteCircle = function (id) {
        var _this = this;
        this.circleService.delete(id)
            .subscribe(function () {
            _this.openSnackBar('Circle successfully deleted', 'OK', 5000);
            _this.refreshTable();
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Circle not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    CirclesComponent.prototype.openCircleDeleteConfirm = function (circle) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Circle Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this Circle?\nThis action cannot be undone.',
                confirmButtonText: 'Yes, Delete Circle',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteCircle(circle.id);
            }
        });
    };
    CirclesComponent.prototype.isAllSelected = function () {
        var numSelected = this.docsOnThisPage.length;
        var numRows = this.dataSource.circlesList.length;
        return (numSelected === numRows);
    };
    CirclesComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            (this.docsOnThisPage.length = 0,
                this.dataSource.circlesList.forEach(function (row) { return _this.selection.deselect(row.id); })) :
            this.dataSource.circlesList.forEach(function (row) {
                _this.selection.select(row.id);
                _this.docsOnThisPage.push(row);
            });
    };
    // hover text
    CirclesComponent.prototype.circleNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.circleNameTooltip; return string; };
    CirclesComponent.prototype.circleDiscriptionTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.circleDiscriptionTooltip; return string; };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], CirclesComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], CirclesComponent.prototype, "sort", void 0);
    CirclesComponent = __decorate([
        core_1.Component({
            selector: 'app-circles',
            templateUrl: './circles.component.html',
            styleUrls: ['./circles.component.scss']
        }),
        __metadata("design:paramtypes", [circle_service_1.CircleService,
            results_count_service_1.ResultsCountService,
            circle_management_service_1.CircleManagementService,
            router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog,
            material_2.MatSnackBar])
    ], CirclesComponent);
    return CirclesComponent;
}());
exports.CirclesComponent = CirclesComponent;
//# sourceMappingURL=circles.component.js.map