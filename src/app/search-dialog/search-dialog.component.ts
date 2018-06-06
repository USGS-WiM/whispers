import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatSnackBar } from '@angular/material';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { APP_UTILITIES } from '@app/app.utilities';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { EventType } from '@interfaces/event-type';
import { EventTypeService } from '@services/event-type.service';
import { Diagnosis } from '@interfaces/diagnosis';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';
import { DiagnosisType } from '@interfaces/diagnosis-type';
import { DiagnosisService } from '@services/diagnosis.service';
import { SpeciesService } from '@services/species.service';
import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  errorMessage = '';
  // visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  searchForm: FormGroup;
  // independent controls - values do not persist - used to select the value and add to a selection array
  eventTypeControl: FormControl;
  diagnosisTypeControl: FormControl;
  diagnosisControl: FormControl;
  stateControl: FormControl;
  countyControl: FormControl;
  speciesControl: FormControl;

  eventTypes: EventType[];
  filteredEventTypes: Observable<any[]>;
  selectedEventTypes = [];

  diagnosisTypes: DiagnosisType[];
  filteredDiagnosisTypes: Observable<any[]>;
  selectedDiagnosisTypes = [];

  diagnoses: Diagnosis[];
  filteredDiagnoses: Observable<any[]>;
  selectedDiagnoses = []; // chips list

  states = [];
  filteredStates: Observable<any[]>;
  selectedStates = []; // chips list

  counties = [];
  filteredCounties: Observable<any[]>;
  selectedCounties = []; // chips list

  species = [];
  filteredSpecies: Observable<any[]>;
  selectedSpecies = []; // chips list

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      event_type: null,
      diagnosis: null,
      diagnosis_type: null,
      species: null,
      states: null,
      counties: null,
      flyway: null,
      affected: 5,
      start_date: null,
      end_date: null,
      event_type_includes_all: false,
      diagnosis_type_includes_all: false,
      diagnosis_includes_all: false,
      species_includes_all: false,
      state_includes_all: false,
      county_includes_all: false,
      openEventsOnly: false
    });
  }

  constructor(
    public searchDialogRef: MatDialogRef<SearchDialogComponent>,
    private formBuilder: FormBuilder,
    private _adminLevelOneService: AdministrativeLevelOneService,
    private _adminLevelTwoService: AdministrativeLevelTwoService,
    private _eventTypeService: EventTypeService,
    private _diagnosisTypeService: DiagnosisTypeService,
    private _diagnosisService: DiagnosisService,
    private _speciesService: SpeciesService,
    public snackBar: MatSnackBar) {

    this.eventTypeControl = new FormControl();
    this.diagnosisTypeControl = new FormControl();
    this.diagnosisControl = new FormControl();
    this.stateControl = new FormControl();
    this.countyControl = new FormControl();
    this.speciesControl = new FormControl();

    this.buildSearchForm();
  }

  ngOnInit() {
    // get event types from the eventType service
    this._eventTypeService.getEventTypes()
      .subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
          this.filteredEventTypes = this.eventTypeControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.eventTypes, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosis types from the diagnosisType service
    this._diagnosisTypeService.getDiagnosisTypes()
      .subscribe(
        (diagnosisTypes) => {
          this.diagnosisTypes = diagnosisTypes;
          this.filteredDiagnosisTypes = this.diagnosisTypeControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.diagnosisTypes, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnoses from the diagnoses service
    this._diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          this.filteredDiagnoses = this.diagnosisControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.diagnoses, 'diagnosis'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get states from the state service
    this._adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (states) => {
          this.states = states;
          this.filteredStates = this.stateControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.states, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get counties from the county service
    this._adminLevelTwoService.getAdminLevelTwos()
      .subscribe(
        (counties) => {
          this.counties = counties;
          this.filteredCounties = this.countyControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.counties, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get species from the sspecies service
    this._speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.species = species;
          this.filteredSpecies = this.stateControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.species, 'name'));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  filter(val: any, searchArray: any, searchProperty: string): string[] {
    const realval = val && typeof val === 'object' ? val.searchProperty : val;
    const result = [];
    let lastOption = null;
    for (let i = 0; i < searchArray.length; i++) {
      if (!realval || searchArray[i][searchProperty].toLowerCase().startsWith(realval.toLowerCase())) {
        if (searchArray[i][searchProperty] !== lastOption) {
          lastOption = searchArray[i][searchProperty];
          result.push(searchArray[i]);
        }
      }
    }
    return result;
  }

  displayFn(diagnosis?: Diagnosis): string | undefined {
    return diagnosis ? diagnosis.name : undefined;
  }

  submitSearch() {
    console.log(this.diagnosisControl.value);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  resetFormControl(control) {
    switch (control) {
      case 'eventType': this.eventTypeControl.reset();
        break;
      case 'diagnosisType': this.diagnosisTypeControl.reset();
        break;
      case 'diagnosis': this.diagnosisControl.reset();
        break;
      case 'state': this.stateControl.reset();
        break;
      case 'county': this.countyControl.reset();
    }
  }

  addChip(event: MatAutocompleteSelectedEvent, selectedValuesArray: any, control: string): void {
    // Define selection constant
    let alreadySelected = false;
    let selection = event.option.value;
    if (selectedValuesArray.length > 0) {
      // check if the selection is already in the selected array
      for (let item of selectedValuesArray) {
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

  // removeChip(chip: any, control: string): void {
  //   switch (control) {
  //     case 'state':
  //       // Find key of object in array
  //       const indexState = this.selectedStates.indexOf(chip);
  //       // If key exists
  //       if (indexState >= 0) {
  //         // Remove key from selectedStates array
  //         this.selectedStates.splice(indexState, 1);
  //         // Add key to states array
  //         this.states.push(chip);
  //       }
  //       break;
  //     case 'diagnosisType':
  //       // Find key of object in array
  //       const indexDiagnosisType = this.selectedDiagnosisTypes.indexOf(chip);
  //       // If key exists
  //       if (indexDiagnosisType >= 0) {
  //         // Remove key from selectedStates array
  //         this.selectedDiagnosisTypes.splice(indexDiagnosisType, 1);
  //       }
  //       break;
  //     case 'diagnosis':
  //       // Find key of object in array
  //       const indexDiagnosis = this.selectedDiagnoses.indexOf(chip);
  //       // If key exists
  //       if (indexDiagnosis >= 0) {
  //         // Remove key from selectedStates array
  //         this.selectedDiagnoses.splice(indexDiagnosis, 1);
  //       }
  //       break;
  //     default:
  //   }
  // }
}
