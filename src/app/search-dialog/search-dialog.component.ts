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

  searchForm: FormGroup;

  states: State[];
  filteredStates: Observable<any[]>;

  stateControl: FormControl;

  selectedStates = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

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

    this.filteredStates = this.stateControl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );

  }

  ngOnInit() {
    this.states = this._stateService.getTestData();

    // onValuechange no good - captures every single value change - need to listen for selection
    // this.searchForm.controls['states'].valueChanges.subscribe(
    //   (selectedValue) => {
    //     console.log('A state has been selected. Selection is: ', selectedValue);
    //     console.log(this.searchForm.get('states').value);
    //   }
    // );

    // this.searchForm.controls['states'].optionSelected

  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  stateSelected(event: MatAutocompleteSelectedEvent) {
    console.log('A state has been selected. Selection is: ', event.option.value);
    //// on selection: add that value to chiplist and to actual searchForm value, then clear current selection

    this.selectedStates.push(event.option.value);

  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.selectedStates.push(selection);
    // Remove selected option from available options and set filteredOptions
    // NOTE: revisit these next 2 lines
    // this.options = this.options.filter(obj => obj.name !== selection.name);
    // this.filteredOptions = this.options;
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
      // Add key to options array
      // this.options.push(chip);
    }
  }





}
