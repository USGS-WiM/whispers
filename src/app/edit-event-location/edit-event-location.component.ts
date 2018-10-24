import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';

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

  gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>;

  latitudePattern: RegExp = (/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
  longitudePattern: RegExp = (/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);

  buildEditEventLocationForm() {
    this.editEventLocationForm = this.formBuilder.group({
      id: null,
      event: null,
      name: '',
      start_date: '',
      end_date: '',
      country: [null, Validators.required],
      administrative_level_one: [null, Validators.required],
      administrative_level_two: [null, Validators.required],
      latitude: [null, Validators.pattern(this.latitudePattern)],
      longitude: [null, Validators.pattern(this.longitudePattern)],
      land_ownership: [null, Validators.required],
      gnis_name: '',
      gnis_id: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
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

      this.adminLevelTwoService.queryAdminLevelTwos(this.data.eventLocationData.administrative_level_one)
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

    this.editEventLocationForm.patchValue({
      id: this.data.eventLocationData.id,
      name: this.data.eventLocationData.name,
      event: this.data.eventLocationData.event,
      start_date: this.data.eventLocationData.start_date,
      end_date: this.data.eventLocationData.end_date,
      country: this.data.eventLocationData.country.toString(),
      administrative_level_one: this.data.eventLocationData.administrative_level_one.toString(),
      administrative_level_two: this.data.eventLocationData.administrative_level_two.toString(),
      latitude: this.data.eventLocationData.latitude,
      longitude: this.data.eventLocationData.longitude,
      gnis_name: this.data.eventLocationData.gnis_name,
      gnis_id: this.data.eventLocationData.gnis_id
    });

    if (this.data.eventLocationData.land_ownership !== null) {
      this.editEventLocationForm.get('land_ownership').setValue(this.data.eventLocationData.land_ownership.toString());
    }

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
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

  updateEventLocation(formValue) {

    this.eventLocationService.update(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Event Location Details Updated', 'OK', 5000);
          this.editEventLocationDialogRef.close();
          this.dataUpdatedService.triggerRefresh();
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


}
