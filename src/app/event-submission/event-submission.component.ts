import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs-compat/operator/startWith';
import { map } from 'rxjs/operators';
import { take, takeUntil } from 'rxjs/operators';
import { CanDeactivateGuard } from './pending-changes.guard';
import { HostListener } from '@angular/core';
import { ReplaySubject, Subject, observable } from 'rxjs';

import { DisplayValuePipe } from '../pipes/display-value.pipe';

import { MatDialog, MatDialogRef, MatSelect } from '@angular/material';
import { MatBottomSheetModule, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { MatStepperModule, MatStepper } from '@angular/material/stepper';

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

import { ViewContactDetailsComponent } from '@app/view-contact-details/view-contact-details.component';

import { ConfirmComponent } from '@confirm/confirm.component';

import { EditSpeciesDiagnosisComponent } from '@app/edit-species-diagnosis/edit-species-diagnosis.component';

import { DiagnosisBasisService } from '@app/services/diagnosis-basis.service';
import { DiagnosisCauseService } from '@app/services/diagnosis-cause.service';
import { EventSubmissionConfirmComponent } from '@app/event-submission/event-submission-confirm/event-submission-confirm.component';
import { GnisLookupComponent } from '@app/gnis-lookup/gnis-lookup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DateValidators } from '@validators/date.validator';

import * as search_api from 'usgs-search-api';
import { getTreeMultipleDefaultNodeDefsError } from '@angular/cdk/tree';
import { CircleManagementComponent } from '@app/circle-management/circle-management.component';
import { CircleChooseComponent } from '@app/circle-management/circle-choose/circle-choose.component';
import { CircleService } from '@services/circle.service';
// beware possible collision with Circle class from leaflet
import { Circle } from '@interfaces/circle';
import { User } from '@interfaces/user';
import { fromPromise } from 'rxjs/internal-compatibility';
declare let gtag: Function;

declare const search_api: search_api;

@Component({
  selector: 'app-event-submission',
  templateUrl: './event-submission.component.html',
  styleUrls: ['./event-submission.component.scss']
})
export class EventSubmissionComponent implements OnInit, OnDestroy, CanDeactivateGuard, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>;
  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  editSpeciesDiagnosisDialogRef: MatDialogRef<EditSpeciesDiagnosisComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  viewContactDetailsDialogRef: MatDialogRef<ViewContactDetailsComponent>;
  circleChooseDialogRef: MatDialogRef<CircleChooseComponent>;
  circleManagementDialogRef: MatDialogRef<CircleManagementComponent>;

  eventSubmitConfirm: MatBottomSheetRef<EventSubmissionConfirmComponent>;

  private subscription: Subscription;

  currentUser;

  eventTypes: EventType[];
  legalStatuses: LegalStatus[];
  eventStatuses: EventStatus[];
  landOwnerships: LandOwnership[];
  allDiagnoses: Diagnosis[];
  availableDiagnoses: Diagnosis[] = [];
  userCircles: Circle[] = [];
  countries: Country[];
  staff: Staff[];

  laboratories: Organization[] = [];

  adminLevelOnes: AdministrativeLevelOne[];
  // expermental, for autocomplete
  administrative_level_one: AdministrativeLevelOne[];
  //filteredAdminLevelOnes;

  adminLevelTwos: AdministrativeLevelTwo[];
  // expermental, for autocomplete
  // filteredAdminLevelTwos;

  //////////////////////////////////////////////
  species: Species[];
  // filteredSpecies: Observable<Species[]>[] = [];

  //filteredSpecies = [];
  //eventLocationSpecies: Observable<any[]>[] = [];
  ///////////////////////////////////////////////////////

  contacts: Contact[];
  //filteredContacts = [];

  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  organizations: Organization[];

  contactTypes: ContactType[];
  commentTypes: CommentType[];

  userContacts = [];
  userContactsLoading = false;

  errorMessage;

  eventSubmissionForm: FormGroup;

  eventLocationArray: FormArray;
  locationContactsArray: FormArray;
  locationSpeciesArray: FormArray;

  readCollaboratorArray: User[] = [];
  writeCollaboratorArray: User[] = [];

  submitLoading = false;

  adminLevelOnesLoading = false;
  adminLevelTwosLoading = false;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  commonEventData = {
    species: [],
    contacts: []
  };

  usgsSearch;

  missingCommentFlag = false;
  diagnosisBases = [];
  diagnosisCauses = [];

  locationSpeciesNumbersViolation = false;
  closedEventLocationSpeciesNumbersViolation = false;
  // starts as true  because no start dates provided by default
  locationStartDatesViolation = true;
  // starts as false because event must be complete = true to trigger violation
  locationEndDatesViolation = false;
  speciesDiagnosisViolation = false;

  duplicateEventOrgViolation = false;

  nonCompliantSpeciesDiagnoses = [];

  filteredAdminLevelOnes = [];
  filteredAdminLevelTwos = [];
  filteredSpecies = [];
  filteredContacts = [];

  filteredOrganizations = [];
  organizationFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  @ViewChild('adminLevelOneSelect') adminLevelOneSelect: MatSelect;
  @ViewChild('adminLevelTwoSelect') adminLevelTwoSelect: MatSelect;
  @ViewChild('speciesSelect') speciesSelect: MatSelect;
  @ViewChild('contactSelect') contactSelect: MatSelect;

  @ViewChild('organizationSelect') organizationSelect: MatSelect;

  /** controls for the MatSelect filter keyword */
  adminLevelOneFilterCtrl: FormControl = new FormControl();
  adminLevelTwoFilterCtrl: FormControl = new FormControl();
  speciesFilterCtrl: FormControl = new FormControl();
  contactFilterCtrl: FormControl = new FormControl();

  // filteredAdminLevelOnes: ReplaySubject<AdministrativeLevelOne[]> = new ReplaySubject<AdministrativeLevelOne[]>();
  // filteredAdminLevelTwos: ReplaySubject<AdministrativeLevelTwo[]> = new ReplaySubject<AdministrativeLevelTwo[]>();
  // filteredSpecies: ReplaySubject<Species[]> = new ReplaySubject<Species[]>();
  // filteredContacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>();

  // @HostListener guards against refresh, close, etc.
  @HostListener('window:beforeunload')

  // canDeactivate passess back a boolean based on whether the form has been touched or not
  canDeactivate(): Observable<boolean> | boolean {
    // logic to check if there are pending changes here;
    if (this.eventSubmissionForm.touched === true) {
      // returning false will show a confirm dialog before navigating away
      return false;
    } else {
      // returning true will navigate without confirmation
      return true;
    }
  }

  buildEventSubmissionForm() {
    this.eventSubmissionForm = this.formBuilder.group({
      event_reference: '',
      event_type: [null, Validators.required],
      complete: false,
      public: [true, Validators.required],
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

    this.eventLocationArray = this.eventSubmissionForm.get('new_event_locations') as FormArray;

    this.filteredAdminLevelOnes = new Array<ReplaySubject<AdministrativeLevelOne[]>>();
    this.filteredAdminLevelOnes.push(new ReplaySubject<AdministrativeLevelOne[]>());
    this.ManageAdminLevelOneControl(0);

    this.filteredAdminLevelTwos = new Array<ReplaySubject<AdministrativeLevelTwo[]>>();
    this.filteredAdminLevelTwos.push(new ReplaySubject<AdministrativeLevelOne[]>());
    this.ManageAdminLevelTwoControl(0);

    const eventLocationSpecies = new Array<ReplaySubject<Species[]>>();
    this.filteredSpecies.push(eventLocationSpecies);
    // initiate an empty replaysubject
    this.filteredSpecies[0].push(new ReplaySubject<Species[]>());
    this.ManageSpeciesControl(0, 0);
    // this.filteredSpecies.push(new ReplaySubject<Species[]>());

    const eventLocationContacts = new Array<ReplaySubject<Contact[]>>();
    this.filteredContacts.push(eventLocationContacts);
    // initiate an empty replaysubject
    this.filteredContacts[0].push(new ReplaySubject<Contact[]>());
    this.ManageContactControl(0, 0);

    this.filteredOrganizations = new Array<ReplaySubject<Organization[]>>();
    this.filteredOrganizations.push(new ReplaySubject<Organization[]>());
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
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public publicDialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private currentUserService: CurrentUserService,
    // private matStepper: MatStepper,
    private datePipe: DatePipe,
    private displayValuePipe: DisplayValuePipe,
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
    private diagnosisBasisService: DiagnosisBasisService,
    private diagnosisCauseService: DiagnosisCauseService,
    private circleService: CircleService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildEventSubmissionForm();

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.eventSubmissionForm.get('new_organizations')['controls'][0].get('org').setValue(this.currentUser.organization);
    });

    createContactSevice.getCreatedContact().subscribe(
      createdContact => {
        this.userContacts.push(createdContact);
        this.userContacts.sort(function (a, b) {
          if (a.last_name < b.last_name) { return -1; }
          if (a.last_name > b.last_name) { return 1; }
          return 0;
        });
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  navigateToHome() {
    this.router.navigate([`../home`], { relativeTo: this.route });
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
      minWidth: '75%',
      disableClose: true,
      data: {
        contact_action: 'create'
      }
    });
  }

  openCircleChooseDialog(accessType) {
    this.circleChooseDialogRef = this.dialog.open(CircleChooseComponent, {
      minWidth: '60em',
      data: {
        userCircles: this.userCircles
      }
    });

    this.circleChooseDialogRef.afterClosed().subscribe(result => {
      if (accessType === 'read') {
        // add the users array to the new_read_collaborators array
        this.readCollaboratorArray = this.readCollaboratorArray.concat(result.users);
      } else if (accessType === 'write') {
        this.writeCollaboratorArray = this.writeCollaboratorArray.concat(result.users);
      }
    });

  }

  editSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex, speciesdiagnosis, locationspecies) {

    this.editSpeciesDiagnosisDialogRef = this.dialog.open(EditSpeciesDiagnosisComponent, {
      minWidth: '40em',
      disableClose: true,
      data: {
        locationspecies: locationspecies.value,
        speciesdiagnosis: speciesdiagnosis.value,
        laboratories: this.laboratories,
        diagnosisBases: this.diagnosisBases,
        diagnosisCauses: this.diagnosisCauses,
        diagnoses: this.allDiagnoses,
        eventlocationIndex: eventLocationIndex,
        locationspeciesIndex: locationSpeciesIndex,
        species_diagnosis_action: 'editInFormArray',
        title: 'Edit Species Diagnosis',
        titleIcon: 'edit',
        actionButtonIcon: 'save',
        action_button_text: 'Save'
      }
    });

    this.editSpeciesDiagnosisDialogRef.afterClosed()
      .subscribe(
        (speciesDiagnosisObj) => {

          if (speciesDiagnosisObj.action === 'cancel') {
            // remove last species diagnosis added
            // tslint:disable-next-line:max-line-length
            // this.removeSpeciesDiagnosis(speciesDiagnosisObj.eventlocationIndex, speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
            return;
          } else if (speciesDiagnosisObj.action === 'editInFormArray') {

            this.eventSubmissionForm.get('new_event_locations')['controls'][speciesDiagnosisObj.eventlocationIndex]
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


            for (const diagnosis of this.allDiagnoses) {
              if (diagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {

                let diagnosisFound = false;
                // check to see if the diagnosis just added already exists in the availableDiagnoses array
                for (const availableDiagnosis of this.availableDiagnoses) {
                  if (availableDiagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                    // if found, increment the count for that diagnosis
                    availableDiagnosis.count++;
                    // if found, set local var found to true
                    diagnosisFound = true;
                    // if found, stop. do not add to availableDiagnoses array
                    break;
                  }
                }
                // if diagnosis is not found to already exist in the availableDiagnoses array, add it
                if (!diagnosisFound) {
                  diagnosis.suspect = speciesDiagnosisObj.formValue.suspect;
                  // set diagnosis count to 1
                  diagnosis.count = 1;
                  this.availableDiagnoses.push(diagnosis);
                }

              }
            }

            this.checkSpeciesDiagnoses();
          }

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

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

  clearGNISEntry(eventLocationIndex) {
    this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].controls['gnis_id'].setValue('');
    this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].controls['gnis_name'].setValue('');
  }


  openSpeciesDiagnosisRemoveConfirm(eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Remove Species Diagnosis',
          titleIcon: 'remove_circle',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to remove this species diagnosis? If it is the only species in the form with this diagnosis, removing it will remove it from the list of available diagnoses for event diagnosis.',
          messageIcon: '',
          confirmButtonText: 'Remove',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        // remove the diagnosis from the available diagnoses unless another species has it
        // tslint:disable-next-line:max-line-length
        const diagnosisID = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationSpeciesIndex].get('new_species_diagnoses')['controls'][speciesDiagnosisIndex].get('diagnosis').value;

        // delete from availableDiagnoses unless count > 1
        for (const availableDiagnosis of this.availableDiagnoses) {
          if (availableDiagnosis.id === diagnosisID) {
            if (availableDiagnosis.count > 1) {
              // decrement the count
              availableDiagnosis.count--;
              break;
            } else if (availableDiagnosis.count < 2) {
              // remove it
              this.availableDiagnoses = this.availableDiagnoses.filter(diagnosis => diagnosis.id !== diagnosisID);
            }
          }
        }
        // remove the speciesdiagnosis form array instance
        this.removeSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex, speciesDiagnosisIndex);
      }
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
    for (let i = 0; i < this['options']._results.length - 1; i++) {
      if (this['options']._results[i].value === speciesId) {
        species_id_match = this['options']._results[i].viewValue;
      }
    }
    return species_id_match;
  }

  displayFnContact(contactId?: Contact): string | undefined {
    let contact_id_match;
    for (let i = 0; i < this['options']._results.length; i++) {
      if (this['options']._results[i].value === contactId) {
        contact_id_match = this['options']._results[i].viewValue;
      }
    }
    return contact_id_match;
  }

  displayFnAdminLevelOne(adminLevelOneId?: number): string | undefined {
    let admin_level_one;
    if (this['options'] !== undefined) {
      for (let i = 0; i < this['options']._results.length; i++) {
        if (this['options']._results[i].value === adminLevelOneId) {
          admin_level_one = this['options']._results[i].viewValue;
        }
      }
    }
    return admin_level_one;
  }

  displayFnAdminLevelTwo(adminLevelTwoId?: number): string | undefined {
    let admin_level_two;
    if (this['options'] !== undefined) {
      for (let i = 0; i < this['options']._results.length; i++) {
        if (this['options']._results[i].value === adminLevelTwoId) {
          admin_level_two = this['options']._results[i].viewValue;
        }
      }
    }
    return admin_level_two;
  }

  // no longer in use?
  private _filter(name: string): Species[] {
    const filterValue = name.toLowerCase();
    return this.species.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ManageSpeciesControl(eventLocationIndex: number, locationSpeciesIndex: number) {
    // tslint:disable-next-line:max-line-length
    // const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species') as FormArray;
    // this.filteredSpecies[eventLocationIndex][locationSpeciesIndex] = arrayControl.at(locationSpeciesIndex).get('species').valueChanges
    //   .startWith(null)
    //   .map(val => this.filter(val, this.species, ['name']));

    // populate the species options list for the specific control
    this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(this.species);

    // listen for search field value changes
    this.speciesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSpecies(eventLocationIndex, locationSpeciesIndex);
      });
  }

  ManageContactControl(eventLocationIndex: number, locationContactIndex: number) {
    // tslint:disable-next-line:max-line-length
    // const arrayControl = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts') as FormArray;
    // this.filteredContacts[eventLocationIndex][locationContactIndex] = arrayControl.at(locationContactIndex).get('contact').valueChanges
    //   .startWith(null)
    //   .map(val => this.filter(val, this.userContacts, ['first_name', 'last_name', 'organization_string']));

    // populate the species options list for the specific control
    this.filteredContacts[eventLocationIndex][locationContactIndex].next(this.userContacts);

    // listen for search field value changes
    this.contactFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterContacts(eventLocationIndex, locationContactIndex);
      });
  }

  ManageAdminLevelOneControl(eventLocationIndex: number) {

    // populate the adminLevelOnes options list for the specific control
    this.filteredAdminLevelOnes[eventLocationIndex].next(this.adminLevelOnes);

    // listen for search field value changes
    this.adminLevelOneFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterAdminLevelOnes(eventLocationIndex);
      });
  }

  ManageAdminLevelTwoControl(eventLocationIndex: number) {

    // populate the adminLevelTwos options list for the specific control
    this.filteredAdminLevelTwos[eventLocationIndex].next(this.adminLevelTwos);

    // listen for search field value changes
    this.adminLevelTwoFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterAdminLevelTwos(eventLocationIndex);
      });

  }

  ManageOrganizationControl(organizationIndex: number) {

    // populate the organizations options list for the specific control
    this.filteredOrganizations[organizationIndex].next(this.organizations);

    // listen for search field value changes
    this.organizationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOrganizations(organizationIndex);
      });
  }

  private filterOrganizations(organizationIndex) {
    if (!this.organizations) {
      return;
    }
    // get the search keyword
    let search = this.organizationFilterCtrl.value;
    if (!search) {
      this.filteredOrganizations[organizationIndex].next(this.organizations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the organizations
    this.filteredOrganizations[organizationIndex].next(
      this.organizations.filter(organization => organization.name.toLowerCase().indexOf(search) > -1)
    );
  }

  inputChangeTrigger(event) {
    event.currentTarget.dispatchEvent(new Event('input'));
  }

  filter(val: any, searchArray: any, searchProperties: string[]): string[] {
    let result = [];
    if (val === '') {
      result = searchArray;
    } else {
      for (const searchProperty of searchProperties) {
        if (isNaN(val)) {
          const realval = val && typeof val === 'object' ? val[searchProperty] : val;
          let lastOption = null;
          if (searchArray !== undefined) {
            for (let i = 0; i < searchArray.length; i++) {
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
  }

  ngAfterViewInit() {

    const self = this;
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


  }

  ngOnInit() {

    this.eventSubmissionForm.get('new_read_collaborators').setValue([]);
    this.eventSubmissionForm.get('new_write_collaborators').setValue([]);

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
          this.allDiagnoses = diagnoses;
          this.allDiagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });

          for (const diagnosis of this.allDiagnoses) {
            if (diagnosis.name === 'Undetermined') {
              this.availableDiagnoses.push(diagnosis);
            }
          }
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

    // get 'laboratories' from the organizations service
    // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
    this.organizationService.getLaboratories()
      .subscribe(
        (laboratories) => {
          this.laboratories = laboratories;
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

          // load the options list for intial control
          this.filteredAdminLevelOnes[0].next(this.adminLevelOnes);

          // listen for search field value changes
          // this.adminLevelOneFilterCtrl.valueChanges
          //   .pipe(takeUntil(this._onDestroy))
          //   .subscribe(() => {
          //     this.filterAdminLevelOnes(0);
          //   });
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
          this.filteredSpecies[0][0].next(this.species);

          // listen for search field value changes
          // this.speciesFilterCtrl.valueChanges
          //   .pipe(takeUntil(this._onDestroy))
          //   .subscribe(() => {
          //     this.filterSpecies();
          //   });

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
          this.filteredOrganizations[0].next(this.organizations);
          // set the default starting org to user's org after loading the options list
          this.eventSubmissionForm.get('new_organizations')['controls'][0].get('org').setValue(this.currentUser.organization);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get diagnosisBases from the diagnosisBasis service
    this.diagnosisBasisService.getDiagnosisBases()
      .subscribe(
        (diagnosisBases) => {
          this.diagnosisBases = diagnosisBases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosisCauses from the diagnosisCause service
    this.diagnosisCauseService.getDiagnosisCauses()
      .subscribe(
        (diagnosisCauses) => {
          this.diagnosisCauses = diagnosisCauses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // TEMPORARY- will need to use user creds to query user contact list
    // get contact types from the ContactTypeService
    this.userContactsLoading = true;
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
          this.filteredContacts[0][0].next(this.userContacts);
          this.userContactsLoading = false;

          // // listen for search field value changes
          // this.contactFilterCtrl.valueChanges
          //   .pipe(takeUntil(this._onDestroy))
          //   .subscribe(() => {
          //     this.filterContacts();
          //   });
        },
        error => {
          this.errorMessage = <any>error;
          this.userContactsLoading = false;
        }
      );


    this.circleService.getAllUserCircles()
      .subscribe(
        circles => {
          this.userCircles = circles;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.eventSubmissionForm.get('complete').valueChanges.subscribe(value => {
      if (value === true) {
        this.eventSubmissionForm.get('quality_check').enable();
      } else if (value === false) {
        this.eventSubmissionForm.get('quality_check').disable();
        this.eventSubmissionForm.get('quality_check').setValue(null);
      }
    });

    this.eventSubmissionForm.get('new_organizations').valueChanges.subscribe(orgArray => {
      this.duplicateEventOrgViolation = false;
      const duplicateExists = APP_UTILITIES.checkDuplicateInObject('org', orgArray);
      // console.log('Duplicate event org exists? ' + duplicateExists);
      if (duplicateExists) { this.duplicateEventOrgViolation = true; }
    });


  }

  // onFormChanges(): void {
  //   this.eventSubmissionForm.valueChanges.subscribe(() => {
  //     this.checkLocationSpeciesNumbers();
  //   });
  // }

  getErrorMessage(formControlName) {

    return this.eventSubmissionForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.eventSubmissionForm.get(formControlName).hasError('email') ? 'Not a valid email' : '';
  }

  private filterAdminLevelOnes(eventLocationIndex) {
    if (!this.adminLevelOnes) {
      return;
    }
    // get the search keyword
    let search = this.adminLevelOneFilterCtrl.value;
    if (!search) {
      this.filteredAdminLevelOnes[eventLocationIndex].next(this.adminLevelOnes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelOnes
    this.filteredAdminLevelOnes[eventLocationIndex].next(
      this.adminLevelOnes.filter(admin_level_one => admin_level_one.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterAdminLevelTwos(eventLocationIndex) {
    if (!this.adminLevelTwos) {
      return;
    }
    // get the search keyword
    let search = this.adminLevelTwoFilterCtrl.value;
    if (!search) {
      this.filteredAdminLevelTwos[eventLocationIndex].next(this.adminLevelTwos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelTwos
    this.filteredAdminLevelTwos[eventLocationIndex].next(
      this.adminLevelTwos.filter(admin_level_two => admin_level_two.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterSpecies(eventLocationIndex, locationSpeciesIndex) {
    if (!this.species) {
      return;
    }
    // get the search keyword
    let search = this.speciesFilterCtrl.value;
    if (!search) {
      this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(this.species.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the adminLevelTwos
    this.filteredSpecies[eventLocationIndex][locationSpeciesIndex].next(
      this.species.filter(species => species.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterContacts(eventLocationIndex, locationContactIndex) {
    if (!this.userContacts) {
      return;
    }
    // get the search keyword
    let search = this.contactFilterCtrl.value;
    if (!search) {
      this.filteredContacts[eventLocationIndex][locationContactIndex].next(this.userContacts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the contacts
    this.filteredContacts[eventLocationIndex][locationContactIndex].next(
      // tslint:disable-next-line:max-line-length
      this.userContacts.filter(contact => contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1)
    );
  }

  createCommonEventDataObject(objectType, eventLocationIndex, objectInstanceIndex) {

    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'];
    // check which object is being sent, parse out the specific form group instance from the form, add to the commonEventData object
    switch (objectType) {
      case 'contact':
        const contactsArray =
          <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
        const contact = contactsArray.controls[objectInstanceIndex];
        this.commonEventData.contacts.push(this.formBuilder.group({
          contact: contact.value.contact,
          contact_type: null
        }));

        // loop through event locations and push the new contact into each, except the one it came from (so as to avoid duplicate)
        for (let i = 0, j = eventLocations.length; i < j; i++) {

          if (i !== eventLocationIndex) {

            // call addLocationContact, but also get the return value to know which contact instance to populate with the value
            const indexObject = this.addLocationContact(i);

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

        // loop through event locations and push the new species into each, except the one it came from (so as to avoid duplicate)
        for (let i = 0, j = eventLocations.length; i < j; i++) {

          if (i !== eventLocationIndex) {

            // call addLocationSpecies, but also get the return value to know which species instance to populate with the value
            const indexObject = this.addLocationSpecies(i);

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

  minSpecies(AC: AbstractControl) {
    const locationSpeciesLength = AC.get('new_location_species')['controls'].length;
    if (locationSpeciesLength < 1) {
      AC.get('new_location_species').setErrors({ minSpecies: true });
    }
    return null;
  }

  checkForDuplicateEventOrg(orgID) {

    this.duplicateEventOrgViolation = false;
    const eventOrganizations = <FormArray>this.eventSubmissionForm.get('new_organizations')['controls'];

    for (let i = 0, j = eventOrganizations.length; i < j; i++) {
      // do not check last item in array because it is the one just added and will always match
      const lastAddedIndex = j - 1;
      if (i !== lastAddedIndex) {
        if (this.eventSubmissionForm.get('new_organizations')['controls'][i].get('org').value === orgID) {
          this.duplicateEventOrgViolation = true;
        }
      }

    }
  }

  checkforMissingSpecies(eventLocationIndex) {

    // tslint:disable-next-line:max-line-length
    const locationspecies = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
    let speciesSelectionMissing = false;
    for (let i = 0, j = locationspecies.length; i < j; i++) {
      // tslint:disable-next-line:max-line-length
      if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][i].get('species').value === null) {
        speciesSelectionMissing = true;
      }
    }
    if (speciesSelectionMissing) {
      return true;
    } else {
      return false;
    }
  }

  checkEventLocationCommentMin(eventLocationIndex) {

    // tslint:disable-next-line:max-line-length
    const siteDesciptionCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('site_description').value.length;
    const historyCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('history').value.length;
    // tslint:disable-next-line:max-line-length
    const envFactorsCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('environmental_factors').value.length;
    const clinicalSignsCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('clinical_signs').value.length;
    // tslint:disable-next-line:max-line-length
    const generalCommentLength = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('comment').value.length;
    if ((siteDesciptionCommentLength === 0) && (historyCommentLength === 0) && (envFactorsCommentLength === 0) && (clinicalSignsCommentLength === 0) && (generalCommentLength === 0)) {
      return true;
    }
    return false;
  }

  checkLocationSpeciesNumbers() {

    this.locationSpeciesNumbersViolation = false;
    this.closedEventLocationSpeciesNumbersViolation = false;
    // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
    if (this.eventSubmissionForm.get('event_type').value === 1 || this.eventSubmissionForm.get('event_type').value === '1') {
      // set var to capture of requirement is met at any of the event locations
      let requirementMetEventOpen = false;
      let requirementMetEventClosed = true;
      const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations');
      // tslint:disable-next-line:max-line-length
      for (let eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
        const locationspecies = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');

        // if event is marked as complete
        if (this.eventSubmissionForm.get('complete').value === true) {

          // loop through each new_location_species array, set requirementMetEventClosed false if any species lacks the number requirement.
          // tslint:disable-next-line:max-line-length
          for (let locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
            const locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
            if (
              (
                locationspeciesform.get('sick_count').value +
                locationspeciesform.get('dead_count').value +
                locationspeciesform.get('sick_count_estimated').value +
                locationspeciesform.get('dead_count_estimated').value
              ) < 1
            ) {
              requirementMetEventClosed = false;
            }
          }
        }

        // loop through each new_location_species array, set requirementMetEventOpen true if any species has the number requirement.
        // if even one meets the criteria, the event is valid for submission.
        // tslint:disable-next-line:max-line-length
        for (let locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
          const locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
          if (
            (
              locationspeciesform.get('sick_count').value +
              locationspeciesform.get('dead_count').value +
              locationspeciesform.get('sick_count_estimated').value +
              locationspeciesform.get('dead_count_estimated').value
            ) >= 1
          ) {
            requirementMetEventOpen = true;
          }
        }

      }// end eventlocations array loop

      if (requirementMetEventOpen) {
        this.locationSpeciesNumbersViolation = false;
      } else {
        this.locationSpeciesNumbersViolation = true;
      }

      if (requirementMetEventClosed) {
        this.closedEventLocationSpeciesNumbersViolation = false;
      } else {
        this.closedEventLocationSpeciesNumbersViolation = true;
      }
    }
  }

  checkLocationStartDates() {
    this.locationStartDatesViolation = false;
    let requirementMet = false;
    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    // tslint:disable-next-line:max-line-length
    // loop through event locations
    for (let eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
      // if there are any non-null start dates, requirement is met
      if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('start_date').value !== null) {
        requirementMet = true;
      }
    }
    if (requirementMet) {
      this.locationStartDatesViolation = false;
    } else {
      this.locationStartDatesViolation = true;
    }
  }

  checkEventCompleteRules() {

    if (this.eventSubmissionForm.get('complete').value === true) {
      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Marking event as complete',
            titleIcon: 'warning',
            message: 'Submitting an event as complete will lock all editing on the event after submission.',
            messageIcon: '',
            confirmButtonText: 'OK',
            showCancelButton: false
          }
        }
      );
    }

    this.checkLocationEndDates();
    this.checkSpeciesDiagnoses();
    this.checkLocationSpeciesNumbers();
  }

  checkLocationEndDates() {
    this.locationEndDatesViolation = false;
    if (this.eventSubmissionForm.get('complete').value === true) {
      let requirementMet = true;
      const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations');
      // tslint:disable-next-line:max-line-length
      // loop through event locations
      for (let eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
        // if any end dates are null, requirement is not met
        if (this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('end_date').value === null) {
          requirementMet = false;
        }
      }
      if (requirementMet) {
        this.locationEndDatesViolation = false;
      } else {
        this.locationEndDatesViolation = true;
      }
    }
  }

  checkSpeciesDiagnoses() {
    this.speciesDiagnosisViolation = false;
    this.nonCompliantSpeciesDiagnoses = [];
    if (this.eventSubmissionForm.get('complete').value === true) {

      ////////////////////////////////////////////////////////////////////////
      let requirementMet = true;
      const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations');
      // tslint:disable-next-line:max-line-length
      for (let eventLocationIndex = 0, eventLocationsLength = eventLocations.length; eventLocationIndex < eventLocationsLength; eventLocationIndex++) {
        const locationspecies = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
        // loop through each new_location_species array
        // tslint:disable-next-line:max-line-length
        for (let locationspeciesindex = 0, locationspecieslength = locationspecies.length; locationspeciesindex < locationspecieslength; locationspeciesindex++) {
          const locationspeciesform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex];
          // tslint:disable-next-line:max-line-length
          const speciesdiagnoses = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses');
          for (let speciesdiagnosisindex = 0, speciesdiagnoseslength = speciesdiagnoses.length; speciesdiagnosisindex < speciesdiagnoseslength; speciesdiagnosisindex++) {
            // tslint:disable-next-line:max-line-length
            const speciesdiagnosisform = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][locationspeciesindex].get('new_species_diagnoses')['controls'][speciesdiagnosisindex];
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
      } else {
        this.speciesDiagnosisViolation = true;

      }
    }
  }

  enforceLegalStatusRules(selected_legal_status) {
    if (selected_legal_status === 2 || selected_legal_status === 4) {

      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Legal Status Change',
            titleIcon: 'warning',
            message: 'This change to legal status will set the event record to private (Not Visible to Public).',
            confirmButtonText: 'OK',
            showCancelButton: false
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.eventSubmissionForm.get('public').setValue(false);
        }
      });

    }
    if (selected_legal_status === 1 || selected_legal_status === 3) {

      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Legal Status Change',
            titleIcon: 'warning',
            message: 'This change to legal status will set the event record to public (Visible to Public). Select "Cancel" to maintain current event visibility. Select "OK" to change to public.',
            confirmButtonText: 'OK',
            showCancelButton: true
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.eventSubmissionForm.get('public').setValue(true);
        }
      });
    }
  }

  enforceCaptiveRule(selected_captive_value) {
    if (selected_captive_value) {
      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Location species captive',
            titleIcon: 'warning',
            message: 'Setting this species as captive will set the event record to private (Not Visible to Public). Select "Cancel" to maintain current event visibility. Select "OK" to change to private.',
            confirmButtonText: 'OK',
            showCancelButton: true
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.eventSubmissionForm.get('public').setValue(false);
        }
      });

    }
  }

  initEventLocation() {
    return this.formBuilder.group({
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
        //this.initLocationContacts()
      ])
    },
      {
        validator: [this.endDateBeforeStart, this.startDateTodayorEarlierMortalityEvent, this.minSpecies]
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

    if (sick_count !== null && sick_count_estimated !== null) {
      if (sick_count_estimated <= sick_count) {
        AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
      }
    }
  }

  estimatedDead(AC: AbstractControl) {
    AC.get('dead_count_estimated').setErrors(null);
    const dead_count = AC.get('dead_count').value;
    const dead_count_estimated = AC.get('dead_count_estimated').value;

    if (dead_count !== null && dead_count_estimated !== null) {
      if (dead_count_estimated <= dead_count) {
        AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
      }
    }
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
      sex_bias: null,
      new_species_diagnoses: this.formBuilder.array([])
    },
      {
        validator: [this.integer, this.estimatedSick, this.estimatedDead]
      });
  }

  initSpeciesDiagnosis() {
    return this.formBuilder.group({
      diagnosis: [null, Validators.required],
      cause: null,
      basis: null,
      suspect: false,
      tested_count: [null, Validators.min(0)],
      diagnosis_count: [null, Validators.min(0)],
      positive_count: null,
      suspect_count: null,
      pooled: false,
      new_species_diagnosis_organizations: null
    });
  }

  initLocationContacts() {
    return this.formBuilder.group({
      contact: [null, Validators.required],
      contact_type: null
    });
  }

  initLocationComments() {
    return this.formBuilder.group({
      comment: '',
      comment_type: null
    });
  }

  initEventOrganization() {
    return this.formBuilder.group({
      org: null,
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
      // TODO: make this value configurbale for the "Undetermined" value
      diagnosis: '469'
    });
  }

  // event locations
  addEventLocation() {

    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    control.push(this.initEventLocation());

    const eventLocationIndex = control.length - 1;

    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'];
    const newEventLocationIndex = eventLocations.length - 1;
    const newEventLocation = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][newEventLocationIndex];

    this.filteredAdminLevelOnes.push(new ReplaySubject<AdministrativeLevelOne[]>());
    this.ManageAdminLevelOneControl(newEventLocationIndex);

    // need to update the adminLevelOne options per the default county value
    this.updateAdminLevelOneOptions(APP_UTILITIES.DEFAULT_COUNTRY_ID, eventLocationIndex);

    this.filteredAdminLevelTwos.push(new ReplaySubject<AdministrativeLevelTwo[]>());
    this.ManageAdminLevelTwoControl(newEventLocationIndex);

    const eventLocationSpecies = new Array<ReplaySubject<Species[]>>();
    this.filteredSpecies.push(eventLocationSpecies);
    // initiate an empty replaysubject
    this.filteredSpecies[newEventLocationIndex].push(new ReplaySubject<Species[]>());
    this.ManageSpeciesControl(newEventLocationIndex, 0);

    const eventLocationContacts = new Array<ReplaySubject<Contact[]>>();
    this.filteredContacts.push(eventLocationContacts);
    // initiate an empty replaysubject
    this.filteredContacts[newEventLocationIndex].push(new ReplaySubject<Contact[]>());
    this.ManageContactControl(newEventLocationIndex, 0);

    if (this.commonEventData.species.length > 0) {
      // tslint:disable-next-line:max-line-length
      this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][0].get('species').setValue(this.commonEventData.species[0].controls.species.value);

      if (this.commonEventData.species.length > 1) {

        // get number of species instances needed (default first one has been set already)
        const speciesFormArrayRemainderLength = this.commonEventData.species.length - 1;

        for (let i = 0; i < speciesFormArrayRemainderLength; i++) {
          this.addLocationSpecies(eventLocationIndex);
        }

        // start the loop at [1] (position 2) since [0] was already handled above
        for (let i = 1; i < this.commonEventData.species.length; i++) {
          // tslint:disable-next-line:max-line-length
          this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species')['controls'][i].get('species').setValue(this.commonEventData.species[i].controls.species.value);
        }
      }
    }

    // contacts are handled differently because there is no default blank contact instance
    if (this.commonEventData.contacts.length > 0) {

      for (let i = 0; i < this.commonEventData.contacts.length; i++) {
        // tslint:disable-next-line:max-line-length
        this.addLocationContact(eventLocationIndex);
      }

      for (let i = 0; i < this.commonEventData.contacts.length; i++) {
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

  }

  removeEventLocation(eventLocationIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations');
    control.removeAt(eventLocationIndex);
  }

  getEventLocations(form) {
    return form.controls.new_event_locations.controls;
  }

  // event organizations
  addEventOrganization() {
    const control = <FormArray>this.eventSubmissionForm.get('new_organizations');
    control.push(this.initEventOrganization());
    const organizationIndex = control.length - 1;

    this.filteredOrganizations.push(new ReplaySubject<Organization[]>());
    this.ManageOrganizationControl(organizationIndex);

  }

  removeEventOrganization(eventOrgIndex) {
    const control = <FormArray>this.eventSubmissionForm.get('new_organizations');
    control.removeAt(eventOrgIndex);
  }

  getEventOrganizations(form) {
    return form.controls.new_organizations.controls;
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
    // tslint:disable-next-line:max-line-length
    const controls = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
    controls.push(this.initLocationSpecies());
    const locationSpeciesIndex = controls.length - 1;

    // const eventLocationSpecies = new Array<ReplaySubject<Species[]>>();
    // this.filteredSpecies.push(eventLocationSpecies);
    // initiate an empty replaysubject
    this.filteredSpecies[eventLocationIndex].push(new ReplaySubject<Species[]>());
    this.ManageSpeciesControl(eventLocationIndex, locationSpeciesIndex);

    this.checkLocationSpeciesNumbers();

    return ({ eventLocationIndex: eventLocationIndex, locationSpeciesIndex: locationSpeciesIndex });
  }

  removeLocationSpecies(eventLocationIndex, locationSpeciesIndex) {
    // tslint:disable-next-line:max-line-length
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_species');
    control.removeAt(locationSpeciesIndex);

    this.filteredSpecies[eventLocationIndex].splice(locationSpeciesIndex, 1);
  }

  getLocationSpecies(form) {
    return form.controls.new_location_species.controls;
  }

  // location contacts
  addLocationContact(eventLocationIndex) {
    // tslint:disable-next-line:max-line-length
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
    control.push(this.initLocationContacts());
    const locationContactIndex = control.length - 1;

    this.filteredContacts[eventLocationIndex].push(new ReplaySubject<Contact[]>());
    this.ManageContactControl(eventLocationIndex, locationContactIndex);

    return ({ eventLocationIndex: eventLocationIndex, locationContactIndex: locationContactIndex });
  }

  removeLocationContact(eventLocationIndex, locationContactIndex) {
    // tslint:disable-next-line:max-line-length
    const control = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts');
    control.removeAt(locationContactIndex);

    this.filteredContacts[eventLocationIndex].splice(locationContactIndex, 1);
  }

  viewContactDetailsDialog(eventLocationIndex, locationContactIndex) {

    // tslint:disable-next-line:max-line-length
    const contact_id = this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('new_location_contacts').value[locationContactIndex].contact;
    // const currentContact = this.userContacts.find(i => i.id === contact_id);


    if (contact_id == null) {
      this.openSnackBar('First select a contact to view that contact\'s details', 'OK', 5000);
    } else {

      // look up contact
      this.contactService.getContactDetails(contact_id)
        .subscribe(
          (contactDetails) => {

            // Open dialog for viewing contact details
            this.viewContactDetailsDialogRef = this.dialog.open(ViewContactDetailsComponent, {
              data: {
                contact: contactDetails
              }
            });

            this.viewContactDetailsDialogRef.afterClosed()
              .subscribe(
                () => {
                  // do something after close
                },
                error => {
                  this.errorMessage = <any>error;
                }
              );
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

    }

  }

  getLocationContacts(form) {
    return form.controls.new_location_contacts.controls;
  }

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

  getDiagnosisOrganizations(form) {
    return form.controls.new_species_diagnosis_organizations.value;
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

  updateEventType(eventTypeID) {
    const eventLocations = <FormArray>this.eventSubmissionForm.get('new_event_locations')['controls'];
    for (let i = 0, j = eventLocations.length; i < j; i++) {
      this.eventSubmissionForm.get('new_event_locations')['controls'][i].get('event_type').setValue(Number(eventTypeID));
    }

    this.checkLocationSpeciesNumbers();
  }

  updateAdminLevelOneOptions(selectedCountryID, eventLocationIndex) {

    this.adminLevelOnesLoading = true;
    const id = Number(selectedCountryID);

    this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_one').setValue(null);

    // query the adminlevelones endpoint for appropriate records
    // update the options for the adminLevelOne select with the response

    this.adminLevelOneService.queryAdminLevelOnes(id)
      .subscribe(
        adminLevelOnes => {
          this.adminLevelOnes = adminLevelOnes;
          this.adminLevelOnes.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });

          // update the select options for the specific control
          this.filteredAdminLevelOnes[eventLocationIndex].next(adminLevelOnes);

          this.adminLevelOnesLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.adminLevelOnesLoading = false;
        }
      );
  }

  updateAdminLevelTwoOptions(selectedAdminLevelOneID, eventLocationIndex) {
    if (!isNaN(selectedAdminLevelOneID)) {
      const id = Number(selectedAdminLevelOneID);

      this.adminLevelTwosLoading = true;

      this.eventSubmissionForm.get('new_event_locations')['controls'][eventLocationIndex].get('administrative_level_two').setValue(null);

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

            // update the select options for the specific control
            this.filteredAdminLevelTwos[eventLocationIndex].next(adminLevelTwos);

            // dont think below block should be here, but leaving it for now for debugging
            // listen for search field value changes
            // this.adminLevelTwoFilterCtrl.valueChanges
            //   .pipe(takeUntil(this._onDestroy))
            //   .subscribe(() => {
            //     this.filterAdminLevelTwos(eventLocationIndex);
            //   });

            this.adminLevelTwosLoading = false;
          },
          error => {
            this.errorMessage = <any>error;
            this.adminLevelTwosLoading = false;
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

  removeCollaborator(userID, list) {
    switch (list) {
      case 'read':
        const readIndex = this.readCollaboratorArray.findIndex(function (o) {
          return o.id === userID;
        });
        if (readIndex !== -1) { this.readCollaboratorArray.splice(readIndex, 1); }
        break;
      case 'write':
        const writeIndex = this.writeCollaboratorArray.findIndex(function (o) {
          return o.id === userID;
        });
        if (writeIndex !== -1) { this.writeCollaboratorArray.splice(writeIndex, 1); }
        break;
    }

  }

  addCollaborator(accessType) {
    this.circleManagementDialogRef = this.dialog.open(CircleManagementComponent, {
      disableClose: true,
      data: {
        action: 'selectUser',
      }
    });

    this.circleManagementDialogRef.afterClosed()
      .subscribe(
        (selectedUser) => {
          if (accessType === 'read') {
            this.readCollaboratorArray.push(selectedUser);
          } else if (accessType === 'write') {
            this.writeCollaboratorArray.push(selectedUser);
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  openAddSpeciesDiagnosisDialog(eventLocationIndex, locationSpeciesIndex) {

    const speciesDiagnosisIndex = this.addSpeciesDiagnosis(eventLocationIndex, locationSpeciesIndex);

    // Open dialog for adding species diagnosis
    this.editSpeciesDiagnosisDialogRef = this.dialog.open(EditSpeciesDiagnosisComponent, {
      disableClose: true,
      data: {
        species_diagnosis_action: 'addToFormArray',
        laboratories: this.laboratories,
        eventlocationIndex: eventLocationIndex,
        locationspeciesIndex: locationSpeciesIndex,
        title: 'Add Species Diagnosis',
        titleIcon: 'note_add',
        actionButtonIcon: 'note_add'
      }
    });

    this.editSpeciesDiagnosisDialogRef.afterClosed()
      .subscribe(
        (speciesDiagnosisObj) => {

          if (speciesDiagnosisObj.action === 'cancel') {
            // remove last species diagnosis added
            // tslint:disable-next-line:max-line-length
            this.removeSpeciesDiagnosis(speciesDiagnosisObj.eventlocationIndex, speciesDiagnosisObj.locationspeciesIndex, speciesDiagnosisIndex);
            return;
          } else if (speciesDiagnosisObj.action === 'add') {

            this.eventSubmissionForm.get('new_event_locations')['controls'][speciesDiagnosisObj.eventlocationIndex]
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


            for (const diagnosis of this.allDiagnoses) {
              if (diagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {

                let diagnosisFound = false;
                // check to see if the diagnosis just added already exists in the availableDiagnoses array
                for (const availableDiagnosis of this.availableDiagnoses) {
                  if (availableDiagnosis.id === Number(speciesDiagnosisObj.formValue.diagnosis)) {
                    // if found, increment the count for that diagnosis
                    availableDiagnosis.count++;
                    // if found, set local var found to true
                    diagnosisFound = true;
                    // if found, stop. do not add to availableDiagnoses array
                    break;
                  }
                }
                // if diagnosis is not found to already exist in the availableDiagnoses array, add it
                if (!diagnosisFound) {
                  diagnosis.suspect = speciesDiagnosisObj.formValue.suspect;
                  // set diagnosis count to 1
                  diagnosis.count = 1;
                  this.availableDiagnoses.push(diagnosis);
                }

              }
            }

            this.checkSpeciesDiagnoses();
          }

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  resetStepper() {
    this.eventSubmissionForm.reset();
    this.eventSubmissionForm.get('new_event_locations')['controls'][0].get('country').setValue(APP_UTILITIES.DEFAULT_COUNTRY_ID);
    // need to update the adminLevelOne options per the default county value
    this.updateAdminLevelOneOptions(APP_UTILITIES.DEFAULT_COUNTRY_ID, 0);
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
  }


  submitEvent(formValue) {
    this.eventSubmissionForm.markAsUntouched();

    this.submitLoading = true;

    // KEEP. Bring this back pending introduction of generic event location comment.
    // check if extra event location comment is blank, if so, delete it from the object
    // for (const event_location of formValue.new_event_locations) {
    //   if (event_location.comment.comment === '') {
    //     delete event_location.comment;
    //   }
    // }
    // adds the read collaborators list to the new_read_collaborators array for submission
    for (const user of this.readCollaboratorArray) {
      formValue.new_read_collaborators.push(user.id);
    }
    // adds the write collaborators list to the new_write_collaborators array for submission
    for (const user of this.writeCollaboratorArray) {
      formValue.new_write_collaborators.push(user.id);
    }

    const new_orgs_array = [];
    // loop through and convert new_organizations
    for (const org of formValue.new_organizations) {
      new_orgs_array.push(org.org);
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
    for (const event_location of formValue.new_event_locations) {
      event_location.start_date = this.datePipe.transform(event_location.start_date, 'yyyy-MM-dd');
      event_location.end_date = this.datePipe.transform(event_location.end_date, 'yyyy-MM-dd');
      //delete the event_type superficially attached to event locations
      delete event_location.event_type;
    }

    sessionStorage.setItem('eventSubmission', formValue);

    this.eventService.create(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;

          this.confirmDialogRef = this.dialog.open(ConfirmComponent,
            {
              disableClose: true,
              data: {
                title: 'Event Saved',
                titleIcon: 'check',
                message: 'Your event was successfully saved. The Event ID is ' + event.id,
                confirmButtonText: 'OK',
                showCancelButton: false
              }
            }
          );

          // when user clicks OK, reset the form and stepper using resetStepper()
          this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              // temporarily disabling the resetStepper function in favor of full page reload.
              // tons of issues with resetting this form because of its complexity. full page reload works for now. 
              //this.resetStepper();
              location.reload();
            }
          });

          gtag('event', 'click', { 'event_category': 'Event', 'event_label': 'New Event Created, type: ' + event.event_type });

        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
        }
      );



  }

}
