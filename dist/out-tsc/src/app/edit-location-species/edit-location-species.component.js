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
var species_service_1 = require("@services/species.service");
var location_species_service_1 = require("@services/location-species.service");
var age_bias_service_1 = require("@app/services/age-bias.service");
var sex_bias_service_1 = require("@app/services/sex-bias.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var data_updated_service_1 = require("@app/services/data-updated.service");
var EditLocationSpeciesComponent = /** @class */ (function () {
    function EditLocationSpeciesComponent(formBuilder, editLocationSpeciesDialogRef, locationSpeciesService, ageBiasService, sexBiasService, dataUpdatedService, snackBar, speciesService, data) {
        this.formBuilder = formBuilder;
        this.editLocationSpeciesDialogRef = editLocationSpeciesDialogRef;
        this.locationSpeciesService = locationSpeciesService;
        this.ageBiasService = ageBiasService;
        this.sexBiasService = sexBiasService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.speciesService = speciesService;
        this.data = data;
        this.submitLoading = false;
        this.filteredSpecies = new rxjs_1.ReplaySubject(1);
        this.locationSpeciesNumbersViolation = false;
        this.speciesFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildLocationSpeciesForm();
    }
    EditLocationSpeciesComponent.prototype.buildLocationSpeciesForm = function () {
        this.locationSpeciesForm = this.formBuilder.group({
            id: null,
            event_location: null,
            species: null,
            population_count: [null, forms_1.Validators.min(0)],
            sick_count: [null, forms_1.Validators.min(0)],
            dead_count: [null, forms_1.Validators.min(0)],
            sick_count_estimated: [null, forms_1.Validators.min(0)],
            dead_count_estimated: [null, forms_1.Validators.min(0)],
            captive: false,
            age_bias: null,
            sex_bias: null
        }, {
            validator: [this.integer, this.estimatedSick, this.estimatedDead]
        });
    };
    EditLocationSpeciesComponent.prototype.integer = function (AC) {
        var population_count = AC.get('population_count').value;
        var sick_count = AC.get('sick_count').value;
        var dead_count = AC.get('dead_count').value;
        var sick_count_estimated = AC.get('sick_count_estimated').value;
        var dead_count_estimated = AC.get('dead_count_estimated').value;
        if (!Number.isInteger(population_count) && population_count !== null) {
            AC.get('population_count').setErrors({ integer: true });
        }
        if (!Number.isInteger(sick_count) && sick_count !== null) {
            AC.get('sick_count').setErrors({ integer: true });
        }
        if (!Number.isInteger(dead_count) && dead_count !== null) {
            AC.get('dead_count').setErrors({ integer: true });
        }
        if (!Number.isInteger(sick_count_estimated) && sick_count_estimated !== null) {
            AC.get('sick_count_estimated').setErrors({ integer: true });
        }
        if (!Number.isInteger(dead_count_estimated) && dead_count_estimated !== null) {
            AC.get('dead_count_estimated').setErrors({ integer: true });
        }
        return null;
    };
    EditLocationSpeciesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ageBiasService.getAgeBiases()
            .subscribe(function (ageBiases) {
            _this.ageBiases = ageBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.sexBiasService.getSexBiases()
            .subscribe(function (sexBiases) {
            _this.sexBiases = sexBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // populate the search select options for the species control
        this.filteredSpecies.next(this.data.species);
        this.ageBiases = this.data.ageBiases;
        this.sexBiases = this.data.sexBiases;
        // listen for search field value changes
        this.speciesFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterSpecies();
        });
        if (this.data.eventlocation) {
            this.eventlocation = this.data.eventlocation;
            this.eventID = this.data.eventlocation.event;
            this.administrative_level_one = this.data.eventlocation.administrative_level_one_string;
            this.administrative_level_two = this.data.eventlocation.administrative_level_two_string;
        }
        if (this.data.location_species_action === 'add') {
            this.action_text = 'Add';
            this.action_button_text = 'Submit';
            this.locationSpeciesForm.get('dead_count_estimated').markAsTouched();
            this.locationSpeciesForm.get('sick_count_estimated').markAsTouched();
        }
        else if (this.data.location_species_action === 'edit') {
            this.locationspeciesString = this.data.locationspecies.species_string;
            this.administrative_level_one = this.data.locationspecies.administrative_level_one_string;
            this.administrative_level_two = this.data.locationspecies.administrative_level_two_string;
            this.action_text = 'Edit';
            this.action_button_text = 'Save Changes';
            this.locationSpeciesForm.setValue({
                id: this.data.locationspecies.id,
                event_location: this.data.locationspecies.event_location,
                species: this.data.locationspecies.species,
                population_count: this.data.locationspecies.population_count,
                sick_count: this.data.locationspecies.sick_count,
                dead_count: this.data.locationspecies.dead_count,
                sick_count_estimated: this.data.locationspecies.sick_count_estimated,
                dead_count_estimated: this.data.locationspecies.dead_count_estimated,
                captive: this.data.locationspecies.captive,
                age_bias: this.data.locationspecies.age_bias,
                sex_bias: this.data.locationspecies.sex_bias,
            });
            if (this.data.locationspecies.age_bias !== null) {
                this.locationSpeciesForm.get('age_bias').setValue(this.data.locationspecies.age_bias.toString());
            }
            if (this.data.locationspecies.sex_bias !== null) {
                this.locationSpeciesForm.get('sex_bias').setValue(this.data.locationspecies.sex_bias.toString());
            }
            this.locationSpeciesForm.get('dead_count_estimated').markAsTouched();
            this.locationSpeciesForm.get('sick_count_estimated').markAsTouched();
            // this.locationSpeciesForm.get('species').disable();
            this.checkLocationSpeciesNumbers();
        }
    };
    EditLocationSpeciesComponent.prototype.filterSpecies = function () {
        if (!this.data.species) {
            return;
        }
        // get the search keyword
        var search = this.speciesFilterCtrl.value;
        if (!search) {
            this.filteredSpecies.next(this.data.species.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredSpecies.next(this.data.species.filter(function (species) { return species.name.toLowerCase().indexOf(search) > -1; }));
    };
    EditLocationSpeciesComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EditLocationSpeciesComponent.prototype.estimatedSick = function (AC) {
        AC.get('sick_count_estimated').setErrors(null);
        var sick_count = AC.get('sick_count').value;
        var sick_count_estimated = AC.get('sick_count_estimated').value;
        if (sick_count !== null && sick_count_estimated !== null) {
            if (sick_count_estimated <= sick_count) {
                AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
            }
        }
    };
    EditLocationSpeciesComponent.prototype.estimatedDead = function (AC) {
        AC.get('dead_count_estimated').setErrors(null);
        var dead_count = AC.get('dead_count').value;
        var dead_count_estimated = AC.get('dead_count_estimated').value;
        if (dead_count !== null && dead_count_estimated !== null) {
            if (dead_count_estimated <= dead_count) {
                AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
            }
        }
    };
    EditLocationSpeciesComponent.prototype.checkLocationSpeciesNumbers = function () {
        var _this = this;
        this.locationSpeciesNumbersViolation = false;
        // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
        if (this.data.eventData.event_type === 1 || this.data.eventData.event_type === '1') {
            // set var to capture of requirement is met at any of the event locations
            var requirementMet = false;
            // add in the current form values to the if statement
            for (var _i = 0, _a = this.data.eventData.eventlocations; _i < _a.length; _i++) {
                var eventlocation = _a[_i];
                var locationspecies = [];
                // if in edit mode, filter out locationspecies that is currently being edited.
                // if in add mode, use the full locationspecies array.
                if (this.data.location_species_action === 'edit') {
                    // tslint:disable-next-line:max-line-length
                    // filter out the locationspecies that is currently being edited
                    locationspecies = eventlocation.locationspecies.filter(function (locspecies) { return locspecies.id !== _this.locationSpeciesForm.get('id').value; });
                }
                else if (this.data.location_species_action === 'add') {
                    locationspecies = eventlocation.locationspecies;
                }
                // check if the array has anything in it before looping
                if (locationspecies.length > 0) {
                    for (var _b = 0, locationspecies_1 = locationspecies; _b < locationspecies_1.length; _b++) {
                        var locspecies = locationspecies_1[_b];
                        if ((locspecies.sick_count +
                            locspecies.dead_count +
                            locspecies.sick_count_estimated +
                            locspecies.dead_count_estimated +
                            this.locationSpeciesForm.get('sick_count').value +
                            this.locationSpeciesForm.get('dead_count').value +
                            this.locationSpeciesForm.get('sick_count_estimated').value +
                            this.locationSpeciesForm.get('dead_count_estimated').value) >= 1) {
                            requirementMet = true;
                        }
                    }
                }
                else {
                    // if locationspecies array is empty, only use the form value to validate
                    if ((this.locationSpeciesForm.get('sick_count').value +
                        this.locationSpeciesForm.get('dead_count').value +
                        this.locationSpeciesForm.get('sick_count_estimated').value +
                        this.locationSpeciesForm.get('dead_count_estimated').value) >= 1) {
                        requirementMet = true;
                    }
                }
            }
            if (requirementMet) {
                this.locationSpeciesNumbersViolation = false;
            }
            else {
                this.locationSpeciesNumbersViolation = true;
            }
        }
    };
    // Tooltip text
    EditLocationSpeciesComponent.prototype.editLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationNameTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editStandardizedLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; };
    EditLocationSpeciesComponent.prototype.flywayTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.flywayTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editLandOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; };
    EditLocationSpeciesComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    EditLocationSpeciesComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesTooltip; return string; };
    EditLocationSpeciesComponent.prototype.speciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editKnownDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownDeadTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editEstimatedDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editKnownSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownSickTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editEstimatedSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; };
    EditLocationSpeciesComponent.prototype.populationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editAgeBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editAgeBiasTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editSexBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSexBiasTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editCaptiveTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editCaptiveTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editSpeciesDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; };
    EditLocationSpeciesComponent.prototype.locationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationNameTooltip; return string; };
    EditLocationSpeciesComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    EditLocationSpeciesComponent.prototype.editRecordStatusTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editRecordStatusTooltip; return string; };
    EditLocationSpeciesComponent.prototype.collaboratorsAddIndividualTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; };
    EditLocationSpeciesComponent.prototype.collaboratorsAddCircleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; };
    EditLocationSpeciesComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        if (this.data.location_species_action === 'add') {
            formValue.event_location = this.data.eventlocation.id;
            console.log('gtag accessed');
            this.locationSpeciesService.create(formValue)
                .subscribe(function (event) {
                _this.submitLoading = false;
                console.log('gtag accessed');
                _this.openSnackBar('Species successfully added to this location', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.editLocationSpeciesDialogRef.close();
                gtag('event', 'click', { 'event_category': 'Event Location Species Details', 'event_label': 'Species Added to Location, location: ' + event.event_location });
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. New species not saved. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.location_species_action === 'edit') {
            formValue.id = this.data.locationspecies.id;
            formValue.event_location = this.data.locationspecies.event_location;
            formValue.species = this.data.locationspecies.species;
            this.locationSpeciesService.update(formValue)
                .subscribe(function (event) {
                _this.submitLoading = false;
                _this.openSnackBar('Species Updated', 'OK', 5000);
                _this.dataUpdatedService.triggerRefresh();
                _this.editLocationSpeciesDialogRef.close();
                gtag('event', 'click', { 'event_category': 'Event Location Species Details', 'event_label': 'Species Location Edited, location: ' + event.event_location });
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. Species not updated. Error message: ' + error, 'OK', 8000);
            });
        }
    };
    EditLocationSpeciesComponent.prototype.filter = function (val, searchArray, searchProperties) {
        var result = [];
        for (var _i = 0, searchProperties_1 = searchProperties; _i < searchProperties_1.length; _i++) {
            var searchProperty = searchProperties_1[_i];
            if (isNaN(val)) {
                var realval = val && typeof val === 'object' ? val[searchProperty] : val;
                var lastOption = null;
                if (searchArray !== undefined) {
                    for (var i = 0; i < searchArray.length; i++) {
                        if (searchArray[i][searchProperty] != null && (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase()))) {
                            if (searchArray[i][searchProperty] !== lastOption) {
                                lastOption = searchArray[i][searchProperty];
                                result.push(searchArray[i]);
                            }
                        }
                    }
                }
            }
        }
        // this will return all records matching the val string
        return result;
    };
    EditLocationSpeciesComponent.prototype.displayFn = function (speciesId) {
        var species_id_match;
        for (var i = 0; i < this['options']._results.length - 1; i++) {
            if (this['options']._results[i].value === speciesId) {
                species_id_match = this['options']._results[i].viewValue;
            }
        }
        return species_id_match;
    };
    __decorate([
        core_1.ViewChild('speciesSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EditLocationSpeciesComponent.prototype, "speciesSelect", void 0);
    EditLocationSpeciesComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-location-species',
            templateUrl: './edit-location-species.component.html',
            styleUrls: ['./edit-location-species.component.scss']
        }),
        __param(8, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            location_species_service_1.LocationSpeciesService,
            age_bias_service_1.AgeBiasService,
            sex_bias_service_1.SexBiasService,
            data_updated_service_1.DataUpdatedService,
            material_3.MatSnackBar,
            species_service_1.SpeciesService, Object])
    ], EditLocationSpeciesComponent);
    return EditLocationSpeciesComponent;
}());
exports.EditLocationSpeciesComponent = EditLocationSpeciesComponent;
//# sourceMappingURL=edit-location-species.component.js.map