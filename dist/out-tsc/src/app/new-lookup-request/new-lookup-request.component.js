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
var app_field_help_text_1 = require("@app/app.field-help-text");
var species_service_1 = require("@services/species.service");
var organization_service_1 = require("@services/organization.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
var NewLookupRequestComponent = /** @class */ (function () {
    function NewLookupRequestComponent(formBuilder, newLookupRequestDialogRef, snackBar, speciesService, organizationService, diagnosisService, data) {
        this.formBuilder = formBuilder;
        this.newLookupRequestDialogRef = newLookupRequestDialogRef;
        this.snackBar = snackBar;
        this.speciesService = speciesService;
        this.organizationService = organizationService;
        this.diagnosisService = diagnosisService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.buildNewLookupRequestForm();
    }
    NewLookupRequestComponent.prototype.buildNewLookupRequestForm = function () {
        this.newLookupRequestForm = this.formBuilder.group({
            item_type: null,
            request_comment: null
        });
    };
    NewLookupRequestComponent.prototype.ngOnInit = function () {
    };
    NewLookupRequestComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    NewLookupRequestComponent.prototype.itemTypeToRequestTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.itemTypeToRequestTooltip; return string; };
    NewLookupRequestComponent.prototype.newRequestDetailsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.newRequestDetailsTooltip; return string; };
    NewLookupRequestComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        // let request_url;
        switch (formValue.item_type) {
            case 'species':
                this.speciesService.requestNew(formValue.request_comment)
                    .subscribe(function (response) {
                    _this.openSnackBar('Species addition request sent', 'OK', 5000);
                    gtag('event', 'click', { 'event_category': 'User Dashboard', 'event_label': 'Species Addition Request Submitted' });
                }, function (error) {
                    _this.openSnackBar('Error. Species addition request not sent. Error message: ' + error, 'OK', 8000);
                    _this.errorMessage = error;
                });
                // request_url = APP_SETTINGS.SPECIES_URL + 'request_new';
                break;
            case 'organization':
                this.organizationService.requestNew(formValue.request_comment)
                    .subscribe(function (response) {
                    _this.openSnackBar('Organization addition request sent', 'OK', 5000);
                    gtag('event', 'click', { 'event_category': 'User Dashboard', 'event_label': 'Organization Addition Request Submitted' });
                }, function (error) {
                    _this.openSnackBar('Error. Organization addition request not sent. Error message: ' + error, 'OK', 8000);
                    _this.errorMessage = error;
                });
                // request_url = APP_SETTINGS.ORGANIZATIONS_URL + 'request_new';
                break;
            case 'diagnosis':
                this.diagnosisService.requestNew(formValue.request_comment)
                    .subscribe(function (response) {
                    _this.openSnackBar('Diagnosis addition request sent', 'OK', 5000);
                    gtag('event', 'click', { 'event_category': 'User Dashboard', 'event_label': 'Diagnosis Addition Request Submitted' });
                }, function (error) {
                    _this.openSnackBar('Error. Diagnosis addition request not sent. Error message: ' + error, 'OK', 8000);
                    _this.errorMessage = error;
                });
                // request_url = APP_SETTINGS.DIAGNOSES_URL + 'request_new';
                break;
        }
    };
    NewLookupRequestComponent = __decorate([
        core_1.Component({
            selector: 'app-new-lookup-request',
            templateUrl: './new-lookup-request.component.html',
            styleUrls: ['./new-lookup-request.component.scss']
        }),
        __param(6, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            material_3.MatSnackBar,
            species_service_1.SpeciesService,
            organization_service_1.OrganizationService,
            diagnosis_service_1.DiagnosisService, Object])
    ], NewLookupRequestComponent);
    return NewLookupRequestComponent;
}());
exports.NewLookupRequestComponent = NewLookupRequestComponent;
//# sourceMappingURL=new-lookup-request.component.js.map