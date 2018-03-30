import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MatAutocompleteTrigger } from '@angular/material';

import { APP_UTILITIES } from '@app/app.utilities';

import { State } from '@interfaces/state';
import { StateService } from '@services/state.service';
import { EventType } from '@interfaces/event-type';
import { EventTypeService } from '@services/event-type.service';

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
  diagnosisControl: FormControl;
  stateControl: FormControl;

  eventTypes: EventType[];

  states = [];

  filteredStates = [];
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
      diagnosis_includes_all: false,
      species_includes_all: false,
      states_includes_all: false,
      openEventsOnly: false
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private _stateService: StateService,
    private _eventTypeService: EventTypeService) {

    this.stateControl = new FormControl();
    this.diagnosisControl = new FormControl();

    this.buildSearchForm();

  }

  ngOnInit() {
    // get event types from the eventType service
    this._eventTypeService.getEventTypes()
      .subscribe(eventTypes => this.eventTypes = eventTypes,
        error => this.errorMessage = <any>error);

    this.states = this._stateService.getTestData();
    // Set initial value of filteredStates to all states
    this.filteredStates = this._stateService.getTestData();

    // Subscribe to listen for changes to AutoComplete input and run filter
    this.stateControl.valueChanges.subscribe(val => {
      // this.filterOptions(val, 'stateControl');
      if (val.length > 1) {
        this.filterOptions('states', this.filteredStates, val, this.states);
      }
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

  addChip(event: MatAutocompleteSelectedEvent, input: any, control: string): void {
    // Define selection constant
    const selection = event.option.value;

    switch (control) {
      case 'state':
        // Add chip for selected option
        this.selectedStates.push(selection);
        // Remove selected option from available options and set filteredOptions
        this.filteredStates = this.states.filter(obj => obj.id !== selection.id);
        // filteredStates becomes all states except the one just selected
        break;
      case 'diagnosis':
        break;
      default:
    }

    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
    }
    // sets the value back to blank, which triggers the filterOptions function,
    // which sets filteredOptions back to an empty array (fix this)
  }

  removeChip(chip: any, control: string): void {
    switch (control) {
      case 'state':
        // Find key of object in array
        const index = this.selectedStates.indexOf(chip);
        // If key exists
        if (index >= 0) {
          // Remove key from selectedStates array
          this.selectedStates.splice(index, 1);
          // Add key to states array
          this.states.push(chip);
        }
        break;
      case 'diagnosis':
        break;
      default:
    }

  }
}
