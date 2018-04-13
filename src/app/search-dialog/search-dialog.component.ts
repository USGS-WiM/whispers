import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatSnackBar } from '@angular/material';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';

import { APP_UTILITIES } from '@app/app.utilities';

import { State } from '@interfaces/state';
import { StateService } from '@services/state.service';
import { EventType } from '@interfaces/event-type';
import { EventTypeService } from '@services/event-type.service';
import { Diagnosis } from '@app/interfaces/diagnosis';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';
import { DiagnosisType } from '@app/interfaces/diagnosis-type';
import { DiagnosisService } from '@app/services/diagnosis.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  errorMessage = '';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  searchForm: FormGroup;
  // independent controls - values do not persist - used to select the value and add to a selection array
  eventTypeControl: FormControl;
  diagnosisTypeControl: FormControl;
  diagnosisControl: FormControl;
  stateControl: FormControl;

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

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      event_type: null,
      diagnosis: null,
      diagnosis_type: null,
      species: null,
      states: null,
      counties: null,
      flyway: null,
      affected: null,
      start_date: null,
      end_date: null,
      event_type_includes_all: false,
      diagnosis_type_includes_all: false,
      diagnosis_includes_all: false,
      species_includes_all: false,
      states_includes_all: false,
      openEventsOnly: false
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private _stateService: StateService,
    private _eventTypeService: EventTypeService,
    private _diagnosisTypeService: DiagnosisTypeService,
    private _diagnosisService: DiagnosisService,
    public snackBar: MatSnackBar) {

    this.eventTypeControl = new FormControl();
    this.diagnosisTypeControl = new FormControl();
    this.diagnosisControl = new FormControl();
    this.stateControl = new FormControl();

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

    // // TEMPORARY: states data coming from local file
    // this.states = this._stateService.getTestData();
    // // Set initial value of filteredStates to all states
    // this.filteredStates = this._stateService.getTestData();
    // // Subscribe to listen for changes to AutoComplete input and run filter
    // this.stateControl.valueChanges.subscribe(val => {
    //   if (val.length > 1) {
    //     this.filterOptions('states', this.filteredStates, val, this.states);
    //   }
    // });
    // TEMPORARY: states data coming from local file

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
    return diagnosis ? diagnosis.diagnosis : undefined;
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

  // filterOptions(model, filteredOptions, text: string, sourceArray) {
  //   console.log(sourceArray);
  //   // filter the options per user text input
  //   filteredOptions = sourceArray.filter(obj =>
  //     obj.name.toLowerCase().indexOf(text.toString().toLowerCase()) === 0
  //   );
  //   // now set this filteredOptions result back to the relevent filtered[X] array
  //   switch (model) {

  //     case 'states':
  //       this.filteredStates = filteredOptions;
  //       break;
  //     case 'diagnosis':
  //       this.filteredDiagnoses = filteredOptions;
  //       break;
  //     default:
  //   }
  // }

  resetFormControl(control) {
    switch (control) {
      case 'eventType': this.eventTypeControl.reset();
        break;
      case 'diagnosisType': this.diagnosisTypeControl.reset();
        break;
      case 'diagnosis': this.diagnosisControl.reset();
        break;
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

  removeChip(chip: any, control: string): void {
    switch (control) {
      case 'state':
        // Find key of object in array
        const indexState = this.selectedStates.indexOf(chip);
        // If key exists
        if (indexState >= 0) {
          // Remove key from selectedStates array
          this.selectedStates.splice(indexState, 1);
          // Add key to states array
          this.states.push(chip);
        }
        break;
      case 'diagnosisType':
        // Find key of object in array
        const indexDiagnosisType = this.selectedDiagnosisTypes.indexOf(chip);
        // If key exists
        if (indexDiagnosisType >= 0) {
          // Remove key from selectedStates array
          this.selectedDiagnosisTypes.splice(indexDiagnosisType, 1);
        }
        break;
      case 'diagnosis':
        // Find key of object in array
        const indexDiagnosis = this.selectedDiagnoses.indexOf(chip);
        // If key exists
        if (indexDiagnosis >= 0) {
          // Remove key from selectedStates array
          this.selectedDiagnoses.splice(indexDiagnosis, 1);
        }
        break;
      default:
    }
  }
}
