import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';

import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { SpeciesService } from '@services/species.service';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent implements OnInit {

  adminLevelOneControl: FormControl;
  errorMessage = '';
  speciesLoading = true;
  speciesControl: FormControl;

  administrative_level_one = [];
  filteredAdminLevelOnes: Observable<any[]>;
  selectedAdminLevelOnes = []; // chips list

  species = [];
  filteredSpecies: Observable<any[]>;
  selectedSpecies = []; // chips list


  constructor(
    public customNotificationDialogRef: MatDialogRef<CustomNotificationComponent>,
    private adminLevelOneService: AdministrativeLevelOneService,
    private _speciesService: SpeciesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.adminLevelOneControl = new FormControl();
      this.speciesControl = new FormControl({ value: null, disabled: true });
     }

  ngOnInit() {
    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.administrative_level_one = adminLevelOnes;
          this.filteredAdminLevelOnes = this.adminLevelOneControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.administrative_level_one, 'name'));

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
        this.filteredSpecies = this.speciesControl.valueChanges
          .startWith(null)
          .map(val => this.filter(val, this.species, 'name'));

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
        this.speciesLoading = false;
        this.speciesControl.enable();
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
}
