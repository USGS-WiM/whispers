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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var diagnosis_service_1 = require("@services/diagnosis.service");
var diagnosis_basis_service_1 = require("@app/services/diagnosis-basis.service");
var diagnosis_cause_service_1 = require("@app/services/diagnosis-cause.service");
var location_species_diagnosis_service_1 = require("@app/services/location-species-diagnosis.service");
var organization_service_1 = require("@app/services/organization.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var app_settings_1 = require("@app/app.settings");
var app_field_help_text_1 = require("@app/app.field-help-text");
var EditSpeciesDiagnosisComponent = /** @class */ (function () {
    function EditSpeciesDiagnosisComponent(formBuilder, snackBar, dialog, diagnosisService, editSpeciesDiagnosisDialogRef, diagnosisBasisService, diagnosisCauseService, locationSpeciesDiagnosisService, organizationService, dataUpdatedService, data) {
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.diagnosisService = diagnosisService;
        this.editSpeciesDiagnosisDialogRef = editSpeciesDiagnosisDialogRef;
        this.diagnosisBasisService = diagnosisBasisService;
        this.diagnosisCauseService = diagnosisCauseService;
        this.locationSpeciesDiagnosisService = locationSpeciesDiagnosisService;
        this.organizationService = organizationService;
        this.dataUpdatedService = dataUpdatedService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.labSuspectViolation = false;
        this.diagnosisSuspectViolation = false;
        this.duplicateDiagnosisViolation = false;
        this.labViolation = false;
        this.laboratories = [];
        this.filteredLaboratories = [];
        this.laboratoryFilterCtrl = new forms_1.FormControl();
        this.filteredDiagnoses = new rxjs_1.ReplaySubject(1);
        this.diagnosisFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildspeciesDiagnosisForm();
    }
    EditSpeciesDiagnosisComponent.prototype.buildspeciesDiagnosisForm = function () {
        this.speciesDiagnosisForm = this.formBuilder.group({
            id: null,
            location_species: null,
            diagnosis: [null, forms_1.Validators.required],
            cause: null,
            basis: null,
            suspect: true,
            // priority: null,
            tested_count: [null, forms_1.Validators.min(0)],
            diagnosis_count: [null, forms_1.Validators.min(0)],
            // diagnosis_count: null,
            positive_count: null,
            suspect_count: null,
            pooled: false,
            new_species_diagnosis_organizations: this.formBuilder.array([
            // this.initDiagnosisOrganization()
            ])
        }, {
            validator: [this.integerTestedCount, this.integerDiagnosisCount, this.diagnosisCount]
        });
        this.filteredLaboratories = new Array();
        this.filteredLaboratories.push(new rxjs_1.ReplaySubject());
        this.ManageLaboratoryControl(0);
    };
    EditSpeciesDiagnosisComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.laboratories) {
            this.laboratories = this.data.laboratories;
            this.filteredLaboratories[0].next(this.laboratories);
        }
        if (this.data.speciesdiagnosis) {
            this.speciesdiagnosis = this.data.speciesdiagnosis;
        }
        if (this.data.existing_diagnoses) {
            this.existingDiagnoses = this.data.existing_diagnoses;
        }
        // add mode
        if (this.data.species_diagnosis_action === 'add') {
            this.action_text = 'Add';
            this.action_button_text = 'Submit';
            this.speciesDiagnosisForm.get('location_species').setValue(this.data.locationspecies.id);
            // add to event submission formArray mode
        }
        else if (this.data.species_diagnosis_action === 'addToFormArray') {
            this.action_text = 'Add';
            this.action_button_text = 'Add';
            // edit mode
        }
        else if (this.data.species_diagnosis_action === 'editInFormArray') {
            this.action_text = 'Edit';
            this.action_button_text = 'Save Changes';
            // this.diagnosisBases = this.data.diagnosisBases;
            // this.diagnosisCauses = this.data.diagnosisCauses;
            this.diagnoses = this.data.diagnoses;
            this.species = this.data.species;
            // Access the form here and set the value to the objects property/value
            this.speciesDiagnosisForm.patchValue({
                id: this.data.speciesdiagnosis.id,
                // location_species: this.data.speciesdiagnosis.location_species,
                diagnosis: [this.data.speciesdiagnosis.diagnosis, forms_1.Validators.required],
                cause: this.data.speciesdiagnosis.cause,
                basis: this.data.speciesdiagnosis.basis,
                suspect: this.data.speciesdiagnosis.suspect,
                tested_count: this.data.speciesdiagnosis.tested_count,
                diagnosis_count: this.data.speciesdiagnosis.diagnosis_count,
                positive_count: this.data.speciesdiagnosis.positive_count,
            });
            if (this.data.speciesdiagnosis.new_species_diagnosis_organizations.length > 0) {
                this.removeDiagnosisOrganization(0);
                // remove filteredLaboratories array for first index
                this.filteredLaboratories.pop();
                for (var i = 0, j = this.data.speciesdiagnosis.new_species_diagnosis_organizations.length; i < j; i++) {
                    this.addDiagnosisOrganization();
                    // tslint:disable-next-line:max-line-length
                    this.speciesDiagnosisForm.get('new_species_diagnosis_organizations')['controls'][i].get('org').setValue(this.data.speciesdiagnosis.new_species_diagnosis_organizations[i]);
                }
            }
        }
        else if (this.data.species_diagnosis_action === 'edit') {
            this.action_text = 'Edit';
            this.action_button_text = 'Save Changes';
            if (this.data.locationspecies) {
                this.locationspeciesString = this.data.locationspecies.species_string;
                this.administrative_level_one = this.data.locationspecies.administrative_level_one_string;
                this.administrative_level_two = this.data.locationspecies.administrative_level_two_string;
            }
            // Access the form here and set the value to the objects property/value
            this.speciesDiagnosisForm.patchValue({
                id: this.data.speciesdiagnosis.id,
                location_species: this.data.speciesdiagnosis.location_species,
                diagnosis: [this.data.speciesdiagnosis.diagnosis, forms_1.Validators.required],
                cause: this.data.speciesdiagnosis.cause,
                basis: this.data.speciesdiagnosis.basis,
                suspect: this.data.speciesdiagnosis.suspect,
                tested_count: this.data.speciesdiagnosis.tested_count,
                diagnosis_count: this.data.speciesdiagnosis.diagnosis_count,
                positive_count: this.data.speciesdiagnosis.positive_count,
            });
            // this line had to be added because the patchValue function above was causing the diagnosis to be an array instead of a simple integer value,
            // which was breaking the checkSuspectCompliance() function
            this.speciesDiagnosisForm.get('diagnosis').setValue(this.data.speciesdiagnosis.diagnosis);
            if (this.data.speciesdiagnosis.organizations.length > 0) {
                this.removeDiagnosisOrganization(0);
                // remove filteredLaboratories array for first index
                this.filteredLaboratories.pop();
                for (var i = 0, j = this.data.speciesdiagnosis.organizations.length; i < j; i++) {
                    this.addDiagnosisOrganization();
                    // tslint:disable-next-line:max-line-length
                    this.speciesDiagnosisForm.get('new_species_diagnosis_organizations')['controls'][i].get('org').setValue(this.data.speciesdiagnosis.organizations[i]);
                }
            }
        }
        // get diagnoses from the diagnoses service
        this.diagnosisService.getDiagnoses()
            .subscribe(function (diagnoses) {
            _this.diagnoses = diagnoses;
            if (_this.data.locationspecies) {
                if (_this.data.speciesdiagnosis !== undefined && _this.data.speciesdiagnosis.diagnosis !== null) {
                    // the 'toString()' version of the below line used in past, may need to use conditionally
                    // this.speciesDiagnosisForm.get('diagnosis').setValue(this.data.speciesdiagnosis.diagnosis.toString());
                    _this.speciesDiagnosisForm.get('diagnosis').setValue(_this.data.speciesdiagnosis.diagnosis);
                }
            }
            _this.diagnoses.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // remove the 'unknown' diagnosis for incomplete events ("Pending")
            // NWHC requsted this not be available to users as choice.
            _this.diagnoses = _this.diagnoses.filter(function (diagnosis) { return diagnosis.id !== app_settings_1.APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis; });
            // populate the search select options for the diagnosis control
            _this.filteredDiagnoses.next(diagnoses);
            // listen for search field value changes
            _this.diagnosisFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterDiagnosis();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosisBases from the diagnosisBasis service
        this.diagnosisBasisService.getDiagnosisBases()
            .subscribe(function (diagnosisBases) {
            _this.diagnosisBases = diagnosisBases;
            // tslint:disable-next-line:max-line-length
            if (_this.data.locationspecies) {
                if (_this.data.speciesdiagnosis !== undefined && _this.data.speciesdiagnosis.basis !== null) {
                    // tslint:disable-next-line:max-line-length
                    // the 'toString()' version of the below line used in past, may need to use conditionally
                    //this.speciesDiagnosisForm.get('basis').setValue(this.data.speciesdiagnosis.basis.toString());
                    _this.speciesDiagnosisForm.get('basis').setValue(_this.data.speciesdiagnosis.basis);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosisCauses from the diagnosisCause service
        this.diagnosisCauseService.getDiagnosisCauses()
            .subscribe(function (diagnosisCauses) {
            _this.diagnosisCauses = diagnosisCauses;
            // tslint:disable-next-line:max-line-length
            if (_this.data.locationspecies) {
                if (_this.data.speciesdiagnosis !== undefined && _this.data.speciesdiagnosis.cause !== null) {
                    // tslint:disable-next-line:max-line-length
                    // the 'toString()' version of the below line used in past, may need to use conditionally
                    // this.speciesDiagnosisForm.get('cause').setValue(this.data.speciesdiagnosis.cause.toString());
                    _this.speciesDiagnosisForm.get('cause').setValue(_this.data.speciesdiagnosis.cause);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get 'laboratories' from the organizations service
        // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
        // this.organizationService.getLaboratories()
        //   .subscribe(
        //     (laboratories) => {
        //       this.laboratories = laboratories;
        //       this.filteredLaboratories[0].next(laboratories);
        //     },
        //     error => {
        //       this.errorMessage = <any>error;
        //     }
        //   );
        this.checkSuspectCompliance();
        this.checkLabCompliance();
    };
    EditSpeciesDiagnosisComponent.prototype.diagnosisCount = function (AC) {
        //AC.get('diagnosis_count').setErrors(null);
        var tested_count = AC.get('tested_count').value;
        var diagnosis_count = AC.get('diagnosis_count').value;
        if (diagnosis_count !== null && tested_count !== null) {
            if (diagnosis_count > tested_count) {
                AC.get('diagnosis_count').setErrors({ diagnosisCount: true });
            }
        }
    };
    EditSpeciesDiagnosisComponent.prototype.integer = function (AC) {
        var tested_count = AC.get('tested_count').value;
        var diagnosis_count = AC.get('diagnosis_count').value;
        if (!Number.isInteger(diagnosis_count) && diagnosis_count !== null) {
            AC.get('diagnosis_count').setErrors({ integer: true });
        }
        if (!Number.isInteger(tested_count) && tested_count !== null) {
            AC.get('tested_count').setErrors({ integer: true });
        }
        return null;
    };
    EditSpeciesDiagnosisComponent.prototype.integerTestedCount = function (AC) {
        AC.get('tested_count').setErrors(null);
        var tested_count = AC.get('tested_count').value;
        if (!Number.isInteger(tested_count) && tested_count !== null) {
            AC.get('tested_count').setErrors({ integerTestedCount: true });
        }
    };
    EditSpeciesDiagnosisComponent.prototype.integerDiagnosisCount = function (AC) {
        AC.get('diagnosis_count').setErrors(null);
        var diagnosis_count = AC.get('diagnosis_count').value;
        if (!Number.isInteger(diagnosis_count) && diagnosis_count !== null) {
            AC.get('diagnosis_count').setErrors({ integerDiagnosisCount: true });
        }
    };
    // begin diagnosis organizations array functions
    EditSpeciesDiagnosisComponent.prototype.initDiagnosisOrganization = function () {
        return this.formBuilder.group({
            org: [null, forms_1.Validators.required],
        });
    };
    EditSpeciesDiagnosisComponent.prototype.addDiagnosisOrganization = function () {
        var control = this.speciesDiagnosisForm.get('new_species_diagnosis_organizations');
        control.push(this.initDiagnosisOrganization());
        var laboratoryIndex = control.length - 1;
        this.filteredLaboratories.push(new rxjs_1.ReplaySubject());
        this.ManageLaboratoryControl(laboratoryIndex);
        this.checkSuspectCompliance();
        this.checkLabCompliance();
    };
    EditSpeciesDiagnosisComponent.prototype.removeDiagnosisOrganization = function (diagnosisOrgIndex) {
        var control = this.speciesDiagnosisForm.get('new_species_diagnosis_organizations');
        control.removeAt(diagnosisOrgIndex);
        this.checkSuspectCompliance();
        this.checkLabCompliance();
    };
    EditSpeciesDiagnosisComponent.prototype.getDiagnosisOrganizations = function (form) {
        return form.controls.new_species_diagnosis_organizations.controls;
    };
    // end diagnosis organizations array functions
    EditSpeciesDiagnosisComponent.prototype.ManageLaboratoryControl = function (laboratoryIndex) {
        var _this = this;
        // populate the laboratories options list for the specific control
        this.filteredLaboratories[laboratoryIndex].next(this.laboratories);
        // listen for search field value changes
        this.laboratoryFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterLaboratories(laboratoryIndex);
        });
    };
    EditSpeciesDiagnosisComponent.prototype.filterLaboratories = function (laboratoryIndex) {
        if (!this.laboratories) {
            return;
        }
        // get the search keyword
        var search = this.laboratoryFilterCtrl.value;
        if (!search) {
            this.filteredLaboratories[laboratoryIndex].next(this.laboratories.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the laboratories
        this.filteredLaboratories[laboratoryIndex].next(this.laboratories.filter(function (laboratory) { return laboratory.name.toLowerCase().indexOf(search) > -1; }));
    };
    EditSpeciesDiagnosisComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EditSpeciesDiagnosisComponent.prototype.filterDiagnosis = function () {
        if (!this.diagnoses) {
            return;
        }
        // get the search keyword
        var search = this.diagnosisFilterCtrl.value;
        if (!search) {
            this.filteredDiagnoses.next(this.diagnoses.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredDiagnoses.next(this.diagnoses.filter(function (diagnosis) { return diagnosis.name.toLowerCase().indexOf(search) > -1; }));
    };
    EditSpeciesDiagnosisComponent.prototype.onCancel = function () {
        var speciesDiagnosisObj = {
            action: 'cancel',
            eventlocationIndex: this.data.eventlocationIndex,
            locationspeciesIndex: this.data.locationspeciesIndex,
        };
        this.editSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);
    };
    EditSpeciesDiagnosisComponent.prototype.checkSuspectCompliance = function () {
        this.labSuspectViolation = false;
        this.diagnosisSuspectViolation = false;
        // tslint:disable-next-line:max-line-length
        // if no diagnosis organization is selected (length = 0) and suspect is not true
        if (this.speciesDiagnosisForm['controls'].new_species_diagnosis_organizations['controls'].length === 0 && !this.speciesDiagnosisForm.get('suspect').value) {
            // if the diagnosis selected is NOT one of the unknowns, then show violation
            // tslint:disable-next-line:max-line-length
            if (this.speciesDiagnosisForm.get('diagnosis').value !== app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis && this.speciesDiagnosisForm.get('diagnosis').value !== app_settings_1.APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) {
                this.labSuspectViolation = true;
            }
        }
        // tslint:disable-next-line:max-line-length
        if ((this.speciesDiagnosisForm.get('diagnosis').value === app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis || this.speciesDiagnosisForm.get('diagnosis').value === app_settings_1.APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) && this.speciesDiagnosisForm.get('suspect').value) {
            this.diagnosisSuspectViolation = true;
        }
    };
    EditSpeciesDiagnosisComponent.prototype.checkForDuplicateDiagnosis = function () {
        this.duplicateDiagnosisViolation = false;
        if (this.data.species_diagnosis_action === 'add' || this.data.species_diagnosis_action === 'addToFormArray') {
            for (var _i = 0, _a = this.existingDiagnoses; _i < _a.length; _i++) {
                var existingDiagnosis = _a[_i];
                if (existingDiagnosis === this.speciesDiagnosisForm.get('diagnosis').value) {
                    this.duplicateDiagnosisViolation = true;
                }
            }
        }
    };
    EditSpeciesDiagnosisComponent.prototype.checkLabCompliance = function () {
        this.labViolation = false;
        // tslint:disable-next-line:max-line-length
        if (this.speciesDiagnosisForm['controls'].new_species_diagnosis_organizations['controls'].length === 0 && this.speciesDiagnosisForm.get('basis').value === 3) {
            this.labViolation = true;
        }
    };
    // hover text
    EditSpeciesDiagnosisComponent.prototype.numberAssessedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAssessedTooltip; return string; };
    EditSpeciesDiagnosisComponent.prototype.speciesDiagnosisTooltip = function () {
        var string;
        if (this.data.species_diagnosis_action === 'edit' || this.data.species_diagnosis_action === 'editToFormArray') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip;
        }
        else {
            string = app_field_help_text_1.FIELD_HELP_TEXT.speciesDiagnosisTooltip;
        }
        return string;
    };
    EditSpeciesDiagnosisComponent.prototype.basisOfDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.basisOfDiagnosisTooltip; return string; };
    EditSpeciesDiagnosisComponent.prototype.numberWithDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberWithDiagnosisTooltip; return string; };
    EditSpeciesDiagnosisComponent.prototype.labTooltip = function () {
        var string;
        if (this.data.species_diagnosis_action === 'edit' || this.data.species_diagnosis_action === 'editToFormArray') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.editLabTooltip;
        }
        else {
            string = app_field_help_text_1.FIELD_HELP_TEXT.labTooltip;
        }
        return string;
    };
    EditSpeciesDiagnosisComponent.prototype.significanceOfDiagnosisForSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.significanceOfDiagnosisForSpeciesTooltip; return string; };
    EditSpeciesDiagnosisComponent.prototype.speciesDiagnosisSuspectTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesDiagnosisSuspectTooltip; return string; };
    EditSpeciesDiagnosisComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        var new_species_diagnosis_orgs_array = [];
        // loop through and convert new_organizations
        for (var _i = 0, _a = formValue.new_species_diagnosis_organizations; _i < _a.length; _i++) {
            var org = _a[_i];
            if (org !== null) {
                new_species_diagnosis_orgs_array.push(org.org);
            }
        }
        formValue.new_species_diagnosis_organizations = new_species_diagnosis_orgs_array;
        // if new_species_diagnosis_organizations is null, set to empty array for submission
        if (formValue.new_species_diagnosis_organizations === null) {
            formValue.new_species_diagnosis_organizations = [];
        }
        if (this.data.species_diagnosis_action === 'add') {
            //formValue.location_species = this.data.locationspecies.id;
            this.locationSpeciesDiagnosisService.create(formValue)
                .subscribe(function (speciesdiagnosis) {
                _this.submitLoading = false;
                _this.openSnackBar('Species Diagnosis Added', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.editSpeciesDiagnosisDialogRef.close();
                gtag('event', 'click', { 'event_category': 'Species Diagnosis', 'event_label': 'Species Diagnosis Added, Diagnosis: ' + speciesdiagnosis.diagnosis });
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. Species Diagnosis not created. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.species_diagnosis_action === 'addToFormArray') {
            var speciesDiagnosisObj = {
                action: 'add',
                eventlocationIndex: this.data.eventlocationIndex,
                locationspeciesIndex: this.data.locationspeciesIndex,
                formValue: formValue
            };
            this.editSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);
        }
        else if (this.data.species_diagnosis_action === 'editInFormArray') {
            var speciesDiagnosisObj = {
                action: 'editInFormArray',
                eventlocationIndex: this.data.eventlocationIndex,
                locationspeciesIndex: this.data.locationspeciesIndex,
                formValue: formValue
            };
            this.editSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);
        }
        else if (this.data.species_diagnosis_action === 'edit') {
            // formValue.new_location_species = this.data.locationspecies.id;
            formValue.id = this.data.speciesdiagnosis.id;
            this.locationSpeciesDiagnosisService.update(formValue)
                .subscribe(function (contact) {
                _this.submitLoading = false;
                _this.openSnackBar('Species Diagnosis Updated', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.editSpeciesDiagnosisDialogRef.close('add');
                gtag('event', 'click', { 'event_category': 'Species Diagnosis', 'event_label': 'Species Diagnosis Edited, Diagnosis: ' + contact.diagnosis });
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. Species diagnosis not created. Error message: ' + error, 'OK', 8000);
            });
        }
    };
    __decorate([
        core_1.Input('selectedSpeciesDiagnosis'),
        __metadata("design:type", Object)
    ], EditSpeciesDiagnosisComponent.prototype, "selectedSpeciesDiagnosis", void 0);
    EditSpeciesDiagnosisComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-species-diagnosis',
            templateUrl: './edit-species-diagnosis.component.html',
            styleUrls: ['./edit-species-diagnosis.component.scss']
        }),
        __param(10, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_2.MatSnackBar,
            material_1.MatDialog,
            diagnosis_service_1.DiagnosisService,
            material_1.MatDialogRef,
            diagnosis_basis_service_1.DiagnosisBasisService,
            diagnosis_cause_service_1.DiagnosisCauseService,
            location_species_diagnosis_service_1.LocationSpeciesDiagnosisService,
            organization_service_1.OrganizationService,
            data_updated_service_1.DataUpdatedService, Object])
    ], EditSpeciesDiagnosisComponent);
    return EditSpeciesDiagnosisComponent;
}());
exports.EditSpeciesDiagnosisComponent = EditSpeciesDiagnosisComponent;
//# sourceMappingURL=edit-species-diagnosis.component.js.map