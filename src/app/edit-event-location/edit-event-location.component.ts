import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { EventLocationService } from '@services/event-location.service';
import { LandOwnership } from '@interfaces/land-ownership';
import { LandOwnershipService } from '@app/services/land-ownership.service';
import { Country } from '@interfaces/country';
import { CountryService } from '@app/services/country.service';
import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { DataUpdatedService } from '@app/services/data-updated.service';

import { GnisLookupComponent } from '@app/gnis-lookup/gnis-lookup.component';

import { APP_UTILITIES } from '@app/app.utilities';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
import { DatePipe } from '@angular/common';
declare let gtag: Function;

@Component({
  selector: 'app-edit-event-location',
  templateUrl: './edit-event-location.component.html',
  styleUrls: ['./edit-event-location.component.scss']
})
export class EditEventLocationComponent implements OnInit {

  errorMessage = '';

  landOwnerships: LandOwnership[];
  countries: Country[];
  adminLevelOnes: AdministrativeLevelOne[];
  adminLevelTwos: AdministrativeLevelTwo[];

  editEventLocationForm: FormGroup;

  submitLoading = false;
  startDateViolation = false;

  gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  public filteredAdminLevelOnes: ReplaySubject<AdministrativeLevelOne[]> = new ReplaySubject<AdministrativeLevelOne[]>(1);
  adminLevelOneFilterCtrl: FormControl = new FormControl();

  public filteredAdminLevelTwos: ReplaySubject<AdministrativeLevelTwo[]> = new ReplaySubject<AdministrativeLevelTwo[]>(1);
  adminLevelTwoFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  endDateBeforeStart(AC: AbstractControl) {
    AC.get('end_date').setErrors(null);
    AC.get('start_date').setErrors(null);
    const start_date = AC.get('start_date').value;
    const end_date = AC.get('end_date').value;
    if ((start_date !== null && end_date !== null) && start_date > end_date) {
      AC.get('end_date').setErrors({ endDateBeforeStart: true });
      AC.get('start_date').setErrors({ endDateBeforeStart: true });
    }
    return null;
  }

  buildEditEventLocationForm() {
    this.editEventLocationForm = this.formBuilder.group({
      id: null,
      event: null,
      name: '',
      start_date: null,
      end_date: null,
      country: [null, Validators.required],
      administrative_level_one: [null, Validators.required],
      administrative_level_two: [null, Validators.required],
      latitude: [null, Validators.pattern(this.latitudePattern)],
      longitude: [null, Validators.pattern(this.longitudePattern)],
      land_ownership: [null, Validators.required],
      gnis_name: '',
      gnis_id: ''
    },
      {
        validator: [this.endDateBeforeStart]
      });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private eventLocationService: EventLocationService,
    private landOwnershipService: LandOwnershipService,
    private countryService: CountryService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    public editEventLocationDialogRef: MatDialogRef<EditEventLocationComponent>,
    public snackBar: MatSnackBar,
    private dataUpdatedService: DataUpdatedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildEditEventLocationForm();
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
    this.adminLevelOneService.queryAdminLevelOnes(this.data.eventLocationData.country)
      .subscribe(
        adminLevelOnes => {
          this.adminLevelOnes = adminLevelOnes;

          // populate the search select options for the adminLevelOne control
          this.filteredAdminLevelOnes.next(adminLevelOnes);

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

    this.adminLevelTwoService.queryAdminLevelTwos(this.data.eventLocationData.administrative_level_one)
      .subscribe(
        adminLevelTwos => {
          this.adminLevelTwos = adminLevelTwos;
          this.adminLevelTwos.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });

          // populate the search select options for the adminLevelTwo control
          this.filteredAdminLevelTwos.next(adminLevelTwos);

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

    this.editEventLocationForm.patchValue({
      id: this.data.eventLocationData.id,
      name: this.data.eventLocationData.name,
      event: this.data.eventLocationData.event,
      start_date: APP_UTILITIES.timeZoneAdjust(this.data.eventLocationData.start_date),
      end_date: APP_UTILITIES.timeZoneAdjust(this.data.eventLocationData.end_date),
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
    if (!this.adminLevelOnes) {
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


  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  locationStartDateTooltip() { const string = FIELD_HELP_TEXT.locationStartDateTooltip; return string; }
  locationEndDateTooltip() { const string = FIELD_HELP_TEXT.locationEndDateTooltip; return string; }
  stateTooltip() { const string = FIELD_HELP_TEXT.stateTooltip; return string; }
  countryTooltip() { const string = FIELD_HELP_TEXT.countryTooltip; return string; }
  editCountyTooltip() { const string = FIELD_HELP_TEXT.editCountyTooltip; return string; }
  editLocationNameTooltip() { const string = FIELD_HELP_TEXT.editLocationNameTooltip; return string; }
  editLandOwnershipTooltip() { const string = FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; }
  longitudeTooltip() { const string = FIELD_HELP_TEXT.longitudeTooltip; return string; }
  latitudeTooltip() { const string = FIELD_HELP_TEXT.latitudeTooltip; return string; }
  editStandardizedLocationNameTooltip() { const string = FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; }

  updateAdminLevelOneOptions(selectedCountryID) {
    const id = Number(selectedCountryID);

    this.editEventLocationForm.get('administrative_level_one').setValue(null);

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

  preventStartDateRemoval() {
    this.startDateViolation = false;
    if (this.editEventLocationForm.get('start_date').value === null) {
      this.startDateViolation = true;
    }
  }

  updateAdminLevelTwoOptions(selectedAdminLevelOneID) {
    const id = Number(selectedAdminLevelOneID);

    // query the adminleveltwos endpoint for appropriate records
    // update the options for the adminLevelTwo select with the response

    this.editEventLocationForm.get('administrative_level_two').setValue(null);

    this.adminLevelTwoService.queryAdminLevelTwos(id)
      .subscribe(
        adminLevelTwos => {
          this.adminLevelTwos = adminLevelTwos;
          this.adminLevelTwos.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });

          // populate the search select options for the adminLevelTwo control
          this.filteredAdminLevelTwos.next(adminLevelTwos);

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

  updateEventLocation(formValue) {

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
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Event Location Details Updated', 'OK', 5000);
          this.editEventLocationDialogRef.close();
          this.dataUpdatedService.triggerRefresh();
          gtag('event', 'click', { 'event_category': 'Event Location Details', 'event_label': 'Event Location Details Edited' });
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event location details not updated. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  openGNISLookupDialog(eventLocationIndex) {
    this.gnisLookupDialogRef = this.dialog.open(GnisLookupComponent, {
      disableClose: true,
      data: {
        event_location_index: eventLocationIndex
      }
    });

    this.gnisLookupDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.editEventLocationForm.get('gnis_id').setValue(result.id);
      this.editEventLocationForm.get('gnis_name').setValue(result.name);

    });
  }

  clearGNISEntry() {
    this.editEventLocationForm.get('gnis_id').setValue('');
    this.editEventLocationForm.get('gnis_name').setValue('');
  }

  truncateDecimalDegrees($event, field) {

    const beforeDecimal = ($event + '').split('.')[0];
    const afterDecimal = ($event + '').split('.')[1];

    if (afterDecimal.length > 6) {
      const truncatedValue = beforeDecimal + '.' + afterDecimal.substring(0, 6);
      this.editEventLocationForm.get(field).setValue(truncatedValue);
    }

  }


}
