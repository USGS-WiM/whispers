import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
// import { MAT_DIALOG_DATA } from '@angular/material';
import { EventLocationService } from '@app/services/event-location.service';

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

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { GnisLookupComponent } from '@app/gnis-lookup/gnis-lookup.component';

import { ConfirmComponent } from '@confirm/confirm.component';

import * as search_api from 'usgs-search-api';
declare const search_api: search_api;


@Component({
  selector: 'app-add-event-location',
  templateUrl: './add-event-location.component.html',
  styleUrls: ['./add-event-location.component.scss']
})
export class AddEventLocationComponent implements OnInit {
  @Input('eventID') eventID: string;

  errorMessage = '';
  addEventLocationForm: FormGroup;

  confirmDialogRef: MatDialogRef<ConfirmComponent>;


  gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>;
  createContactDialogRef: MatDialogRef<CreateContactComponent>;

  landOwnerships: LandOwnership[];
  countries: Country[];
  adminLevelOnes: AdministrativeLevelOne[];
  adminLevelTwos: AdministrativeLevelTwo[];

  species: Species[];

  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  organizations: Organization[];

  contactTypes: ContactType[];
  commentTypes: CommentType[];

  userContacts = [];

  //eventID;

  submitLoading = false;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  buildAddEventLocationForm() {
    this.addEventLocationForm = this.formBuilder.group({
      event: null,
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
        // this.initLocationSpecies()
      ]),
      new_location_contacts: this.formBuilder.array([
        // this.initLocationContacts()
      ])
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    // public addEventLocationDialogRef: MatDialogRef<AddEventLocationComponent>,
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
    private eventLocationService: EventLocationService,
    public snackBar: MatSnackBar,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddEventLocationForm();
  }

  ngOnInit() {

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
          this.species.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          // TODO: lines below commented out are for species autocomplete. more complex on this component since species is part of a form array
          // line below is copied from search dialog component, but does not work here.
          // this.filteredSpecies = this.eventSubmissionForm.get('species').valueChanges
          // line below is does not work, but is the beginning of the solution.
          // this.filteredSpecies = this.eventSubmissionForm.get('new_event_locations').get('location_species').get('species').valueChanges
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

  onSubmit(formValue) {

    this.submitLoading = true;

    formValue.event = this.eventID;

    // convert start_date and end_date of event_locations to 'yyyy-MM-dd' before submission
    // can be removed if configure datepicker to output this format (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
    formValue.start_date = this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd');
    formValue.end_date = this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd');

    this.eventLocationService.create(formValue)
      .subscribe(
        newEventLocation => {
          this.submitLoading = false;
          this.openSnackBar('New event location successfully created. Page will reload.', 'OK', 5000);
          this.addEventLocationForm.reset();
          location.reload();
        },
        error => {
          this.errorMessage = <any>error;
          this.submitLoading = false;
          this.openSnackBar('Error. Event location not created. Error message: ' + error, 'OK', 8000);
        }
      );

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

  // location species
  addLocationSpecies() {
    const control = <FormArray>this.addEventLocationForm.get('new_location_species');
    control.push(this.initLocationSpecies());
  }

  removeLocationSpecies(i, j) {
    const control = <FormArray>this.addEventLocationForm.get('new_location_species');
    control.removeAt(j);
  }
  getLocationSpecies() {
    return this.addEventLocationForm.controls.new_location_species['controls'];
  }

  // location contacts
  addLocationContacts() {
    const control = <FormArray>this.addEventLocationForm.get('new_location_contacts');
    control.push(this.initLocationContacts());
  }

  removeLocationContacts(i, k) {
    const control = <FormArray>this.addEventLocationForm.get('new_location_contacts');
    control.removeAt(k);
  }

  getLocationContacts() {
    return this.addEventLocationForm.controls.new_location_contacts['controls'];
  }

  // location comments
  addLocationComments(i) {
    const control = <FormArray>this.addEventLocationForm.get('new_comments');
    control.push(this.initLocationComments());
  }

  removeLocationComments(i, m) {
    const control = <FormArray>this.addEventLocationForm.get('new_comments');
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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  setEventLocationForGNISSelect(i) {
    console.log('Selecting GNIS record for Event Location Number' + (i + 1));
  }

  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      data: {
        contact_action: 'create'
      }
    });
  }

  openGNISLookupDialog() {
    this.gnisLookupDialogRef = this.dialog.open(GnisLookupComponent, {
      data: {}
    });

    this.gnisLookupDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.addEventLocationForm.get('gnis_id').setValue(result.id);
      this.addEventLocationForm.get('gnis_name').setValue(result.name);

    });
  }



}
