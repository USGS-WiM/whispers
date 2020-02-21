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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms/");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var diagnostic_info_component_1 = require("@app/diagnostic-info/diagnostic-info.component");
var data_updated_service_1 = require("@app/services/data-updated.service");
var service_request_service_1 = require("@services/service-request.service");
var app_settings_1 = require("@app/app.settings");
var app_field_help_text_1 = require("@app/app.field-help-text");
var AddServiceRequestComponent = /** @class */ (function () {
    function AddServiceRequestComponent(formBuilder, dialog, addServiceRequestDialogRef, serviceRequestService, dataUpdatedService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.addServiceRequestDialogRef = addServiceRequestDialogRef;
        this.serviceRequestService = serviceRequestService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.buildServiceRequestForm();
    }
    AddServiceRequestComponent.prototype.buildServiceRequestForm = function () {
        this.serviceRequestForm = this.formBuilder.group({
            id: null,
            event: null,
            request_type: null,
            request_response: null,
            new_comments: this.formBuilder.array([])
        });
    };
    AddServiceRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commentTypes = this.data.comment_types;
        var _loop_1 = function (type) {
            for (var _i = 0, _a = this_1.commentTypes; _i < _a.length; _i++) {
                var commentType = _a[_i];
                if (commentType.id === type.id) {
                    this_1.commentTypes = this_1.commentTypes.filter(function (commenttype) { return commenttype.id !== type.id; });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = app_settings_1.APP_SETTINGS.SPECIAL_COMMENT_TYPES; _i < _a.length; _i++) {
            var type = _a[_i];
            _loop_1(type);
        }
        this.serviceRequestForm.get('event').setValue(this.data.event_id);
        if (this.data.action === 'respond') {
            this.serviceRequestForm.patchValue({
                id: this.data.servicerequest.id,
                event: this.data.event_id,
                request_response: this.data.servicerequest.request_response,
            });
            this.serviceRequestService.getServiceRequestResponses()
                .subscribe(function (serviceRequestResponses) {
                _this.serviceRequestResponses = serviceRequestResponses;
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    AddServiceRequestComponent.prototype.openDiagnosticInfoDialog = function () {
        this.diagnosticInfoDialogRef = this.dialog.open(diagnostic_info_component_1.DiagnosticInfoComponent, {});
    };
    AddServiceRequestComponent.prototype.addComment = function () {
        var control = this.serviceRequestForm.get('new_comments');
        control.push(this.initComment());
    };
    AddServiceRequestComponent.prototype.initComment = function () {
        return this.formBuilder.group({
            comment: '',
            comment_type: 10
        });
    };
    AddServiceRequestComponent.prototype.getComments = function (form) {
        return form.controls.new_comments.controls;
    };
    AddServiceRequestComponent.prototype.removeComment = function (commentIndex) {
        var control = this.serviceRequestForm.get('new_comments');
        control.removeAt(commentIndex);
    };
    AddServiceRequestComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    // hover text
    AddServiceRequestComponent.prototype.serviceRequestFullTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestFullTooltip; return string; };
    AddServiceRequestComponent.prototype.serviceRequestCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestCommentTooltip; return string; };
    AddServiceRequestComponent.prototype.nwhcCarcassSubApprovalTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.nwhcCarcassSubApprovalTooltip; return string; };
    AddServiceRequestComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        if (this.data.action === 'add') {
            // remove the request_response field entirely if this is a new request ('add') so that value gets assigned default Pending
            delete formValue.request_response;
            // remove the id field entirely if this is a new request ('add')
            delete formValue.id;
            this.serviceRequestService.create(formValue)
                .subscribe(function (serviceRequest) {
                _this.submitLoading = false;
                _this.openSnackBar('Service request successfully submitted', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.addServiceRequestDialogRef.close();
                gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Service Request Submitted' });
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Service request not submitted. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.action === 'respond') {
            delete formValue.request_type;
            delete formValue.new_comments;
            this.serviceRequestService.update(formValue)
                .subscribe(function (serviceRequest) {
                _this.submitLoading = false;
                _this.openSnackBar('Service request response successfully saved', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.addServiceRequestDialogRef.close();
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Service request response not submitted. Error message: ' + error, 'OK', 8000);
            });
        }
    };
    AddServiceRequestComponent = __decorate([
        core_1.Component({
            selector: 'app-add-service-request',
            templateUrl: './add-service-request.component.html',
            styleUrls: ['./add-service-request.component.scss']
        }),
        __param(6, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            material_1.MatDialogRef,
            service_request_service_1.ServiceRequestService,
            data_updated_service_1.DataUpdatedService,
            material_2.MatSnackBar, Object])
    ], AddServiceRequestComponent);
    return AddServiceRequestComponent;
}());
exports.AddServiceRequestComponent = AddServiceRequestComponent;
//# sourceMappingURL=add-service-request.component.js.map