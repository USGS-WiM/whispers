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
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms/");
var event_service_1 = require("@services/event.service");
var AlertCollaboratorsComponent = /** @class */ (function () {
    function AlertCollaboratorsComponent(formBuilder, route, eventService, snackBar, dialog) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.eventService = eventService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.errorMessage = '';
        this.resultsLoading = false;
        this.tableLoading = false;
        this.initialSelection = [];
        this.allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.submitLoading = false;
        this.displayedColumns = [
            'select',
            'user'
        ];
        this.buildAlertCollaboratorForm();
    }
    AlertCollaboratorsComponent.prototype.buildAlertCollaboratorForm = function () {
        this.alertCollaboratorForm = this.formBuilder.group({
            event: null,
            recipients: [],
            comment: ''
        });
    };
    AlertCollaboratorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableLoading = true;
        this.route.paramMap.subscribe(function (params) {
            _this.eventID = params.get('id');
            // Actual request to event details service, using id
            _this.eventService.getEventDetails(_this.eventID)
                .subscribe(function (eventdetails) {
                _this.eventData = eventdetails;
                _this.readCollaborators = _this.eventData.read_collaborators;
                _this.writeCollaborators = _this.eventData.write_collaborators;
                _this.dataSource = _this.readCollaborators.concat(_this.writeCollaborators);
                _this.dataSource = new material_1.MatTableDataSource(_this.dataSource);
                _this.dataSource.paginator = _this.paginator;
                // this.commentsDataSource.sort = this.sort;
                _this.tableLoading = false;
            }, function (error) {
                _this.tableLoading = false;
            });
        });
    };
    AlertCollaboratorsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        console.log(this.dataSource);
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    AlertCollaboratorsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    AlertCollaboratorsComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AlertCollaboratorsComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        formValue.event = this.eventID;
        // formValue.receipients needs to be initialized as an array
        formValue.recipients = [];
        // Note: the type of selection.selected is set to Number (despite being an object in this case)
        // so this extra dumy array (selectionArray) is needed to create a clean typed array that allows
        // for the Object property access in the next for loop.
        var selectionArray = [];
        for (var _i = 0, _a = this.selection.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            selectionArray.push(item);
        }
        for (var _b = 0, selectionArray_1 = selectionArray; _b < selectionArray_1.length; _b++) {
            var user = selectionArray_1[_b];
            formValue.recipients.push(user.id);
        }
        this.eventService.alertCollaborators(formValue)
            .subscribe(function (response) {
            _this.submitLoading = false;
            _this.openSnackBar('Alert successfully sent to event collaborators.', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Collaboration request response not submitted. Error message: ' + error, 'OK', 8000);
        });
        // update the formValue.recipients array with the selected table values. 
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], AlertCollaboratorsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], AlertCollaboratorsComponent.prototype, "sort", void 0);
    AlertCollaboratorsComponent = __decorate([
        core_1.Component({
            selector: 'app-alert-collaborators',
            templateUrl: './alert-collaborators.component.html',
            styleUrls: ['./alert-collaborators.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            event_service_1.EventService,
            material_2.MatSnackBar,
            material_1.MatDialog])
    ], AlertCollaboratorsComponent);
    return AlertCollaboratorsComponent;
}());
exports.AlertCollaboratorsComponent = AlertCollaboratorsComponent;
//# sourceMappingURL=alert-collaborators.component.js.map