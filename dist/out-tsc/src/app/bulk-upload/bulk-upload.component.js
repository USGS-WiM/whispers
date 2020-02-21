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
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var ngx_papaparse_1 = require("ngx-papaparse");
var country_service_1 = require("@services/country.service");
var administrative_level_one_service_1 = require("@services/administrative-level-one.service");
var administrative_level_two_service_1 = require("@services/administrative-level-two.service");
var event_service_1 = require("@services/event.service");
var confirm_component_1 = require("@confirm/confirm.component");
var BulkUploadComponent = /** @class */ (function () {
    function BulkUploadComponent(bulkUploadDialogRef, snackBar, countryService, adminLevelOneService, adminLevelTwoService, eventService, datePipe, papa, dialog, data) {
        this.bulkUploadDialogRef = bulkUploadDialogRef;
        this.snackBar = snackBar;
        this.countryService = countryService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.eventService = eventService;
        this.datePipe = datePipe;
        this.papa = papa;
        this.dialog = dialog;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.bulkUploadProcessing = false;
    }
    BulkUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get countries from the countryService
        this.countryService.getCountries()
            .subscribe(function (countries) {
            _this.countries = countries;
            _this.countries.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (administrative_level_one) {
            _this.adminLevelOnes = administrative_level_one;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    BulkUploadComponent.prototype.onFileSelected = function () {
        var _this = this;
        var inputNode = document.querySelector('#file');
        var options = {
            complete: function (results, file) {
                console.log('CSV Data Parsed: ', results, file);
                _this.parsedData = results;
                _this.speciesDiagnosisArray = results.data;
                _this.parseSpeciesDiagnosisArray(_this.speciesDiagnosisArray);
            },
            error: function (error, file) {
                console.log('There was an error parsing your CSV file: ', error, file);
            },
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
        };
        if (typeof (FileReader) !== 'undefined') {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.rawData = e.target.result;
                _this.papa.parse(_this.rawData, options);
            };
            reader.readAsText(inputNode.files[0]);
        }
    };
    BulkUploadComponent.prototype.buildEventRecord = function (eventObj) { return eventObj; };
    BulkUploadComponent.prototype.buildEventDiagnosisArray = function (diagnosisIDArray) {
        var array = [];
        var stringArray = JSON.parse('[' + diagnosisIDArray + ']');
        for (var _i = 0, stringArray_1 = stringArray; _i < stringArray_1.length; _i++) {
            var item = stringArray_1[_i];
            array.push({ 'diagnosis': item });
        }
        return array;
    };
    BulkUploadComponent.prototype.lookupCountryID = function (countryAbbreviation) {
        var result = this.countries.filter(function (country) {
            return country.abbreviation === countryAbbreviation;
        });
        return result[0].id;
    };
    BulkUploadComponent.prototype.lookupAdminLevelOneID = function (adminLevelOneAbbreviation) {
        var result = this.adminLevelOnes.filter(function (adminLevelOne) {
            return adminLevelOne.abbreviation === adminLevelOneAbbreviation;
        });
        return result[0].id;
    };
    BulkUploadComponent.prototype.buildDiagnosisLabArray = function (orgIDArray) {
        var array = JSON.parse('[' + orgIDArray + ']');
        return array;
    };
    BulkUploadComponent.prototype.addeventLocation = function (eventLocation) {
        return eventLocation;
    };
    BulkUploadComponent.prototype.addLocationSpecies = function (locationSpecies) { return locationSpecies; };
    BulkUploadComponent.prototype.addSpeciesDiagnosis = function (speciesDiagnosis) { return speciesDiagnosis; };
    BulkUploadComponent.prototype.addDiagnosisOrganizations = function (organizationsInput) {
        if (organizationsInput === null) {
            return [];
        }
        else {
            if (typeof organizationsInput === 'number') {
                return [organizationsInput];
            }
            else if (typeof organizationsInput === 'string') {
                var array = JSON.parse('[' + organizationsInput + ']');
                return array;
            }
        }
    };
    BulkUploadComponent.prototype.parseSpeciesDiagnosisArray = function (dataArray) {
        this.newEventsArray = [];
        // loop through the parsed data array to build event(s) submission that is properly nested
        // for (let i = 0; i < dataArray.length; i++) { }
        var currentEventOrdinal = 0;
        var currentLocationOrdinal = 1;
        var currentLocationSpeciesOrdinal = 1;
        var currentEventIndex;
        var currentLocationIndex;
        var currentLocationSpeciesIndex;
        for (var _i = 0, _a = dataArray; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.event_ordinal > currentEventOrdinal) {
                // since the item's event_ordinal is larger than the currentEventOrdinal,
                // event record does not exist.
                // create new event record with all the child data from the CSV line
                // Note: the new_species_diagnosis field population below includes a ternary operator to catch undefined and null values and insert a blank array to satisfy serializer on the server/
                var newEvent = void 0;
                newEvent = this.buildEventRecord({
                    event_reference: item.event_reference,
                    event_type: item.event_type,
                    public: item.public,
                    complete: item.complete,
                    new_event_diagnoses: this.buildEventDiagnosisArray(item.eventdiagnoses),
                    new_event_locations: [
                        {
                            name: item.name,
                            start_date: this.datePipe.transform(item.start_date, 'yyyy-MM-dd'),
                            end_date: this.datePipe.transform(item.end_date, 'yyyy-MM-dd'),
                            country: this.lookupCountryID(item.country),
                            administrative_level_one: this.lookupAdminLevelOneID(item.administrative_level_one),
                            administrative_level_two: item.administrative_level_two,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            land_ownership: item.land_ownership,
                            history: 'This event location was added using the bulk upload process.',
                            new_location_species: [
                                {
                                    species: item.species,
                                    population_count: item.population_count,
                                    sick_count: item.sick_count,
                                    dead_count: item.dead_count,
                                    sick_count_estimated: item.sick_count_estimated,
                                    dead_count_estimated: item.dead_count_estimated,
                                    captive: item.captive,
                                    new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                                        {
                                            diagnosis: item.diagnosis,
                                            cause: item.cause,
                                            basis: item.basis,
                                            suspect: item.suspect,
                                            tested_count: item.tested_count,
                                            diagnosis_count: item.diagnosis_count,
                                            new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
                // push the new event record to the newEventsArray
                this.newEventsArray.push(newEvent);
                // update the currentEventOrdinal to the event_ordinal of the item just processed
                currentEventOrdinal = item.event_ordinal;
            }
            else {
                // since the item's event_ordinal is not larger than the currentEventOrdinal
                // the event record already exists.
                // Next step:
                // check location ordinal
                if (item.location_ordinal > currentLocationOrdinal) {
                    // since the item's location_ordinal is larger than currentLocationOrdinal,
                    // eventlocation record does not exist.
                    // create new eventLocation record with all the child data from the CSV line
                    var newEventLocation = void 0;
                    newEventLocation = this.addeventLocation({
                        name: item.name,
                        start_date: this.datePipe.transform(item.start_date, 'yyyy-MM-dd'),
                        end_date: this.datePipe.transform(item.end_date, 'yyyy-MM-dd'),
                        country: this.lookupCountryID(item.country),
                        administrative_level_one: this.lookupAdminLevelOneID(item.administrative_level_one),
                        administrative_level_two: item.administrative_level_two,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        land_ownership: item.land_ownership,
                        history: 'This event location was added using the bulk upload process.',
                        new_location_species: [
                            {
                                species: item.species,
                                population_count: item.population_count,
                                sick_count: item.sick_count,
                                dead_count: item.dead_count,
                                sick_count_estimated: item.sick_count_estimated,
                                dead_count_estimated: item.dead_count_estimated,
                                captive: item.captive,
                                new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                                    {
                                        diagnosis: item.diagnosis,
                                        cause: item.cause,
                                        basis: item.basis,
                                        suspect: item.suspect,
                                        tested_count: item.tested_count,
                                        diagnosis_count: item.diagnosis_count,
                                        new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                                    }
                                ]
                            }
                        ]
                    });
                    // get the array index for the current event record
                    currentEventIndex = currentEventOrdinal - 1;
                    // add the new event location to the current event record
                    this.newEventsArray[currentEventIndex].new_event_locations.push(newEventLocation);
                    // update the currentLocationOrdinal to the location_ordinal of the item just processed
                    currentLocationOrdinal = item.location_ordinal;
                    // update the currentLocationSpeciesOrdinal back to 1(starting position) since this is a new eventLocation
                    currentLocationSpeciesOrdinal = 1;
                }
                else {
                    // since the item's location_ordinal is not larger than the currentLocationOrdinal
                    // the eventLocation record already exists.
                    // Next step:
                    // check location species ordinal
                    if (item.location_species_ordinal > currentLocationSpeciesOrdinal) {
                        // since the item's location_species_ordinal is larger than currentLocationSpeciesOrdinal,
                        // locationSpecies record does not exist.
                        // create new locationSpecies record with all the child data from the CSV line
                        var newLocationSpecies = void 0;
                        newLocationSpecies = this.addLocationSpecies({
                            species: item.species,
                            population_count: item.population_count,
                            sick_count: item.sick_count,
                            dead_count: item.dead_count,
                            sick_count_estimated: item.sick_count_estimated,
                            dead_count_estimated: item.dead_count_estimated,
                            captive: item.captive,
                            new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                                {
                                    diagnosis: item.diagnosis,
                                    cause: item.cause,
                                    basis: item.basis,
                                    suspect: item.suspect,
                                    tested_count: item.tested_count,
                                    diagnosis_count: item.diagnosis_count,
                                    new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                                }
                            ]
                        });
                        // get the array index for the current location species
                        currentLocationIndex = currentLocationOrdinal - 1;
                        // get the array index for the current event record
                        currentEventIndex = currentEventOrdinal - 1;
                        // add the new location species to the currnent eventLocation record
                        this.newEventsArray[currentEventIndex].new_event_locations[currentLocationIndex].new_location_species.push(newLocationSpecies);
                        // update the currentLocationSpeciesOrdinal to the location_species_ordinal of the item just processed
                        currentLocationSpeciesOrdinal = item.location_species_ordinal;
                    }
                    else {
                        // since the item's location_species_ordinal is not larger than the currentLocationSpeciesOrdinal
                        // (and must be equal)
                        // the locationSpecies already exists.
                        // Next step:
                        // add the speciesDiagnosis
                        // the only reason for a location species to appear more than once is to include an addtional species diagnosis, so there should be no case
                        // where there is an undefined or null diagnosis value at this part of the logic tree, negating need for the ternary operator used above.
                        var newSpeciesDiagnosis = void 0;
                        newSpeciesDiagnosis = this.addSpeciesDiagnosis({
                            diagnosis: item.diagnosis,
                            cause: item.cause,
                            basis: item.basis,
                            suspect: item.suspect,
                            tested_count: item.tested_count,
                            diagnosis_count: item.diagnosis_count,
                            new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                        });
                        // get the array index for the current event record
                        currentEventIndex = currentEventOrdinal - 1;
                        // get the array index for the current location species
                        currentLocationIndex = currentLocationOrdinal - 1;
                        // get the array index for the current location species
                        currentLocationSpeciesIndex = currentLocationSpeciesOrdinal - 1;
                        // add the new event location to the current event record
                        this.newEventsArray[currentEventIndex].new_event_locations[currentLocationIndex].new_location_species[currentLocationSpeciesIndex].new_species_diagnoses.push(newSpeciesDiagnosis);
                        // update the currentLocationOrdinal to the location_ordinal of the item just processed
                        // currentSpeciesDiagnosisOrdinal = item.species_diagnosis_ordinal;
                    }
                }
            }
        } // end of parsing loop
        console.log(this.newEventsArray);
        // send this.newEventsArray to the submitData function that sends it to the server
        this.submitData(this.newEventsArray);
    };
    BulkUploadComponent.prototype.submitEvent = function (eventSubmission) {
        var _this = this;
        this.eventService.create(eventSubmission)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.confirmDialogRef = _this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Event Saved',
                    titleIcon: 'check',
                    message: 'The event with the event reference "' + event.event_reference + '" was successfully saved. The Event ID is ' + event.id,
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
            _this.iterateEventCount();
            return { success: true, event: event, error: null };
        }, function (error) {
            // this.submitLoading = false;
            // this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
            _this.confirmDialogRef = _this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Event Save Failed',
                    titleIcon: 'warning',
                    message: 'The event with the event reference "' + eventSubmission.event_reference + '" failed to save. The error is: ' + error,
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
            _this.iterateEventCount();
            return { success: false, event: null, error: error };
        });
    };
    BulkUploadComponent.prototype.submitData = function (newEventsArray) {
        this.bulkUploadProcessing = true;
        this.responseCount = 0;
        this.eventCount = newEventsArray.length;
        var responseArray = [];
        for (var _i = 0, newEventsArray_1 = newEventsArray; _i < newEventsArray_1.length; _i++) {
            var eventSubmission = newEventsArray_1[_i];
            responseArray.push(this.submitEvent(eventSubmission));
        }
    };
    BulkUploadComponent.prototype.iterateEventCount = function () {
        this.responseCount++;
        if (this.responseCount === this.eventCount) {
            this.bulkUploadProcessing = false;
            this.bulkUploadDialogRef.close();
        }
    };
    BulkUploadComponent.prototype.downloadGuidance = function () {
    };
    BulkUploadComponent.prototype.downloadTemplate = function () {
    };
    BulkUploadComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    BulkUploadComponent = __decorate([
        core_1.Component({
            selector: 'app-bulk-upload',
            templateUrl: './bulk-upload.component.html',
            styleUrls: ['./bulk-upload.component.scss']
        }),
        __param(9, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            material_3.MatSnackBar,
            country_service_1.CountryService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            event_service_1.EventService,
            common_1.DatePipe,
            ngx_papaparse_1.Papa,
            material_1.MatDialog, Object])
    ], BulkUploadComponent);
    return BulkUploadComponent;
}());
exports.BulkUploadComponent = BulkUploadComponent;
// export interface Response {
//   success: boolean;
//   event: Object;
// }
//# sourceMappingURL=bulk-upload.component.js.map