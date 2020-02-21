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
var app_field_help_text_1 = require("@app/app.field-help-text");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var diagnosis_service_1 = require("@services/diagnosis.service");
var event_diagnosis_service_1 = require("@services/event-diagnosis.service");
var AddEventDiagnosisComponent = /** @class */ (function () {
    function AddEventDiagnosisComponent(formBuilder, addEventDiagnosisDialogRef, diagnosisService, eventDiagnosisService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.addEventDiagnosisDialogRef = addEventDiagnosisDialogRef;
        this.diagnosisService = diagnosisService;
        this.eventDiagnosisService = eventDiagnosisService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.buildAddEventDiagnosisForm();
    }
    AddEventDiagnosisComponent.prototype.buildAddEventDiagnosisForm = function () {
        this.addEventDiagnosisForm = this.formBuilder.group({
            diagnosis: null
        });
    };
    AddEventDiagnosisComponent.prototype.ngOnInit = function () {
        this.eventID = this.data.event_id;
        this.eventData = this.data.event_data;
        this.diagnoses = this.data.diagnosis_options;
        // get diagnoses from the DiagnosisService
        // this.diagnosisService.getDiagnoses()
        //   .subscribe(
        //     diagnoses => {
        //       this.diagnoses = diagnoses;
        //     },
        //     error => {
        //       this.errorMessage = <any>error;
        //     }
        //   );
    };
    AddEventDiagnosisComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    AddEventDiagnosisComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AddEventDiagnosisComponent.prototype.checkForDuplicateEventDiagnosis = function (diagnosisID) {
        for (var _i = 0, _a = this.eventData.eventdiagnoses; _i < _a.length; _i++) {
            var eventdiagnosis = _a[_i];
            if (eventdiagnosis.diagnosis === diagnosisID) {
                return true;
            }
        }
    };
    AddEventDiagnosisComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        formValue.event = this.data.event_id;
        this.eventDiagnosisService.create(formValue)
            .subscribe(function (contact) {
            _this.submitLoading = false;
            _this.openSnackBar('Event Diagnosis Added', 'OK', 5000);
            _this.addEventDiagnosisDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Diagnosis', 'event_label': 'Event Diagnosis Added, Diagnosis: ' + contact.diagnosis });
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event Diagnosis not added. Error message: ' + error, 'OK', 8000);
        });
    };
    AddEventDiagnosisComponent = __decorate([
        core_1.Component({
            selector: 'app-add-event-diagnosis',
            templateUrl: './add-event-diagnosis.component.html',
            styleUrls: ['./add-event-diagnosis.component.scss']
        }),
        __param(5, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            diagnosis_service_1.DiagnosisService,
            event_diagnosis_service_1.EventDiagnosisService,
            material_2.MatSnackBar, Object])
    ], AddEventDiagnosisComponent);
    return AddEventDiagnosisComponent;
}());
exports.AddEventDiagnosisComponent = AddEventDiagnosisComponent;
//# sourceMappingURL=add-event-diagnosis.component.js.map