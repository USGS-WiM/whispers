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
var animations_1 = require("@angular/animations");
var material_1 = require("@angular/material");
var edit_location_species_component_1 = require("@app/edit-location-species/edit-location-species.component");
var edit_species_diagnosis_component_1 = require("@app/edit-species-diagnosis/edit-species-diagnosis.component");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var confirm_component_1 = require("@confirm/confirm.component");
var location_species_service_1 = require("@services/location-species.service");
var species_diagnosis_service_1 = require("@services/species-diagnosis.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var LocationSpeciesTableComponent = /** @class */ (function () {
    function LocationSpeciesTableComponent(dialog, locationSpeciesService, snackBar, speciesDiagnosisService, dataUpdatedService) {
        this.dialog = dialog;
        this.locationSpeciesService = locationSpeciesService;
        this.snackBar = snackBar;
        this.speciesDiagnosisService = speciesDiagnosisService;
        this.dataUpdatedService = dataUpdatedService;
        this.errorMessage = '';
        this.displayedColumns = [
            'species',
            'location',
            'population',
            'sick',
            'dead',
            'sick_estimated',
            'dead_estimated',
            'captive',
            'age_bias',
            'sex_bias',
            'diagnosis'
        ];
        this.isExpansionDetailRow = function (i, row) { return row.hasOwnProperty('detailRow'); };
    }
    LocationSpeciesTableComponent.prototype.ngOnInit = function () {
        // if (this.permissions) {
        //   console.log('location-species-table.component has this permissions object: ' + this.permissions);
        // }
        var data = this.locationspecies;
        var rows = [];
        data.forEach(function (element) { return rows.push(element, { detailRow: true, element: element }); });
        console.log(rows);
        this.dataSource = new material_2.MatTableDataSource(rows);
    };
    LocationSpeciesTableComponent.prototype.editLocationSpecies = function (locationspecies) {
        var _this = this;
        // Open dialog for editing location species
        this.editLocationSpeciesDialogRef = this.dialog.open(edit_location_species_component_1.EditLocationSpeciesComponent, {
            disableClose: true,
            data: {
                eventData: this.eventData,
                locationspecies: locationspecies,
                ageBiases: this.ageBiases,
                sexBiases: this.sexBiases,
                location_species_action: 'edit',
                action_text: 'edit',
                action_button_text: 'Save Changes',
                title: 'Edit species',
                titleIcon: 'edit'
                // eventlocation: eventlocation
            }
        });
        this.editLocationSpeciesDialogRef.afterClosed()
            .subscribe(function () {
            // this.refreshEvent();
            // for (let i = 0; i < this.selection.length; i++) {
            //   this.selection[i].clear();
            // }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    LocationSpeciesTableComponent.prototype.openDeleteLocationSpeciesConfirm = function (locationspecies) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            disableClose: true,
            data: {
                title: 'Delete species from this location',
                titleIcon: 'delete_forever',
                message: 'Are you sure you want to delete this species?',
                messageIcon: '',
                confirmButtonText: 'Delete',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteLocationSpecies(locationspecies);
            }
        });
    };
    LocationSpeciesTableComponent.prototype.deleteLocationSpecies = function (locationspecies) {
        var _this = this;
        this.locationSpeciesService.delete(locationspecies.id)
            .subscribe(function () {
            _this.openSnackBar('Species Deleted', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Species not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    LocationSpeciesTableComponent.prototype.editSpeciesDiagnosis = function (speciesdiagnosis, locationspecies) {
        var _this = this;
        // form the exisiting diagnosis id array
        var existingDiagnoses = [];
        for (var _i = 0, _a = locationspecies.speciesdiagnoses; _i < _a.length; _i++) {
            var item = _a[_i];
            existingDiagnoses.push(item.diagnosis);
        }
        this.editSpeciesDiagnosisDialogRef = this.dialog.open(edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                locationspecies: locationspecies,
                speciesdiagnosis: speciesdiagnosis,
                laboratories: this.laboratories,
                existing_diagnoses: existingDiagnoses,
                species_diagnosis_action: 'edit',
                title: 'Edit Species Diagnosis',
                titleIcon: 'edit',
                actionButtonIcon: 'save',
                action_button_text: 'Save'
            }
        });
        this.editSpeciesDiagnosisDialogRef.afterClosed()
            .subscribe(function () {
            _this.dataUpdatedService.triggerRefresh();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    LocationSpeciesTableComponent.prototype.addSpeciesDiagnosis = function (locationspecies) {
        var _this = this;
        // form the exisiting diagnosis id array
        var existingDiagnoses = [];
        for (var _i = 0, _a = locationspecies.speciesdiagnoses; _i < _a.length; _i++) {
            var item = _a[_i];
            existingDiagnoses.push(item.diagnosis);
        }
        this.editSpeciesDiagnosisDialogRef = this.dialog.open(edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                locationspecies: locationspecies,
                laboratories: this.laboratories,
                existing_diagnoses: existingDiagnoses,
                species_diagnosis_action: 'add',
                title: 'Add diagnosis for this species',
                titleIcon: 'add',
                actionButtonIcon: 'save',
                action_button_text: 'Save'
            }
        });
        this.editSpeciesDiagnosisDialogRef.afterClosed()
            .subscribe(function () {
            _this.dataUpdatedService.triggerRefresh();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    LocationSpeciesTableComponent.prototype.openDeleteSpeciesDiagnosisConfirm = function (speciesdiagnosis) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            disableClose: true,
            data: {
                title: 'Delete diagnosis from this species',
                titleIcon: 'delete_forever',
                message: 'Are you sure you want to delete this diagnosis?',
                messageIcon: '',
                confirmButtonText: 'Delete',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteSpeciesDiagnosis(speciesdiagnosis);
                _this.dataUpdatedService.triggerRefresh();
            }
        });
    };
    LocationSpeciesTableComponent.prototype.deleteSpeciesDiagnosis = function (speciesdiagnosis) {
        var _this = this;
        this.speciesDiagnosisService.delete(speciesdiagnosis.id)
            .subscribe(function () {
            _this.openSnackBar('Species diagnosis deleted', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Species diagnosis not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    LocationSpeciesTableComponent.prototype.editSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editKnownDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownDeadTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editEstimatedDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editKnownSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownSickTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editEstimatedSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; };
    LocationSpeciesTableComponent.prototype.populationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editAgeBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editAgeBiasTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editSexBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSexBiasTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editCaptiveTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editCaptiveTooltip; return string; };
    LocationSpeciesTableComponent.prototype.editSpeciesDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; };
    LocationSpeciesTableComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    __decorate([
        core_1.Input('eventData'),
        __metadata("design:type", Object)
    ], LocationSpeciesTableComponent.prototype, "eventData", void 0);
    __decorate([
        core_1.Input('locationspecies'),
        __metadata("design:type", Array)
    ], LocationSpeciesTableComponent.prototype, "locationspecies", void 0);
    __decorate([
        core_1.Input('permissions'),
        __metadata("design:type", Object)
    ], LocationSpeciesTableComponent.prototype, "permissions", void 0);
    __decorate([
        core_1.Input('ageBiases'),
        __metadata("design:type", Array)
    ], LocationSpeciesTableComponent.prototype, "ageBiases", void 0);
    __decorate([
        core_1.Input('sexBiases'),
        __metadata("design:type", Array)
    ], LocationSpeciesTableComponent.prototype, "sexBiases", void 0);
    __decorate([
        core_1.Input('laboratories'),
        __metadata("design:type", Array)
    ], LocationSpeciesTableComponent.prototype, "laboratories", void 0);
    LocationSpeciesTableComponent = __decorate([
        core_1.Component({
            selector: 'app-location-species-table',
            templateUrl: './location-species-table.component.html',
            styleUrls: ['./location-species-table.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                    animations_1.state('expanded', animations_1.style({ height: '*', visibility: 'visible' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [material_1.MatDialog,
            location_species_service_1.LocationSpeciesService,
            material_3.MatSnackBar,
            species_diagnosis_service_1.SpeciesDiagnosisService,
            data_updated_service_1.DataUpdatedService])
    ], LocationSpeciesTableComponent);
    return LocationSpeciesTableComponent;
}());
exports.LocationSpeciesTableComponent = LocationSpeciesTableComponent;
//# sourceMappingURL=location-species-table.component.js.map