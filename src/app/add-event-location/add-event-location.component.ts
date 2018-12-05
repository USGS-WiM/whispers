import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef, MatSelect } from '@angular/material';

import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take, takeUntil } from 'rxjs/operators';

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

import { EventDetail } from '@interfaces/event-detail';

import * as search_api from 'usgs-search-api';
declare const search_api: search_api;


@Component({
  selector: 'app-add-event-location',
  templateUrl: './add-event-location.component.html',
  styleUrls: ['./add-event-location.component.scss']
})
export class AddEventLocationComponent implements OnInit {
  @Input('eventData') eventData: EventDetail;
  @Input('eventTypeID') eventTypeID: string;
  @ViewChild('adminLevelOneSelect') adminLevelOneSelect: MatSelect;
  @ViewChild('adminLevelTwoSelect') adminLevelTwoSelect: MatSelect;
  @ViewChild('speciesSelect') speciesSelect: MatSelect;
  @ViewChild('contactSelect') contactSelect: MatSelect;

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
  submitLoading = false;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  filteredSpecies = [];
  filteredContacts = [];

  locationSpeciesNumbersViolation = false;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  /** controls for the MatSelect filter keyword */
  adminLevelOneFilterCtrl: FormControl = new FormControl();
  adminLevelTwoFilterCtrl: FormControl = new FormControl();
  speciesFilterCtrl: FormControl = new FormControl();
  contactFilterCtrl: FormControl = new FormControl();

  filteredAdminLevelOnes: ReplaySubject<AdministrativeLevelOne[]> = new ReplaySubject<AdministrativeLevelOne[]>();
  filteredAdminLevelTwos: ReplaySubject<AdministrativeLevelTwo[]> = new ReplaySubject<AdministrativeLevelTwo[]>();

  buildAddEventLocationForm() {
    this.addEventLocationForm = this.formBuilder.group({
      event: null,
      name: '',
      start_date: null,
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
      // used only to capture event_type from event - not part of eventlocation record
      event_type: null,
      new_location_species: this.formBuilder.array([
        this.initLocationSpecies()
      ]),
      new_location_contacts: this.formBuilder.array([
        // this.initLocationContacts()
      ])
    },
      {
        validator: [this.endDateBeforeStart, this.startDateTodayorEarlierMortalityEvent]
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

  // ngOnDestroy() {
  //   this._onDestroy.next();
  //   this._onDestroy.complete();
  // }

  ngOnInit() {

    this.addEventLocationForm.get('event_type').setValue(this.eventTypeID);

    this.filteredSpecies = new Array<ReplaySubject<Species[]>>();
    this.filteredSpecies.push(new ReplaySubject<Species[]>());
    this.ManageSpeciesControl(0);

    this.filteredContacts = new Array<ReplaySubject<Contact[]>>();
    this.filteredContacts.push(new ReplaySubject<Contact[]>());
    this.ManageContactControl(0);

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

          // load the initial bank list
          this.filteredAdminLevelOnes.next(this.adminLevelOnes);

          // listen for search field value changes
          this.adminLevelOneFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterAdminLevelOnes();
            });
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

          // populate the search select options for the initial control
          this.filteredSpecies[0].next(this.species);
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
          // populate the search select options for the initial control
          this.filteredContacts[0].next(this.userContacts);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  onSubmit(formValue) {

    this.submitLoading = true;

    formValue.event = this.eventData.id;

    // if lat/long fields are deleted to blank, update to null to be a valid number type on PATCH
    if (formValue.latitude === '') {
      formValue.latitude = null;
    }
    if (formValue.longitude === '') {
      formValue.longitude = null;
    }
    // convert start_date and end_date of eventlocations to 'yyyy-MM-dd' before submission
    // can be removed if configure datepicker to output this format
    // (https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings)
    formValue.start_date = this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd');
    formValue.end_date = this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd');

    // delete the event_type field, which was superficially attached to event location for validation purposes
    delete formValue.event_type;

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

  startDateTodayorEarlierMortalityEvent(AC: AbstractControl) {
    const start_date = AC.get('start_date').value;
    const event_type = AC.get('event_type').value;
    const today = APP_UTILITIES.TODAY;
    if (event_type === 1) {
      if ((start_date !== null) && ((start_date.getTime()) > (today.getTime()))) {
        AC.get('start_date').setErrors({ startDateTodayorEarlierMortalityEvent: true });
      }
    }
    return null;
  }

  endDateBeforeStart(AC: AbstractControl) {
    AC.get('end_date').setErrors(null);
    AC.get('start_date').setErrors(null);
    const start_date = AC.get('start_date').value;
    const end_date = AC.get('end_date').value;
    if ((start_date !== null && end_date !== null) && start_date > end_date) {
      AC.get('end_date').setErrors({ endDateBeforeStart: true });
    }
    return null;
  }

  minSpecies(AC: AbstractControl) {
    const locationSpeciesLength = AC.get('new_location_species')['controls'].length;
    if (locationSpeciesLength < 1) {
      AC.get('new_location_species').setErrors({ minSpecies: true });
    }
    return null;
  }

  checkforMissingSpecies() {

    // tslint:disable-next-line:max-line-length
    const locationspecies = <FormArray>this.addEventLocationForm.get('new_location_species');
    let speciesSelectionMissing = false;
    for (let i = 0, j = locationspecies.length; i < j; i++) {
      // tslint:disable-next-line:max-line-length
      if (this.addEventLocationForm.get('new_location_species')['controls'][i].get('species').value === null) {
        speciesSelectionMissing = true;
      }
    }
    if (speciesSelectionMissing) {
      return true;
    } else {
      return false;
    }
  }

  checkEventLocationCommentMin() {

    // tslint:disable-next-line:max-line-length
    const siteDesciptionCommentLength = this.addEventLocationForm.get('site_description').value.length;
    const historyCommentLength = this.addEventLocationForm.get('history').value.length;
    // tslint:disable-next-line:max-line-length
    const envFactorsCommentLength = this.addEventLocationForm.get('environmental_factors').value.length;
    const clinicalSignsCommentLength = this.addEventLocationForm.get('clinical_signs').value.length;
    // tslint:disable-next-line:max-line-length
    const generalCommentLength = this.addEventLocationForm.get('comment').value.length;
    if ((siteDesciptionCommentLength === 0) && (historyCommentLength === 0) && (envFactorsCommentLength === 0) && (clinicalSignsCommentLength === 0) && (generalCommentLength === 0)) {
      return true;
    }
    return false;
  }

  initLocationSpecies() {
    return this.formBuilder.group({
      species: [null, Validators.required],
      population_count: [null, Validators.min(0)],
      sick_count: [null, Validators.min(0)],
      dead_count: [null, Validators.min(0)],
      sick_count_estimated: [null, Validators.min(0)],
      dead_count_estimated: [null, Validators.min(0)],
      priority: null,
      captive: false,
      age_bias: null,
      sex_bias: null
    },
      {
        validator: [this.integer, this.estimatedSick, this.estimatedDead]
      }
    );
  }

  integer(AC: AbstractControl) {

    const population_count = AC.get('population_count').value;
    const sick_count = AC.get('sick_count').value;
    const dead_count = AC.get('dead_count').value;
    const sick_count_estimated = AC.get('sick_count_estimated').value;
    const dead_count_estimated = AC.get('dead_count_estimated').value;
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
  }

  estimatedSick(AC: AbstractControl) {
    AC.get('sick_count_estimated').setErrors(null);
    const sick_count = AC.get('sick_count').value;
    const sick_count_estimated = AC.get('sick_count_estimated').value;

    if (sick_count !== null) {
      if (sick_count_estimated <= sick_count) {
        AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
      }
    }
  }

  estimatedDead(AC: AbstractControl) {
    AC.get('dead_count_estimated').setErrors(null);
    const dead_count = AC.get('dead_count').value;
    const dead_count_estimated = AC.get('dead_count_estimated').value;

    if (dead_count !== null) {
      if (dead_count_estimated <= dead_count) {
        AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
      }
    }
  }


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

  initLocationContacts() {
    return this.formBuilder.group({
      contact: null,
      contact_type: null
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

    const locationSpeciesIndex = control.length - 1;

    this.filteredSpecies.push(new ReplaySubject<Species[]>());
    this.ManageSpeciesControl(locationSpeciesIndex);
  }

  removeLocationSpecies(i, j) {
    const control = <FormArray>this.addEventLocationForm.get('new_location_species');
    control.removeAt(j);
  }
  getLocationSpecies() {
    return this.addEventLocationForm.controls.new_location_species['controls'];
  }

  // location contacts
  addLocationContact() {
    const control = <FormArray>this.addEventLocationForm.get('new_location_contacts');
    control.push(this.initLocationContacts());

    const locationContactIndex = control.length - 1;

    this.filteredContacts.push(new ReplaySubject<Contact[]>());
    this.ManageContactControl(locationContactIndex);
  }

  removeLocationContacts(locationContactIndex) {
    const control = <FormArray>this.addEventLocationForm.get('new_location_contacts');
    control.removeAt(locationContactIndex);
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

    this.addEventLocationForm.get('administrative_level_one').setValue(null);

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

    this.addEventLocationForm.get('administrative_level_two').setValue(null);

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

          // load the initial bank list
          this.filteredAdminLevelTwos.next(this.adminLevelTwos);

          // listen for search field value changes
          this.adminLevelTwoFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterAdminLevelTwos();
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
      disableClose: true,
      data: {
        contact_action: 'create'
      }
    });
  }

  openGNISLookupDialog() {
    this.gnisLookupDialogRef = this.dialog.open(GnisLookupComponent, {
      disableClose: true,
      data: {}
    });

    this.gnisLookupDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.addEventLocationForm.get('gnis_id').setValue(result.id);
      this.addEventLocationForm.get('gnis_name').setValue(result.name);

    });
  }

  ManageSpeciesControl(locationSpeciesIndex: number) {
    // populate the species options list for the specific control
    this.filteredSpecies[locationSpeciesIndex].next(this.species);

    // listen for search field value changes
    this.speciesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSpecies(locationSpeciesIndex);
      });
  }

  ManageContactControl(locationContactIndex: number) {
    // populate the species options list for the specific control
    this.filteredContacts[locationContactIndex].next(this.userContacts);

    // listen for search field value changes
    this.contactFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterContacts(locationContactIndex);
      });
  }


  private filterSpecies(locationSpeciesIndex) {
    if (!this.species) {
      return;
    }
    // get the search keyword
    let search = this.speciesFilterCtrl.value;
    if (!search) {
      this.filteredSpecies[locationSpeciesIndex].next(this.species.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelTwos
    this.filteredSpecies[locationSpeciesIndex].next(
      this.species.filter(species => species.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterContacts(locationContactIndex) {
    if (!this.userContacts) {
      return;
    }
    // get the search keyword
    let search = this.contactFilterCtrl.value;
    if (!search) {
      this.filteredContacts[locationContactIndex].next(this.userContacts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the contacts
    this.filteredContacts[locationContactIndex].next(
      // tslint:disable-next-line:max-line-length
      this.userContacts.filter(contact => contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterAdminLevelOnes() {
    if (!this.adminLevelOnes) {
      return;
    }
    // get the search keyword
    let search = this.adminLevelOneFilterCtrl.value;
    if (!search) {
      this.filteredAdminLevelOnes.next(this.adminLevelOnes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelOnes
    this.filteredAdminLevelOnes.next(
      this.adminLevelOnes.filter(admin_level_one => admin_level_one.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterAdminLevelTwos() {
    if (!this.adminLevelTwos) {
      return;
    }
    // get the search keyword
    let search = this.adminLevelTwoFilterCtrl.value;
    if (!search) {
      this.filteredAdminLevelTwos.next(this.adminLevelTwos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelTwos
    this.filteredAdminLevelTwos.next(
      this.adminLevelTwos.filter(admin_level_two => admin_level_two.name.toLowerCase().indexOf(search) > -1)
    );
  }



}
