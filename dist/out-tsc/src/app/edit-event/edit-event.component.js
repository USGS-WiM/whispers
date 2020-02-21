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
var app_utilities_1 = require("@app/app.utilities");
var app_field_help_text_1 = require("@app/app.field-help-text");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var event_service_1 = require("@services/event.service");
var organization_service_1 = require("@services/organization.service");
var event_type_service_1 = require("@app/services/event-type.service");
var event_status_service_1 = require("@app/services/event-status.service");
var current_user_service_1 = require("@app/services/current-user.service");
var legal_status_service_1 = require("@app/services/legal-status.service");
var common_1 = require("@angular/common");
var staff_service_1 = require("@app/services/staff.service");
var confirm_component_1 = require("@app/confirm/confirm.component");
var data_updated_service_1 = require("@app/services/data-updated.service");
var EditEventComponent = /** @class */ (function () {
    function EditEventComponent(formBuilder, dialog, editEventDialogRef, currentUserService, eventService, organizationService, eventStatusService, eventTypeService, legalStatusService, staffService, dataUpdatedService, datePipe, snackBar, data) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.editEventDialogRef = editEventDialogRef;
        this.currentUserService = currentUserService;
        this.eventService = eventService;
        this.organizationService = organizationService;
        this.eventStatusService = eventStatusService;
        this.eventTypeService = eventTypeService;
        this.legalStatusService = legalStatusService;
        this.staffService = staffService;
        this.dataUpdatedService = dataUpdatedService;
        this.datePipe = datePipe;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.basisAndCauseViolation = false;
        this.completeEventLocationSpeciesNumbersViolation = false;
        this.buildEditEventForm();
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    EditEventComponent.prototype.buildEditEventForm = function () {
        this.editEventForm = this.formBuilder.group({
            id: null,
            event_reference: [''],
            event_type: null,
            complete: null,
            public: null,
            // NWHC only
            staff: null,
            event_status: null,
            quality_check: null,
            legal_status: null,
            legal_number: '',
            // end NWHC only
            new_read_collaborators: [],
            new_write_collaborators: []
        });
    };
    EditEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventID = this.data.eventData.id;
        var readCollaboratorsArray = [];
        if (this.data.eventData.read_collaborators.length > 0) {
            for (var _i = 0, _a = this.data.eventData.read_collaborators; _i < _a.length; _i++) {
                var collaborator = _a[_i];
                readCollaboratorsArray.push(collaborator.id);
            }
        }
        var writeCollaboratorsArray = [];
        if (this.data.eventData.write_collaborators.length > 0) {
            for (var _b = 0, _c = this.data.eventData.write_collaborators; _b < _c.length; _b++) {
                var collaborator = _c[_b];
                writeCollaboratorsArray.push(collaborator.id);
            }
        }
        this.editEventForm.patchValue({
            id: this.data.eventData.id,
            event_reference: this.data.eventData.event_reference,
            event_type: this.data.eventData.event_type,
            complete: this.data.eventData.complete,
            public: this.data.eventData.public,
            // NWHC only
            staff: this.data.eventData.staff,
            event_status: this.data.eventData.event_status,
            quality_check: app_utilities_1.APP_UTILITIES.timeZoneAdjust(this.data.eventData.quality_check),
            legal_status: this.data.eventData.legal_status,
            legal_number: this.data.eventData.legal_number,
            // end NWHC only
            new_read_collaborators: readCollaboratorsArray,
            new_write_collaborators: writeCollaboratorsArray,
        });
        if (this.data.eventData.complete === false) {
            this.editEventForm.get('quality_check').disable();
        }
        this.eventTypeService.getEventTypes()
            .subscribe(function (event_types) {
            _this.event_types = event_types;
            _this.editEventForm.get('event_type').setValue(_this.data.eventData.event_type);
        }, function (error) {
            _this.errorMessage = error;
        });
        this.eventStatusService.getEventStatuses()
            .subscribe(function (event_statuses) {
            _this.event_statuses = event_statuses;
            _this.editEventForm.get('event_status').setValue(_this.data.eventData.event_status);
        }, function (error) {
            _this.errorMessage = error;
        });
        // get legal statuses from the LegalStatusService
        this.legalStatusService.getLegalStatuses()
            .subscribe(function (legalStatuses) {
            _this.legalStatuses = legalStatuses;
            _this.editEventForm.get('legal_status').setValue(_this.data.eventData.legal_status);
        }, function (error) {
            _this.errorMessage = error;
        });
        // get staff members from the staffService
        this.staffService.getStaff()
            .subscribe(function (staff) {
            _this.staff = staff;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.editEventForm.get('complete').valueChanges.subscribe(function (value) {
            if (value === true) {
                _this.editEventForm.get('quality_check').enable();
            }
            else if (value === false) {
                // this.editEventForm.get('quality_check').disable();
                _this.editEventForm.get('quality_check').setValue(null);
            }
        });
    };
    EditEventComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EditEventComponent.prototype.checkLocationSpeciesNumbers = function (selectedValue) {
        console.log(selectedValue);
        this.completeEventLocationSpeciesNumbersViolation = false;
        var completeEventLocationSpeciesNumbersViolated = false;
        // only do validation if user is changing the record status complete (i.e. 'true')
        if (selectedValue === true) {
            // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
            if (this.data.eventData.event_type === 1 || this.data.eventData.event_type_string === 'Mortality/Morbidity') {
                for (var _i = 0, _a = this.data.eventData.eventlocations; _i < _a.length; _i++) {
                    var eventlocation = _a[_i];
                    for (var _b = 0, _c = eventlocation.locationspecies; _b < _c.length; _b++) {
                        var locationspecies = _c[_b];
                        if ((locationspecies.sick_count +
                            locationspecies.dead_count +
                            locationspecies.sick_count_estimated +
                            locationspecies.dead_count_estimated) < 1) {
                            completeEventLocationSpeciesNumbersViolated = true;
                        }
                    }
                }
            }
            if (completeEventLocationSpeciesNumbersViolated) {
                this.completeEventLocationSpeciesNumbersViolation = true;
            }
        }
    };
    EditEventComponent.prototype.checkRulesEventComplete = function (selectedValue) {
        this.basisAndCauseViolation = false;
        // check to see if all event location species diagnoses
        // have a basis and cause of diagnosis (using the common terms, not DB field names)
        // loop through each event location > loop through each species
        // if species has a diagnosis, must have non-null value for cause and basis fields
        // if ANY of the species lack this, show error
        // do all of this only if the complete field ("WHISPers Record Status") is true/complete
        var basisAndCauseRuleViolated = false;
        if (selectedValue === true) {
            for (var _i = 0, _a = this.data.eventData.eventlocations; _i < _a.length; _i++) {
                var eventlocation = _a[_i];
                for (var _b = 0, _c = eventlocation.locationspecies; _b < _c.length; _b++) {
                    var locationspecies = _c[_b];
                    for (var _d = 0, _e = locationspecies.speciesdiagnoses; _d < _e.length; _d++) {
                        var speciesdiagnosis = _e[_d];
                        if (speciesdiagnosis.cause === null || speciesdiagnosis.basis === null) {
                            basisAndCauseRuleViolated = true;
                        }
                    }
                }
            }
            if (basisAndCauseRuleViolated) {
                this.basisAndCauseViolation = true;
            }
        }
    };
    EditEventComponent.prototype.openCompleteWarning = function () {
        var _this = this;
        if (this.editEventForm.get('complete').value === true) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Marking event as complete',
                    titleIcon: 'warning',
                    message: 'Updating an event to complete will lock all editing on the event.',
                    messageIcon: '',
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
        }
        else if (this.editEventForm.get('complete').value === false) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Marking event as incomplete',
                    titleIcon: 'warning',
                    message: 'Updating an event to incomplete will remove any existing Quality Check date and unlock editing of the event.',
                    messageIcon: '',
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
            this.confirmDialogRef.afterClosed().subscribe(function (result) {
                if (result === true) {
                    _this.editEventForm.get('quality_check').setValue(null);
                }
            });
        }
    };
    EditEventComponent.prototype.enforceLegalStatusRules = function (selected_legal_status) {
        var _this = this;
        if (selected_legal_status === 2 || selected_legal_status === 4) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Legal Status Change',
                    titleIcon: 'warning',
                    message: 'This change to legal status will set the event record to private (Not Visible to Public).',
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
            this.confirmDialogRef.afterClosed().subscribe(function (result) {
                if (result === true) {
                    _this.editEventForm.get('public').setValue(false);
                }
            });
        }
        if (selected_legal_status === 1 || selected_legal_status === 3) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Legal Status Change',
                    titleIcon: 'warning',
                    message: 'This change to legal status will set the event record to public (Visible to Public). Select "Cancel" to maintain current event visibility. Select "OK" to change to public.',
                    confirmButtonText: 'OK',
                    showCancelButton: true
                }
            });
            this.confirmDialogRef.afterClosed().subscribe(function (result) {
                if (result === true) {
                    _this.editEventForm.get('public').setValue(true);
                }
            });
        }
    };
    // Tooltip text
    EditEventComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    EditEventComponent.prototype.userEventRefTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.userEventRefTooltip; return string; };
    EditEventComponent.prototype.editEventVisibilityTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventVisibilityTooltip; return string; };
    EditEventComponent.prototype.editRecordStatusTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editRecordStatusTooltip; return string; };
    EditEventComponent.prototype.editContactOrganizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editContactOrganizationTooltip; return string; };
    EditEventComponent.prototype.locationStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationStartDateTooltip; return string; };
    EditEventComponent.prototype.locationEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationEndDateTooltip; return string; };
    EditEventComponent.prototype.stateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.stateTooltip; return string; };
    EditEventComponent.prototype.countryTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countryTooltip; return string; };
    EditEventComponent.prototype.countyTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countyTooltip; return string; };
    EditEventComponent.prototype.editLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationNameTooltip; return string; };
    EditEventComponent.prototype.editLandOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; };
    EditEventComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    EditEventComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    //editStandardizedLocationNameTooltip() { const string = FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; }
    /* editSpeciesTooltip() { const string = FIELD_HELP_TEXT.editSpeciesTooltip; return string; }
    editKnownDeadTooltip() { const string = FIELD_HELP_TEXT.editKnownDeadTooltip; return string; }
    editEstimatedDeadTooltip() { const string = FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; }
    editKnownSickTooltip() { const string = FIELD_HELP_TEXT.editKnownSickTooltip; return string; }
    editEstimatedSickTooltip() { const string = FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; }
    populationTooltip() { const string = FIELD_HELP_TEXT.populationTooltip; return string; }
    editAgeBiasTooltip() { const string = FIELD_HELP_TEXT.editAgeBiasTooltip; return string; }
    editSexBiasTooltip() { const string = FIELD_HELP_TEXT.editSexBiasTooltip; return string; }
    editCaptiveTooltip() { const string = FIELD_HELP_TEXT.editCaptiveTooltip; return string; }
    editSpeciesDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; } */
    EditEventComponent.prototype.speciesDiagnosisSuspectTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesDiagnosisSuspectTooltip; return string; };
    EditEventComponent.prototype.basisOfDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.basisOfDiagnosisTooltip; return string; };
    EditEventComponent.prototype.significanceOfDiagnosisForSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.significanceOfDiagnosisForSpeciesTooltip; return string; };
    EditEventComponent.prototype.numberAssessedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAssessedTooltip; return string; };
    EditEventComponent.prototype.numberWithDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberWithDiagnosisTooltip; return string; };
    EditEventComponent.prototype.editLabTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLabTooltip; return string; };
    EditEventComponent.prototype.editLocationCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationCommentTooltip; return string; };
    EditEventComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    EditEventComponent.prototype.eventCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTooltip; return string; };
    EditEventComponent.prototype.serviceRequestCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestCommentTooltip; return string; };
    EditEventComponent.prototype.collaboratorsAddIndividualTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; };
    EditEventComponent.prototype.collaboratorsAddCircleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; };
    EditEventComponent.prototype.eventIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip; return string; };
    EditEventComponent.prototype.eventStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventStartDateTooltip; return string; };
    EditEventComponent.prototype.eventEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventEndDateTooltip; return string; };
    EditEventComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    EditEventComponent.prototype.flywayTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.flywayTooltip; return string; };
    EditEventComponent.prototype.nwhcCarcassSubApprovalTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.nwhcCarcassSubApprovalTooltip; return string; };
    EditEventComponent.prototype.locationCommentTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTypeTooltip; return string; };
    EditEventComponent.prototype.updateEvent = function (formValue) {
        var _this = this;
        formValue.id = this.data.eventData.id;
        // empty value from datepicker does not work with datePipe transform. This converts empty dates to null for the datePipe
        if (formValue.quality_check !== null) {
            if (formValue.quality_check !== undefined) {
                if (formValue.quality_check.toJSON() === null) {
                    formValue.quality_check = null;
                }
            }
        }
        formValue.quality_check = this.datePipe.transform(formValue.quality_check, 'yyyy-MM-dd');
        // const new_orgs_array = [];
        // loop through and convert new_organizations
        // for (const org of formValue.new_organizations) {
        //   if (org !== null) {
        //     new_orgs_array.push(org.org);
        //   }
        // }
        // formValue.new_organizations = new_orgs_array;
        this.eventService.update(formValue)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.openSnackBar('Event Updated', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
            _this.editEventDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Event Edited' });
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event not updated. Error message: ' + error, 'OK', 15000);
        });
    };
    EditEventComponent.prototype.getErrorMessage = function (formControlName) {
        return this.editEventForm.get(formControlName).hasError('required') ? 'Please enter a value' :
            this.editEventForm.get(formControlName).hasError('email') ? 'Not a valid email' :
                '';
    };
    EditEventComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-event',
            templateUrl: './edit-event.component.html',
            styleUrls: ['./edit-event.component.scss']
        }),
        __param(13, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            material_1.MatDialogRef,
            current_user_service_1.CurrentUserService,
            event_service_1.EventService,
            organization_service_1.OrganizationService,
            event_status_service_1.EventStatusService,
            event_type_service_1.EventTypeService,
            legal_status_service_1.LegalStatusService,
            staff_service_1.StaffService,
            data_updated_service_1.DataUpdatedService,
            common_1.DatePipe,
            material_3.MatSnackBar, Object])
    ], EditEventComponent);
    return EditEventComponent;
}());
exports.EditEventComponent = EditEventComponent;
//# sourceMappingURL=edit-event.component.js.map