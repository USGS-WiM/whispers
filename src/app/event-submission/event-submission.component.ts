import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';

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

import { County } from '@interfaces/county';
import { CountyService } from '@services/county.service';

import { Species } from '@interfaces/species';
import { SpeciesService } from '@services/species.service';

import { Country } from '@interfaces/country';
import { CountryService } from '@app/services/country.service';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';

// import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';
// import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';

import { LandOwnership } from '@interfaces/land-ownership';
import { LandOwnershipService } from '@services/land-ownership.service';

import { SexBias } from '@interfaces/sex-bias';
import { SexBiasService } from '@services/sex-bias.service';

import { AgeBias } from '@interfaces/age-bias';
import { AgeBiasService } from '@services/age-bias.service';

import { Contact } from '@interfaces/contact';

import { ContactType } from '@interfaces/contact-type';
import { ContactTypeService } from '@app/services/contact-type.service';

import { CreateContactComponent } from '@create-contact/create-contact.component';


@Component({
  selector: 'app-event-submission',
  templateUrl: './event-submission.component.html',
  styleUrls: ['./event-submission.component.scss']
})
export class EventSubmissionComponent implements OnInit {

  createContactDialogRef: MatDialogRef<CreateContactComponent>;

  eventTypes: EventType[];
  legalStatuses: LegalStatus[];
  landOwnerships: LandOwnership[];

  countries: Country[];
  adminLevelOnes: AdministrativeLevelOne[];

  species: Species[];
  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  contactTypes: ContactType[];

  userContacts = [];

  errorMessage;

  eventSubmissionForm: FormGroup;

  buildEventSubmissionForm() {
    this.eventSubmissionForm = this.formBuilder.group({
      event_reference: '',
      event_type: null,
      legal_status: null,
      legal_number: '',
      event_organization: null,
      comments: this.formBuilder.array([]),
      event_locations: this.formBuilder.array([
        this.initEventLocation()
      ])
    });

  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private eventTypeService: EventTypeService,
    private legalStatusService: LegalStatusService,
    private landOwnershipService: LandOwnershipService,
    private countryService: CountryService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private speciesService: SpeciesService,
    private sexBiasService: SexBiasService,
    private ageBiasService: AgeBiasService,
    private contactTypeService: ContactTypeService
  ) {
    this.buildEventSubmissionForm();
  }

  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      // minWidth: '60%',
      // height: '75%'
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

  }

  initEventLocation() {
    return this.formBuilder.group({
      name: '',
      start_date: '',
      end_date: '',
      country: APP_UTILITIES.DEFAULT_COUNTRY_ID,
      administrative_level_one: null,
      administrative_level_two: null,
      latitude: null,
      longitude: null,
      land_ownership: null,
      gnis_name: '',
      area_description: '',
      environmental_factors: '',
      clinical_signs: '',
      location_species: this.formBuilder.array([
        this.initLocationSpecies()
      ]),
      location_contacts: this.formBuilder.array([
        this.initLocationContacts()
      ]),
      comments: this.formBuilder.array([
       // this.initLocationComments()
      ])
    });
  }

  initLocationSpecies() {
    return this.formBuilder.group({
      species: null,
      population: null,
      sick: null,
      dead: null,
      estimated_sick: null,
      estimated_dead: null,
      priority: null,
      captive: null,
      age_bias: null,
      sex_bias: null
    });
  }

  initLocationContacts() {
    return this.formBuilder.group({
      id: null,
      contact_type: null
    });
  }

  initLocationComments() {
    return this.formBuilder.group({
      comment: '',
      comment_type: null
    });
  }

  // event locations
  addEventLocation() {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations');
    control.push(this.initEventLocation());
  }

  removeEventLocation(i) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations');
    control.removeAt(i);

  }

  getEventLocations(form) {
    return form.controls.event_locations.controls;
  }

  // location species
  addLocationSpecies(i) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_species');
    control.push(this.initLocationSpecies());
  }

  removeLocationSpecies(i, j) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_species');
    control.removeAt(j);
  }

  getLocationSpecies(form) {
    return form.controls.location_species.controls;
  }

  // location contacts
  addLocationContacts(i) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_contacts');
    control.push(this.initLocationContacts());
  }

  removeLocationContacts(i, k) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_contacts');
    control.removeAt(k);
  }

  getLocationContacts(form) {
    return form.controls.location_contacts.controls;
  }

  // location comments
  addLocationComments(i) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_comments');
    control.push(this.initLocationComments());
  }

  removeLocationComments(i, m) {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations')['controls'][i].get('location_comments');
    control.removeAt(m);
  }

  getLocationComments(form) {
    return form.controls.location_comments.controls;
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

    // query the adminlevelones endpoint for appropriate records
    // update the options for the adminLevelOne select with the response

    // this.adminLevelTwoService.queryAdminLevelTwos(id)
    //   .subscribe(
    //     adminLevelTwos => {
    //       this.adminLevelTwos = adminLevelTwos;
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );
  }

}
