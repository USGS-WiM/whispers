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
var event_location_service_1 = require("@services/event-location.service");
var land_ownership_service_1 = require("@app/services/land-ownership.service");
var country_service_1 = require("@app/services/country.service");
var administrative_level_one_service_1 = require("@app/services/administrative-level-one.service");
var administrative_level_two_service_1 = require("@app/services/administrative-level-two.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var gnis_lookup_component_1 = require("@app/gnis-lookup/gnis-lookup.component");
var app_utilities_1 = require("@app/app.utilities");
var app_field_help_text_1 = require("@app/app.field-help-text");
var common_1 = require("@angular/common");
var EditEventLocationComponent = /** @class */ (function () {
    function EditEventLocationComponent(formBuilder, dialog, datePipe, eventLocationService, landOwnershipService, countryService, adminLevelOneService, adminLevelTwoService, editEventLocationDialogRef, snackBar, dataUpdatedService, data) {
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.datePipe = datePipe;
        this.eventLocationService = eventLocationService;
        this.landOwnershipService = landOwnershipService;
        this.countryService = countryService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.editEventLocationDialogRef = editEventLocationDialogRef;
        this.snackBar = snackBar;
        this.dataUpdatedService = dataUpdatedService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.startDateViolation = false;
        this.latitudePattern = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        this.longitudePattern = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        this.filteredAdminLevelOnes = new rxjs_1.ReplaySubject(1);
        this.adminLevelOneFilterCtrl = new forms_1.FormControl();
        this.filteredAdminLevelTwos = new rxjs_1.ReplaySubject(1);
        this.adminLevelTwoFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildEditEventLocationForm();
    }
    EditEventLocationComponent.prototype.endDateBeforeStart = function (AC) {
        AC.get('end_date').setErrors(null);
        AC.get('start_date').setErrors(null);
        var start_date = AC.get('start_date').value;
        var end_date = AC.get('end_date').value;
        if ((start_date !== null && end_date !== null) && start_date > end_date) {
            AC.get('end_date').setErrors({ endDateBeforeStart: true });
            AC.get('start_date').setErrors({ endDateBeforeStart: true });
        }
        return null;
    };
    EditEventLocationComponent.prototype.buildEditEventLocationForm = function () {
        this.editEventLocationForm = this.formBuilder.group({
            id: null,
            event: null,
            name: '',
            start_date: null,
            end_date: null,
            country: [null, forms_1.Validators.required],
            administrative_level_one: [null, forms_1.Validators.required],
            administrative_level_two: [null, forms_1.Validators.required],
            latitude: [null, forms_1.Validators.pattern(this.latitudePattern)],
            longitude: [null, forms_1.Validators.pattern(this.longitudePattern)],
            land_ownership: [null, forms_1.Validators.required],
            gnis_name: '',
            gnis_id: ''
        }, {
            validator: [this.endDateBeforeStart]
        });
    };
    EditEventLocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get landOwnerships from the LandOwnerShipService
        this.landOwnershipService.getLandOwnerships()
            .subscribe(function (landOwnerships) {
            _this.landOwnerships = landOwnerships;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get countries from the countryService
        this.countryService.getCountries()
            .subscribe(function (countries) {
            _this.countries = countries;
        }, function (error) {
            _this.errorMessage = error;
        });
        // query adminLevelOnes from the adminLevelOneService using default country
        this.adminLevelOneService.queryAdminLevelOnes(this.data.eventLocationData.country)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
            // populate the search select options for the adminLevelOne control
            _this.filteredAdminLevelOnes.next(adminLevelOnes);
            // listen for search field value changes
            _this.adminLevelOneFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterAdminLevelOnes();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        this.adminLevelTwoService.queryAdminLevelTwos(this.data.eventLocationData.administrative_level_one)
            .subscribe(function (adminLevelTwos) {
            _this.adminLevelTwos = adminLevelTwos;
            _this.adminLevelTwos.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the adminLevelTwo control
            _this.filteredAdminLevelTwos.next(adminLevelTwos);
            // listen for search field value changes
            _this.adminLevelTwoFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterAdminLevelTwos();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        this.editEventLocationForm.patchValue({
            id: this.data.eventLocationData.id,
            name: this.data.eventLocationData.name,
            event: this.data.eventLocationData.event,
            start_date: app_utilities_1.APP_UTILITIES.timeZoneAdjust(this.data.eventLocationData.start_date),
            end_date: app_utilities_1.APP_UTILITIES.timeZoneAdjust(this.data.eventLocationData.end_date),
            country: this.data.eventLocationData.country.toString(),
            administrative_level_one: this.data.eventLocationData.administrative_level_one,
            administrative_level_two: this.data.eventLocationData.administrative_level_two,
            latitude: this.data.eventLocationData.latitude,
            longitude: this.data.eventLocationData.longitude,
            gnis_name: this.data.eventLocationData.gnis_name,
            gnis_id: this.data.eventLocationData.gnis_id
        });
        if (this.data.eventLocationData.land_ownership !== null) {
            this.editEventLocationForm.get('land_ownership').setValue(this.data.eventLocationData.land_ownership.toString());
        }
        this.preventStartDateRemoval();
    };
    EditEventLocationComponent.prototype.filterAdminLevelOnes = function () {
        if (!this.adminLevelOnes) {
            return;
        }
        // get the search keyword
        var search = this.adminLevelOneFilterCtrl.value;
        if (!search) {
            this.filteredAdminLevelOnes.next(this.adminLevelOnes.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelOnes
        this.filteredAdminLevelOnes.next(this.adminLevelOnes.filter(function (admin_level_one) { return admin_level_one.name.toLowerCase().indexOf(search) > -1; }));
    };
    EditEventLocationComponent.prototype.filterAdminLevelTwos = function () {
        if (!this.adminLevelOnes) {
            return;
        }
        // get the search keyword
        var search = this.adminLevelTwoFilterCtrl.value;
        if (!search) {
            this.filteredAdminLevelTwos.next(this.adminLevelTwos.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelTwos
        this.filteredAdminLevelTwos.next(this.adminLevelTwos.filter(function (admin_level_two) { return admin_level_two.name.toLowerCase().indexOf(search) > -1; }));
    };
    EditEventLocationComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EditEventLocationComponent.prototype.locationStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationStartDateTooltip; return string; };
    EditEventLocationComponent.prototype.locationEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationEndDateTooltip; return string; };
    EditEventLocationComponent.prototype.stateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.stateTooltip; return string; };
    EditEventLocationComponent.prototype.countryTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countryTooltip; return string; };
    EditEventLocationComponent.prototype.editCountyTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editCountyTooltip; return string; };
    EditEventLocationComponent.prototype.editLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationNameTooltip; return string; };
    EditEventLocationComponent.prototype.editLandOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; };
    EditEventLocationComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    EditEventLocationComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    EditEventLocationComponent.prototype.editStandardizedLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; };
    EditEventLocationComponent.prototype.updateAdminLevelOneOptions = function (selectedCountryID) {
        var _this = this;
        var id = Number(selectedCountryID);
        this.editEventLocationForm.get('administrative_level_one').setValue(null);
        // query the adminlevelones endpoint for appropriate records
        // update the options for the adminLevelOne select with the response
        this.adminLevelOneService.queryAdminLevelOnes(id)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EditEventLocationComponent.prototype.preventStartDateRemoval = function () {
        this.startDateViolation = false;
        if (this.editEventLocationForm.get('start_date').value === null) {
            this.startDateViolation = true;
        }
    };
    EditEventLocationComponent.prototype.updateAdminLevelTwoOptions = function (selectedAdminLevelOneID) {
        var _this = this;
        var id = Number(selectedAdminLevelOneID);
        // query the adminleveltwos endpoint for appropriate records
        // update the options for the adminLevelTwo select with the response
        this.editEventLocationForm.get('administrative_level_two').setValue(null);
        this.adminLevelTwoService.queryAdminLevelTwos(id)
            .subscribe(function (adminLevelTwos) {
            _this.adminLevelTwos = adminLevelTwos;
            _this.adminLevelTwos.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the adminLevelTwo control
            _this.filteredAdminLevelTwos.next(adminLevelTwos);
            // listen for search field value changes
            _this.adminLevelTwoFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterAdminLevelTwos();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EditEventLocationComponent.prototype.updateEventLocation = function (formValue) {
        var _this = this;
        // if lat/long fields are deleted to blank, update to null to be a valid number type on PATCH
        if (formValue.latitude === '') {
            formValue.latitude = null;
        }
        if (formValue.longitude === '') {
            formValue.longitude = null;
        }
        // empty value from datepicker does not work with datePipe transform. This converts empty dates to null for the datePipe
        if (formValue.end_date !== null) {
            if (formValue.end_date.toJSON() === null) {
                formValue.end_date = null;
            }
        }
        if (formValue.start_date !== null) {
            if (formValue.start_date.toJSON() === null) {
                formValue.start_date = null;
            }
        }
        formValue.start_date = this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd');
        formValue.end_date = this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd');
        this.eventLocationService.update(formValue)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.openSnackBar('Event Location Details Updated', 'OK', 5000);
            _this.editEventLocationDialogRef.close();
            _this.dataUpdatedService.triggerRefresh();
            gtag('event', 'click', { 'event_category': 'Event Location Details', 'event_label': 'Event Location Details Edited' });
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event location details not updated. Error message: ' + error, 'OK', 8000);
        });
    };
    EditEventLocationComponent.prototype.openGNISLookupDialog = function (eventLocationIndex) {
        var _this = this;
        this.gnisLookupDialogRef = this.dialog.open(gnis_lookup_component_1.GnisLookupComponent, {
            disableClose: true,
            data: {
                event_location_index: eventLocationIndex
            }
        });
        this.gnisLookupDialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.editEventLocationForm.get('gnis_id').setValue(result.id);
            _this.editEventLocationForm.get('gnis_name').setValue(result.name);
        });
    };
    EditEventLocationComponent.prototype.clearGNISEntry = function () {
        this.editEventLocationForm.get('gnis_id').setValue('');
        this.editEventLocationForm.get('gnis_name').setValue('');
    };
    EditEventLocationComponent.prototype.truncateDecimalDegrees = function ($event, field) {
        var beforeDecimal = ($event + '').split('.')[0];
        var afterDecimal = ($event + '').split('.')[1];
        if (afterDecimal.length > 6) {
            var truncatedValue = beforeDecimal + '.' + afterDecimal.substring(0, 6);
            this.editEventLocationForm.get(field).setValue(truncatedValue);
        }
    };
    EditEventLocationComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-event-location',
            templateUrl: './edit-event-location.component.html',
            styleUrls: ['./edit-event-location.component.scss']
        }),
        __param(11, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.DatePipe,
            event_location_service_1.EventLocationService,
            land_ownership_service_1.LandOwnershipService,
            country_service_1.CountryService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            material_1.MatDialogRef,
            material_3.MatSnackBar,
            data_updated_service_1.DataUpdatedService, Object])
    ], EditEventLocationComponent);
    return EditEventLocationComponent;
}());
exports.EditEventLocationComponent = EditEventLocationComponent;
//# sourceMappingURL=edit-event-location.component.js.map