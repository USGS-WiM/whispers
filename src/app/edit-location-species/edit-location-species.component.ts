import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { Species } from '@interfaces/species';
import { SpeciesService } from '@services/species.service';

import { LocationSpeciesService } from '@services/location-species.service';

@Component({
  selector: 'app-edit-location-species',
  templateUrl: './edit-location-species.component.html',
  styleUrls: ['./edit-location-species.component.scss']
})
export class EditLocationSpeciesComponent implements OnInit {

  locationSpeciesForm: FormGroup;

  species: Species[];
  filteredSpecies: Observable<any[]>;

  eventID;
  eventlocation;
  locationspeciesString;
  administrative_level_one;
  administrative_level_two;

  submitLoading = false;

  action_text;
  action_button_text;

  errorMessage;

  buildLocationSpeciesForm() {
    this.locationSpeciesForm = this.formBuilder.group({
      id: null,
      event_location: null,
      species: null,
      population_count: null,
      sick_count: null,
      dead_count: null,
      sick_count_estimated: null,
      dead_count_estimated: null,
      captive: false,
      age_bias: null,
      sex_bias: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public editLocationSpeciesDialogRef: MatDialogRef<EditLocationSpeciesComponent>,
    private locationSpeciesService: LocationSpeciesService,
    public snackBar: MatSnackBar,
    private speciesService: SpeciesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildLocationSpeciesForm();
  }

  ngOnInit() {


    if (this.data.eventlocation) {
      this.eventlocation = this.data.eventlocation;
      this.eventID = this.data.eventlocation.event;
      this.administrative_level_one = this.data.eventlocation.administrative_level_one_string;
      this.administrative_level_two = this.data.eventlocation.administrative_level_two_string;
    }

    // if stuff

    if (this.data.location_species_action === 'add') {
      this.action_text = 'Add';
      this.action_button_text = 'Submit';

    } else if (this.data.location_species_action === 'edit') {

      this.locationspeciesString = this.data.locationspecies.species_string;
      this.administrative_level_one = this.data.locationspecies.administrative_level_one_string;
      this.administrative_level_two = this.data.locationspecies.administrative_level_two_string;

      this.action_text = 'Edit';
      this.action_button_text = 'Save Changes';

      this.locationSpeciesForm.setValue({
        id: this.data.locationspecies.id,
        event_location: this.data.locationspecies.event_location,
        species: this.data.locationspecies.species,
        population_count: this.data.locationspecies.population_count,
        sick_count: this.data.locationspecies.sick_count,
        dead_count: this.data.locationspecies.dead_count,
        sick_count_estimated: this.data.locationspecies.sick_count_estimated,
        dead_count_estimated: this.data.locationspecies.dead_count_estimated,
        captive: this.data.locationspecies.captive,
        age_bias: this.data.locationspecies.age_bias,
        sex_bias: this.data.locationspecies.sex_bias,
      });

      this.locationSpeciesForm.get('species').disable();

    }


    // get species from the species service
    this.speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.species = species;
          // alphabetize the species options list
          this.species.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredSpecies = this.locationSpeciesForm.get('species').valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.species, 'name'));

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

  updateSpecies(formValue) {


  }

  onSubmit(formValue) {

    this.submitLoading = true;

    if (this.data.location_species_action === 'add') {

      this.locationSpeciesService.create(formValue)
        .subscribe(
          (event) => {
            this.submitLoading = false;
            this.openSnackBar('Species successfully added to this location', 'OK', 5000);
            this.editLocationSpeciesDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. New species not saved. Error message: ' + error, 'OK', 8000);
          }
        );

    } else if (this.data.location_species_action === 'edit') {

      formValue.id = this.data.locationspecies.id;
      formValue.event_location = this.data.locationspecies.event_location;
      formValue.species = this.data.locationspecies.species;
      this.locationSpeciesService.update(formValue)
        .subscribe(
          (event) => {
            this.submitLoading = false;
            this.openSnackBar('Species Updated', 'OK', 5000);
            this.editLocationSpeciesDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species not updated. Error message: ' + error, 'OK', 8000);
          }
        );


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

  displayFn(species?: Species): string | undefined {
    return species ? species.name : undefined;
  }

}
