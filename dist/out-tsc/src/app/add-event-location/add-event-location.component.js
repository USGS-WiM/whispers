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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms/");
var rxjs_1 = require("rxjs");
var material_1 = require("@angular/material");
var operators_1 = require("rxjs/operators");
var material_2 = require("@angular/material");
// import { MAT_DIALOG_DATA } from '@angular/material';
var event_location_service_1 = require("@app/services/event-location.service");
var species_service_1 = require("@services/species.service");
var country_service_1 = require("@app/services/country.service");
var administrative_level_one_service_1 = require("@services/administrative-level-one.service");
var administrative_level_two_service_1 = require("@services/administrative-level-two.service");
var land_ownership_service_1 = require("@services/land-ownership.service");
var sex_bias_service_1 = require("@services/sex-bias.service");
var age_bias_service_1 = require("@services/age-bias.service");
var contact_service_1 = require("@services/contact.service");
var contact_type_service_1 = require("@services/contact-type.service");
var comment_type_service_1 = require("@services/comment-type.service");
var organization_service_1 = require("@services/organization.service");
var create_contact_component_1 = require("@create-contact/create-contact.component");
var create_contact_service_1 = require("@create-contact/create-contact.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
var edit_species_diagnosis_component_1 = require("@app/edit-species-diagnosis/edit-species-diagnosis.component");
var diagnosis_basis_service_1 = require("@app/services/diagnosis-basis.service");
var diagnosis_cause_service_1 = require("@app/services/diagnosis-cause.service");
var app_utilities_1 = require("@app/app.utilities");
var app_field_help_text_1 = require("@app/app.field-help-text");
var gnis_lookup_component_1 = require("@app/gnis-lookup/gnis-lookup.component");
var confirm_component_1 = require("@confirm/confirm.component");
var view_contact_details_component_1 = require("@app/view-contact-details/view-contact-details.component");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var AddEventLocationComponent = /** @class */ (function () {
    function AddEventLocationComponent(formBuilder, dialog, datePipe, 
    // public addEventLocationDialogRef: MatDialogRef<AddEventLocationComponent>,
    landOwnershipService, countryService, adminLevelOneService, adminLevelTwoService, speciesService, sexBiasService, ageBiasService, contactTypeService, commentTypeService, organizationService, diagnosisService, diagnosisBasisService, diagnosisCauseService, contactService, createContactSevice, eventLocationService, displayValuePipe, snackBar) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.datePipe = datePipe;
        this.landOwnershipService = landOwnershipService;
        this.countryService = countryService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.speciesService = speciesService;
        this.sexBiasService = sexBiasService;
        this.ageBiasService = ageBiasService;
        this.contactTypeService = contactTypeService;
        this.commentTypeService = commentTypeService;
        this.organizationService = organizationService;
        this.diagnosisService = diagnosisService;
        this.diagnosisBasisService = diagnosisBasisService;
        this.diagnosisCauseService = diagnosisCauseService;
        this.contactService = contactService;
        this.createContactSevice = createContactSevice;
        this.eventLocationService = eventLocationService;
        this.displayValuePipe = displayValuePipe;
        this.snackBar = snackBar;
        this.childReadyEvent = new core_1.EventEmitter();
        this.errorMessage = '';
        this.diagnosisBases = [];
        this.diagnosisCauses = [];
        this.userContacts = [];
        this.userContactsLoading = false;
        this.submitLoading = false;
        this.speciesDiagnosisViolation = false;
        this.nonCompliantSpeciesDiagnoses = [];
        /* numberAffectedViolation = true; */
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.filteredSpecies = [];
        this.filteredContacts = [];
        this.locationSpeciesNumbersViolation = false;
        this.latitudePattern = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        this.longitudePattern = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        /** controls for the MatSelect filter keyword */
        this.adminLevelOneFilterCtrl = new forms_1.FormControl();
        this.adminLevelTwoFilterCtrl = new forms_1.FormControl();
        this.speciesFilterCtrl = new forms_1.FormControl();
        this.contactFilterCtrl = new forms_1.FormControl();
        this.filteredAdminLevelOnes = new rxjs_1.ReplaySubject();
        this.filteredAdminLevelTwos = new rxjs_1.ReplaySubject();
        this.buildAddEventLocationForm();
        createContactSevice.getCreatedContact().subscribe(function (createdContact) {
            _this.userContacts.push(createdContact);
            _this.userContacts.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
        });
    }
    AddEventLocationComponent.prototype.buildAddEventLocationForm = function () {
        this.addEventLocationForm = this.formBuilder.group({
            event: null,
            name: '',
            start_date: null,
            end_date: null,
            country: [app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID, forms_1.Validators.required],
            administrative_level_one: [null, forms_1.Validators.required],
            administrative_level_two: [null, forms_1.Validators.required],
            latitude: [null, forms_1.Validators.pattern(this.latitudePattern)],
            longitude: [null, forms_1.Validators.pattern(this.longitudePattern)],
            land_ownership: [null, forms_1.Validators.required],
            gnis_name: '',
            gnis_id: '',
            site_description: '',
            history: '',
            environmental_factors: '',
            clinical_signs: '',
            comment: '',
            // used only to capture event_type from event - not part of eventlocation record
            event_type: null,
            new_location_species: this.formBuilder.array([
                this.initLocationSpecies()
            ]),
            new_location_contacts: this.formBuilder.array([
            // this.initLocationContacts()
            ])
        }, {
            validator: [this.endDateBeforeStart, this.startDateTodayorEarlierMortalityEvent]
        });
    };
    // ngOnDestroy() {
    //   this._onDestroy.next();
    //   this._onDestroy.complete();
    // }
    AddEventLocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addEventLocationForm.get('event_type').setValue(this.eventTypeID);
        this.filteredSpecies = new Array();
        this.filteredSpecies.push(new rxjs_1.ReplaySubject());
        this.ManageSpeciesControl(0);
        this.filteredContacts = new Array();
        this.filteredContacts.push(new rxjs_1.ReplaySubject());
        this.ManageContactControl(0);
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
        this.adminLevelOneService.queryAdminLevelOnes(app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
            // load the initial bank list
            _this.filteredAdminLevelOnes.next(_this.adminLevelOnes);
            // listen for search field value changes
            _this.adminLevelOneFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterAdminLevelOnes();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        // get species from the speciesService
        this.speciesService.getSpecies()
            .subscribe(function (species) {
            _this.species = species;
            _this.species.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the initial control
            _this.filteredSpecies[0].next(_this.species);
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnoses from the diagnoses service
        this.diagnosisService.getDiagnoses()
            .subscribe(function (diagnoses) {
            _this.allDiagnoses = diagnoses;
            _this.allDiagnoses.sort(function (a, b) {
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
        // get diagnosisBases from the diagnosisBasis service
        this.diagnosisBasisService.getDiagnosisBases()
            .subscribe(function (diagnosisBases) {
            _this.diagnosisBases = diagnosisBases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosisCauses from the diagnosisCause service
        this.diagnosisCauseService.getDiagnosisCauses()
            .subscribe(function (diagnosisCauses) {
            _this.diagnosisCauses = diagnosisCauses;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get sexBiases from the sexBias service
        this.sexBiasService.getSexBiases()
            .subscribe(function (sexBiases) {
            _this.sexBiases = sexBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get ageBiases from the ageBias service
        this.ageBiasService.getAgeBiases()
            .subscribe(function (ageBiases) {
            _this.ageBiases = ageBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get contact types from the ContactTypeService
        this.contactTypeService.getContactTypes()
            .subscribe(function (contactTypes) {
            _this.contactTypes = contactTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get comment types from the CommentTypeService
        this.commentTypeService.getCommentTypes()
            .subscribe(function (commentTypes) {
            _this.commentTypes = commentTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get organizations from the OrganizationService
        this.organizationService.getOrganizations()
            .subscribe(function (organizations) {
            _this.organizations = organizations;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get 'laboratories' from the organizations service
        // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
        this.organizationService.getLaboratories()
            .subscribe(function (laboratories) {
            _this.laboratories = laboratories;
        }, function (error) {
            _this.errorMessage = error;
        });
        // TEMPORARY- will need to use user creds to query user contact list
        // get contact types from the ContactTypeService
        this.userContactsLoading = true;
        this.contactService.getContacts()
            .subscribe(function (contacts) {
            _this.userContacts = contacts;
            _this.userContacts.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the initial control
            _this.filteredContacts[0].next(_this.userContacts);
            _this.userContactsLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.userContactsLoading = false;
        });
    };
    AddEventLocationComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        /* formValue.new_location_contacts.forEach(function (item, i) {
          if (item.contact === null) {
            formValue.new_location_contacts.splice(i, 1);
          }
         }); */
        formValue.event = this.eventData.id;
        // if lat/long fields are deleted to blank, update to null to be a valid number type on PATCH
        if (formValue.latitude === '') {
            formValue.latitude = null;
        }
        if (formValue.longitude === '') {
            formValue.longitude = null;
        }
        // empty value from datepicker does not work with datePipe transform. This converts empty dates to null for the datePipe
        // if (formValue.end_date !== null) {
        //   if (formValue.end_date.toJSON() === null) {
        //     formValue.end_date = null;
        //   }
        // }
        // if (formValue.start_date !== null) {
        //   if (formValue.start_date.toJSON() === null) {
        //     formValue.start_date = null;
        //   }
        // }
        // convert start_date and end_date of eventlocations to 'yyyy-MM-dd' before submission
        // can be removed if configure datepicker to output this format
        // (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
        formValue.start_date = this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd');
        formValue.end_date = this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd');
        // delete the event_type field, which was superficially attached to event location for validation purposes
        delete formValue.event_type;
        // empty array to put in the corrected location contacts
        var contacts = [];
        // check to see if there were blank contacts added and remove them if so
        if (this.addEventLocationForm.get('new_location_contacts') != null) {
            var control_1 = this.addEventLocationForm.get('new_location_contacts');
            this.addEventLocationForm.get('new_location_contacts').value.forEach(function (element) {
                if (element.contact === null) {
                    control_1.removeAt(element);
                }
                else {
                    contacts.push(element);
                }
            });
            formValue.new_location_contacts = contacts;
        }
        this.eventLocationService.create(formValue)
            .subscribe(function (newEventLocation) {
            _this.submitLoading = false;
            _this.openSnackBar('New event location successfully created. Page will reload.', 'OK', 5000);
            _this.addEventLocationForm.reset();
            location.reload();
            gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'New Location Added' });
        }, function (error) {
            _this.errorMessage = error;
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event location not created. Error message: ' + error, 'OK', 8000);
        });
    };
    AddEventLocationComponent.prototype.startDateTodayorEarlierMortalityEvent = function (AC) {
        var start_date = AC.get('start_date').value;
        var event_type = AC.get('event_type').value;
        var today = app_utilities_1.APP_UTILITIES.TODAY;
        if (event_type === 1) {
            if ((start_date !== null) && ((start_date.getTime()) > (today.getTime()))) {
                AC.get('start_date').setErrors({ startDateTodayorEarlierMortalityEvent: true });
            }
        }
        return null;
    };
    AddEventLocationComponent.prototype.endDateBeforeStart = function (AC) {
        AC.get('end_date').setErrors(null);
        AC.get('start_date').setErrors(null);
        var start_date = AC.get('start_date').value;
        var end_date = AC.get('end_date').value;
        if ((start_date !== null && end_date !== null) && start_date > end_date) {
            AC.get('end_date').setErrors({ endDateBeforeStart: true });
        }
        return null;
    };
    AddEventLocationComponent.prototype.minSpecies = function (AC) {
        var locationSpeciesLength = AC.get('new_location_species')['controls'].length;
        if (locationSpeciesLength < 1) {
            AC.get('new_location_species').setErrors({ minSpecies: true });
        }
        return null;
    };
    AddEventLocationComponent.prototype.truncateDecimalDegrees = function ($event, field) {
        var beforeDecimal = ($event + '').split('.')[0];
        var afterDecimal = ($event + '').split('.')[1];
        if (afterDecimal.length > 6) {
            var truncatedValue = beforeDecimal + '.' + afterDecimal.substring(0, 6);
            this.addEventLocationForm.get(field).setValue(truncatedValue);
        }
    };
    AddEventLocationComponent.prototype.checkforMissingSpecies = function () {
        // tslint:disable-next-line:max-line-length
        var locationspecies = this.addEventLocationForm.get('new_location_species');
        var speciesSelectionMissing = false;
        for (var i = 0, j = locationspecies.length; i < j; i++) {
            // tslint:disable-next-line:max-line-length
            if (this.addEventLocationForm.get('new_location_species')['controls'][i].get('species').value === null) {
                speciesSelectionMissing = true;
            }
        }
        if (speciesSelectionMissing) {
            return true;
        }
        else {
            return false;
        }
    };
    // This is a check to make sure there is at least one value for dead_count, sick_count, sick_count_estimated,
    // or dead_count estimate for at least one event location. This isn't necessary for this component, but leaving it here
    // incase one day it is.
    /* checkNumberAffected() {
      const locationspecies = <FormArray>this.addEventLocationForm.get('new_location_species');
      let numbersAffectedRequirementMet = false;
      for (let i = 0, j = locationspecies.length; i < j; i++) {
        if ((locationspecies['controls'][i].get('sick_count').value !== null) || (locationspecies['controls'][i].get('dead_count').value !== null) || (locationspecies['controls'][i].get('sick_count_estimated').value !== null) || (locationspecies['controls'][i].get('dead_count_estimated').value !== null)) {
          numbersAffectedRequirementMet = true;
        }
        if (numbersAffectedRequirementMet) {
          this.numberAffectedViolation = false;
        } else {
          this.numberAffectedViolation = true;
        }
      }
    } */
    AddEventLocationComponent.prototype.checkEventLocationCommentMin = function () {
        // tslint:disable-next-line:max-line-length
        var siteDesciptionCommentLength = this.addEventLocationForm.get('site_description').value.length;
        var historyCommentLength = this.addEventLocationForm.get('history').value.length;
        // tslint:disable-next-line:max-line-length
        var envFactorsCommentLength = this.addEventLocationForm.get('environmental_factors').value.length;
        var clinicalSignsCommentLength = this.addEventLocationForm.get('clinical_signs').value.length;
        // tslint:disable-next-line:max-line-length
        var generalCommentLength = this.addEventLocationForm.get('comment').value.length;
        if ((siteDesciptionCommentLength === 0) && (historyCommentLength === 0) && (envFactorsCommentLength === 0) && (clinicalSignsCommentLength === 0) && (generalCommentLength === 0)) {
            return true;
        }
        return false;
    };
    AddEventLocationComponent.prototype.initLocationSpecies = function () {
        return this.formBuilder.group({
            species: [null, forms_1.Validators.required],
            population_count: [null, forms_1.Validators.min(0)],
            sick_count: [null, forms_1.Validators.min(0)],
            dead_count: [null, forms_1.Validators.min(0)],
            sick_count_estimated: [null, forms_1.Validators.min(0)],
            dead_count_estimated: [null, forms_1.Validators.min(0)],
            priority: null,
            captive: false,
            age_bias: null,
            sex_bias: null,
            new_species_diagnoses: this.formBuilder.array([])
        }, {
            validator: [this.integer, this.estimatedSick, this.estimatedDead]
        });
    };
    AddEventLocationComponent.prototype.initSpeciesDiagnosis = function () {
        return this.formBuilder.group({
            diagnosis: [null, forms_1.Validators.required],
            cause: null,
            basis: null,
            suspect: false,
            tested_count: [null, forms_1.Validators.min(0)],
            diagnosis_count: [null, forms_1.Validators.min(0)],
            positive_count: null,
            suspect_count: null,
            pooled: false,
            new_species_diagnosis_organizations: null
        });
    };
    AddEventLocationComponent.prototype.integer = function (AC) {
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
    AddEventLocationComponent.prototype.estimatedSick = function (AC) {
        AC.get('sick_count_estimated').setErrors(null);
        var sick_count = AC.get('sick_count').value;
        var sick_count_estimated = AC.get('sick_count_estimated').value;
        if (sick_count !== null && sick_count_estimated !== null) {
            if (sick_count_estimated <= sick_count) {
                AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
            }
        }
    };
    AddEventLocationComponent.prototype.estimatedDead = function (AC) {
        AC.get('dead_count_estimated').setErrors(null);
        var dead_count = AC.get('dead_count').value;
        var dead_count_estimated = AC.get('dead_count_estimated').value;
        if (dead_count !== null && dead_count_estimated !== null) {
            if (dead_count_estimated <= dead_count) {
                AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
            }
        }
    };
    // this validation check on hold. may not be needed because it is not possible for the existing locationspecies to violate
    // the business rules, and adding one, even if all 0, can not violate the rule by itself. next check need only happen on event completion.
    // code block below is only partially adapted for this purpose, will need to continue adaptation if this is needed.
    // checkLocationSpeciesNumbers() {
    //   this.locationSpeciesNumbersViolation = false;
    //   // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
    //   if (this.eventData.event_type === 1 ) {
    //     // set var to capture of requirement is met at any of the event locations
    //     let requirementMet = false;
    //     // add in the current form values to the if statement
    //     for (const eventlocation of this.eventData.eventlocations) {
    //       for (const locspecies of eventlocation.locationspecies) {
    //         if (
    //           (
    //             locspecies.sick_count +
    //             locspecies.dead_count +
    //             locspecies.sick_count_estimated +
    //             locspecies.dead_count_estimated +
    //             this.locationSpeciesForm.get('sick_count').value +
    //             this.locationSpeciesForm.get('dead_count').value +
    //             this.locationSpeciesForm.get('sick_count_estimated').value +
    //             this.locationSpeciesForm.get('dead_count_estimated').value
    //           ) >= 1
    //         ) {
    //           requirementMet = true;
    //         }
    //       }
    //     }
    //     if (requirementMet) {
    //       this.locationSpeciesNumbersViolation = false;
    //     } else {
    //       this.locationSpeciesNumbersViolation = true;
    //     }
    //   }
    // }
    AddEventLocationComponent.prototype.initLocationContacts = function () {
        return this.formBuilder.group({
            contact: null,
            contact_type: null
        });
    };
    AddEventLocationComponent.prototype.initLocationComments = function () {
        return this.formBuilder.group({
            comment: '',
            comment_type: null
        });
    };
    // location species
    AddEventLocationComponent.prototype.addLocationSpecies = function () {
        var control = this.addEventLocationForm.get('new_location_species');
        control.push(this.initLocationSpecies());
        var locationSpeciesIndex = control.length - 1;
        this.filteredSpecies.push(new rxjs_1.ReplaySubject());
        this.ManageSpeciesControl(locationSpeciesIndex);
    };
    AddEventLocationComponent.prototype.removeLocationSpecies = function (locationSpeciesIndex) {
        var control = this.addEventLocationForm.get('new_location_species');
        control.removeAt(locationSpeciesIndex);
    };
    AddEventLocationComponent.prototype.getLocationSpecies = function () {
        return this.addEventLocationForm.controls.new_location_species['controls'];
    };
    // location contacts
    AddEventLocationComponent.prototype.addLocationContact = function () {
        var control = this.addEventLocationForm.get('new_location_contacts');
        control.push(this.initLocationContacts());
        var locationContactIndex = control.length - 1;
        this.filteredContacts.push(new rxjs_1.ReplaySubject());
        this.ManageContactControl(locationContactIndex);
    };
    AddEventLocationComponent.prototype.removeLocationContacts = function (locationContactIndex) {
        var control = this.addEventLocationForm.get('new_location_contacts');
        control.removeAt(locationContactIndex);
    };
    AddEventLocationComponent.prototype.getLocationContacts = function () {
        return this.addEventLocationForm.controls.new_location_contacts['controls'];
    };
    // species diagnosis
    AddEventLocationComponent.prototype.addSpeciesDiagnosis = function (locationSpeciesIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        control.push(this.initSpeciesDiagnosis());
        // tslint:disable-next-line:max-line-length
        var speciesDiagnosisIndex = this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses').length - 1;
        return speciesDiagnosisIndex;
    };
    AddEventLocationComponent.prototype.removeSpeciesDiagnosis = function (locationSpeciesIndex, speciesDiagnosisIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        control.removeAt(speciesDiagnosisIndex);
    };
    AddEventLocationComponent.prototype.getSpeciesDiagnoses = function (form) {
        return form.controls.new_species_diagnoses.controls;
    };
    AddEventLocationComponent.prototype.getDiagnosisOrganizations = function (form) {
        return form.controls.new_species_diagnosis_organizations.value;
    };
    AddEventLocationComponent.prototype.viewContactDetailsDialog = function (locationContactIndex) {
        var _this = this;
        var contact_id = this.addEventLocationForm.get('new_location_contacts').value[locationContactIndex].contact;
        if (contact_id == null) {
            this.openSnackBar('First select a contact to view that contact\'s details', 'OK', 5000);
        }
        else {
            // look up contact
            this.contactService.getContactDetails(contact_id)
                .subscribe(function (contactDetails) {
                // Open dialog for viewing contact details
                _this.viewContactDetailsDialogRef = _this.dialog.open(view_contact_details_component_1.ViewContactDetailsComponent, {
                    data: {
                        contact: contactDetails
                    }
                });
                _this.viewContactDetailsDialogRef.afterClosed()
                    .subscribe(function () {
                    // do something after close
                }, function (error) {
                    _this.errorMessage = error;
                });
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    // location comments
    AddEventLocationComponent.prototype.addLocationComments = function (i) {
        var control = this.addEventLocationForm.get('new_comments');
        control.push(this.initLocationComments());
    };
    AddEventLocationComponent.prototype.removeLocationComments = function (i, m) {
        var control = this.addEventLocationForm.get('new_comments');
        control.removeAt(m);
    };
    AddEventLocationComponent.prototype.getLocationComments = function (form) {
        return form.controls.comments.controls;
    };
    AddEventLocationComponent.prototype.updateAdminLevelOneOptions = function (selectedCountryID) {
        var _this = this;
        var id = Number(selectedCountryID);
        // query the adminlevelones endpoint for appropriate records
        // update the options for the adminLevelOne select with the response
        this.addEventLocationForm.get('administrative_level_one').setValue(null);
        this.adminLevelOneService.queryAdminLevelOnes(id)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    AddEventLocationComponent.prototype.updateAdminLevelTwoOptions = function (selectedAdminLevelOneID) {
        var _this = this;
        var id = Number(selectedAdminLevelOneID);
        this.addEventLocationForm.get('administrative_level_two').setValue(null);
        // query the adminleveltwos endpoint for appropriate records
        // update the options for the adminLevelTwo select with the response
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
            // load the initial list
            _this.filteredAdminLevelTwos.next(_this.adminLevelTwos);
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
    AddEventLocationComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AddEventLocationComponent.prototype.setEventLocationForGNISSelect = function (i) {
        console.log('Selecting GNIS record for Event Location Number' + (i + 1));
    };
    AddEventLocationComponent.prototype.openCreateContactDialog = function () {
        this.createContactDialogRef = this.dialog.open(create_contact_component_1.CreateContactComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                contact_action: 'create'
            }
        });
    };
    AddEventLocationComponent.prototype.openEditSpeciesDiagnosisDialog = function (locationSpeciesIndex, speciesDiagnosisIndex, speciesdiagnosis, locationspecies) {
        var _this = this;
        this.editSpeciesDiagnosisDialogRef = this.dialog.open(edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent, {
            minWidth: '40em',
            disableClose: true,
            data: {
                locationspecies: locationspecies.value,
                speciesdiagnosis: speciesdiagnosis.value,
                laboratories: this.laboratories,
                diagnosisBases: this.diagnosisBases,
                diagnosisCauses: this.diagnosisCauses,
                diagnoses: this.allDiagnoses,
                species: this.species,
                // eventlocationIndex: eventLocationIndex,
                locationspeciesIndex: locationSpeciesIndex,
                species_diagnosis_action: 'editInFormArray',
                title: 'Edit Species Diagnosis',
                titleIcon: 'edit',
                actionButtonIcon: 'save',
                action_button_text: 'Save'
            }
        });
        this.editSpeciesDiagnosisDialogRef.afterClosed()
            .subscribe(function (speciesDiagnosisObj) {
            if (speciesDiagnosisObj.action === 'cancel') {
                // remove last species diagnosis added
                // tslint:disable-next-line:max-line-length
                // this.removeSpeciesDiagnosis(speciesDiagnosisObj.eventlocationIndex, speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
                return;
            }
            else if (speciesDiagnosisObj.action === 'editInFormArray') {
                _this.addEventLocationForm.get('new_location_species')['controls'][speciesDiagnosisObj.locationspeciesIndex]
                    .get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].setValue({
                    diagnosis: speciesDiagnosisObj.formValue.diagnosis,
                    cause: speciesDiagnosisObj.formValue.cause,
                    basis: speciesDiagnosisObj.formValue.basis,
                    suspect: speciesDiagnosisObj.formValue.suspect,
                    tested_count: speciesDiagnosisObj.formValue.tested_count,
                    diagnosis_count: speciesDiagnosisObj.formValue.diagnosis_count,
                    positive_count: speciesDiagnosisObj.formValue.positive_count,
                    suspect_count: speciesDiagnosisObj.formValue.suspect_count,
                    pooled: speciesDiagnosisObj.formValue.pooled,
                    new_species_diagnosis_organizations: speciesDiagnosisObj.formValue.new_species_diagnosis_organizations
                });
                // not needed for add event location because Complete events cannot be edited
                // this.checkSpeciesDiagnoses();
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    AddEventLocationComponent.prototype.openGNISLookupDialog = function () {
        var _this = this;
        this.gnisLookupDialogRef = this.dialog.open(gnis_lookup_component_1.GnisLookupComponent, {
            disableClose: true,
            data: {}
        });
        this.gnisLookupDialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.addEventLocationForm.get('gnis_id').setValue(result.id);
            _this.addEventLocationForm.get('gnis_name').setValue(result.name);
        });
    };
    AddEventLocationComponent.prototype.clearGNISEntry = function () {
        this.addEventLocationForm.get('gnis_id').setValue('');
        this.addEventLocationForm.get('gnis_name').setValue('');
    };
    AddEventLocationComponent.prototype.openSpeciesDiagnosisRemoveConfirm = function (locationSpeciesIndex, speciesDiagnosisIndex) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Remove Species Diagnosis',
                titleIcon: 'remove_circle',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to remove this species diagnosis?',
                messageIcon: '',
                confirmButtonText: 'Remove',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                // remove the diagnosis from the available diagnoses unless another species has it
                // tslint:disable-next-line:max-line-length
                var diagnosisID = _this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].get('diagnosis').value;
                // remove the speciesdiagnosis form array instance
                _this.removeSpeciesDiagnosis(locationSpeciesIndex, speciesDiagnosisIndex);
            }
        });
    };
    // not needed for add event location because Complete events cannot be edited
    // checkSpeciesDiagnoses() {
    //   this.speciesDiagnosisViolation = false;
    //   this.nonCompliantSpeciesDiagnoses = [];
    //   if (this.eventData.complete === true) {
    //     let requirementMet = true;
    //     const locationspecies = <FormArray>this.addEventLocationForm.get('new_location_species');
    //     // loop through each new_location_species array
    //     // tslint:disable-next-line:max-line-length
    //     for (let locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
    //       const locationspeciesform = this.addEventLocationForm.get('new_location_species')['controls'][locationspeciesindex];
    //       // tslint:disable-next-line:max-line-length
    //       const speciesdiagnoses = <FormArray>this.addEventLocationForm.get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses');
    //       for (let speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
    //         // tslint:disable-next-line:max-line-length
    //         const speciesdiagnosisform = this.addEventLocationForm.get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex];
    //         // if any of the species diagnoses are missing a cause or basis value, requirement is not met and validation check fails
    //         if (speciesdiagnosisform.get('cause').value === null || speciesdiagnosisform.get('basis').value === null) {
    //           requirementMet = false;
    //           // add to an object storing the non-compliant species diagnoses
    //           this.nonCompliantSpeciesDiagnoses.push({
    //             locationSpeciesNumber: locationspeciesindex + 1,
    //             locationSpeciesName: this.displayValuePipe.transform(locationspeciesform.controls.species.value, 'name', this.species),
    //             speciesDiagnosisNumber: speciesdiagnosisindex + 1,
    //             speciesDiagnosisName: this.displayValuePipe.transform(speciesdiagnosisform.controls.diagnosis.value, 'name', this.allDiagnoses)
    //           });
    //         }
    //       }
    //     }
    //     if (requirementMet) {
    //       this.speciesDiagnosisViolation = false;
    //     } else {
    //       this.speciesDiagnosisViolation = true;
    //     }
    //   }
    // }
    AddEventLocationComponent.prototype.ManageSpeciesControl = function (locationSpeciesIndex) {
        var _this = this;
        // populate the species options list for the specific control
        this.filteredSpecies[locationSpeciesIndex].next(this.species);
        // listen for search field value changes
        this.speciesFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterSpecies(locationSpeciesIndex);
        });
    };
    AddEventLocationComponent.prototype.ManageContactControl = function (locationContactIndex) {
        var _this = this;
        // populate the species options list for the specific control
        this.filteredContacts[locationContactIndex].next(this.userContacts);
        // listen for search field value changes
        this.contactFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterContacts(locationContactIndex);
        });
    };
    // hover text
    AddEventLocationComponent.prototype.contactPersonTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactPersonTooltip; return string; };
    AddEventLocationComponent.prototype.contactTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactTypeTooltip; return string; };
    AddEventLocationComponent.prototype.locationStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationStartDateTooltip; return string; };
    AddEventLocationComponent.prototype.locationEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationEndDateTooltip; return string; };
    AddEventLocationComponent.prototype.stateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.stateTooltip; return string; };
    AddEventLocationComponent.prototype.countryTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countryTooltip; return string; };
    AddEventLocationComponent.prototype.countyTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countyTooltip; return string; };
    AddEventLocationComponent.prototype.locationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationNameTooltip; return string; };
    AddEventLocationComponent.prototype.landOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.landOwnershipTooltip; return string; };
    AddEventLocationComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    AddEventLocationComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    AddEventLocationComponent.prototype.standardizedLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.standardizedLocationNameTooltip; return string; };
    AddEventLocationComponent.prototype.speciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesTooltip; return string; };
    AddEventLocationComponent.prototype.populationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip; return string; };
    AddEventLocationComponent.prototype.ageBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.ageBiasTooltip; return string; };
    AddEventLocationComponent.prototype.sexBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.sexBiasTooltip; return string; };
    AddEventLocationComponent.prototype.captiveTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.captiveTooltip; return string; };
    AddEventLocationComponent.prototype.knownDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.knownDeadTooltip; return string; };
    AddEventLocationComponent.prototype.estimatedDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.estimatedDeadTooltip; return string; };
    AddEventLocationComponent.prototype.estimatedSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.estimatedSickTooltip; return string; };
    AddEventLocationComponent.prototype.knownSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.knownSickTooltip; return string; };
    AddEventLocationComponent.prototype.locationCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTooltip; return string; };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    AddEventLocationComponent.prototype.openAddSpeciesDiagnosisDialog = function (locationSpeciesIndex) {
        var _this = this;
        // create local variable for speciesDiagnosis index
        var speciesDiagnosisIndex = this.addSpeciesDiagnosis(locationSpeciesIndex);
        // create local array of selected diagnoses to feed to the dialog
        var existingSpeciesDiagnoses = [];
        // create a list of the already selected diagnoses for this species to prevent duplicate selection
        // tslint:disable-next-line:max-line-length
        var speciesdiagnoses = this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        // tslint:disable-next-line:max-line-length
        for (var speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
            // tslint:disable-next-line:max-line-length
            var diagnosis = this.addEventLocationForm.get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex].controls.diagnosis.value;
            if (diagnosis !== null) {
                existingSpeciesDiagnoses.push(diagnosis);
            }
        }
        // Open dialog for adding species diagnosis
        this.editSpeciesDiagnosisDialogRef = this.dialog.open(edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent, {
            disableClose: true,
            data: {
                species_diagnosis_action: 'addToFormArray',
                laboratories: this.laboratories,
                // eventlocationIndex: eventLocationIndex,
                locationspeciesIndex: locationSpeciesIndex,
                existing_diagnoses: existingSpeciesDiagnoses,
                title: 'Add Species Diagnosis',
                titleIcon: 'note_add',
                actionButtonIcon: 'note_add'
            }
        });
        this.editSpeciesDiagnosisDialogRef.afterClosed()
            .subscribe(function (speciesDiagnosisObj) {
            if (speciesDiagnosisObj.action === 'cancel') {
                // remove last species diagnosis added
                // tslint:disable-next-line:max-line-length
                _this.removeSpeciesDiagnosis(speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
                return;
            }
            else if (speciesDiagnosisObj.action === 'add') {
                _this.addEventLocationForm.get('new_location_species')['controls'][speciesDiagnosisObj.locationspeciesIndex]
                    .get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].setValue({
                    diagnosis: speciesDiagnosisObj.formValue.diagnosis,
                    cause: speciesDiagnosisObj.formValue.cause,
                    basis: speciesDiagnosisObj.formValue.basis,
                    suspect: speciesDiagnosisObj.formValue.suspect,
                    tested_count: speciesDiagnosisObj.formValue.tested_count,
                    diagnosis_count: speciesDiagnosisObj.formValue.diagnosis_count,
                    positive_count: speciesDiagnosisObj.formValue.positive_count,
                    suspect_count: speciesDiagnosisObj.formValue.suspect_count,
                    pooled: speciesDiagnosisObj.formValue.pooled,
                    new_species_diagnosis_organizations: speciesDiagnosisObj.formValue.new_species_diagnosis_organizations
                });
                // not needed for add event location because Complete events cannot be edited
                // this.checkSpeciesDiagnoses();
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    AddEventLocationComponent.prototype.filterSpecies = function (locationSpeciesIndex) {
        if (!this.species) {
            return;
        }
        // get the search keyword
        var search = this.speciesFilterCtrl.value;
        if (!search) {
            this.filteredSpecies[locationSpeciesIndex].next(this.species.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelTwos
        this.filteredSpecies[locationSpeciesIndex].next(this.species.filter(function (species) { return species.name.toLowerCase().indexOf(search) > -1; }));
    };
    AddEventLocationComponent.prototype.filterContacts = function (locationContactIndex) {
        if (!this.userContacts) {
            return;
        }
        // get the search keyword
        var search = this.contactFilterCtrl.value;
        if (!search) {
            this.filteredContacts[locationContactIndex].next(this.userContacts.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the contacts
        this.filteredContacts[locationContactIndex].next(
        // tslint:disable-next-line:max-line-length
        this.userContacts.filter(function (contact) { return contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1; }));
    };
    AddEventLocationComponent.prototype.filterAdminLevelOnes = function () {
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
    AddEventLocationComponent.prototype.filterAdminLevelTwos = function () {
        if (!this.adminLevelTwos) {
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
    __decorate([
        core_1.Input('eventData'),
        __metadata("design:type", Object)
    ], AddEventLocationComponent.prototype, "eventData", void 0);
    __decorate([
        core_1.Input('eventTypeID'),
        __metadata("design:type", String)
    ], AddEventLocationComponent.prototype, "eventTypeID", void 0);
    __decorate([
        core_1.ViewChild('adminLevelOneSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], AddEventLocationComponent.prototype, "adminLevelOneSelect", void 0);
    __decorate([
        core_1.ViewChild('adminLevelTwoSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], AddEventLocationComponent.prototype, "adminLevelTwoSelect", void 0);
    __decorate([
        core_1.ViewChild('speciesSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], AddEventLocationComponent.prototype, "speciesSelect", void 0);
    __decorate([
        core_1.ViewChild('contactSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], AddEventLocationComponent.prototype, "contactSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AddEventLocationComponent.prototype, "childReadyEvent", void 0);
    AddEventLocationComponent = __decorate([
        core_1.Component({
            selector: 'app-add-event-location',
            templateUrl: './add-event-location.component.html',
            styleUrls: ['./add-event-location.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.DatePipe,
            land_ownership_service_1.LandOwnershipService,
            country_service_1.CountryService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            species_service_1.SpeciesService,
            sex_bias_service_1.SexBiasService,
            age_bias_service_1.AgeBiasService,
            contact_type_service_1.ContactTypeService,
            comment_type_service_1.CommentTypeService,
            organization_service_1.OrganizationService,
            diagnosis_service_1.DiagnosisService,
            diagnosis_basis_service_1.DiagnosisBasisService,
            diagnosis_cause_service_1.DiagnosisCauseService,
            contact_service_1.ContactService,
            create_contact_service_1.CreateContactService,
            event_location_service_1.EventLocationService,
            display_value_pipe_1.DisplayValuePipe,
            material_2.MatSnackBar])
    ], AddEventLocationComponent);
    return AddEventLocationComponent;
}());
exports.AddEventLocationComponent = AddEventLocationComponent;
//# sourceMappingURL=add-event-location.component.js.map