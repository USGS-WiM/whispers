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
var operators_1 = require("rxjs/operators");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var confirm_component_1 = require("@confirm/confirm.component");
var administrative_level_one_service_1 = require("@services/administrative-level-one.service");
var species_service_1 = require("@services/species.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
var land_ownership_service_1 = require("@services/land-ownership.service");
var CustomNotificationComponent = /** @class */ (function () {
    function CustomNotificationComponent(customNotificationDialogRef, adminLevelOneService, _speciesService, diagnosisService, landOwnershipService, formBuilder, snackBar, dialog, data) {
        this.customNotificationDialogRef = customNotificationDialogRef;
        this.adminLevelOneService = adminLevelOneService;
        this._speciesService = _speciesService;
        this.diagnosisService = diagnosisService;
        this.landOwnershipService = landOwnershipService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.data = data;
        this.errorMessage = '';
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.administrative_level_one = [];
        this.selectedAdminLevelOnes = []; // chips list
        this.speciesLoading = false;
        this.species = [];
        this.selectedSpecies = []; // chips list
        // diagnoses or speciesDiagnosis?? -BAD 12/3/19
        this.diagnosesLoading = false;
        this.selectedDiagnoses = []; // chips list
        this.landOwnershipLoading = false;
        this.selectedLandOwnership = []; // chips list
        this.adminLevelOneControl = new forms_1.FormControl();
        this.speciesControl = new forms_1.FormControl();
        this.speciesDiagnosisControl = new forms_1.FormControl();
        this.landOwnershipControl = new forms_1.FormControl();
        this.buildCueForm();
    }
    CustomNotificationComponent.prototype.buildCueForm = function () {
        this.cueForm = this.formBuilder.group({
            event_id: null,
            species_diagnosis: null,
            species: null,
            administrative_level_one: null,
            administrative_level_two: null,
            affected_count: null,
            affected_count_operator: '__gte',
            diagnosis_includes_all: false,
            species_includes_all: false,
            administrative_level_one_includes_all: false,
            speciesDiagnosis_includes_all: false,
            and_params: [],
            complete: null
        });
    };
    CustomNotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.administrative_level_one = adminLevelOnes;
            _this.filteredAdminLevelOnes = _this.adminLevelOneControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.administrative_level_one, 'name'); }));
            // below block not needed because no incoming query
            //   if (this.data.query && this.data.query['administrative_level_one'].length > 0) {
            //     for (const index in adminLevelOnes) {
            //       if (this.data.query['administrative_level_one'].some(
            //         function (el) {
            //           console.log(el);
            //           let match = false;
            //           if (typeof el === 'number') {
            //             if (el === adminLevelOnes[index].id) {
            //               match = true;
            //             }
            //           } else {
            //             if (el === adminLevelOnes[index].name) {
            //               match = true;
            //             }
            //           }
            //           return match;
            //         })) {
            //         this.dropdownSetup(this.adminLevelOneControl, this.selectedAdminLevelOnes, adminLevelOnes[index]);
            //       }
            //     }
            //  }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get landOwnerships from the LandOwnerShipService
        this.landOwnershipService.getLandOwnerships()
            .subscribe(function (landOwnerships) {
            _this.landOwnerships = landOwnerships;
            // alphabetize the species options list
            _this.landOwnerships.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            _this.filteredLandOwnership = _this.landOwnershipControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.landOwnerships, 'name'); }));
            // below block not needed because no incoming query
            // if (this.data.query && this.data.query['landOwnerships'] && this.data.query['landOwnerships'].length > 0) {
            //   for (const index in landOwnerships) {
            //     if (this.data.query['landOwnerships'].some(
            //       function (el) {
            //         let match = false;
            //         if (typeof el === 'number') {
            //           if (el === landOwnerships[index].id) {
            //             match = true;
            //           }
            //         } else {
            //           if (el === landOwnerships[index].name) {
            //             match = true;
            //           }
            //         }
            //         return match;
            //       })) {
            //       this.dropdownSetup(this.landOwnershipControl, this.selectedLandOwnership, landOwnerships[index]);
            //     }
            //   }
            // }
            _this.landOwnershipLoading = false;
            _this.landOwnershipControl.enable();
        }, function (error) {
            _this.errorMessage = error;
        });
        // this.speciesLoading = true;
        // get species from the species service
        this._speciesService.getSpecies()
            .subscribe(function (species) {
            _this.species = species;
            // alphabetize the species options list
            _this.species.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            _this.filteredSpecies = _this.speciesControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.species, 'name'); }));
            // this.speciesLoading = false;
            _this.speciesControl.enable();
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnoses from the diagnoses service
        // IMPORTANT NOTE: while the form specifies a 'species diagnosis' in this context it means the diagnosis assigned to a species (more specifically a locationspecies)
        // the form options must be populated from the diagnoses lookup table. the backend will then search speciesdiagnoses records that contain the diagnosis or diagnoses selected.
        this.diagnosisService.getDiagnoses()
            .subscribe(function (diagnoses) {
            _this.diagnoses = diagnoses;
            // alphabetize the diagnosis options list
            _this.diagnoses.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            _this.filteredDiagnoses = _this.speciesDiagnosisControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.diagnoses, 'name'); }));
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    CustomNotificationComponent.prototype.dropdownSetup = function (formControl, selectedValues, value) {
        selectedValues.push(value);
        this.resetFormControl(formControl);
    };
    CustomNotificationComponent.prototype.displayFn = function (item) {
        return item ? item.name : undefined;
    };
    CustomNotificationComponent.prototype.stopPropagation = function (event) {
        event.stopPropagation();
    };
    CustomNotificationComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    };
    CustomNotificationComponent.prototype.addChip = function (event, selectedValuesArray, control) {
        var self = this;
        // Define selection constant
        var alreadySelected = false;
        var selection = event.option.value;
        if (selectedValuesArray.length > 0) {
            // check if the selection is already in the selected array
            for (var _i = 0, selectedValuesArray_1 = selectedValuesArray; _i < selectedValuesArray_1.length; _i++) {
                var item = selectedValuesArray_1[_i];
                if (item.id === selection.id) {
                    alreadySelected = true;
                    this.openSnackBar('Already Selected', 'OK');
                }
            }
            if (alreadySelected === false) {
                // Add selected item to selected array, which will show as a chip
                selectedValuesArray.push(selection);
                // reset the form
                this.resetFormControl(control);
            }
        }
        else {
            // Add selected item to selected array, which will show as a chip
            selectedValuesArray.push(selection);
            // reset the form
            this.resetFormControl(control);
        }
    };
    CustomNotificationComponent.prototype.removeChip = function (chip, selectedValuesArray, control) {
        // Find key of object in selectedValuesArray
        var index = selectedValuesArray.indexOf(chip);
        // If key exists
        if (index >= 0) {
            // Remove key from selectedValuesArray array
            selectedValuesArray.splice(index, 1);
        }
    };
    CustomNotificationComponent.prototype.filter = function (val, searchArray, searchProperty) {
        var realval = val && typeof val === 'object' ? val.searchProperty : val;
        var result = [];
        var lastOption = null;
        for (var i = 0; i < searchArray.length; i++) {
            if (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase())) {
                if (searchArray[i][searchProperty] !== lastOption) {
                    lastOption = searchArray[i][searchProperty];
                    result.push(searchArray[i]);
                }
            }
        }
        return result;
    };
    CustomNotificationComponent.prototype.resetFormControl = function (control) {
        switch (control) {
            case 'adminLevelOne':
                this.adminLevelOneControl.reset();
                break;
            case 'species':
                this.speciesControl.reset();
                break;
            case 'diagnosis':
                this.speciesDiagnosisControl.reset();
                break;
            case 'landOwnership': this.landOwnershipControl.reset();
        }
    };
    // TODO - set up DELETE Cue
    CustomNotificationComponent.prototype.deleteCue = function () {
    };
    CustomNotificationComponent.prototype.openCueDeleteConfirm = function (eventGroup) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Cue Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this cue?\nThis action cannot be undone.',
                confirmButtonText: 'Yes, Delete Cue',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteCue();
            }
        });
    };
    // TODO - set up POST for notification cue
    CustomNotificationComponent.prototype.onSubmit = function () {
        this.customNotificationDialogRef.close();
    };
    CustomNotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-custom-notification',
            templateUrl: './custom-notification.component.html',
            styleUrls: ['./custom-notification.component.scss']
        }),
        __param(8, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            species_service_1.SpeciesService,
            diagnosis_service_1.DiagnosisService,
            land_ownership_service_1.LandOwnershipService,
            forms_1.FormBuilder,
            material_3.MatSnackBar,
            material_1.MatDialog, Object])
    ], CustomNotificationComponent);
    return CustomNotificationComponent;
}());
exports.CustomNotificationComponent = CustomNotificationComponent;
//# sourceMappingURL=custom-notification.component.js.map