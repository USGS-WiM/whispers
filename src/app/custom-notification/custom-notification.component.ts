import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';

import { ConfirmComponent } from '@confirm/confirm.component';

import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';

import { SpeciesService } from '@services/species.service';

import { SpeciesDiagnosisService } from '@services/species-diagnosis.service';

import { LandOwnership } from '@interfaces/land-ownership';
import { LandOwnershipService } from '@services/land-ownership.service';

import { CueService } from '@services/cue.service';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent implements OnInit {

  errorMessage = '';
  cueForm: FormGroup;

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  adminLevelOneControl: FormControl;
  administrative_level_one = [];
  filteredAdminLevelOnes: Observable<any[]>;
  selectedAdminLevelOnes = []; // chips list

  speciesLoading = false;
  speciesControl: FormControl;
  species = [];
  filteredSpecies: Observable<any[]>;
  selectedSpecies = []; // chips list

  // diagnoses or speciesDiagnosis?? -BAD 12/3/19
  diagnosisLoading = false;
  speciesDiagnosisControl: FormControl;
  diagnosis = [];
  filteredDiagnosis: Observable<any[]>;
  selectedDiagnosis = []; // chips list

  landOwnershipLoading = false;
  landOwnershipControl: FormControl;
  landOwnerships: LandOwnership[];
  filteredLandOwnership: Observable<any[]>;
  selectedLandOwnership = []; // chips list

  buildCueForm() {
    this.cueForm = this.formBuilder.group({
      event_id: null,
      species_diagnosis: null,
      species: null,
      administrative_level_one: null,
      administrative_level_two: null,
      affected_count: null,
      affected_count_operator: '__gte',
      diagnosis_type_includes_all: false,
      diagnosis_includes_all: false,
      species_includes_all: false,
      administrative_level_one_includes_all: false,
      administrative_level_two_includes_all: false,
      and_params: [],
      complete: null
    });
  }

  constructor(
    public customNotificationDialogRef: MatDialogRef<CustomNotificationComponent>,
    private adminLevelOneService: AdministrativeLevelOneService,
    private _speciesService: SpeciesService,
    private _speciesDiagnosisService: SpeciesDiagnosisService,
    private landOwnershipService: LandOwnershipService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.adminLevelOneControl = new FormControl();
    this.speciesControl = new FormControl();
    this.speciesDiagnosisControl = new FormControl();
    this.landOwnershipControl = new FormControl();
    this.buildCueForm();
  }

  ngOnInit() {
    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.administrative_level_one = adminLevelOnes;
          this.filteredAdminLevelOnes = this.adminLevelOneControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.administrative_level_one, 'name')));

            // TODO: make this work in this component where there is not a saved query coming in via the data var.
            // if no editing, refactor w/out this part below that checks and incorporates incoming query
            // it seems the presumption of a incoming query is structural to this, so need to disassociate that.
            // note that .some is a native javascript array function

          if (this.data.query && this.data.query['administrative_level_one'].length > 0) {
            for (const index in adminLevelOnes) {
              if (this.data.query['administrative_level_one'].some(
                function (el) {
                  console.log(el);
                  let match = false;
                  if (typeof el === 'number') {
                    if (el === adminLevelOnes[index].id) {
                      match = true;
                    }
                  } else {
                    if (el === adminLevelOnes[index].name) {
                      match = true;
                    }
                  }
                  return match;
                })) {
                this.dropdownSetup(this.adminLevelOneControl, this.selectedAdminLevelOnes, adminLevelOnes[index]);
              }
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
          // alphabetize the species options list
          this.landOwnerships.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredLandOwnership = this.landOwnershipControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.landOwnerships, 'name')));

          console.log(this.filteredLandOwnership);

          // if (this.data.query && this.data.query['landOwnerships'] && this.data.query['landOwnerships'].length > 0) {
          //   for (const index in landOwnerships) {
          //     if (this.data.query['landOwnerships'].some(
          //       function (el) {
          //         let match = false;
          //         if (typeof el === 'number') {
          //           if (el === landOwnerships[index].id) {
          //             match = true;
          //           }
          //         } else {
          //           if (el === landOwnerships[index].name) {
          //             match = true;
          //           }
          //         }
          //         return match;
          //       })) {
          //       this.dropdownSetup(this.landOwnershipControl, this.selectedLandOwnership, landOwnerships[index]);
          //     }
          //   }
          // }

          this.landOwnershipLoading = false;
          this.landOwnershipControl.enable();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // this.speciesLoading = true;
    // get species from the species service
    this._speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.species = species;
          // alphabetize the species options list
          this.species.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredSpecies = this.speciesControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.species, 'name')));

          if (this.data.query && this.data.query['species'] && this.data.query['species'].length > 0) {
            /*for (const index in species) {
              if (this.data.query['species'].some(function (el) { return el === species[index].name; })) {
                this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
              }
            }*/
            for (const index in species) {
              if (this.data.query['species'].some(
                function (el) {
                  let match = false;
                  if (typeof el === 'number') {
                    if (el === species[index].id) {
                      match = true;
                    }
                  } else {
                    if (el === species[index].name) {
                      match = true;
                    }
                  }
                  return match;
                })) {
                this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
              }
            }
          }
          // this.speciesLoading = false;
          this.speciesControl.enable();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // this.diagnosisLoading = true;
    // get species diagnosis from the species diagnosis service
    this._speciesDiagnosisService.getSpeciesDiagnosis()
      .subscribe(
        (diagnosis) => {
          this.diagnosis = diagnosis;
          // alphabetize the species options list
          this.diagnosis.sort(function (a, b) {
            if (a.diagnosis_string < b.diagnosis_string) { return -1; }
            if (a.diagnosis_string > b.diagnosis_string) { return 1; }
            return 0;
          });
          this.filteredDiagnosis = this.speciesDiagnosisControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.diagnosis, 'diagnosis_string')));

          if (this.data.query && this.data.query['diagnosis_string'] && this.data.query['diagnosis_string'].length > 0) {
            /*for (const index in species) {
              if (this.data.query['species'].some(function (el) { return el === species[index].name; })) {
                this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
              }
            }*/
            for (const index in diagnosis) {
              if (this.data.query['diagnosis_string'].some(
                function (el) {
                  let match = false;
                  if (typeof el === 'number') {
                    if (el === diagnosis[index].id) {
                      match = true;
                    }
                  } else {
                    if (el === diagnosis[index].diagnosis_string) {
                      match = true;
                    }
                  }
                  return match;
                })) {
                this.dropdownSetup(this.speciesDiagnosisControl, this.selectedDiagnosis, diagnosis[index]);
              }
            }
          }
          // this.diagnosisLoading = false;
          this.speciesDiagnosisControl.enable();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  dropdownSetup(formControl: FormControl, selectedValues: any, value: any) {
    selectedValues.push(value);
    this.resetFormControl(formControl);
  }

  filter(val: any, searchArray: any, searchProperty: string): string[] {
    const realval = val && typeof val === 'object' ? val.searchProperty : val;
    const result = [];
    let lastOption = null;
    for (let i = 0; i < searchArray.length; i++) {
      if (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase())) {
        if (searchArray[i][searchProperty] !== lastOption) {
          lastOption = searchArray[i][searchProperty];
          result.push(searchArray[i]);
        }
      }
    }
    return result;
  }

  resetFormControl(control) {
    switch (control) {
      case 'adminLevelOne': this.adminLevelOneControl.reset();
        break;
    }
  }

  // TODO - set up DELETE Cue
  deleteCue() {

  }

  openCueDeleteConfirm(eventGroup) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Cue Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this cue?\nThis action cannot be undone.',
          confirmButtonText: 'Yes, Delete Cue',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCue();
      }
    });
  }

  // TODO - set up POST for notification cue
  onSubmit() {
    this.customNotificationDialogRef.close();
  }
}
