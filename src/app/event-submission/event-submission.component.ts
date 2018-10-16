import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs-compat/operator/startWith';
import { map } from 'rxjs/operators';


import { MatDialog, MatDialogRef } from '@angular/material';
import { MatBottomSheetModule, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { MatStepperModule, MatStepper } from '@angular/material/stepper';

import { MatAutocompleteSelectedEvent } from '@angular/material';

import { MatSnackBar } from '@angular/material';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { CurrentUserService } from '@services/current-user.service';

import { EventType } from '@interfaces/event-type';
import { EventTypeService } from '@app/services/event-type.service';

import { LegalStatus } from '@interfaces/legal-status';
import { LegalStatusService } from '@app/services/legal-status.service';

import { Diagnosis } from '@interfaces/diagnosis';
import { DiagnosisService } from '@services/diagnosis.service';

import { DiagnosisType } from '@interfaces/diagnosis-type';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';

import { Species } from '@interfaces/species';
import { SpeciesService } from '@services/species.service';

import { Country } from '@interfaces/country';
import { CountryService } from '@app/services/country.service';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';

import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';
import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';

import { LandOwnership } from '@interfaces/land-ownership';
import { LandOwnershipService } from '@services/land-ownership.service';

import { SexBias } from '@interfaces/sex-bias';
import { SexBiasService } from '@services/sex-bias.service';

import { AgeBias } from '@interfaces/age-bias';
import { AgeBiasService } from '@services/age-bias.service';

import { Contact } from '@interfaces/contact';
import { ContactService } from '@services/contact.service';

import { ContactType } from '@interfaces/contact-type';
import { ContactTypeService } from '@services/contact-type.service';

import { CommentType } from '@interfaces/comment-type';
import { CommentTypeService } from '@services/comment-type.service';

import { Organization } from '@interfaces/organization';
import { OrganizationService } from '@services/organization.service';

import { Staff } from '@interfaces/staff';
import { StaffService } from '@services/staff.service';

import { EventService } from '@app/services/event.service';

import { EventStatus } from '@interfaces/event-status';
import { EventStatusService } from '@services/event-status.service';

import { CreateContactComponent } from '@create-contact/create-contact.component';
import { CreateContactService } from '@create-contact/create-contact.service';

import { ConfirmComponent } from '@confirm/confirm.component';

import { AddSpeciesDiagnosisComponent } from '@app/add-species-diagnosis/add-species-diagnosis.component';

import { EventSubmissionConfirmComponent } from '@app/event-submission/event-submission-confirm/event-submission-confirm.component';
import { EventSubmissionSuccessComponent } from '@app/event-submission/event-submission-success/event-submission-success.component';
import { GnisLookupComponent } from '@app/gnis-lookup/gnis-lookup.component';

import * as search_api from 'usgs-search-api';

declare const search_api: search_api;


@Component({
  selector: 'app-event-submission',
  templateUrl: './event-submission.component.html',
  styleUrls: ['./event-submission.component.scss']
})
export class EventSubmissionComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>;
  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  submitSuccessDialogRef: MatDialogRef<EventSubmissionSuccessComponent>;

  eventSubmitConfirm: MatBottomSheetRef<EventSubmissionConfirmComponent>;

  private subscription: Subscription;
  createdContact;

  currentUser;

  eventTypes: EventType[];
  legalStatuses: LegalStatus[];
  eventStatuses: EventStatus[];
  landOwnerships: LandOwnership[];
  diagnoses: Diagnosis[];

  countries: Country[];
  staff: Staff[];

  adminLevelOnes: AdministrativeLevelOne[];
  // expermental, for autocomplete
  administrative_level_one: AdministrativeLevelOne[];
  filteredAdminLevelOnes;

  adminLevelTwos: AdministrativeLevelTwo[];
  // expermental, for autocomplete
  filteredAdminLevelTwos;

  //////////////////////////////////////////////
  species: Species[];
  // filteredSpecies: Observable<Species[]>[] = [];

  filteredSpecies = [];
  //eventLocationSpecies: Observable<any[]>[] = [];
  ///////////////////////////////////////////////////////

  contacts: Contact[];
  filteredContacts = [];

  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  organizations: Organization[];

  contactTypes: ContactType[];
  commentTypes: CommentType[];

  userContacts = [];

  errorMessage;

  eventSubmissionForm: FormGroup;

  eventLocationArray: FormArray;
  locationContactsArray: FormArray;
  locationSpeciesArray: FormArray;

  submitLoading = false;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  commonEventData = {
    species: [],
    contacts: []
  };

  usgsSearch;

  buildEventSubmissionForm() {
    this.eventSubmissionForm = this.formBuilder.group({
      event_reference: '',
      event_type: [null, Validators.required],
      complete: false,
      event_status: 1,
      public: [true, Validators.required],
      // NWHC only
      staff: null,
      status: null,
      quality_check: null,
      legal_status: null,
      legal_number: '',
      // end NWHC only
      new_organizations: null,
      new_event_diagnoses: this.formBuilder.array([]),
      new_comments: this.formBuilder.array([]),
      new_superevents: this.formBuilder.array([]),
      new_event_locations: this.formBuilder.array([
        this.initEventLocation()
      ])
    });

    this.eventLocationArray = this.eventSubmissionForm.get('new_event_locations') as FormArray;

    this.filteredAdminLevelOnes = new Array<Observable<any>>();
    this.ManageAdminLevelOneControl(0);

    this.filteredAdminLevelTwos = new Array<Observable<any>>();
    this.ManageAdminLevelTwoControl(0);
            

    let eventLocationSpecies = new Array<Observable<any>>();
    this.filteredSpecies.push(eventLocationSpecies);
    this.ManageSpeciesControl(0, 0);

    let eventLocationContacts = new Array<Observable<any>>();
    this.filteredContacts.push(eventLocationContacts);
    this.ManageContactControl(0, 0);
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private currentUserService: CurrentUserService,
    // private matStepper: MatStepper,
    private datePipe: DatePipe,
    private eventTypeService: EventTypeService,
    private legalStatusService: LegalStatusService,
    private landOwnershipService: LandOwnershipService,
    private countryService: CountryService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private diagnosisService: DiagnosisService,
    private speciesService: SpeciesService,
    private sexBiasService: SexBiasService,
    private ageBiasService: AgeBiasService,
    private contactTypeService: ContactTypeService,
    private commentTypeService: CommentTypeService,
    private organizationService: OrganizationService,
    private contactService: ContactService,
    private createContactSevice: CreateContactService,
    private eventService: EventService,
    private eventStatusService: EventStatusService,
    private staffService: StaffService,
    public snackBar: MatSnackBar
  ) {
    this.buildEventSubmissionForm();

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.subscription = this.createContactSevice.getCreatedContact().subscribe(
      createdContact => {
        this.createdContact = createdContact;

        // TEMPORARY- will need to use user creds to query user contact list
        // get contacts from the ContactService
        this.contactService.getContacts()
          .subscribe(
            contacts => {
              this.userContacts = contacts;
            },
            error => {
              this.errorMessage = <any>error;
            }
          );

      });



    // this.eventSubmitConfirm.afterDismissed().subscribe(() => {
    //   console.log('Bottom sheet has been dismissed.');
    // });

  }

  openEventSubmitConfirm(formValue): void {
    this.bottomSheet.open(EventSubmissionConfirmComponent, {
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
  }


  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      data: {
        contact_action: 'create'
      }
    });
  }

  openGNISLookupDialog(eventLocationIndex) {
    this.gnisLookupDialogRef = this.dialog.open(GnisLookupComponent, {
      data: {
        event_location_index: eventLocationIndex
      }
    });

    this.gnisLookupDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.eventSubmissionForm.get('new_event_locations')['controls'][result.event_location_index].get('gnis_id').setValue(result.id);
      this.eventSubmissionForm.get('new_event_locations')['controls'][result.event_location_index].get('gnis_name').setValue(result.name);

    });
  }


  openEventLocationRemoveConfirm(eventLocationIndex) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Remove Event Location',
          titleIcon: 'remove_circle',
          message: 'Are you sure you want to remove the event location?',
          messageIcon: '',
          confirmButtonText: 'Remove',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.removeEventLocation(eventLocationIndex);
      }
    });
  }

  displayFn(speciesId?: Species): string | undefined {
    let species_id_match;
    for (let i = 0; i < this["options"]._results.length-1; i++) {
      if (this["options"]._results[i].value == speciesId) {
        species_id_match = this["options"]._results[i].viewValue;
      }
    }
    return species_id_match;
  }

  displayFnContact(contactId?: Contact): string | undefined {
    let contact_id_match;
    for (let i = 0; i < this["options"]._results.length; i++) {
      if (this["options"]._results[i].value == contactId) {
        contact_id_match = this["options"]._results[i].viewValue;
      }
    }
    return contact_id_match;
  }

  displayFnAdminLevelOne(adminLevelOneId?: number): string | undefined {
    let admin_level_one;
    if (this["options"] !== undefined) {
      for (let i = 0; i < this["options"]._results.length; i++) {
        if (this["options"]._results[i].value == adminLevelOneId) {
          admin_level_one = this["options"]._results[i].viewValue;
        }
      }
    }
    return admin_level_one;
  }

  displayFnAdminLevelTwo(adminLevelTwoId?: number): string | undefined {
    let admin_level_two;
    if (this["options"] !== undefined) {
      for (let i = 0; i < this["options"]._results.length; i++) {
        if (this["options"]._results[i].value == adminLevelTwoId) {
          admin_level_two = this["options"]._results[i].viewValue;
        }
      }
    }
    return admin_level_two;
  }


  ////////////////////////////////////////////// Begin WIP

  private _filter(name: string): Species[] {
    const filterValue = name.toLowerCase();

    return this.species.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  // tslint:disable-next-line:max-line-length
  // WIP: tying to use this example: https://stackoverflow.com/questions/51562826/how-to-use-mat-autocomplete-angular-material-autocomplete-inside-formarray-re
  // to do dynamic filteredSpecies arrays for each loc species instance. Not working - select displays "[Object oject]" instead of name. Not sure yet if this approach is going to work
  ManageSpeciesControl(eventLocationIndex: number, locationSpeciesIndex: number) {
    // tslint:disable-next-line:max-line-length
    const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species') as FormArray;
    this.filteredSpecies[eventLocationIndex][locationSpeciesIndex] = arrayControl.at(locationSpeciesIndex).get('species').valueChanges
      .startWith(null)
      .map(val => this.filter(val, this.species, 'name'));
    // .pipe(
    //   startWith<string | Species>(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.species.slice())
    // );

  }
  ///////////////////////////////////////////////// End WIP

  ManageContactControl(eventLocationIndex: number, locationContactIndex: number) {
    // tslint:disable-next-line:max-line-length
    const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts') as FormArray;
    this.filteredContacts[eventLocationIndex][locationContactIndex] = arrayControl.at(locationContactIndex).get('contact').valueChanges
      .startWith(null)
      .map(val => this.filter(val, this.userContacts, 'last_name'));
  }

  ManageAdminLevelOneControl(eventLocationIndex: number) {
    // tslint:disable-next-line:max-line-length
    const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_one') as FormArray;
    this.filteredAdminLevelOnes[eventLocationIndex] = arrayControl.valueChanges
      .startWith(null)
      .map(val => this.filter(val, this.adminLevelOnes, 'name'));
  }

  ManageAdminLevelTwoControl(eventLocationIndex: number) {
    // tslint:disable-next-line:max-line-length
    const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_two') as FormArray;
    this.filteredAdminLevelTwos[eventLocationIndex] = arrayControl.valueChanges
      .startWith(null)
      .map(val => this.filter(val, this.adminLevelTwos, 'name'));
  }

  filter(val: any, searchArray: any, searchProperty: string): string[] {
    let result = [];
    if (isNaN(val)){
      const realval = val && typeof val === 'object' ? val[searchProperty] : val;
      let lastOption = null;
      if (searchArray !== undefined) {
        for (let i = 0; i < searchArray.length; i++) {
          if (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase())) {
            if (searchArray[i][searchProperty] !== lastOption) {
              lastOption = searchArray[i][searchProperty];
              result.push(searchArray[i]);
            }
          }
        }
      }
    }
    // this will return all records matching the val string
    return result;
  }

  ngAfterViewInit() {
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

  }


  ngOnInit() {

    // get event types from the EventTypeService
    this.eventTypeService.getEventTypes()
      .subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get legal statuses from the LegalStatusService
    this.legalStatusService.getLegalStatuses()
      .subscribe(
        legalStatuses => {
          this.legalStatuses = legalStatuses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get event record statuses from the EventStatusService
    this.eventStatusService.getEventStatuses()
      .subscribe(
        eventStatuses => {
          this.eventStatuses = eventStatuses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          this.diagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get landOwnerships from the LandOwnerShipService
    this.landOwnershipService.getLandOwnerships()
      .subscribe(
        landOwnerships => {
          this.landOwnerships = landOwnerships;
          this.landOwnerships.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get countries from the countryService
    this.countryService.getCountries()
      .subscribe(
        countries => {
          this.countries = countries;
          this.countries.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get staff members from the staffService
    this.staffService.getStaff()
      .subscribe(
        staff => {
          this.staff = staff;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // query adminLevelOnes from the adminLevelOneService using default country
    this.adminLevelOneService.queryAdminLevelOnes(APP_UTILITIES.DEFAULT_COUNTRY_ID)
      .subscribe(
        adminLevelOnes => {
          this.adminLevelOnes = adminLevelOnes;

          // experimental
          /*this.filteredAdminLevelOnes = this.eventSubmissionForm.get('state').valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.administrative_level_one, 'name'));*/

          // end experimental
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get species from the speciesService
    this.speciesService.getSpecies()
      .subscribe(
        species => {
          this.species = species;
          this.species.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          // TODO: lines below commented out are for species autocomplete. more complex on this component since species is part of a form array
          // line below is copied from search dialog component, but does not work here.
          //this.filteredSpecies = this.eventSubmissionForm.get('species').valueChanges
          // line below is does not work, but is the beginning of the solution.
          // this.filteredSpecies = this.eventSubmissionForm.controls.new_event_locations.get('new_location_species').get('species').valueChanges
          //   .startWith(null)
          //   .map(val => this.filter(val, this.species, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // get sexBiases from the sexBias service
    this.sexBiasService.getSexBiases()
      .subscribe(
        sexBiases => {
          this.sexBiases = sexBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get ageBiases from the ageBias service
    this.ageBiasService.getAgeBiases()
      .subscribe(
        ageBiases => {
          this.ageBiases = ageBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get contact types from the ContactTypeService
    this.contactTypeService.getContactTypes()
      .subscribe(
        contactTypes => {
          this.contactTypes = contactTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get comment types from the CommentTypeService
    this.commentTypeService.getCommentTypes()
      .subscribe(
        commentTypes => {
          this.commentTypes = commentTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // TEMPORARY- will need to use user creds to query user contact list
    // get contact types from the ContactTypeService
    this.contactService.getContacts()
      .subscribe(
        contacts => {
          this.userContacts = contacts;
          this.userContacts.sort(function (a, b) {
            if (a.last_name < b.last_name) { return -1; }
            if (a.last_name > b.last_name) { return 1; }
            return 0;
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  getErrorMessage(formControlName) {
    return this.eventSubmissionForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.eventSubmissionForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        '';
  }

  createCommonEventDataObject(objectType, eventLocationIndex, objectInstanceIndex) {

    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'];

    // check which object is being sent, parse out the specific form group instance from the form, add to the commonEventData object
    switch (objectType) {
      case 'contact':
        const contactsArray =
          <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
        const contact = contactsArray.controls[objectInstanceIndex];
        this.commonEventData.contacts.push(contact);

        // loop through event locations and push the new contact into each, except the one it came from (so as to avoid duplicate)
        for (let i = 0, j = eventLocations.length; i < j; i++) {

          if (i !== eventLocationIndex) {
            const locationContacts = eventLocations[i].get('location_contacts');
            locationContacts.push(contact);
          }
        }

        break;
      case 'species':
        const speciesArray =
          <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
        const species = speciesArray.controls[objectInstanceIndex];
        this.commonEventData.species.push(this.formBuilder.group({
          species: species.value.species,
          population_count: null,
          sick_count: null,
          dead_count: null,
          sick_count_estimated: null,
          dead_count_estimated: null,
          priority: null,
          captive: null,
          age_bias: null,
          sex_bias: null
        })
        );

        // loop through event locations and push the new contact into each, except the one it came from (so as to avoid duplicate)
        for (let i = 0, j = eventLocations.length; i < j; i++) {

          if (i !== eventLocationIndex) {
            const locationSpecies = eventLocations[i].get('new_location_species');

            // push a new formGroup to the locationSpecies formArray, with the same species value but all other controls null/blank
            // note: to copy the entire formGroup value, change line below to 'locationSpecies.push(species)'
            locationSpecies.push(this.formBuilder.group({
              species: species.value.species,
              population_count: null,
              sick_count: null,
              dead_count: null,
              sick_count_estimated: null,
              dead_count_estimated: null,
              priority: null,
              captive: null,
              age_bias: null,
              sex_bias: null
            })
            );

          }
        }
        break;
    }

    console.log(this.commonEventData);

  }

  initEventLocation() {
    return this.formBuilder.group({
      name: '',
      start_date: '',
      end_date: null,
      country: [APP_UTILITIES.DEFAULT_COUNTRY_ID, Validators.required],
      administrative_level_one: [null, Validators.required],
      administrative_level_two: [null, Validators.required],
      latitude: [null, Validators.pattern(this.latitudePattern)],
      longitude: [null, Validators.pattern(this.longitudePattern)],
      land_ownership: [null, Validators.required],
      gnis_name: '',
      gnis_id: '',
      site_description: '',
      history: '',
      environmental_factors: '',
      clinical_signs: '',
      comment: '',
      new_location_species: this.formBuilder.array([
        this.initLocationSpecies()
      ]),
      new_location_contacts: this.formBuilder.array([
        this.initLocationContacts()
      ])
    });
  }

  initLocationSpecies() {
    return this.formBuilder.group({
      species: [null, Validators.required],
      population_count: null,
      sick_count: null,
      dead_count: null,
      sick_count_estimated: null,
      dead_count_estimated: null,
      priority: null,
      captive: false,
      age_bias: null,
      sex_bias: null,
      new_species_diagnoses: this.formBuilder.array([])
    });
  }

  initSpeciesDiagnosis() {
    return this.formBuilder.group({
      diagnosis: [null, Validators.required],
      diagnosis_cause: null,
      diagnosis_basis: null,
      suspect: false,
      tested_count: null,
      diagnosis_count: null,
      positive_count: null,
      suspect_count: null,
      pooled: false,
      organizations: null
    });
  }

  initLocationContacts() {
    return this.formBuilder.group({
      contact: [null, Validators.required],
      contact_type: [null, Validators.required]
    });
  }

  initLocationComments() {
    return this.formBuilder.group({
      comment: '',
      comment_type: null
    });
  }

  initEventComment() {
    return this.formBuilder.group({
      comment: '',
      comment_type: 5
    });
  }

  initEventDiagnosis() {
    return this.formBuilder.group({
      diagnosis: null
    });
  }

  // event locations
  addEventLocation() {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    control.push(this.initEventLocation());

    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'];
    const newEventLocationIndex = eventLocations.length - 1;
    const newEventLocation = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][newEventLocationIndex];

    if (this.commonEventData.species.length > 0) {

      for (const species of this.commonEventData.species) {
        const locationSpecies = <FormArray>newEventLocation.get('new_location_species');
        locationSpecies.push(species);
      }
    }

    this.ManageAdminLevelOneControl(newEventLocationIndex);
    this.ManageAdminLevelTwoControl(newEventLocationIndex);

    let eventLocationSpecies = new Array<Observable<any>>();
    this.filteredSpecies.push(eventLocationSpecies);
    this.ManageSpeciesControl(newEventLocationIndex, 0);

    if (this.commonEventData.contacts.length > 0) {

      for (const contact of this.commonEventData.contacts) {
        const locationContacts = <FormArray>newEventLocation.get('new_location_contacts');
        locationContacts.push(contact);
      }
    }

    let eventLocationContacts = new Array<Observable<any>>();
    this.filteredContacts.push(eventLocationContacts);
    this.ManageContactControl(newEventLocationIndex, 0);

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

  }

  removeEventLocation(eventLocationIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    control.removeAt(eventLocationIndex);
  }

  getEventLocations(form) {
    return form.controls.new_event_locations.controls;
  }

  // event comments
  addEventComment() {
    const control = <FormArray>this.eventSubmissionForm.get('new_comments');
    control.push(this.initEventComment());
  }

  removeEventComment(eventCommentIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_comments');
    control.removeAt(eventCommentIndex);
  }

  getEventComments(form) {
    return form.controls.new_comments.controls;
  }

  // event diagnoses
  addEventDiagnosis() {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_diagnoses');
    control.push(this.initEventDiagnosis());
  }

  removeEventDiagnosis(eventDiagnosisIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_diagnoses');
    control.removeAt(eventDiagnosisIndex);
  }

  getEventDiagnoses(form) {
    return form.controls.new_event_diagnoses.controls;
  }

  // location species
  addLocationSpecies(eventLocationIndex) {
    const controls = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
    controls.push(this.initLocationSpecies());

    const locationSpeciesIndex = controls.length - 1;

    this.ManageSpeciesControl(eventLocationIndex, locationSpeciesIndex);
  }

  removeLocationSpecies(eventLocationIndex, locationSpeciesIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
    control.removeAt(locationSpeciesIndex);
  }

  getLocationSpecies(form) {
    return form.controls.new_location_species.controls;
  }

  // species diagnosis
  // TODO: add an additional level of index
  addSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex) {
    // tslint:disable-next-line:max-line-length
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
    control.push(this.initSpeciesDiagnosis());
    // tslint:disable-next-line:max-line-length
    const speciesDiagnosisIndex = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses').length - 1;
    return speciesDiagnosisIndex;
  }

  removeSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex) {
    // tslint:disable-next-line:max-line-length
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses');
    control.removeAt(speciesDiagnosisIndex);
  }

  getSpeciesDiagnoses(form) {
    return form.controls.new_species_diagnoses.controls;
  }


  // location contacts
  addLocationContacts(eventLocationIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
    control.push(this.initLocationContacts());

    const locationContactIndex = control.length - 1;

    this.ManageContactControl(eventLocationIndex, locationContactIndex);
  }

  removeLocationContacts(eventLocationIndex, locationContactIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
    control.removeAt(locationContactIndex);
  }

  getLocationContacts(form) {
    return form.controls.new_location_contacts.controls;
  }

  // location comments
  addLocationComments(eventLocationIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comments');
    control.push(this.initLocationComments());
  }

  removeLocationComments(eventLocationIndex, m) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comments');
    control.removeAt(m);
  }

  getLocationComments(form) {
    return form.controls.comments.controls;
  }

  updateAdminLevelOneOptions(selectedCountryID) {
    const id = Number(selectedCountryID);

    // query the adminlevelones endpoint for appropriate records
    // update the options for the adminLevelOne select with the response

    this.adminLevelOneService.queryAdminLevelOnes(id)
      .subscribe(
        adminLevelOnes => {
          this.adminLevelOnes = adminLevelOnes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  updateAdminLevelTwoOptions(selectedAdminLevelOneID) {
    if (!isNaN(selectedAdminLevelOneID)) {
      const id = Number(selectedAdminLevelOneID);

      // query the adminleveltwos endpoint for appropriate records
      // update the options for the adminLevelTwo select with the response

      this.adminLevelTwoService.queryAdminLevelTwos(id)
        .subscribe(
          adminLevelTwos => {
            this.adminLevelTwos = adminLevelTwos;
            this.adminLevelTwos.sort(function (a, b) {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            });
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
      }
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  setEventLocationForGNISSelect(eventLocationIndex) {
    console.log('Selecting GNIS record for Event Location Number' + (eventLocationIndex + 1));
  }

  openAddSpeciesDiagnosisDialog(eventLocationIndex, locationSpeciesIndex) {

    const speciesDiagnosisIndex = this.addSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex);

    // Open dialog for adding species diagnosis
    this.addSpeciesDiagnosisDialogRef = this.dialog.open(AddSpeciesDiagnosisComponent, {
      data: {
        species_diagnosis_action: 'addToFormArray',
        eventLocationIndex: eventLocationIndex,
        locationSpeciesIndex: locationSpeciesIndex
      }
    });

    this.addSpeciesDiagnosisDialogRef.afterClosed()
      .subscribe(
        (speciesDiagnosisObj) => {

          // tslint:disable-next-line:max-line-length
          this.eventSubmissionForm.get('new_event_locations')['controls'][speciesDiagnosisObj.eventLocationIndex]
            .get('new_location_species')['controls'][speciesDiagnosisObj.locationSpeciesIndex]
            .get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].setValue({
              diagnosis: speciesDiagnosisObj.formValue.diagnosis,
              diagnosis_cause: speciesDiagnosisObj.formValue.diagnosis_cause,
              diagnosis_basis: speciesDiagnosisObj.formValue.diagnosis_basis,
              suspect: speciesDiagnosisObj.formValue.suspect,
              tested_count: speciesDiagnosisObj.formValue.tested_count,
              diagnosis_count: speciesDiagnosisObj.formValue.diagnosis_count,
              positive_count: speciesDiagnosisObj.formValue.positive_count,
              suspect_count: speciesDiagnosisObj.formValue.suspect_count,
              pooled: speciesDiagnosisObj.formValue.pooled,
              organizations: speciesDiagnosisObj.formValue.organizations
            });

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  resetStepper() {
    this.eventSubmissionForm.reset();
    this.eventSubmissionForm.get('new_event_locations')['controls'][0].get('country').setValue(APP_UTILITIES.DEFAULT_COUNTRY_ID);
    this.eventSubmissionForm.markAsUntouched();
    this.eventSubmissionForm.markAsPristine();
    this.stepper.selectedIndex = 0;
    window.scrollTo(0, 0);
  }


  submitEvent(formValue) {

    this.submitLoading = true;

    // KEEP. Bring this back pending introduction of generic event location comment.
    // check if extra event location comment is blank, if so, delete it from the object
    // for (const event_location of formValue.new_event_locations) {
    //   if (event_location.comment.comment === '') {
    //     delete event_location.comment;
    //   }
    // }

    // convert start_date and end_date of eventlocations to 'yyyy-MM-dd' before submission
    // can be removed if configure datepicker to output this format (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
    for (const event_location of formValue.new_event_locations) {
      event_location.start_date = this.datePipe.transform(event_location.start_date, 'yyyy-MM-dd');
      event_location.end_date = this.datePipe.transform(event_location.end_date, 'yyyy-MM-dd');
    }

    this.eventService.create(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;



          this.confirmDialogRef = this.dialog.open(ConfirmComponent,
            {
              data: {
                title: 'Event Saved',
                titleIcon: 'check',
                message: 'Your event was successfully saved. The Event ID is ' + event.id,
                messageIcon: 'check',
                confirmButtonText: 'OK',
                showCancelButton : true
              }
            }
          );

          // when user clicks OK, reset the form and stepper using resetStepper()
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              alert('event saved OKed');
              this.resetStepper();
            }
          });

          // open event save success dialog
          // this.submitSuccessDialogRef = this.dialog.open(EventSubmissionSuccessComponent,
          //   {
          //     data: {
          //       title: 'Event Saved',
          //       message: 'Your event was successfully saved. The Event ID is ' + event.id,
          //       confirmButtonText: 'OK'
          //     }
          //   }
          // );

          // // when user clicks OK, reset the form and stepper using resetStepper()
          // this.submitSuccessDialogRef.afterClosed().subscribe(result => {
          //   if (result === true) {
          //     alert('event saved OKed');
          //     this.resetStepper();
          //   }
          // });
          // use these below if using the success dialog above does not work or is unused.
          //this.openSnackBar('Event successfully created', 'OK', 8000);
          //this.resetStepper();
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
        }
      );



  }

}
