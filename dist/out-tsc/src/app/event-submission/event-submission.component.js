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
var forms_1 = require("@angular/forms/");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var operators_1 = require("rxjs/operators");
var core_2 = require("@angular/core");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var stepper_1 = require("@angular/material/stepper");
var material_3 = require("@angular/material");
var app_settings_1 = require("@app/app.settings");
var app_utilities_1 = require("@app/app.utilities");
var app_field_help_text_1 = require("@app/app.field-help-text");
var current_user_service_1 = require("@services/current-user.service");
var event_type_service_1 = require("@app/services/event-type.service");
var legal_status_service_1 = require("@app/services/legal-status.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
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
var staff_service_1 = require("@services/staff.service");
var event_service_1 = require("@app/services/event.service");
var event_status_service_1 = require("@services/event-status.service");
var create_contact_component_1 = require("@create-contact/create-contact.component");
var create_contact_service_1 = require("@create-contact/create-contact.service");
var view_contact_details_component_1 = require("@app/view-contact-details/view-contact-details.component");
var confirm_component_1 = require("@confirm/confirm.component");
var edit_species_diagnosis_component_1 = require("@app/edit-species-diagnosis/edit-species-diagnosis.component");
var diagnostic_info_component_1 = require("@app/diagnostic-info/diagnostic-info.component");
var diagnosis_basis_service_1 = require("@app/services/diagnosis-basis.service");
var diagnosis_cause_service_1 = require("@app/services/diagnosis-cause.service");
var event_submission_confirm_component_1 = require("@app/event-submission/event-submission-confirm/event-submission-confirm.component");
var gnis_lookup_component_1 = require("@app/gnis-lookup/gnis-lookup.component");
var router_1 = require("@angular/router");
var circle_management_component_1 = require("@app/circle-management/circle-management.component");
var circle_choose_component_1 = require("@app/circle-management/circle-choose/circle-choose.component");
var circle_service_1 = require("@services/circle.service");
var EventSubmissionComponent = /** @class */ (function () {
    function EventSubmissionComponent(formBuilder, dialog, publicDialog, bottomSheet, currentUserService, 
    // private matStepper: MatStepper,
    datePipe, displayValuePipe, eventTypeService, legalStatusService, landOwnershipService, countryService, adminLevelOneService, adminLevelTwoService, diagnosisService, speciesService, sexBiasService, ageBiasService, contactTypeService, commentTypeService, organizationService, contactService, createContactSevice, eventService, eventStatusService, staffService, diagnosisBasisService, diagnosisCauseService, circleService, snackBar, router, route, cd) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.publicDialog = publicDialog;
        this.bottomSheet = bottomSheet;
        this.currentUserService = currentUserService;
        this.datePipe = datePipe;
        this.displayValuePipe = displayValuePipe;
        this.eventTypeService = eventTypeService;
        this.legalStatusService = legalStatusService;
        this.landOwnershipService = landOwnershipService;
        this.countryService = countryService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.diagnosisService = diagnosisService;
        this.speciesService = speciesService;
        this.sexBiasService = sexBiasService;
        this.ageBiasService = ageBiasService;
        this.contactTypeService = contactTypeService;
        this.commentTypeService = commentTypeService;
        this.organizationService = organizationService;
        this.contactService = contactService;
        this.createContactSevice = createContactSevice;
        this.eventService = eventService;
        this.eventStatusService = eventStatusService;
        this.staffService = staffService;
        this.diagnosisBasisService = diagnosisBasisService;
        this.diagnosisCauseService = diagnosisCauseService;
        this.circleService = circleService;
        this.snackBar = snackBar;
        this.router = router;
        this.route = route;
        this.cd = cd;
        this.showJSON = false;
        this.availableDiagnoses = [];
        this.userCircles = [];
        this.laboratories = [];
        this.userContacts = [];
        this.userContactsLoading = false;
        this.readCollaboratorArray = [];
        this.writeCollaboratorArray = [];
        this.submitLoading = false;
        this.adminLevelOnesLoading = false;
        this.adminLevelTwosLoading = false;
        this.latitudePattern = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        this.longitudePattern = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        this.commonEventData = {
            species: [],
            contacts: []
        };
        this.missingCommentFlag = false;
        this.diagnosisBases = [];
        this.diagnosisCauses = [];
        this.locationSpeciesNumbersViolation = false;
        this.completeEventLocationSpeciesNumbersViolation = false;
        // starts as true  because no start dates provided by default
        this.locationStartDatesViolation = true;
        this.numberAffectedViolation = true;
        // starts as false because event must be complete = true to trigger violation
        this.locationEndDatesViolation = false;
        this.speciesDiagnosisViolation = false;
        this.duplicateEventOrgViolation = false;
        this.nonCompliantSpeciesDiagnoses = [];
        this.filteredAdminLevelOnes = [];
        this.filteredAdminLevelTwos = [];
        this.filteredSpecies = [];
        this.filteredContacts = [];
        this.filteredOrganizations = [];
        this.organizationFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        /** controls for the MatSelect filter keyword */
        this.adminLevelOneFilterCtrl = new forms_1.FormControl();
        this.adminLevelTwoFilterCtrl = new forms_1.FormControl();
        this.speciesFilterCtrl = new forms_1.FormControl();
        this.contactFilterCtrl = new forms_1.FormControl();
        this.buildEventSubmissionForm();
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
            _this.eventSubmissionForm.get('new_organizations')['controls'][0].get('org').setValue(_this.currentUser.organization);
        });
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
    // filteredAdminLevelOnes: ReplaySubject<AdministrativeLevelOne[]> = new ReplaySubject<AdministrativeLevelOne[]>();
    // filteredAdminLevelTwos: ReplaySubject<AdministrativeLevelTwo[]> = new ReplaySubject<AdministrativeLevelTwo[]>();
    // filteredSpecies: ReplaySubject<Species[]> = new ReplaySubject<Species[]>();
    // filteredContacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>();
    // @HostListener guards against refresh, close, etc.
    // canDeactivate passess back a boolean based on whether the form has been touched or not
    EventSubmissionComponent.prototype.canDeactivate = function () {
        // logic to check if there are pending changes here;
        if (this.eventSubmissionForm.touched === true) {
            // returning false will show a confirm dialog before navigating away
            return false;
        }
        else {
            // returning true will navigate without confirmation
            return true;
        }
    };
    EventSubmissionComponent.prototype.buildEventSubmissionForm = function () {
        this.eventSubmissionForm = this.formBuilder.group({
            event_reference: '',
            event_type: [null, forms_1.Validators.required],
            complete: false,
            public: [true, forms_1.Validators.required],
            // NWHC only
            staff: null,
            event_status: '1',
            quality_check: { value: null, disabled: true },
            legal_status: 1,
            legal_number: '',
            // end NWHC only
            new_organizations: this.formBuilder.array([
                this.initEventOrganization()
            ]),
            new_service_request: this.formBuilder.group({
                request_type: 0,
                new_comments: this.formBuilder.array([])
            }),
            new_event_diagnoses: this.formBuilder.array([]),
            new_comments: this.formBuilder.array([]),
            new_eventgroups: this.formBuilder.array([]),
            new_event_locations: this.formBuilder.array([
                this.initEventLocation()
            ]),
            new_read_collaborators: [],
            new_write_collaborators: []
        });
        this.eventLocationArray = this.eventSubmissionForm.get('new_event_locations');
        this.filteredAdminLevelOnes = new Array();
        this.filteredAdminLevelOnes.push(new rxjs_1.ReplaySubject());
        this.ManageAdminLevelOneControl(0);
        this.filteredAdminLevelTwos = new Array();
        this.filteredAdminLevelTwos.push(new rxjs_1.ReplaySubject());
        this.ManageAdminLevelTwoControl(0);
        var eventLocationSpecies = new Array();
        this.filteredSpecies.push(eventLocationSpecies);
        // initiate an empty replaysubject
        this.filteredSpecies[0].push(new rxjs_1.ReplaySubject());
        this.ManageSpeciesControl(0, 0);
        // this.filteredSpecies.push(new ReplaySubject<Species[]>());
        var eventLocationContacts = new Array();
        this.filteredContacts.push(eventLocationContacts);
        // initiate an empty replaysubject
        this.filteredContacts[0].push(new rxjs_1.ReplaySubject());
        this.ManageContactControl(0, 0);
        this.filteredOrganizations = new Array();
        this.filteredOrganizations.push(new rxjs_1.ReplaySubject());
        this.ManageOrganizationControl(0);
        // this.filteredSpecies.push(new ReplaySubject<Species[]>());
        // this.filteredAdminLevelOnes = new Array<Observable<any>>();
        //this.ManageAdminLevelOneControl(0);
        //this.filteredAdminLevelTwos = new Array<Observable<any>>();
        //this.ManageAdminLevelTwoControl(0);
        //const eventLocationSpecies = new Array<Observable<any>>();
        //this.filteredSpecies.push(eventLocationSpecies);
        //this.ManageSpeciesControl(0, 0);
        // const eventLocationContacts = new Array<Observable<any>>();
        // this.filteredContacts.push(eventLocationContacts);
        // this.ManageContactControl(0, 0);
    };
    EventSubmissionComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    EventSubmissionComponent.prototype.navigateToHome = function () {
        this.router.navigate(["../home"], { relativeTo: this.route });
    };
    EventSubmissionComponent.prototype.openEventSubmitConfirm = function (formValue) {
        this.bottomSheet.open(event_submission_confirm_component_1.EventSubmissionConfirmComponent, {
            data: {
                formValue: formValue,
                eventTypes: this.eventTypes,
                species: this.species,
                organizations: this.organizations,
                adminLevelOnes: this.adminLevelOnes,
                adminLevelTwos: this.adminLevelTwos,
                landOwnerships: this.landOwnerships
            }
        });
    };
    EventSubmissionComponent.prototype.openCreateContactDialog = function () {
        this.createContactDialogRef = this.dialog.open(create_contact_component_1.CreateContactComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                contact_action: 'create'
            }
        });
    };
    EventSubmissionComponent.prototype.openCircleChooseDialog = function (accessType) {
        var _this = this;
        this.circleChooseDialogRef = this.dialog.open(circle_choose_component_1.CircleChooseComponent, {
            minWidth: '60em',
            data: {
                userCircles: this.userCircles
            }
        });
        this.circleChooseDialogRef.afterClosed().subscribe(function (result) {
            if (result !== 'cancel') {
                if (accessType === 'read') {
                    // add the users array to the new_read_collaborators array
                    _this.readCollaboratorArray = _this.readCollaboratorArray.concat(result.users);
                }
                else if (accessType === 'write') {
                    _this.writeCollaboratorArray = _this.writeCollaboratorArray.concat(result.users);
                }
            }
        });
    };
    EventSubmissionComponent.prototype.editSpeciesDiagnosis = function (eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex, speciesdiagnosis, locationspecies) {
        // NOTE: do not need the block below for editing a species diagnosis - the ability to edit the diagnosis selection has been removed.
        // // create local array of selected diagnoses to feed to the dialog
        // const existingSpeciesDiagnoses = [];
        // // create a list of the already selected diagnoses for this species to prevent duplicate selection
        // // tslint:disable-next-line:max-line-length
        // const speciesdiagnoses = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        // // tslint:disable-next-line:max-line-length
        // for (let speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
        //   // tslint:disable-next-line:max-line-length
        //   const diagnosis = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex].controls.diagnosis.value;
        //   if (diagnosis !== null) {
        //     existingSpeciesDiagnoses.push(diagnosis);
        //   }
        // }
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
                eventlocationIndex: eventLocationIndex,
                locationspeciesIndex: locationSpeciesIndex,
                // existing_diagnoses: existingSpeciesDiagnoses,
                species_diagnosis_action: 'editInFormArray',
                title: 'Edit Species Diagnosis',
                titleIcon: 'edit',
                actionButtonIcon: 'save',
                action_button_text: 'Save'
            }
        });
        var originalDiagnosisID = speciesdiagnosis.value.diagnosis;
        this.editSpeciesDiagnosisDialogRef.afterClosed()
            .subscribe(function (speciesDiagnosisObj) {
            if (speciesDiagnosisObj.action === 'cancel') {
                // remove last species diagnosis added
                // tslint:disable-next-line:max-line-length
                // this.removeSpeciesDiagnosis(speciesDiagnosisObj.eventlocationIndex, speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
                return;
            }
            else if (speciesDiagnosisObj.action === 'editInFormArray') {
                _this.eventSubmissionForm.get('new_event_locations')['controls'][speciesDiagnosisObj.eventlocationIndex]
                    .get('new_location_species')['controls'][speciesDiagnosisObj.locationspeciesIndex]
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
                // if the diagnosis ID has changed, remove the outgoing one from the availableDiagnoses array
                if (originalDiagnosisID !== Number(speciesDiagnosisObj.formValue.diagnosis)) {
                    // delete from availableDiagnoses unless count > 1
                    for (var _i = 0, _a = _this.availableDiagnoses; _i < _a.length; _i++) {
                        var availableDiagnosis = _a[_i];
                        if (availableDiagnosis.id === originalDiagnosisID) {
                            if (availableDiagnosis.count > 1) {
                                // decrement the count
                                availableDiagnosis.count--;
                                break;
                            }
                            else if (availableDiagnosis.count === 1) {
                                // remove it
                                // tslint:disable-next-line:max-line-length
                                _this.availableDiagnoses = _this.availableDiagnoses.filter(function (diagnosis) { return diagnosis.id !== originalDiagnosisID; });
                            }
                        }
                    }
                }
                for (var _b = 0, _c = _this.allDiagnoses; _b < _c.length; _b++) {
                    var diagnosis = _c[_b];
                    if (diagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                        var diagnosisFound = false;
                        // check to see if the diagnosis just added already exists in the availableDiagnoses array
                        for (var _d = 0, _e = _this.availableDiagnoses; _d < _e.length; _d++) {
                            var availableDiagnosis = _e[_d];
                            if (availableDiagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                                // if found, increment the count for that diagnosis
                                // only increment count if this diagnosis has changed
                                if (originalDiagnosisID !== Number(speciesDiagnosisObj.formValue.diagnosis)) {
                                    availableDiagnosis.count++;
                                }
                                // also if found, set local var found to true
                                diagnosisFound = true;
                                // also if found, update the suspect value to whatever it is now (though it may not have changed)
                                availableDiagnosis.suspect = speciesDiagnosisObj.formValue.suspect;
                                // if found, stop. do not add to availableDiagnoses array
                                break;
                            }
                        }
                        // if diagnosis is not found to already exist in the availableDiagnoses array, add it
                        if (!diagnosisFound) {
                            diagnosis.suspect = speciesDiagnosisObj.formValue.suspect;
                            // set diagnosis count to 1
                            diagnosis.count = 1;
                            _this.availableDiagnoses.push(diagnosis);
                        }
                    }
                }
                _this.checkSpeciesDiagnoses();
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventSubmissionComponent.prototype.openGNISLookupDialog = function (eventLocationIndex) {
        var _this = this;
        this.gnisLookupDialogRef = this.dialog.open(gnis_lookup_component_1.GnisLookupComponent, {
            data: {
                event_location_index: eventLocationIndex
            }
        });
        this.gnisLookupDialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.eventSubmissionForm.get('new_event_locations')['controls'][result.event_location_index].get('gnis_id').setValue(result.id);
            _this.eventSubmissionForm.get('new_event_locations')['controls'][result.event_location_index].get('gnis_name').setValue(result.name);
        });
    };
    EventSubmissionComponent.prototype.clearGNISEntry = function (eventLocationIndex) {
        this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].controls['gnis_id'].setValue('');
        this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].controls['gnis_name'].setValue('');
    };
    EventSubmissionComponent.prototype.openSpeciesDiagnosisRemoveConfirm = function (eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Remove Species Diagnosis',
                titleIcon: 'remove_circle',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to remove this species diagnosis? If it is the only species in the form with this diagnosis, removing it will remove it from the list of available diagnoses for event diagnosis.',
                messageIcon: '',
                confirmButtonText: 'Remove',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                // remove the diagnosis from the available diagnoses unless another species has it
                // tslint:disable-next-line:max-line-length
                var diagnosisID_1 = _this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].get('diagnosis').value;
                // delete from availableDiagnoses unless count > 1
                for (var _i = 0, _a = _this.availableDiagnoses; _i < _a.length; _i++) {
                    var availableDiagnosis = _a[_i];
                    if (availableDiagnosis.id === diagnosisID_1) {
                        if (availableDiagnosis.count > 1) {
                            // decrement the count
                            availableDiagnosis.count--;
                            break;
                        }
                        else if (availableDiagnosis.count === 1) {
                            // remove it
                            _this.availableDiagnoses = _this.availableDiagnoses.filter(function (diagnosis) { return diagnosis.id !== diagnosisID_1; });
                        }
                    }
                }
                // remove the speciesdiagnosis form array instance
                _this.removeSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex);
            }
        });
    };
    EventSubmissionComponent.prototype.openEventLocationRemoveConfirm = function (eventLocationIndex) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Remove Event Location',
                titleIcon: 'remove_circle',
                message: 'Are you sure you want to remove the event location?',
                messageIcon: '',
                confirmButtonText: 'Remove',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.removeEventLocation(eventLocationIndex);
            }
        });
    };
    EventSubmissionComponent.prototype.displayFn = function (speciesId) {
        var species_id_match;
        for (var i = 0; i < this['options']._results.length - 1; i++) {
            if (this['options']._results[i].value === speciesId) {
                species_id_match = this['options']._results[i].viewValue;
            }
        }
        return species_id_match;
    };
    EventSubmissionComponent.prototype.displayFnContact = function (contactId) {
        var contact_id_match;
        for (var i = 0; i < this['options']._results.length; i++) {
            if (this['options']._results[i].value === contactId) {
                contact_id_match = this['options']._results[i].viewValue;
            }
        }
        return contact_id_match;
    };
    EventSubmissionComponent.prototype.displayFnAdminLevelOne = function (adminLevelOneId) {
        var admin_level_one;
        if (this['options'] !== undefined) {
            for (var i = 0; i < this['options']._results.length; i++) {
                if (this['options']._results[i].value === adminLevelOneId) {
                    admin_level_one = this['options']._results[i].viewValue;
                }
            }
        }
        return admin_level_one;
    };
    EventSubmissionComponent.prototype.displayFnAdminLevelTwo = function (adminLevelTwoId) {
        var admin_level_two;
        if (this['options'] !== undefined) {
            for (var i = 0; i < this['options']._results.length; i++) {
                if (this['options']._results[i].value === adminLevelTwoId) {
                    admin_level_two = this['options']._results[i].viewValue;
                }
            }
        }
        return admin_level_two;
    };
    // no longer in use?
    EventSubmissionComponent.prototype._filter = function (name) {
        var filterValue = name.toLowerCase();
        return this.species.filter(function (option) { return option.name.toLowerCase().indexOf(filterValue) === 0; });
    };
    EventSubmissionComponent.prototype.ManageSpeciesControl = function (eventLocationIndex, locationSpeciesIndex) {
        // tslint:disable-next-line:max-line-length
        // const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species') as FormArray;
        // this.filteredSpecies[eventLocationIndex][locationSpeciesIndex] = arrayControl.at(locationSpeciesIndex).get('species').valueChanges
        //   .startWith(null)
        //   .map(val => this.filter(val, this.species, ['name']));
        var _this = this;
        // populate the species options list for the specific control
        this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(this.species);
        // listen for search field value changes
        this.speciesFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterSpecies(eventLocationIndex, locationSpeciesIndex);
        });
    };
    EventSubmissionComponent.prototype.ManageContactControl = function (eventLocationIndex, locationContactIndex) {
        // tslint:disable-next-line:max-line-length
        // const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts') as FormArray;
        // this.filteredContacts[eventLocationIndex][locationContactIndex] = arrayControl.at(locationContactIndex).get('contact').valueChanges
        //   .startWith(null)
        //   .map(val => this.filter(val, this.userContacts, ['first_name', 'last_name', 'organization_string']));
        var _this = this;
        // populate the species options list for the specific control
        this.filteredContacts[eventLocationIndex][locationContactIndex].next(this.userContacts);
        // listen for search field value changes
        this.contactFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterContacts(eventLocationIndex, locationContactIndex);
        });
    };
    EventSubmissionComponent.prototype.ManageAdminLevelOneControl = function (eventLocationIndex) {
        var _this = this;
        // populate the adminLevelOnes options list for the specific control
        this.filteredAdminLevelOnes[eventLocationIndex].next(this.adminLevelOnes);
        // listen for search field value changes
        this.adminLevelOneFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterAdminLevelOnes(eventLocationIndex);
        });
    };
    EventSubmissionComponent.prototype.ManageAdminLevelTwoControl = function (eventLocationIndex) {
        var _this = this;
        // populate the adminLevelTwos options list for the specific control
        this.filteredAdminLevelTwos[eventLocationIndex].next(this.adminLevelTwos);
        // listen for search field value changes
        this.adminLevelTwoFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterAdminLevelTwos(eventLocationIndex);
        });
    };
    EventSubmissionComponent.prototype.ManageOrganizationControl = function (organizationIndex) {
        var _this = this;
        // populate the organizations options list for the specific control
        this.filteredOrganizations[organizationIndex].next(this.organizations);
        // listen for search field value changes
        this.organizationFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterOrganizations(organizationIndex);
        });
    };
    EventSubmissionComponent.prototype.filterOrganizations = function (organizationIndex) {
        if (!this.organizations) {
            return;
        }
        // get the search keyword
        var search = this.organizationFilterCtrl.value;
        if (!search) {
            this.filteredOrganizations[organizationIndex].next(this.organizations.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the organizations
        this.filteredOrganizations[organizationIndex].next(this.organizations.filter(function (organization) { return organization.name.toLowerCase().indexOf(search) > -1; }));
    };
    EventSubmissionComponent.prototype.inputChangeTrigger = function (event) {
        event.currentTarget.dispatchEvent(new Event('input'));
    };
    EventSubmissionComponent.prototype.filter = function (val, searchArray, searchProperties) {
        var result = [];
        if (val === '') {
            result = searchArray;
        }
        else {
            for (var _i = 0, searchProperties_1 = searchProperties; _i < searchProperties_1.length; _i++) {
                var searchProperty = searchProperties_1[_i];
                if (isNaN(val)) {
                    var realval = val && typeof val === 'object' ? val[searchProperty] : val;
                    var lastOption = null;
                    if (searchArray !== undefined) {
                        for (var i = 0; i < searchArray.length; i++) {
                            // tslint:disable-next-line:max-line-length
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
        }
        // this will return all records matching the val string
        return result;
    };
    EventSubmissionComponent.prototype.ngAfterViewInit = function () {
        this.eventTypeRef.focus();
        this.cd.detectChanges();
        var self = this;
        this.usgsSearch = search_api.create('search-api-div', {
            'verbose': true,
            'placeholder': 'Search for GNIS place name',
            'tooltip': 'Type to search GNIS database',
            'on_result': function (event) {
                // do something with the result
                // o.result is a geojson point feature object with location information set as properties 
                console.warn(event.result);
            }
        });
        window.scrollTo(0, 0);
    };
    EventSubmissionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventSubmissionForm.get('new_read_collaborators').setValue([]);
        this.eventSubmissionForm.get('new_write_collaborators').setValue([]);
        // get event types from the EventTypeService
        this.eventTypeService.getEventTypes()
            .subscribe(function (eventTypes) {
            _this.eventTypes = eventTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get legal statuses from the LegalStatusService
        this.legalStatusService.getLegalStatuses()
            .subscribe(function (legalStatuses) {
            _this.legalStatuses = legalStatuses;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get event record statuses from the EventStatusService
        this.eventStatusService.getEventStatuses()
            .subscribe(function (eventStatuses) {
            _this.eventStatuses = eventStatuses;
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
            // adds the "Pending" diagnosis (unknown, incomplete) to availableDiagnoses list
            // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
            // for (const diagnosis of this.allDiagnoses) {
            //   if (diagnosis.id === APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) {
            //     this.availableDiagnoses.push(diagnosis);
            //   }
            // }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get landOwnerships from the LandOwnerShipService
        this.landOwnershipService.getLandOwnerships()
            .subscribe(function (landOwnerships) {
            _this.landOwnerships = landOwnerships;
            _this.landOwnerships.sort(function (a, b) {
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
        // get staff members from the staffService
        this.staffService.getStaff()
            .subscribe(function (staff) {
            _this.staff = staff;
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
        // query adminLevelOnes from the adminLevelOneService using default country
        this.adminLevelOneService.queryAdminLevelOnes(app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
            // load the options list for intial control
            _this.filteredAdminLevelOnes[0].next(_this.adminLevelOnes);
            // listen for search field value changes
            // this.adminLevelOneFilterCtrl.valueChanges
            //   .pipe(takeUntil(this._onDestroy))
            //   .subscribe(() => {
            //     this.filterAdminLevelOnes(0);
            //   });
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
            _this.filteredSpecies[0][0].next(_this.species);
            // listen for search field value changes
            // this.speciesFilterCtrl.valueChanges
            //   .pipe(takeUntil(this._onDestroy))
            //   .subscribe(() => {
            //     this.filterSpecies();
            //   });
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
            var _loop_1 = function (type) {
                for (var _i = 0, _a = _this.commentTypes; _i < _a.length; _i++) {
                    var commentType = _a[_i];
                    if (commentType.id === type.id) {
                        _this.commentTypes = _this.commentTypes.filter(function (commenttype) { return commenttype.id !== type.id; });
                    }
                }
            };
            // remove the 'special' comment types, as they should not be available for general event comments
            for (var _i = 0, _a = app_settings_1.APP_SETTINGS.SPECIAL_COMMENT_TYPES; _i < _a.length; _i++) {
                var type = _a[_i];
                _loop_1(type);
            }
        }, function (error) {
            _this.errorMessage = error;
        });
        // get organizations from the OrganizationService
        this.organizationService.getOrganizations()
            .subscribe(function (organizations) {
            _this.organizations = organizations;
            _this.filteredOrganizations[0].next(_this.organizations);
            // set the default starting org to user's org after loading the options list
            _this.eventSubmissionForm.get('new_organizations')['controls'][0].get('org').setValue(_this.currentUser.organization);
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
            _this.filteredContacts[0][0].next(_this.userContacts);
            _this.userContactsLoading = false;
            // // listen for search field value changes
            // this.contactFilterCtrl.valueChanges
            //   .pipe(takeUntil(this._onDestroy))
            //   .subscribe(() => {
            //     this.filterContacts();
            //   });
        }, function (error) {
            _this.errorMessage = error;
            _this.userContactsLoading = false;
        });
        this.circleService.getAllUserCircles()
            .subscribe(function (circles) {
            _this.userCircles = circles;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.eventSubmissionForm.get('complete').valueChanges.subscribe(function (value) {
            if (value === true) {
                _this.eventSubmissionForm.get('quality_check').enable();
            }
            else if (value === false) {
                _this.eventSubmissionForm.get('quality_check').disable();
                _this.eventSubmissionForm.get('quality_check').setValue(null);
            }
        });
        this.eventSubmissionForm.get('new_organizations').valueChanges.subscribe(function (orgArray) {
            _this.duplicateEventOrgViolation = false;
            var duplicateExists = app_utilities_1.APP_UTILITIES.checkDuplicateInObject('org', orgArray);
            // console.log('Duplicate event org exists? ' + duplicateExists);
            if (duplicateExists) {
                _this.duplicateEventOrgViolation = true;
            }
        });
        ///////////////
        this.eventSubmissionForm.get('complete').valueChanges.subscribe(function (value) {
            if (value === true) {
                _this.eventSubmissionForm.get('quality_check').enable();
            }
            else if (value === false) {
                _this.eventSubmissionForm.get('quality_check').disable();
                _this.eventSubmissionForm.get('quality_check').setValue(null);
            }
        });
        /////////////////////
    };
    // onFormChanges(): void {
    //   this.eventSubmissionForm.valueChanges.subscribe(() => {
    //     this.checkLocationSpeciesNumbers();
    //   });
    // }
    // functions for getting mat-tooltip text from config file
    EventSubmissionComponent.prototype.eventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventTypeTooltip; return string; };
    EventSubmissionComponent.prototype.contactPersonTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactPersonTooltip; return string; };
    EventSubmissionComponent.prototype.recordStatusTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.recordStatusTooltip; return string; };
    EventSubmissionComponent.prototype.locationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationNameTooltip; return string; };
    EventSubmissionComponent.prototype.standardizedLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.standardizedLocationNameTooltip; return string; };
    EventSubmissionComponent.prototype.knownDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.knownDeadTooltip; return string; };
    EventSubmissionComponent.prototype.estimatedDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.estimatedDeadTooltip; return string; };
    EventSubmissionComponent.prototype.knownSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.knownSickTooltip; return string; };
    EventSubmissionComponent.prototype.estimatedSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.estimatedSickTooltip; return string; };
    EventSubmissionComponent.prototype.contactTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactTypeTooltip; return string; };
    EventSubmissionComponent.prototype.locationCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTooltip; return string; };
    EventSubmissionComponent.prototype.eventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventDiagnosisTooltip; return string; };
    EventSubmissionComponent.prototype.eventCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTooltip; return string; };
    EventSubmissionComponent.prototype.eventCommentTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTypeTooltip; return string; };
    EventSubmissionComponent.prototype.collaboratorsAddIndividualTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; };
    EventSubmissionComponent.prototype.collaboratorsAddCircleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; };
    EventSubmissionComponent.prototype.serviceRequestRequestDiaServicesOnlyTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestRequestDiaServicesOnlyTooltip; return string; };
    EventSubmissionComponent.prototype.serviceRequestRequestDiaAndConsultTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestRequestDiaAndConsultTooltip; return string; };
    EventSubmissionComponent.prototype.serviceRequestNoServicesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestNoServicesTooltip; return string; };
    EventSubmissionComponent.prototype.serviceRequestCommentTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestCommentTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.speciesDiagnosisTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesDiagnosisTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.speciesDiagnosisSuspectTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesDiagnosisSuspectTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.basisOfDiagnosisTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.basisOfDiagnosisTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.significanceOfDiagnosisForSpeciesTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.significanceOfDiagnosisForSpeciesTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.numberAssessedTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAssessedTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.numberWithDiagnosisTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.numberWithDiagnosisTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.labTooltip = function () {
        var string = app_field_help_text_1.FIELD_HELP_TEXT.labTooltip;
        return string;
    };
    EventSubmissionComponent.prototype.userEventRefTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.userEventRefTooltip; return string; };
    EventSubmissionComponent.prototype.eventVisibilityTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventVisibilityTooltip; return string; };
    EventSubmissionComponent.prototype.contactOrganizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactOrganizationTooltip; return string; };
    EventSubmissionComponent.prototype.locationStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationStartDateTooltip; return string; };
    EventSubmissionComponent.prototype.locationEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationEndDateTooltip; return string; };
    EventSubmissionComponent.prototype.countryTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countryTooltip; return string; };
    EventSubmissionComponent.prototype.stateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.stateTooltip; return string; };
    EventSubmissionComponent.prototype.countyTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.countyTooltip; return string; };
    EventSubmissionComponent.prototype.landOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.landOwnershipTooltip; return string; };
    EventSubmissionComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    EventSubmissionComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    EventSubmissionComponent.prototype.speciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.speciesTooltip; return string; };
    EventSubmissionComponent.prototype.populationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip; return string; };
    EventSubmissionComponent.prototype.ageBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.ageBiasTooltip; return string; };
    EventSubmissionComponent.prototype.sexBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.sexBiasTooltip; return string; };
    EventSubmissionComponent.prototype.captiveTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.captiveTooltip; return string; };
    EventSubmissionComponent.prototype.getErrorMessage = function (formControlName) {
        return this.eventSubmissionForm.get(formControlName).hasError('required') ? 'Please enter a value' :
            this.eventSubmissionForm.get(formControlName).hasError('email') ? 'Not a valid email' : '';
    };
    EventSubmissionComponent.prototype.openDiagnosticInfoDialog = function () {
        this.diagnosticInfoDialogRef = this.dialog.open(diagnostic_info_component_1.DiagnosticInfoComponent, {});
    };
    EventSubmissionComponent.prototype.filterAdminLevelOnes = function (eventLocationIndex) {
        if (!this.adminLevelOnes) {
            return;
        }
        // get the search keyword
        var search = this.adminLevelOneFilterCtrl.value;
        if (!search) {
            this.filteredAdminLevelOnes[eventLocationIndex].next(this.adminLevelOnes.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelOnes
        this.filteredAdminLevelOnes[eventLocationIndex].next(this.adminLevelOnes.filter(function (admin_level_one) { return admin_level_one.name.toLowerCase().indexOf(search) > -1; }));
    };
    EventSubmissionComponent.prototype.filterAdminLevelTwos = function (eventLocationIndex) {
        if (!this.adminLevelTwos) {
            return;
        }
        // get the search keyword
        var search = this.adminLevelTwoFilterCtrl.value;
        if (!search) {
            this.filteredAdminLevelTwos[eventLocationIndex].next(this.adminLevelTwos.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelTwos
        this.filteredAdminLevelTwos[eventLocationIndex].next(this.adminLevelTwos.filter(function (admin_level_two) { return admin_level_two.name.toLowerCase().indexOf(search) > -1; }));
    };
    EventSubmissionComponent.prototype.filterSpecies = function (eventLocationIndex, locationSpeciesIndex) {
        if (!this.species) {
            return;
        }
        // get the search keyword
        var search = this.speciesFilterCtrl.value;
        if (!search) {
            this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(this.species.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the adminLevelTwos
        this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(this.species.filter(function (species) { return species.name.toLowerCase().indexOf(search) > -1; }));
    };
    EventSubmissionComponent.prototype.filterContacts = function (eventLocationIndex, locationContactIndex) {
        if (!this.userContacts) {
            return;
        }
        // get the search keyword
        var search = this.contactFilterCtrl.value;
        if (!search) {
            this.filteredContacts[eventLocationIndex][locationContactIndex].next(this.userContacts.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the contacts
        this.filteredContacts[eventLocationIndex][locationContactIndex].next(
        // tslint:disable-next-line:max-line-length
        this.userContacts.filter(function (contact) { return contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1; }));
    };
    EventSubmissionComponent.prototype.createCommonEventDataObject = function (objectType, eventLocationIndex, objectInstanceIndex) {
        var eventLocations = this.eventSubmissionForm.get('new_event_locations')['controls'];
        // check which object is being sent, parse out the specific form group instance from the form, add to the commonEventData object
        switch (objectType) {
            case 'contact':
                var contactsArray = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
                var contact = contactsArray.controls[objectInstanceIndex];
                this.commonEventData.contacts.push(this.formBuilder.group({
                    contact: contact.value.contact,
                    contact_type: null
                }));
                // loop through event locations and push the new contact into each, except the one it came from (so as to avoid duplicate)
                for (var i = 0, j = eventLocations.length; i < j; i++) {
                    if (i !== eventLocationIndex) {
                        // call addLocationContact, but also get the return value to know which contact instance to populate with the value
                        var indexObject = this.addLocationContact(i);
                        // tslint:disable-next-line:max-line-length
                        console.log('eventlocationindex: ' + indexObject.eventLocationIndex + ', locationspeciesindex: ' + indexObject.locationContactIndex);
                        // using the indexObject, push the species id value to the correct form instance
                        // tslint:disable-next-line:max-line-length
                        this.eventSubmissionForm.get('new_event_locations')['controls'][indexObject.eventLocationIndex].get('new_location_contacts')['controls'][indexObject.locationContactIndex].get('contact').setValue(contact.value.contact);
                        // const locationContacts = eventLocations[i].get('location_contacts');
                        // locationContacts.push(contact);
                    }
                }
                // tslint:disable-next-line:max-line-length
                this.openSnackBar(this.displayValuePipe.transform(contact.value.contact, 'first_name', this.userContacts) + ' ' + this.displayValuePipe.transform(contact.value.contact, 'last_name', this.userContacts) + ' added to all locations.', 'OK', 5000);
                break;
            case 'species':
                var speciesArray = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
                var species = speciesArray.controls[objectInstanceIndex];
                this.commonEventData.species.push(this.formBuilder.group({
                    species: species.value.species,
                    population_count: null,
                    sick_count: [null, forms_1.Validators.min(0)],
                    dead_count: [null, forms_1.Validators.min(0)],
                    sick_count_estimated: [null, forms_1.Validators.min(0)],
                    dead_count_estimated: [null, forms_1.Validators.min(0)],
                    priority: null,
                    captive: null,
                    age_bias: null,
                    sex_bias: null
                }));
                // loop through event locations and push the new species into each, except the one it came from (so as to avoid duplicate)
                for (var i = 0, j = eventLocations.length; i < j; i++) {
                    if (i !== eventLocationIndex) {
                        // call addLocationSpecies, but also get the return value to know which species instance to populate with the value
                        var indexObject = this.addLocationSpecies(i);
                        // tslint:disable-next-line:max-line-length
                        console.log('eventlocationindex: ' + indexObject.eventLocationIndex + ', locationspeciesindex: ' + indexObject.locationSpeciesIndex);
                        // using the indexObject, push the species id value to the correct form instance
                        // tslint:disable-next-line:max-line-length
                        this.eventSubmissionForm.get('new_event_locations')['controls'][indexObject.eventLocationIndex].get('new_location_species')['controls'][indexObject.locationSpeciesIndex].get('species').setValue(species.value.species);
                    }
                }
                // tslint:disable-next-line:max-line-length
                this.openSnackBar(this.displayValuePipe.transform(species.value.species, 'name', this.species) + ' added to all locations.', 'OK', 5000);
                break;
        }
        console.log('Common event data: ' + this.commonEventData);
    };
    EventSubmissionComponent.prototype.endDateBeforeStart = function (AC) {
        AC.get('end_date').setErrors(null);
        AC.get('start_date').setErrors(null);
        var start_date = AC.get('start_date').value;
        var end_date = AC.get('end_date').value;
        if ((start_date !== null && end_date !== null) && start_date > end_date) {
            AC.get('end_date').setErrors({ endDateBeforeStart: true });
        }
        return null;
    };
    EventSubmissionComponent.prototype.startDateTodayorEarlierMortalityEvent = function (AC) {
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
    EventSubmissionComponent.prototype.minSpecies = function (AC) {
        var locationSpeciesLength = AC.get('new_location_species')['controls'].length;
        if (locationSpeciesLength < 1) {
            AC.get('new_location_species').setErrors({ minSpecies: true });
        }
        return null;
    };
    EventSubmissionComponent.prototype.truncateDecimalDegrees = function ($event, eventLocationIndex, field) {
        var beforeDecimal = ($event + '').split('.')[0];
        var afterDecimal = ($event + '').split('.')[1];
        if (afterDecimal.length > 6) {
            var truncatedValue = beforeDecimal + '.' + afterDecimal.substring(0, 6);
            this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get(field).setValue(truncatedValue);
        }
    };
    EventSubmissionComponent.prototype.checkForDuplicateEventOrg = function (orgID) {
        this.duplicateEventOrgViolation = false;
        var eventOrganizations = this.eventSubmissionForm.get('new_organizations')['controls'];
        for (var i = 0, j = eventOrganizations.length; i < j; i++) {
            // do not check last item in array because it is the one just added and will always match
            var lastAddedIndex = j - 1;
            if (i !== lastAddedIndex) {
                if (this.eventSubmissionForm.get('new_organizations')['controls'][i].get('org').value === orgID) {
                    this.duplicateEventOrgViolation = true;
                }
            }
        }
    };
    EventSubmissionComponent.prototype.checkForDuplicateEventDiagnosis = function (diagnosisID) {
        var eventDiagnoses = this.eventSubmissionForm.get('new_event_diagnoses')['controls'];
        for (var i = 0, j = eventDiagnoses.length; i < j; i++) {
            if (Number(this.eventSubmissionForm.get('new_event_diagnoses')['controls'][i].get('diagnosis').value) === diagnosisID) {
                return true;
            }
        }
    };
    EventSubmissionComponent.prototype.checkforMissingSpecies = function (eventLocationIndex) {
        // tslint:disable-next-line:max-line-length
        var locationspecies = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
        var speciesSelectionMissing = false;
        for (var i = 0, j = locationspecies.length; i < j; i++) {
            // tslint:disable-next-line:max-line-length
            if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][i].get('species').value === null) {
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
    EventSubmissionComponent.prototype.checkEventLocationCommentMin = function (eventLocationIndex) {
        // tslint:disable-next-line:max-line-length
        var siteDesciptionCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('site_description').value.length;
        var historyCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('history').value.length;
        // tslint:disable-next-line:max-line-length
        var envFactorsCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('environmental_factors').value.length;
        var clinicalSignsCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('clinical_signs').value.length;
        // tslint:disable-next-line:max-line-length
        var generalCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comment').value.length;
        if ((siteDesciptionCommentLength === 0) && (historyCommentLength === 0) && (envFactorsCommentLength === 0) && (clinicalSignsCommentLength === 0) && (generalCommentLength === 0)) {
            return true;
        }
        return false;
    };
    EventSubmissionComponent.prototype.checkLocationSpeciesNumbers = function () {
        this.locationSpeciesNumbersViolation = false;
        this.numberAffectedViolation = false;
        this.completeEventLocationSpeciesNumbersViolation = false;
        // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
        if (this.eventSubmissionForm.get('event_type').value === 1 || this.eventSubmissionForm.get('event_type').value === '1') {
            // set var to capture of requirement is met at any of the event locations
            var requirementMetEventOpen = false;
            var requirementMetEventClosed = true;
            var eventLocations_1 = this.eventSubmissionForm.get('new_event_locations');
            // tslint:disable-next-line:max-line-length
            for (var eventLocationIndex = 0, eventLocationsLength = eventLocations_1.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
                var locationspecies = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
                // if event is marked as complete
                if (this.eventSubmissionForm.get('complete').value === true) {
                    // loop through each new_location_species array, set requirementMetEventClosed false if any species lacks the number requirement.
                    // tslint:disable-next-line:max-line-length
                    for (var locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
                        var locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
                        if ((locationspeciesform.get('sick_count').value +
                            locationspeciesform.get('dead_count').value +
                            locationspeciesform.get('sick_count_estimated').value +
                            locationspeciesform.get('dead_count_estimated').value) < 1) {
                            requirementMetEventClosed = false;
                        }
                    }
                }
                // loop through each new_location_species array, set requirementMetEventOpen true if any species has the number requirement.
                // if even one meets the criteria, the event is valid for submission.
                // tslint:disable-next-line:max-line-length
                for (var locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
                    var locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
                    if ((locationspeciesform.get('sick_count').value +
                        locationspeciesform.get('dead_count').value +
                        locationspeciesform.get('sick_count_estimated').value +
                        locationspeciesform.get('dead_count_estimated').value) >= 1) {
                        requirementMetEventOpen = true;
                    }
                }
            } // end eventlocations array loop
            if (requirementMetEventOpen) {
                this.locationSpeciesNumbersViolation = false;
            }
            else {
                this.locationSpeciesNumbersViolation = true;
            }
            if (requirementMetEventClosed) {
                this.completeEventLocationSpeciesNumbersViolation = false;
            }
            else {
                this.completeEventLocationSpeciesNumbersViolation = true;
            }
        }
        var eventLocations = this.eventSubmissionForm.get('new_event_locations');
        var numbersAffectedRequirementMet = false;
        for (var eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
            var locationspecies = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
            for (var locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
                var locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
                if ((locationspeciesform.get('sick_count').value !== null) || (locationspeciesform.get('dead_count').value !== null) || (locationspeciesform.get('sick_count_estimated').value !== null) || (locationspeciesform.get('dead_count_estimated').value !== null)) {
                    numbersAffectedRequirementMet = true;
                }
                if (numbersAffectedRequirementMet) {
                    this.numberAffectedViolation = false;
                }
                else {
                    this.numberAffectedViolation = true;
                }
            }
        }
    };
    EventSubmissionComponent.prototype.checkLocationStartDates = function () {
        this.locationStartDatesViolation = false;
        var requirementMet = false;
        var eventLocations = this.eventSubmissionForm.get('new_event_locations');
        // tslint:disable-next-line:max-line-length
        // loop through event locations
        for (var eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
            // if there are any non-null start dates, requirement is met
            if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('start_date').value !== null) {
                requirementMet = true;
            }
        }
        if (requirementMet) {
            this.locationStartDatesViolation = false;
        }
        else {
            this.locationStartDatesViolation = true;
        }
    };
    EventSubmissionComponent.prototype.checkEventCompleteRules = function () {
        if (this.eventSubmissionForm.get('complete').value === true) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Marking event as complete',
                    titleIcon: 'warning',
                    message: 'Submitting an event as complete will lock all editing on the event after submission.',
                    messageIcon: '',
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
        }
        this.checkLocationEndDates();
        this.checkSpeciesDiagnoses();
        this.checkLocationSpeciesNumbers();
        this.updateAvailableDiagnoses();
    };
    EventSubmissionComponent.prototype.updateAvailableDiagnoses = function () {
        // TODO: clear all event diagnosis selections
        if (this.eventSubmissionForm.get('complete').value === true) {
            // remove the 'unknown' diagnosis for incomplete events
            // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
            // tslint:disable-next-line:max-line-length
            // this.availableDiagnoses = this.availableDiagnoses.filter(diagnosis => diagnosis.id !== APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis);
            // add the 'unknown' diagnosis for complete events
            for (var _i = 0, _a = this.allDiagnoses; _i < _a.length; _i++) {
                var diagnosis = _a[_i];
                if (diagnosis.id === app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) {
                    this.availableDiagnoses.push(diagnosis);
                }
            }
        }
        else if (this.eventSubmissionForm.get('complete').value === false) {
            // tslint:disable-next-line:max-line-length
            // remove the 'unknown' diagnosis for complete events
            this.availableDiagnoses = this.availableDiagnoses.filter(function (diagnosis) { return diagnosis.id !== app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis; });
            // add the 'unknown' diagnosis for incomplete events
            // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
            // for (const diagnosis of this.allDiagnoses) {
            //   if (diagnosis.id === APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) {
            //     this.availableDiagnoses.push(diagnosis);
            //   }
            // }
        }
    };
    EventSubmissionComponent.prototype.checkLocationEndDates = function () {
        this.locationEndDatesViolation = false;
        if (this.eventSubmissionForm.get('complete').value === true) {
            var requirementMet = true;
            var eventLocations = this.eventSubmissionForm.get('new_event_locations');
            // tslint:disable-next-line:max-line-length
            // loop through event locations
            for (var eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
                // if any end dates are null, requirement is not met
                if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('end_date').value === null) {
                    requirementMet = false;
                }
            }
            if (requirementMet) {
                this.locationEndDatesViolation = false;
            }
            else {
                this.locationEndDatesViolation = true;
            }
        }
    };
    EventSubmissionComponent.prototype.checkSpeciesDiagnoses = function () {
        this.speciesDiagnosisViolation = false;
        this.nonCompliantSpeciesDiagnoses = [];
        if (this.eventSubmissionForm.get('complete').value === true) {
            ////////////////////////////////////////////////////////////////////////
            var requirementMet = true;
            var eventLocations = this.eventSubmissionForm.get('new_event_locations');
            // tslint:disable-next-line:max-line-length
            for (var eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
                var locationspecies = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
                // loop through each new_location_species array
                // tslint:disable-next-line:max-line-length
                for (var locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
                    var locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
                    // tslint:disable-next-line:max-line-length
                    var speciesdiagnoses = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses');
                    for (var speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
                        // tslint:disable-next-line:max-line-length
                        var speciesdiagnosisform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex];
                        // if any of the species diagnoses are missing a cause or basis value, requirement is not met and validation check fails
                        if (speciesdiagnosisform.get('cause').value === null || speciesdiagnosisform.get('basis').value === null) {
                            requirementMet = false;
                            // add to an object storing the non-compliant species diagnoses
                            this.nonCompliantSpeciesDiagnoses.push({
                                eventLocationNumber: eventLocationIndex + 1,
                                locationSpeciesNumber: locationspeciesindex + 1,
                                locationSpeciesName: this.displayValuePipe.transform(locationspeciesform.controls.species.value, 'name', this.species),
                                speciesDiagnosisNumber: speciesdiagnosisindex + 1,
                                speciesDiagnosisName: this.displayValuePipe.transform(speciesdiagnosisform.controls.diagnosis.value, 'name', this.allDiagnoses)
                            });
                        }
                    }
                }
            }
            if (requirementMet) {
                this.speciesDiagnosisViolation = false;
            }
            else {
                this.speciesDiagnosisViolation = true;
            }
        }
    };
    EventSubmissionComponent.prototype.enforceLegalStatusRules = function (selected_legal_status) {
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
                    _this.eventSubmissionForm.get('public').setValue(false);
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
                    _this.eventSubmissionForm.get('public').setValue(true);
                }
            });
        }
    };
    EventSubmissionComponent.prototype.enforceCaptiveRule = function (selected_captive_value) {
        var _this = this;
        if (selected_captive_value) {
            this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Location species captive',
                    titleIcon: 'warning',
                    message: 'Setting this species as captive will set the event record to private (Not Visible to Public). Select "Cancel" to maintain current event visibility. Select "OK" to change to private.',
                    confirmButtonText: 'OK',
                    showCancelButton: true
                }
            });
            this.confirmDialogRef.afterClosed().subscribe(function (result) {
                if (result === true) {
                    _this.eventSubmissionForm.get('public').setValue(false);
                }
            });
        }
    };
    EventSubmissionComponent.prototype.initEventLocation = function () {
        return this.formBuilder.group({
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
            //this.initLocationContacts()
            ])
        }, {
            validator: [this.endDateBeforeStart, this.startDateTodayorEarlierMortalityEvent, this.minSpecies]
        });
    };
    EventSubmissionComponent.prototype.integer = function (AC) {
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
    EventSubmissionComponent.prototype.estimatedSick = function (AC) {
        AC.get('sick_count_estimated').setErrors(null);
        var sick_count = AC.get('sick_count').value;
        var sick_count_estimated = AC.get('sick_count_estimated').value;
        if (sick_count !== null && sick_count_estimated !== null) {
            if (sick_count_estimated <= sick_count) {
                AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
            }
        }
    };
    EventSubmissionComponent.prototype.estimatedDead = function (AC) {
        AC.get('dead_count_estimated').setErrors(null);
        var dead_count = AC.get('dead_count').value;
        var dead_count_estimated = AC.get('dead_count_estimated').value;
        if (dead_count !== null && dead_count_estimated !== null) {
            if (dead_count_estimated <= dead_count) {
                AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
            }
        }
    };
    EventSubmissionComponent.prototype.initLocationSpecies = function () {
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
    EventSubmissionComponent.prototype.initSpeciesDiagnosis = function () {
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
    EventSubmissionComponent.prototype.initLocationContacts = function () {
        return this.formBuilder.group({
            contact: [null],
            contact_type: null
        });
    };
    EventSubmissionComponent.prototype.initLocationComments = function () {
        return this.formBuilder.group({
            comment: '',
            comment_type: null
        });
    };
    EventSubmissionComponent.prototype.initEventOrganization = function () {
        return this.formBuilder.group({
            org: null,
        });
    };
    EventSubmissionComponent.prototype.initEventComment = function () {
        return this.formBuilder.group({
            comment: '',
            comment_type: 5
        });
    };
    EventSubmissionComponent.prototype.initServiceRequestComment = function () {
        return this.formBuilder.group({
            comment: ''
        });
    };
    EventSubmissionComponent.prototype.initEventDiagnosis = function () {
        return this.formBuilder.group({
            // TODO: make this value configurable for the "Undetermined" value
            diagnosis: null
        });
    };
    // event locations
    EventSubmissionComponent.prototype.addEventLocation = function () {
        var control = this.eventSubmissionForm.get('new_event_locations');
        control.push(this.initEventLocation());
        var eventLocationIndex = control.length - 1;
        var eventLocations = this.eventSubmissionForm.get('new_event_locations')['controls'];
        var newEventLocationIndex = eventLocations.length - 1;
        var newEventLocation = this.eventSubmissionForm.get('new_event_locations')['controls'][newEventLocationIndex];
        this.filteredAdminLevelOnes.push(new rxjs_1.ReplaySubject());
        this.ManageAdminLevelOneControl(newEventLocationIndex);
        // need to update the adminLevelOne options per the default county value
        this.updateAdminLevelOneOptions(app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID, eventLocationIndex);
        this.filteredAdminLevelTwos.push(new rxjs_1.ReplaySubject());
        this.ManageAdminLevelTwoControl(newEventLocationIndex);
        var eventLocationSpecies = new Array();
        this.filteredSpecies.push(eventLocationSpecies);
        // initiate an empty replaysubject
        this.filteredSpecies[newEventLocationIndex].push(new rxjs_1.ReplaySubject());
        this.ManageSpeciesControl(newEventLocationIndex, 0);
        var eventLocationContacts = new Array();
        this.filteredContacts.push(eventLocationContacts);
        // initiate an empty replaysubject
        this.filteredContacts[newEventLocationIndex].push(new rxjs_1.ReplaySubject());
        this.ManageContactControl(newEventLocationIndex, 0);
        if (this.commonEventData.species.length > 0) {
            // tslint:disable-next-line:max-line-length
            this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][0].get('species').setValue(this.commonEventData.species[0].controls.species.value);
            if (this.commonEventData.species.length > 1) {
                // get number of species instances needed (default first one has been set already)
                var speciesFormArrayRemainderLength = this.commonEventData.species.length - 1;
                for (var i = 0; i < speciesFormArrayRemainderLength; i++) {
                    this.addLocationSpecies(eventLocationIndex);
                }
                // start the loop at [1] (position 2) since [0] was already handled above
                for (var i = 1; i < this.commonEventData.species.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][i].get('species').setValue(this.commonEventData.species[i].controls.species.value);
                }
            }
        }
        // contacts are handled differently because there is no default blank contact instance
        if (this.commonEventData.contacts.length > 0) {
            for (var i = 0; i < this.commonEventData.contacts.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.addLocationContact(eventLocationIndex);
            }
            for (var i = 0; i < this.commonEventData.contacts.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts')['controls'][i].get('contact').setValue(this.commonEventData.contacts[i].controls.contact.value);
            }
        }
        this.usgsSearch = search_api.create('search-api-div', {
            'verbose': true,
            'placeholder': 'Search for GNIS place name',
            'tooltip': 'Type to search GNIS database',
            'on_result': function (event) {
                // do something with the result
                // o.result is a geojson point feature object with location information set as properties 
                console.warn(event.result);
            }
        });
        this.checkLocationEndDates();
        this.checkLocationStartDates();
    };
    EventSubmissionComponent.prototype.removeEventLocation = function (eventLocationIndex) {
        var control = this.eventSubmissionForm.get('new_event_locations');
        control.removeAt(eventLocationIndex);
        this.checkLocationEndDates();
    };
    EventSubmissionComponent.prototype.getEventLocations = function (form) {
        return form.controls.new_event_locations.controls;
    };
    // event organizations
    EventSubmissionComponent.prototype.addEventOrganization = function () {
        var control = this.eventSubmissionForm.get('new_organizations');
        control.push(this.initEventOrganization());
        var organizationIndex = control.length - 1;
        this.filteredOrganizations.push(new rxjs_1.ReplaySubject());
        this.ManageOrganizationControl(organizationIndex);
    };
    EventSubmissionComponent.prototype.removeEventOrganization = function (eventOrgIndex) {
        var control = this.eventSubmissionForm.get('new_organizations');
        control.removeAt(eventOrgIndex);
    };
    EventSubmissionComponent.prototype.getEventOrganizations = function (form) {
        return form.controls.new_organizations.controls;
    };
    // event comments
    EventSubmissionComponent.prototype.addEventComment = function () {
        var control = this.eventSubmissionForm.get('new_comments');
        control.push(this.initEventComment());
    };
    EventSubmissionComponent.prototype.removeEventComment = function (eventCommentIndex) {
        var control = this.eventSubmissionForm.get('new_comments');
        control.removeAt(eventCommentIndex);
    };
    EventSubmissionComponent.prototype.getEventComments = function (form) {
        return form.controls.new_comments.controls;
    };
    // service request comments
    EventSubmissionComponent.prototype.addServiceRequestComment = function () {
        var control = this.eventSubmissionForm.get('new_service_request').get('new_comments');
        control.push(this.initServiceRequestComment());
    };
    EventSubmissionComponent.prototype.removeServiceRequestComment = function (serviceRequestCommentIndex) {
        var control = this.eventSubmissionForm.get('new_service_request').get('new_comments');
        control.removeAt(serviceRequestCommentIndex);
    };
    EventSubmissionComponent.prototype.getServiceRequestComments = function (form) {
        return form.controls.new_service_request.controls.new_comments.controls;
    };
    // event diagnoses
    EventSubmissionComponent.prototype.addEventDiagnosis = function () {
        var control = this.eventSubmissionForm.get('new_event_diagnoses');
        control.push(this.initEventDiagnosis());
    };
    EventSubmissionComponent.prototype.removeEventDiagnosis = function (eventDiagnosisIndex) {
        var control = this.eventSubmissionForm.get('new_event_diagnoses');
        control.removeAt(eventDiagnosisIndex);
    };
    EventSubmissionComponent.prototype.getEventDiagnoses = function (form) {
        return form.controls.new_event_diagnoses.controls;
    };
    // location species
    EventSubmissionComponent.prototype.addLocationSpecies = function (eventLocationIndex) {
        // tslint:disable-next-line:max-line-length
        var controls = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
        controls.push(this.initLocationSpecies());
        var locationSpeciesIndex = controls.length - 1;
        // const eventLocationSpecies = new Array<ReplaySubject<Species[]>>();
        // this.filteredSpecies.push(eventLocationSpecies);
        // initiate an empty replaysubject
        this.filteredSpecies[eventLocationIndex].push(new rxjs_1.ReplaySubject());
        this.ManageSpeciesControl(eventLocationIndex, locationSpeciesIndex);
        this.checkLocationSpeciesNumbers();
        return ({ eventLocationIndex: eventLocationIndex, locationSpeciesIndex: locationSpeciesIndex });
    };
    EventSubmissionComponent.prototype.removeLocationSpecies = function (eventLocationIndex, locationSpeciesIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
        control.removeAt(locationSpeciesIndex);
        this.filteredSpecies[eventLocationIndex].splice(locationSpeciesIndex, 1);
    };
    EventSubmissionComponent.prototype.getLocationSpecies = function (form) {
        return form.controls.new_location_species.controls;
    };
    // location contacts
    EventSubmissionComponent.prototype.addLocationContact = function (eventLocationIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
        control.push(this.initLocationContacts());
        var locationContactIndex = control.length - 1;
        this.filteredContacts[eventLocationIndex].push(new rxjs_1.ReplaySubject());
        this.ManageContactControl(eventLocationIndex, locationContactIndex);
        return ({ eventLocationIndex: eventLocationIndex, locationContactIndex: locationContactIndex });
    };
    EventSubmissionComponent.prototype.removeLocationContact = function (eventLocationIndex, locationContactIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
        control.removeAt(locationContactIndex);
        this.filteredContacts[eventLocationIndex].splice(locationContactIndex, 1);
    };
    EventSubmissionComponent.prototype.viewContactDetailsDialog = function (eventLocationIndex, locationContactIndex) {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var contact_id = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts').value[locationContactIndex].contact;
        // const currentContact = this.userContacts.find(i => i.id === contact_id);
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
    EventSubmissionComponent.prototype.getLocationContacts = function (form) {
        return form.controls.new_location_contacts.controls;
    };
    EventSubmissionComponent.prototype.addSpeciesDiagnosis = function (eventLocationIndex, locationSpeciesIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        control.push(this.initSpeciesDiagnosis());
        // tslint:disable-next-line:max-line-length
        var speciesDiagnosisIndex = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses').length - 1;
        return speciesDiagnosisIndex;
    };
    EventSubmissionComponent.prototype.removeSpeciesDiagnosis = function (eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex) {
        // tslint:disable-next-line:max-line-length
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        control.removeAt(speciesDiagnosisIndex);
    };
    EventSubmissionComponent.prototype.getSpeciesDiagnoses = function (form) {
        return form.controls.new_species_diagnoses.controls;
    };
    EventSubmissionComponent.prototype.getDiagnosisOrganizations = function (form) {
        return form.controls.new_species_diagnosis_organizations.value;
    };
    // location comments
    EventSubmissionComponent.prototype.addLocationComments = function (eventLocationIndex) {
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comments');
        control.push(this.initLocationComments());
    };
    EventSubmissionComponent.prototype.removeLocationComments = function (eventLocationIndex, m) {
        var control = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comments');
        control.removeAt(m);
    };
    EventSubmissionComponent.prototype.getLocationComments = function (form) {
        return form.controls.comments.controls;
    };
    EventSubmissionComponent.prototype.updateEventType = function (eventTypeID) {
        var eventLocations = this.eventSubmissionForm.get('new_event_locations')['controls'];
        for (var i = 0, j = eventLocations.length; i < j; i++) {
            this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('event_type').setValue(Number(eventTypeID));
        }
        this.checkLocationSpeciesNumbers();
    };
    EventSubmissionComponent.prototype.updateAdminLevelOneOptions = function (selectedCountryID, eventLocationIndex) {
        var _this = this;
        this.adminLevelOnesLoading = true;
        var id = Number(selectedCountryID);
        this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_one').setValue(null);
        // query the adminlevelones endpoint for appropriate records
        // update the options for the adminLevelOne select with the response
        this.adminLevelOneService.queryAdminLevelOnes(id)
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
            _this.adminLevelOnes.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // update the select options for the specific control
            _this.filteredAdminLevelOnes[eventLocationIndex].next(adminLevelOnes);
            _this.adminLevelOnesLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.adminLevelOnesLoading = false;
        });
    };
    EventSubmissionComponent.prototype.updateAdminLevelTwoOptions = function (selectedAdminLevelOneID, eventLocationIndex) {
        var _this = this;
        if (!isNaN(selectedAdminLevelOneID)) {
            var id = Number(selectedAdminLevelOneID);
            this.adminLevelTwosLoading = true;
            this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_two').setValue(null);
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
                // update the select options for the specific control
                _this.filteredAdminLevelTwos[eventLocationIndex].next(adminLevelTwos);
                // dont think below block should be here, but leaving it for now for debugging
                // listen for search field value changes
                // this.adminLevelTwoFilterCtrl.valueChanges
                //   .pipe(takeUntil(this._onDestroy))
                //   .subscribe(() => {
                //     this.filterAdminLevelTwos(eventLocationIndex);
                //   });
                _this.adminLevelTwosLoading = false;
            }, function (error) {
                _this.errorMessage = error;
                _this.adminLevelTwosLoading = false;
            });
        }
    };
    EventSubmissionComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EventSubmissionComponent.prototype.setEventLocationForGNISSelect = function (eventLocationIndex) {
        console.log('Selecting GNIS record for Event Location Number' + (eventLocationIndex + 1));
    };
    EventSubmissionComponent.prototype.removeCollaborator = function (userID, list) {
        switch (list) {
            case 'read':
                var readIndex = this.readCollaboratorArray.findIndex(function (o) {
                    return o.id === userID;
                });
                if (readIndex !== -1) {
                    this.readCollaboratorArray.splice(readIndex, 1);
                }
                break;
            case 'write':
                var writeIndex = this.writeCollaboratorArray.findIndex(function (o) {
                    return o.id === userID;
                });
                if (writeIndex !== -1) {
                    this.writeCollaboratorArray.splice(writeIndex, 1);
                }
                break;
        }
    };
    EventSubmissionComponent.prototype.addCollaborator = function (accessType) {
        var _this = this;
        this.circleManagementDialogRef = this.dialog.open(circle_management_component_1.CircleManagementComponent, {
            disableClose: true,
            data: {
                action: 'selectUser',
            }
        });
        this.circleManagementDialogRef.afterClosed()
            .subscribe(function (selectedUser) {
            if (selectedUser !== 'cancel') {
                if (accessType === 'read') {
                    _this.readCollaboratorArray.push(selectedUser);
                }
                else if (accessType === 'write') {
                    _this.writeCollaboratorArray.push(selectedUser);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventSubmissionComponent.prototype.openAddSpeciesDiagnosisDialog = function (eventLocationIndex, locationSpeciesIndex) {
        var _this = this;
        // create local variable for speciesDiagnosis index
        var speciesDiagnosisIndex = this.addSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex);
        // create local array of selected diagnoses to feed to the dialog
        var existingSpeciesDiagnoses = [];
        // create a list of the already selected diagnoses for this species to prevent duplicate selection
        // tslint:disable-next-line:max-line-length
        var speciesdiagnoses = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
        // tslint:disable-next-line:max-line-length
        for (var speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
            // tslint:disable-next-line:max-line-length
            var diagnosis = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex].controls.diagnosis.value;
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
                eventlocationIndex: eventLocationIndex,
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
                _this.removeSpeciesDiagnosis(speciesDiagnosisObj.eventlocationIndex, speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
                return;
            }
            else if (speciesDiagnosisObj.action === 'add') {
                _this.eventSubmissionForm.get('new_event_locations')['controls'][speciesDiagnosisObj.eventlocationIndex]
                    .get('new_location_species')['controls'][speciesDiagnosisObj.locationspeciesIndex]
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
                // loops through the allDiagnoses list
                for (var _i = 0, _a = _this.allDiagnoses; _i < _a.length; _i++) {
                    var diagnosis = _a[_i];
                    // checks if the just-added specices id matches a diagnosis
                    if (diagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                        // instantiate a boolean variable for use in the scope of this function, true if the diagnosis just added
                        // already exists within the availableDiagnoses array
                        var diagnosisFound = false;
                        // check to see if the diagnosis just added already exists in the availableDiagnoses array
                        for (var _b = 0, _c = _this.availableDiagnoses; _b < _c.length; _b++) {
                            var availableDiagnosis = _c[_b];
                            if (availableDiagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                                // if found, increment the count for that diagnosis
                                availableDiagnosis.count++;
                                // if found, set local diagnosisFound var found to true
                                diagnosisFound = true;
                                // if found, stop. do not add to availableDiagnoses array
                                break;
                            }
                        }
                        // if diagnosis is not found to already exist in the availableDiagnoses array, add it.
                        if (!diagnosisFound) {
                            diagnosis.suspect = speciesDiagnosisObj.formValue.suspect;
                            // set diagnosis count to 1
                            diagnosis.count = 1;
                            _this.availableDiagnoses.push(diagnosis);
                        }
                    }
                }
                _this.checkSpeciesDiagnoses();
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventSubmissionComponent.prototype.resetStepper = function () {
        this.eventSubmissionForm.reset();
        this.eventSubmissionForm.get('new_event_locations')['controls'][0].get('country').setValue(app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID);
        // need to update the adminLevelOne options per the default county value
        this.updateAdminLevelOneOptions(app_utilities_1.APP_UTILITIES.DEFAULT_COUNTRY_ID, 0);
        // reset default form values
        this.eventSubmissionForm.patchValue({
            event_reference: '',
            complete: false,
            public: true,
            // NWHC only
            staff: null,
            event_status: '1',
            quality_check: { value: null, disabled: true },
            legal_status: '1',
            legal_number: ''
        });
        this.eventSubmissionForm.markAsUntouched();
        this.eventSubmissionForm.markAsPristine();
        this.stepper.selectedIndex = 0;
        window.scrollTo(0, 0);
    };
    EventSubmissionComponent.prototype.submitEvent = function (formValue) {
        var _this = this;
        this.eventSubmissionForm.markAsUntouched();
        this.submitLoading = true;
        var _loop_2 = function (i) {
            var contacts = [];
            var control = this_1.eventSubmissionForm.get('new_event_locations')['controls'][i].get('new_location_contacts');
            this_1.eventSubmissionForm.get('new_event_locations')['controls'][i].get('new_location_contacts').value.forEach(function (contact) {
                if (contact.contact === null) {
                    control.removeAt(contact);
                }
                else {
                    contacts.push(contact);
                }
            });
            formValue.new_event_locations[i].new_location_contacts = contacts;
        };
        var this_1 = this;
        // check to see if there were blank contacts added and remove them if so
        for (var i = 0; i < this.eventSubmissionForm.get('new_event_locations').value.length; i++) {
            _loop_2(i);
        }
        // KEEP. Bring this back pending introduction of generic event location comment.
        // check if extra event location comment is blank, if so, delete it from the object
        // for (const event_location of formValue.new_event_locations) {
        //   if (event_location.comment.comment === '') {
        //     delete event_location.comment;
        //   }
        // }
        // adds the read collaborators list to the new_read_collaborators array for submission
        for (var _i = 0, _a = this.readCollaboratorArray; _i < _a.length; _i++) {
            var user = _a[_i];
            formValue.new_read_collaborators.push(user.id);
        }
        // adds the write collaborators list to the new_write_collaborators array for submission
        for (var _b = 0, _c = this.writeCollaboratorArray; _b < _c.length; _b++) {
            var user = _c[_b];
            formValue.new_write_collaborators.push(user.id);
        }
        var new_orgs_array = [];
        // loop through and convert new_organizations
        for (var _d = 0, _e = formValue.new_organizations; _d < _e.length; _d++) {
            var org = _e[_d];
            if (org !== undefined) {
                new_orgs_array.push(org.org);
            }
        }
        formValue.new_organizations = new_orgs_array;
        // if lat/long fields are deleted to blank, update to null to be a valid number type on PATCH
        if (formValue.latitude === '') {
            formValue.latitude = null;
        }
        if (formValue.longitude === '') {
            formValue.longitude = null;
        }
        // transform date for quality_check to the expected format
        formValue.quality_check = this.datePipe.transform(formValue.quality_check, 'yyyy-MM-dd');
        // convert start_date and end_date of eventlocations to 'yyyy-MM-dd' before submission
        // can be removed if configure datepicker to output this format (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
        for (var _f = 0, _g = formValue.new_event_locations; _f < _g.length; _f++) {
            var event_location = _g[_f];
            event_location.start_date = this.datePipe.transform(event_location.start_date, 'yyyy-MM-dd');
            event_location.end_date = this.datePipe.transform(event_location.end_date, 'yyyy-MM-dd');
            //delete the event_type superficially attached to event locations
            delete event_location.event_type;
        }
        sessionStorage.setItem('eventSubmission', formValue);
        this.eventService.create(formValue)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.confirmDialogRef = _this.dialog.open(confirm_component_1.ConfirmComponent, {
                disableClose: true,
                data: {
                    title: 'Event Saved',
                    titleIcon: 'check',
                    message: 'Your event was successfully saved. The Event ID is ' + event.id,
                    confirmButtonText: 'OK',
                    showCancelButton: false
                }
            });
            // when user clicks OK, reset the form and stepper using resetStepper()
            _this.confirmDialogRef.afterClosed().subscribe(function (result) {
                if (result === true) {
                    // temporarily disabling the resetStepper function in favor of full page reload.
                    // tons of issues with resetting this form because of its complexity. full page reload works for now. 
                    //this.resetStepper();
                    location.reload();
                }
            });
            gtag('event', 'click', { 'event_category': 'Event', 'event_label': 'New Event Created, type: ' + event.event_type });
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
        });
    };
    __decorate([
        core_1.ViewChild('stepper'),
        __metadata("design:type", stepper_1.MatStepper)
    ], EventSubmissionComponent.prototype, "stepper", void 0);
    __decorate([
        core_1.ViewChild('eventTypeRef'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "eventTypeRef", void 0);
    __decorate([
        core_1.ViewChild('adminLevelOneSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "adminLevelOneSelect", void 0);
    __decorate([
        core_1.ViewChild('adminLevelTwoSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "adminLevelTwoSelect", void 0);
    __decorate([
        core_1.ViewChild('speciesSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "speciesSelect", void 0);
    __decorate([
        core_1.ViewChild('contactSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "contactSelect", void 0);
    __decorate([
        core_1.ViewChild('organizationSelect'),
        __metadata("design:type", material_1.MatSelect)
    ], EventSubmissionComponent.prototype, "organizationSelect", void 0);
    __decorate([
        core_2.HostListener('window:beforeunload'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], EventSubmissionComponent.prototype, "canDeactivate", null);
    EventSubmissionComponent = __decorate([
        core_1.Component({
            selector: 'app-event-submission',
            templateUrl: './event-submission.component.html',
            styleUrls: ['./event-submission.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            material_1.MatDialog,
            material_2.MatBottomSheet,
            current_user_service_1.CurrentUserService,
            common_1.DatePipe,
            display_value_pipe_1.DisplayValuePipe,
            event_type_service_1.EventTypeService,
            legal_status_service_1.LegalStatusService,
            land_ownership_service_1.LandOwnershipService,
            country_service_1.CountryService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            diagnosis_service_1.DiagnosisService,
            species_service_1.SpeciesService,
            sex_bias_service_1.SexBiasService,
            age_bias_service_1.AgeBiasService,
            contact_type_service_1.ContactTypeService,
            comment_type_service_1.CommentTypeService,
            organization_service_1.OrganizationService,
            contact_service_1.ContactService,
            create_contact_service_1.CreateContactService,
            event_service_1.EventService,
            event_status_service_1.EventStatusService,
            staff_service_1.StaffService,
            diagnosis_basis_service_1.DiagnosisBasisService,
            diagnosis_cause_service_1.DiagnosisCauseService,
            circle_service_1.CircleService,
            material_3.MatSnackBar,
            router_1.Router,
            router_1.ActivatedRoute,
            core_1.ChangeDetectorRef])
    ], EventSubmissionComponent);
    return EventSubmissionComponent;
}());
exports.EventSubmissionComponent = EventSubmissionComponent;
//# sourceMappingURL=event-submission.component.js.map