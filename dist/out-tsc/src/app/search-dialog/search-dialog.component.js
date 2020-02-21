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
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms/");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var app_utilities_1 = require("@app/app.utilities");
var administrative_level_one_service_1 = require("@services/administrative-level-one.service");
var event_type_service_1 = require("@services/event-type.service");
var diagnosis_type_service_1 = require("@services/diagnosis-type.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
var species_service_1 = require("@services/species.service");
var administrative_level_two_service_1 = require("@services/administrative-level-two.service");
var search_dialog_service_1 = require("@search-dialog/search-dialog.service");
var display_value_pipe_1 = require("@pipes/display-value.pipe");
var event_service_1 = require("@app/services/event.service");
var app_settings_1 = require("@app/app.settings");
var SearchDialogComponent = /** @class */ (function () {
    function SearchDialogComponent(searchDialogRef, formBuilder, searchDialogService, adminLevelOneService, adminLevelTwoService, _eventTypeService, _diagnosisTypeService, diagnosisService, _speciesService, eventService, displayValuePipe, datePipe, snackBar, data) {
        this.searchDialogRef = searchDialogRef;
        this.formBuilder = formBuilder;
        this.searchDialogService = searchDialogService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this._eventTypeService = _eventTypeService;
        this._diagnosisTypeService = _diagnosisTypeService;
        this.diagnosisService = diagnosisService;
        this._speciesService = _speciesService;
        this.eventService = eventService;
        this.displayValuePipe = displayValuePipe;
        this.datePipe = datePipe;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        // visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.defaultSearchQuery = app_settings_1.APP_SETTINGS.DEFAULT_SEARCH_QUERY;
        this.defaultDisplayQuery = app_settings_1.APP_SETTINGS.DEFAULT_DISPLAY_QUERY;
        this.selectedEventTypes = [];
        this.selectedDiagnosisTypes = [];
        this.selectedDiagnoses = []; // chips list
        this.administrative_level_one = [];
        this.selectedAdminLevelOnes = []; // chips list
        this.administrative_level_two = [];
        this.selectedAdminLevelTwos = []; // chips list
        this.species = [];
        this.selectedSpecies = []; // chips list
        this.adminLevelTwosLoading = false;
        this.diagnosesLoading = false;
        this.speciesLoading = true;
        this.eventTypeControl = new forms_1.FormControl();
        this.diagnosisTypeControl = new forms_1.FormControl();
        this.diagnosisControl = new forms_1.FormControl();
        this.adminLevelOneControl = new forms_1.FormControl();
        this.adminLevelTwoControl = new forms_1.FormControl();
        this.speciesControl = new forms_1.FormControl({ value: null, disabled: true });
        this.buildSearchForm();
    }
    SearchDialogComponent.prototype.endDateBeforeStart = function (AC) {
        AC.get('end_date').setErrors(null);
        AC.get('start_date').setErrors(null);
        var start_date = AC.get('start_date').value;
        var end_date = AC.get('end_date').value;
        if ((start_date !== null && end_date !== null) && start_date > end_date) {
            AC.get('end_date').setErrors({ endDateBeforeStart: true });
        }
        return null;
    };
    SearchDialogComponent.prototype.buildSearchForm = function () {
        this.searchForm = this.formBuilder.group({
            event_type: null,
            diagnosis: null,
            diagnosis_type: null,
            species: null,
            administrative_level_one: null,
            administrative_level_two: null,
            affected_count: null,
            affected_count_operator: '__gte',
            start_date: null,
            end_date: null,
            diagnosis_type_includes_all: false,
            diagnosis_includes_all: false,
            species_includes_all: false,
            administrative_level_one_includes_all: false,
            administrative_level_two_includes_all: false,
            and_params: [],
            complete: null
        }, {
            validator: [this.endDateBeforeStart]
        });
    };
    SearchDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get event types from the eventType service
        this._eventTypeService.getEventTypes()
            .subscribe(function (eventTypes) {
            _this.eventTypes = eventTypes;
            _this.filteredEventTypes = _this.eventTypeControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.eventTypes, 'name'); }));
            if (_this.data.query && _this.data.query['event_type'] && _this.data.query['event_type'].length > 0) {
                var _loop_1 = function (index) {
                    if (_this.data.query['event_type'].some(function (el) { return el === eventTypes[index].name; })) {
                        _this.dropdownSetup(_this.eventTypeControl, _this.selectedEventTypes, eventTypes[index]);
                    }
                };
                for (var index in eventTypes) {
                    _loop_1(index);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosis types from the diagnosisType service
        this._diagnosisTypeService.getDiagnosisTypes()
            .subscribe(function (diagnosisTypes) {
            _this.diagnosisTypes = diagnosisTypes;
            // alphabetize the diagnosis type options list
            _this.diagnosisTypes.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            _this.filteredDiagnosisTypes = _this.diagnosisTypeControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.diagnosisTypes, 'name'); }));
            if (_this.data.query && _this.data.query['diagnosis_type'] && _this.data.query['diagnosis_type'].length > 0) {
                var _loop_2 = function (index) {
                    if (_this.data.query['diagnosis_type'].some(function (el) {
                        console.log(el);
                        var match = false;
                        if (typeof el == 'number') {
                            if (el === diagnosisTypes[index].id) {
                                match = true;
                            }
                        }
                        else {
                            if (el === diagnosisTypes[index].name) {
                                match = true;
                            }
                        }
                        return match;
                    })) {
                        _this.dropdownSetup(_this.diagnosisTypeControl, _this.selectedDiagnosisTypes, diagnosisTypes[index]);
                    }
                };
                /*for (const index in diagnosisTypes) {
                  if (this.data.query['diagnosis_type'].some(function (el) { return el === diagnosisTypes[index].name; })) {
                    this.dropdownSetup(this.diagnosisTypeControl, this.selectedDiagnosisTypes, diagnosisTypes[index]);
                  }
                }*/
                for (var index in diagnosisTypes) {
                    _loop_2(index);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnoses from the diagnoses service
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
            _this.filteredDiagnoses = _this.diagnosisControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.diagnoses, 'name'); }));
            if (_this.data.query && _this.data.query['diagnosis'] && _this.data.query['diagnosis'].length > 0) {
                var _loop_3 = function (index) {
                    if (_this.data.query['diagnosis'].some(function (el) {
                        // console.log(el);
                        var match = false;
                        if (typeof el === 'number') {
                            if (el === diagnoses[index].id) {
                                match = true;
                            }
                        }
                        else {
                            if (el === diagnoses[index].name) {
                                match = true;
                            }
                        }
                        return match;
                    })) {
                        _this.dropdownSetup(_this.diagnosisControl, _this.selectedDiagnoses, diagnoses[index]);
                    }
                };
                for (var index in diagnoses) {
                    _loop_3(index);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.administrative_level_one = adminLevelOnes;
            _this.filteredAdminLevelOnes = _this.adminLevelOneControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.administrative_level_one, 'name'); }));
            if (_this.data.query && _this.data.query['administrative_level_one'].length > 0) {
                var _loop_4 = function (index) {
                    if (_this.data.query['administrative_level_one'].some(function (el) {
                        console.log('variable el: ' + el);
                        var match = false;
                        if (typeof el === 'number') {
                            if (el === adminLevelOnes[index].id) {
                                match = true;
                            }
                        }
                        else {
                            if (el === adminLevelOnes[index].name) {
                                match = true;
                            }
                        }
                        return match;
                    })) {
                        _this.dropdownSetup(_this.adminLevelOneControl, _this.selectedAdminLevelOnes, adminLevelOnes[index]);
                        _this.updateAdminLevelTwoOptions(adminLevelOnes[index].id);
                    }
                };
                for (var index in adminLevelOnes) {
                    _loop_4(index);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get adminLevelTwos from the adminLevelTwo service
        // TODO: remove this from ngOnInit. Not performant. Move to the updateAdminLevelTwoOptions function
        /* if (this.data.query && this.data.query['administrative_level_two'].length > 0) {
          this.adminLevelTwoService.getAdminLevelTwos()
            .subscribe(
              (adminLevelTwos) => {
                this.administrative_level_two = adminLevelTwos;
                this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges
                  .startWith(null)
                  .map(val => this.filter(val, this.administrative_level_two, 'name'));
    
              },
              error => {
                this.errorMessage = <any>error;
              }
            ); */
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
            if (_this.data.query && _this.data.query['species'] && _this.data.query['species'].length > 0) {
                var _loop_5 = function (index) {
                    if (_this.data.query['species'].some(function (el) {
                        var match = false;
                        if (typeof el == 'number') {
                            if (el === species[index].id) {
                                match = true;
                            }
                        }
                        else {
                            if (el === species[index].name) {
                                match = true;
                            }
                        }
                        return match;
                    })) {
                        _this.dropdownSetup(_this.speciesControl, _this.selectedSpecies, species[index]);
                    }
                };
                /*for (const index in species) {
                  if (this.data.query['species'].some(function (el) { return el === species[index].name; })) {
                    this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
                  }
                }*/
                for (var index in species) {
                    _loop_5(index);
                }
            }
            _this.speciesLoading = false;
            _this.speciesControl.enable();
        }, function (error) {
            _this.errorMessage = error;
        });
        var query = this.data.query;
        if (query && query['affected_count']) {
            this.searchForm.controls['affected_count'].setValue(query['affected_count']);
        }
        if (query && query['affected_count_operator']) {
            this.searchForm.controls['affected_count_operator'].setValue(query['affected_count_operator']);
        }
        if (query && query['start_date']) {
            var startDate = app_utilities_1.APP_UTILITIES.timeZoneAdjust(query['start_date']);
            this.searchForm.controls['start_date'].setValue(startDate);
        }
        if (query && query['end_date']) {
            var endDate = app_utilities_1.APP_UTILITIES.timeZoneAdjust(query['end_date']);
            this.searchForm.controls['end_date'].setValue(endDate);
        }
        //always set value, even if null, because null is valid value
        if (query['complete'] === undefined) {
            this.searchForm.controls['complete'].setValue(null);
        }
        else {
            this.searchForm.controls['complete'].setValue(query['complete']);
        }
        // Handling of and_params
        if (query && query['diagnosis_type_includes_all'] === true) {
            this.searchForm.controls['diagnosis_type_includes_all'].setValue(true);
        }
        if (query && query['diagnosis_includes_all'] === true) {
            this.searchForm.controls['diagnosis_includes_all'].setValue(true);
        }
        if (query && query['species_includes_all'] === true) {
            this.searchForm.controls['species_includes_all'].setValue(true);
        }
        if (query && query['administrative_level_one_includes_all'] === true) {
            this.searchForm.controls['administrative_level_one_includes_all'].setValue(true);
        }
        if (query && query['administrative_level_two_includes_all'] === true) {
            this.searchForm.controls['administrative_level_two_includes_all'].setValue(true);
        }
    };
    SearchDialogComponent.prototype.dropdownSetup = function (formControl, selectedValues, value) {
        selectedValues.push(value);
        this.resetFormControl(formControl);
    };
    SearchDialogComponent.prototype.filter = function (val, searchArray, searchProperty) {
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
    SearchDialogComponent.prototype.displayFn = function (diagnosis) {
        return diagnosis ? diagnosis.name : undefined;
    };
    SearchDialogComponent.prototype.stopPropagation = function (event) {
        event.stopPropagation();
    };
    SearchDialogComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    };
    SearchDialogComponent.prototype.resetFormControl = function (control) {
        switch (control) {
            case 'eventType':
                this.eventTypeControl.reset();
                break;
            case 'diagnosisType':
                this.diagnosisTypeControl.reset();
                break;
            case 'diagnosis':
                this.diagnosisControl.reset();
                break;
            case 'adminLevelOne':
                this.adminLevelOneControl.reset();
                break;
            case 'adminLevelTwo': this.adminLevelTwoControl.reset();
        }
    };
    SearchDialogComponent.prototype.addChip = function (event, selectedValuesArray, control) {
        var _this = this;
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
        ///////////////
        if (control === 'diagnosisType') {
            this.diagnosesLoading = true;
            var diagnosisTypeIDArray = [];
            for (var _a = 0, selectedValuesArray_2 = selectedValuesArray; _a < selectedValuesArray_2.length; _a++) {
                var diagnosisType = selectedValuesArray_2[_a];
                diagnosisTypeIDArray.push(diagnosisType.id);
            }
            var diagnosisTypeQueryString = 'diagnosis_type=' + diagnosisTypeIDArray.toString();
            this.diagnosisService.queryDiagnoses(diagnosisTypeQueryString)
                .subscribe(function (diagnoses) {
                // needed to use the 'self' proxy for 'this' because of a not fully understood scoping issue
                self.diagnoses = diagnoses;
                // alphabetize the admmin level twos list
                self.diagnoses.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                _this.diagnosesLoading = false;
                _this.filteredDiagnoses = _this.diagnosisControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.diagnoses, 'name'); }));
            }, function (error) {
                _this.errorMessage = error;
                _this.diagnosesLoading = false;
            });
        }
        //////////////
        if (control === 'adminLevelOne') {
            this.adminLevelTwosLoading = true;
            this.adminLevelTwoService.queryAdminLevelTwos(selection.id)
                .subscribe(function (adminLevelTwos) {
                // needed to use the 'self' proxy for 'this' because of a not fully understood scoping issue
                self.administrative_level_two = self.administrative_level_two.concat(adminLevelTwos);
                // alphabetize the admmin level twos list
                self.administrative_level_two.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                _this.adminLevelTwosLoading = false;
                _this.filteredAdminLevelTwos = _this.adminLevelTwoControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, self.administrative_level_two, 'name'); }));
            }, function (error) {
                _this.errorMessage = error;
                _this.adminLevelTwosLoading = false;
            });
        }
    };
    SearchDialogComponent.prototype.removeChip = function (chip, selectedValuesArray, control) {
        // Find key of object in selectedValuesArray
        var index = selectedValuesArray.indexOf(chip);
        // If key exists
        if (index >= 0) {
            // Remove key from selectedValuesArray array
            selectedValuesArray.splice(index, 1);
        }
    };
    SearchDialogComponent.prototype.extractIDs = function (objectArray) {
        var idArray = [];
        for (var _i = 0, objectArray_1 = objectArray; _i < objectArray_1.length; _i++) {
            var object = objectArray_1[_i];
            idArray.push(object.id);
        }
        return idArray;
    };
    SearchDialogComponent.prototype.updateAdminLevelTwoOptions = function (selectedAdminLevelOneID) {
        var _this = this;
        var id = Number(selectedAdminLevelOneID);
        // query the adminleveltwos endpoint for appropriate records
        // update the options for the adminLevelTwo select with the response
        this.adminLevelTwoService.queryAdminLevelTwos(id)
            .subscribe(function (adminLevelTwos) {
            // this.administrative_level_two.push(adminLevelTwos);
            _this.administrative_level_two = _this.administrative_level_two.concat(adminLevelTwos);
            _this.filteredAdminLevelTwos = _this.adminLevelTwoControl.valueChanges.pipe(operators_1.startWith(null), operators_1.map(function (val) { return _this.filter(val, _this.administrative_level_two, 'name'); }));
            if (_this.data.query && _this.data.query['administrative_level_two'].length > 0) {
                var _loop_6 = function (index) {
                    if (_this.data.query['administrative_level_two'].some(function (el) { return el === adminLevelTwos[index]['name']; })) {
                        _this.dropdownSetup(_this.adminLevelTwoControl, _this.selectedAdminLevelTwos, adminLevelTwos[index]);
                    }
                };
                for (var index in adminLevelTwos) {
                    _loop_6(index);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SearchDialogComponent.prototype.clearSelection = function () {
        this.selectedEventTypes = [];
        this.selectedDiagnosisTypes = [];
        this.selectedDiagnoses = [];
        this.selectedSpecies = [];
        this.selectedAdminLevelOnes = [];
        this.selectedAdminLevelTwos = [];
        // use default displayQuery for display in markup, send to searchDialogService
        //this.searchDialogService.setDisplayQuery(this.defaultDisplayQuery);
        // use default search query, send to searchDialogService
        //this.searchDialogService.setSearchQuery(this.defaultSearchQuery);
        this.clearDates();
        this.searchForm.reset();
    };
    SearchDialogComponent.prototype.clearDates = function () {
        this.searchForm.get('start_date').setValue(null);
        this.searchForm.get('end_date').setValue(null);
    };
    SearchDialogComponent.prototype.submitSearch = function (formValue) {
        var searchQuery = {
            event_type: [],
            diagnosis: [],
            diagnosis_type: [],
            species: [],
            administrative_level_one: [],
            administrative_level_two: [],
            affected_count: formValue.affected_count,
            affected_count_operator: formValue.affected_count_operator,
            start_date: this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd'),
            end_date: this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd'),
            diagnosis_type_includes_all: formValue.diagnosis_type_includes_all,
            diagnosis_includes_all: formValue.diagnosis_includes_all,
            species_includes_all: formValue.species_includes_all,
            administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
            administrative_level_two_includes_all: formValue.administrative_level_two_includes_all,
            and_params: [],
            complete: formValue.complete
        };
        var displayQuery = {
            event_type: [],
            diagnosis: [],
            diagnosis_type: [],
            species: [],
            administrative_level_one: [],
            administrative_level_two: [],
            affected_count: formValue.affected_count,
            affected_count_operator: formValue.affected_count_operator,
            // start_date: formValue.start_date,
            // end_date: formValue.end_date,
            start_date: this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd'),
            end_date: this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd'),
            diagnosis_type_includes_all: formValue.diagnosis_type_includes_all,
            diagnosis_includes_all: formValue.diagnosis_includes_all,
            species_includes_all: formValue.species_includes_all,
            administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
            administrative_level_two_includes_all: formValue.administrative_level_two_includes_all,
            and_params: [],
            complete: formValue.complete
        };
        if (searchQuery.diagnosis_type_includes_all === true) {
            searchQuery.and_params.push('diagnosis_type');
        }
        if (searchQuery.diagnosis_includes_all === true) {
            searchQuery.and_params.push('diagnosis');
        }
        if (searchQuery.species_includes_all === true) {
            searchQuery.and_params.push('species');
        }
        if (searchQuery.administrative_level_one_includes_all === true) {
            searchQuery.and_params.push('administrative_level_one');
        }
        if (searchQuery.administrative_level_two_includes_all === true) {
            searchQuery.and_params.push('administrative_level_two');
        }
        // update the formValue array with full selection objects
        formValue.event_type = this.selectedEventTypes;
        formValue.diagnosis = this.selectedDiagnoses;
        formValue.diagnosis_type = this.selectedDiagnosisTypes;
        formValue.species = this.selectedSpecies;
        formValue.administrative_level_one = this.selectedAdminLevelOnes;
        formValue.administrative_level_two = this.selectedAdminLevelTwos;
        ///////
        // insert display query convert function here (?)
        // const displayQuery = APP_UTILITIES.convertSearchQuerytoDisplayQuery(formValue);
        // use formValue to populate the Current Search panel
        for (var _i = 0, _a = formValue.event_type; _i < _a.length; _i++) {
            var event_type = _a[_i];
            displayQuery.event_type.push(event_type.name);
        }
        for (var _b = 0, _c = formValue.diagnosis; _b < _c.length; _b++) {
            var diagnosis = _c[_b];
            displayQuery.diagnosis.push(diagnosis.name);
        }
        for (var _d = 0, _e = formValue.diagnosis_type; _d < _e.length; _d++) {
            var diagnosis_type = _e[_d];
            displayQuery.diagnosis_type.push(diagnosis_type.name);
        }
        for (var _f = 0, _g = formValue.species; _f < _g.length; _f++) {
            var species = _g[_f];
            displayQuery.species.push(species.name);
        }
        for (var _h = 0, _j = formValue.administrative_level_one; _h < _j.length; _h++) {
            var adminLevelOne = _j[_h];
            displayQuery.administrative_level_one.push(adminLevelOne.name);
        }
        for (var _k = 0, _l = formValue.administrative_level_two; _k < _l.length; _k++) {
            var adminLevelTwo = _l[_k];
            displayQuery.administrative_level_two.push(adminLevelTwo.name);
        }
        // patch the searchForm value with the IDs of the selected objects
        // this.searchForm.patchValue({
        //   event_type: this.extractIDs(this.selectedEventTypes),
        //   diagnosis: this.extractIDs(this.selectedDiagnoses),
        //   diagnosis_type: this.extractIDs(this.selectedDiagnosisTypes),
        //   species: this.extractIDs(this.selectedSpecies),
        //   administrative_level_one: this.extractIDs(this.selectedAdminLevelOnes),
        //   administrative_level_two: this.extractIDs(this.selectedAdminLevelTwos)
        // });
        searchQuery.event_type = this.extractIDs(this.selectedEventTypes);
        searchQuery.diagnosis = this.extractIDs(this.selectedDiagnoses);
        searchQuery.diagnosis_type = this.extractIDs(this.selectedDiagnosisTypes);
        searchQuery.species = this.extractIDs(this.selectedSpecies);
        searchQuery.administrative_level_one = this.extractIDs(this.selectedAdminLevelOnes);
        searchQuery.administrative_level_two = this.extractIDs(this.selectedAdminLevelTwos);
        // TODO: query the eventService with the searchForm value, on success,
        // pass results to home component for display via searchDialogService
        // this.eventService.queryEvents(searchQuery)
        //   .subscribe(
        //     (queryResults) => {
        //       console.log(queryResults);
        //     },
        //     error => {
        //       this.errorMessage = <any>error;
        //     }
        //   );
        // use displayQuery for display of current query in markup, send to searchDialogService
        this.searchDialogService.setDisplayQuery(displayQuery);
        // use searchForm.value to build the web service query, send to searchDialogService
        this.searchDialogService.setSearchQuery(searchQuery);
        sessionStorage.setItem('currentSearch', JSON.stringify(searchQuery));
        gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'Search submitted, date range: ' + searchQuery.start_date + ' - ' + searchQuery.end_date });
    };
    SearchDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-search-dialog',
            templateUrl: './search-dialog.component.html',
            styleUrls: ['./search-dialog.component.scss']
        }),
        __param(13, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_3.MatDialogRef,
            forms_1.FormBuilder,
            search_dialog_service_1.SearchDialogService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            event_type_service_1.EventTypeService,
            diagnosis_type_service_1.DiagnosisTypeService,
            diagnosis_service_1.DiagnosisService,
            species_service_1.SpeciesService,
            event_service_1.EventService,
            display_value_pipe_1.DisplayValuePipe,
            common_1.DatePipe,
            material_1.MatSnackBar, Object])
    ], SearchDialogComponent);
    return SearchDialogComponent;
}());
exports.SearchDialogComponent = SearchDialogComponent;
//# sourceMappingURL=search-dialog.component.js.map