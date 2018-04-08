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
  @ViewChild('diagnosisChipInput', { read: MatAutocompleteTrigger })
  private autoCompleteTrigger: MatAutocompleteTrigger;
  errorMessage = '';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  searchForm: FormGroup;
  diagnosisControl: FormControl;
  diagnosisControlTest: FormControl;
  stateControl: FormControl;

  eventTypes: EventType[];
  diagnoses: Diagnosis[];
  diagnosisTypes: DiagnosisType[];
  states = [];

  filteredStates = [];
  selectedStates = []; // chips list

  filteredDiagnoses: Observable<any[]>;
  selectedDiagnoses = []; // chips list
  //diagnosesRetrieved = false;

  // event type: multi-select
  // diagnosis: auto-complete + chiplist
  // diagnosis type: multi-select
  // species: auto-complete + chiplist
  // state: auto-complete + chiplist
  // county: auto-complete + chiplist
  // flyway: multi-select
  // affected = number

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

    this.stateControl = new FormControl();
    this.diagnosisControl = new FormControl();
    this.diagnosisControlTest = new FormControl();

    this.buildSearchForm();
  }

  ngOnInit() {
    // get event types from the eventType service
    this._eventTypeService.getEventTypes()
      .subscribe(eventTypes => this.eventTypes = eventTypes,
        error => this.errorMessage = <any>error);

    // get diagnosis types from the diagnosisType service
    this._diagnosisTypeService.getDiagnosisTypes()
      .subscribe(diagnosisTypes => this.diagnosisTypes = diagnosisTypes,
        error => this.errorMessage = <any>error);

    // get diagnoses from the diagnoses service
    this._diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          // listen for changes on diagnosis control
          // this.filteredDiagnoses = this.diagnosisControlTest.valueChanges
          //   .pipe(
          //     startWith<string | any>(''),
          //     map(value => typeof value === 'string' ? value : value.diagnosis),
          //     map(diagnosis => diagnosis ? this.filterDiagnoses(diagnosis) : this.diagnoses.slice())
          //   );
          this.filteredDiagnoses = this.diagnosisControlTest.valueChanges
            .startWith(null)
            .map(val => this.filter(val));

          // console.log(this.filteredDiagnoses);
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
    //   // this.filterOptions(val, 'stateControl');
    //   if (val.length > 1) {
    //     this.filterOptions('states', this.filteredStates, val, this.states);
    //   }
    // });
    // TEMPORARY: states data coming from local file

    // Subscribe to listen for changes to AutoComplete input and run filter
    // this.diagnosisControl.valueChanges.subscribe(val => {
    //   if (val.length > 2) {
    //     this.filterOptions('diagnosis', this.filteredDiagnoses, val, this.diagnoses);
    //   }
    // });


  }

  filter(val: any): string[] {
    const realval = val && typeof val === 'object' ? val.diagosis : val;
    const result = [];
    let lastOption = null;
    for (let i = 0; i < this.diagnoses.length; i++) {
      if (!realval || this.diagnoses[i].diagnosis.toLowerCase().startsWith(realval.toLowerCase())) {
        if (this.diagnoses[i].diagnosis !== lastOption) {
          lastOption = this.diagnoses[i].diagnosis;
          result.push(this.diagnoses[i]);
        }
      }
    }
    return result;
  }

  filterDiagnoses(text: string): any[] {
    return this.diagnoses.filter(diagnosis =>
      diagnosis.diagnosis.toLowerCase().indexOf(text.toLowerCase()) === 0);
  }

  displayFn(diagnosis?: Diagnosis): string | undefined {
    return diagnosis ? diagnosis.diagnosis : undefined;
  }

  // inputFocus() {
  //   setTimeout(() => {
  //     if (!this.autoCompleteTrigger.panelOpen) {
  //       this.autoCompleteTrigger.openPanel();
  //     }
  //   }, 10);
  // }

  submitSearch() {
    console.log(this.diagnosisControlTest.value)
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



  filterOptions(model, filteredOptions, text: string, sourceArray) {
    console.log(sourceArray);
    // filter the options per user text input
    filteredOptions = sourceArray.filter(obj =>
      obj.name.toLowerCase().indexOf(text.toString().toLowerCase()) === 0
    );
    // now set this filteredOptions result back to the relevent filtered[X] array
    switch (model) {
      case 'states':
        this.filteredStates = filteredOptions;
        break;
      case 'diagnosis':
        this.filteredDiagnoses = filteredOptions;
        break;
      default:
    }
  }

  // filterOptions(text: string, control: string) {
  //   // Set filteredStates array to filtered options
  //   this.filteredStates = this.states.filter(obj =>
  //     obj.name.toLowerCase().indexOf(text.toString().toLowerCase()) === 0
  //   );
  // }

  addChip(event: MatAutocompleteSelectedEvent, control: string): void {
    // Define selection constant
    let alreadySelected = false;
    let selection = event.option.value;
    switch (control) {
      case 'state':
        // Add chip for selected option
        this.selectedStates.push(selection);
        // Remove selected option from available options and set filteredOptions
        this.filteredStates = this.states.filter(obj => obj.id !== selection.id);
        // filteredStates becomes all states except the one just selected
        break;
      case 'diagnosis':
        if (this.selectedDiagnoses.length > 0) {
          // check if the selection is already in the selected array
          for (let diagnosis of this.selectedDiagnoses) {
            if (diagnosis.id === selection.id) {
              alreadySelected = true;
              this.openSnackBar('Already Selected', 'OK');
            }
          }
          if (alreadySelected === false) {
            // Add selected item to selected array, which will show as a chip
            this.selectedDiagnoses.push(selection);
            // reset the form
            this.diagnosisControlTest.reset();
          }

        } else {
          // Add selected item to selected array, which will show as a chip
          this.selectedDiagnoses.push(selection);
          // reset the form
          this.diagnosisControlTest.reset();
        }


        break;
      default:
    }

    // Reset the autocomplete input text value
    // if (input) {
    //   input.value = '';
    // }
    // sets the value back to blank, which triggers the filterOptions function,
    // which sets filteredOptions back to an empty array (fix this)
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
