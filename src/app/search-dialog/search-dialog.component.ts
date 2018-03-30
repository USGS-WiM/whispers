import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { MatAutocompleteSelectedEvent } from '@angular/material';

import { APP_UTILITIES } from '@app/app.utilities';

import { State } from '@interfaces/state';
import { StateService } from '@app/services/state.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  searchForm: FormGroup;
  stateControl: FormControl;

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
    private _stateService: StateService) {

    this.stateControl = new FormControl();

    this.buildSearchForm();

  }

  ngOnInit() {
    this.states = this._stateService.getTestData();
    // Set initial value of filteredStates to all states
    this.filteredStates = this._stateService.getTestData();

    // Subscribe to listen for changes to AutoComplete input and run filter
    this.stateControl.valueChanges.subscribe(val => {
      this.filterOptions(val);
    });
  }

  filterOptions(text: string) {
    // Set filteredStates array to filtered options
    this.filteredStates = this.states.filter(obj =>
      obj.name.toLowerCase().indexOf(text.toString().toLowerCase()) === 0);
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.selectedStates.push(selection);
    // Remove selected option from available options and set filteredOptions
    this.filteredStates = this.states.filter(obj => obj.id !== selection.id);

    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
    }
  }

  removeChip(chip: any): void {
    // Find key of object in array
    const index = this.selectedStates.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from selectedStates array
      this.selectedStates.splice(index, 1);
      // Add key to states array
      this.states.push(chip);
    }
  }

}
