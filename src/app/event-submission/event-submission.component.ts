import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatBottomSheetModule, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

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

import { EventService } from '@app/services/event.service';

import { CreateContactComponent } from '@create-contact/create-contact.component';
import { CreateContactService } from '@create-contact/create-contact.service';

import { ConfirmComponent } from '@confirm/confirm.component';

import { EventSubmissionConfirmComponent } from '@app/event-submission/event-submission-confirm/event-submission-confirm.component';


@Component({
  selector: 'app-event-submission',
  templateUrl: './event-submission.component.html',
  styleUrls: ['./event-submission.component.scss']
})
export class EventSubmissionComponent implements OnInit {

  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  eventSubmitConfirm: MatBottomSheetRef<EventSubmissionConfirmComponent>;

  private subscription: Subscription;
  createdContact;

  eventTypes: EventType[];
  legalStatuses: LegalStatus[];
  landOwnerships: LandOwnership[];

  countries: Country[];

  adminLevelOnes: AdministrativeLevelOne[];
  // expermental, for autocomplete
  filteredAdminLevelOnes: Observable<any[]>;

  adminLevelTwos: AdministrativeLevelTwo[];
  // expermental, for autocomplete
  //filteredAdminLevelTwos: Observable<any[]>;

  species: Species[];
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

  buildEventSubmissionForm() {
    this.eventSubmissionForm = this.formBuilder.group({
      event_reference: '',
      event_type: [null, Validators.required],
      complete: false,
      event_status: 1,
      public: [true, Validators.required],
      new_organizations: null,
      new_comments: this.formBuilder.array([]),
      new_event_locations: this.formBuilder.array([
        this.initEventLocation()
      ])
    });

    this.eventLocationArray = this.eventSubmissionForm.get('new_event_locations') as FormArray;

  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private datePipe: DatePipe,
    private eventTypeService: EventTypeService,
    private legalStatusService: LegalStatusService,
    private landOwnershipService: LandOwnershipService,
    private countryService: CountryService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private speciesService: SpeciesService,
    private sexBiasService: SexBiasService,
    private ageBiasService: AgeBiasService,
    private contactTypeService: ContactTypeService,
    private commentTypeService: CommentTypeService,
    private organizationService: OrganizationService,
    private contactService: ContactService,
    private createContactSevice: CreateContactService,
    private eventService: EventService,
    public snackBar: MatSnackBar
  ) {
    this.buildEventSubmissionForm();

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
        organizations: this.organizations,
      }
    });
  }


  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent,
      {
        // minWidth: '60%',
        // height: '75%'
      });
  }



  openEventLocationRemoveConfirm(i) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Remove Event Location',
          message: 'Are you sure you want to remove the event location?',
          confirmButtonText: 'Remove'
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.removeEventLocation(i);
      }
    });
  }

  filter(val: any, searchArray: any, searchProperty: string): string[] {
    const realval = val && typeof val === 'object' ? val.searchProperty : val;
    const result = [];
    let lastOption = null;
    for (let i = 0; i < searchArray.length; i++) {
      if (!realval || searchArray[i][searchProperty].toLowerCase().startsWith(realval.toLowerCase())) {
        if (searchArray[i][searchProperty] !== lastOption) {
          lastOption = searchArray[i][searchProperty];
          result.push(searchArray[i]);
        }
      }
    }
    return result;
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


    // get legal statues from the LegalStatusService
    this.legalStatusService.getLegalStatuses()
      .subscribe(
        legalStatuses => {
          this.legalStatuses = legalStatuses;
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
          // this.filteredAdminLevelOnes = this.eventSubmissionForm.get('').valueChanges
          //   .startWith(null)
          //   .map(val => this.filter(val, this.administrative_level_one, 'name'));

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
          <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('location_contacts');
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
          <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('location_species');
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
            const locationSpecies = eventLocations[i].get('location_species');

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
      site_description: '',
      history: '',
      environmental_factors: '',
      clinical_signs: '',
      comment: '',
      // comments: this.formBuilder.array([
      //   this.formBuilder.group({
      //     comment: ''
      //   })
      // ]),
      location_species: this.formBuilder.array([
        // this.initLocationSpecies()
      ]),
      location_contacts: this.formBuilder.array([
        // this.initLocationContacts()
      ]),
      // comment: this.formBuilder.group({
      //   comment: '',
      //   comment_type: 5
      // })
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
      sex_bias: null
    });
  }

  initLocationContacts() {
    return this.formBuilder.group({
      id: [null, Validators.required],
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

  // event comments
  addEventComment() {
    const control = <FormArray>this.eventSubmissionForm.get('new_comments');
    control.push(this.initEventComment());
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
        const locationSpecies = <FormArray>newEventLocation.get('location_species');
        locationSpecies.push(species);
      }
    }

    if (this.commonEventData.contacts.length > 0) {

      for (const contact of this.commonEventData.contacts) {
        const locationContacts = <FormArray>newEventLocation.get('location_contacts');
        locationContacts.push(contact);
      }
    }
  }

  removeEventComment(h) {
    const control = <FormArray>this.eventSubmissionForm.get('new_comments');
    control.removeAt(h);

  }

  getEventComments(form) {
    return form.controls.new_comments.controls;
  }

  removeEventLocation(i) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    control.removeAt(i);

  }

  getEventLocations(form) {
    return form.controls.new_event_locations.controls;
  }

  // location species
  addLocationSpecies(i) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('location_species');
    control.push(this.initLocationSpecies());
  }

  removeLocationSpecies(i, j) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('location_species');
    control.removeAt(j);
  }

  getLocationSpecies(form) {
    return form.controls.location_species.controls;
  }

  // location contacts
  addLocationContacts(i) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('location_contacts');
    control.push(this.initLocationContacts());
  }

  removeLocationContacts(i, k) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('location_contacts');
    control.removeAt(k);
  }

  getLocationContacts(form) {
    return form.controls.location_contacts.controls;
  }

  // location comments
  addLocationComments(i) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('comments');
    control.push(this.initLocationComments());
  }

  removeLocationComments(i, m) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('comments');
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
    const id = Number(selectedAdminLevelOneID);

    // query the adminleveltwos endpoint for appropriate records
    // update the options for the adminLevelTwo select with the response

    this.adminLevelTwoService.queryAdminLevelTwos(id)
      .subscribe(
        adminLevelTwos => {
          this.adminLevelTwos = adminLevelTwos;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
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

    // TEMPORARY: remove gnis_name field until backend is handling it
    for (const event_location of formValue.new_event_locations) {
      delete event_location.gnis_name;
    }

    // convert start_date and end_date of event_locations to 'yyyy-MM-dd' before submission
    // can be removed if configure datepicker to output this format (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
    for (const event_location of formValue.new_event_locations) {
      event_location.start_date = this.datePipe.transform(event_location.start_date, 'yyyy-MM-dd');
      event_location.end_date = this.datePipe.transform(event_location.end_date, 'yyyy-MM-dd');
    }

    this.eventService.create(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Event successfully created', 'OK', 8000);
          this.eventSubmissionForm.reset();
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
        }
      );



  }

}
