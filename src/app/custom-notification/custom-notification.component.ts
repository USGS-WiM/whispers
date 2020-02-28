import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ConfirmComponent } from '@confirm/confirm.component';

import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';

import { SpeciesService } from '@services/species.service';

import { DiagnosisService } from '@services/diagnosis.service';
import { Diagnosis } from '@interfaces/diagnosis';

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
  selectable = true;
  removable = true;
  addOnBlur = true;
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
  diagnosesLoading = false;
  speciesDiagnosisControl: FormControl;
  diagnoses: Diagnosis[];
  filteredDiagnoses: Observable<any[]>;
  selectedDiagnoses = []; // chips list

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
      land_ownerships: null,
      affected_count: null,
      affected_count_operator: '__gte',

      diagnosis_includes_all: false,
      species_includes_all: false,
      administrative_level_one_includes_all: false,
      speciesDiagnosis_includes_all: false,

      and_params: [],
      create_when_new: false,
      create_when_modified: false,
      send_email: false
    });
  }

  constructor(
    public customNotificationDialogRef: MatDialogRef<CustomNotificationComponent>,
    private adminLevelOneService: AdministrativeLevelOneService,
    private _speciesService: SpeciesService,
    private diagnosisService: DiagnosisService,
    private landOwnershipService: LandOwnershipService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
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

          // below block not needed because no incoming query

          //   if (this.data.query && this.data.query['administrative_level_one'].length > 0) {

          //     for (const index in adminLevelOnes) {
          //       if (this.data.query['administrative_level_one'].some(
          //         function (el) {
          //           console.log(el);
          //           let match = false;
          //           if (typeof el === 'number') {
          //             if (el === adminLevelOnes[index].id) {
          //               match = true;
          //             }
          //           } else {
          //             if (el === adminLevelOnes[index].name) {
          //               match = true;
          //             }
          //           }
          //           return match;
          //         })) {
          //         this.dropdownSetup(this.adminLevelOneControl, this.selectedAdminLevelOnes, adminLevelOnes[index]);
          //       }
          //     }
          //  }

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


          // below block not needed because no incoming query
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

          // this.speciesLoading = false;
          this.speciesControl.enable();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get diagnoses from the diagnoses service
    // IMPORTANT NOTE: while the form specifies a 'species diagnosis' in this context it means the diagnosis assigned to a species (more specifically a locationspecies)
    // the form options must be populated from the diagnoses lookup table. the backend will then search speciesdiagnoses records that contain the diagnosis or diagnoses selected.
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          // alphabetize the diagnosis options list
          this.diagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredDiagnoses = this.speciesDiagnosisControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.diagnoses, 'name')));
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

  displayFn(item): string | undefined {
    return item ? item.name : undefined;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  addChip(event: MatAutocompleteSelectedEvent, selectedValuesArray: any, control: string): void {

    const self = this;
    // Define selection constant
    let alreadySelected = false;
    const selection = event.option.value;
    if (selectedValuesArray.length > 0) {
      // check if the selection is already in the selected array
      for (const item of selectedValuesArray) {
        if (item.id === selection.id) {
          alreadySelected = true;
          this.openSnackBar('Already Selected', 'OK');
        }
      }
      if (alreadySelected === false) {
        // Add selected item to selected array, which will show as a chip
        selectedValuesArray.push(selection);
        // reset the form
        this.resetFormControl(control);
      }
    } else {
      // Add selected item to selected array, which will show as a chip
      selectedValuesArray.push(selection);
      // reset the form
      this.resetFormControl(control);
    }

  }

  removeChip(chip: any, selectedValuesArray: any, control: string): void {
    // Find key of object in selectedValuesArray
    const index = selectedValuesArray.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from selectedValuesArray array
      selectedValuesArray.splice(index, 1);
    }
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
      case 'species': this.speciesControl.reset();
        break;
      case 'diagnosis': this.speciesDiagnosisControl.reset();
        break;
      case 'landOwnership': this.landOwnershipControl.reset();
    }
  }


  onSubmit(formValue) {

    const customCueObj = {
      administrative_level_one: [],
      species: [],
      species_diagnosis: [],
      land_ownerships: [],
      affected_count: formValue.affected_count,
      affected_count_operator: formValue.affected_count_operator,
      species_diagnosis_includes_all: formValue.species_diagnosis_includes_all,
      species_includes_all: formValue.species_includes_all,
      administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
      land_ownerships_includes_all: formValue.land_ownerships_includes_all,
      and_params: []
    };


    if (formValue.diagnosis_type_includes_all === true) {
      formValue.and_params.push('diagnosis_type');
    }
    if (formValue.speciesDiagnosis_includes_all === true) {
      formValue.and_params.push('diagnosis');
    }
    if (formValue.species_includes_all === true) {
      formValue.and_params.push('species');
    }
    if (formValue.administrative_level_one_includes_all === true) {
      formValue.and_params.push('administrative_level_one');
    }

    formValue.administrative_level_one = this.selectedAdminLevelOnes;
    formValue.species = this.selectedSpecies;
    formValue.species_diagnosis = this.selectedDiagnoses;
    formValue.land_ownerships = this.selectedLandOwnership;

    this.customNotificationDialogRef.close(customCueObj);
    this.customNotificationDialogRef.close();
  }
}
