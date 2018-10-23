import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

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
import { SearchDialogService } from '@search-dialog/search-dialog.service';
import { id } from '@swimlane/ngx-datatable/release/utils';

import { DisplayQuery } from '@interfaces/display-query';
import { SearchQuery } from '@interfaces/search-query';

import { DisplayValuePipe } from '@pipes/display-value.pipe';
import { EventService } from '@app/services/event.service';

import { APP_SETTINGS } from '@app/app.settings';


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

  defaultSearchQuery = APP_SETTINGS.DEFAULT_SEARCH_QUERY;
  defaultDisplayQuery = APP_SETTINGS.DEFAULT_DISPLAY_QUERY;

  searchForm: FormGroup;
  // independent controls - values do not persist - used to select the value and add to a selection array
  eventTypeControl: FormControl;
  diagnosisTypeControl: FormControl;
  diagnosisControl: FormControl;
  adminLevelOneControl: FormControl;
  adminLevelTwoControl: FormControl;
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

  administrative_level_one = [];
  filteredAdminLevelOnes: Observable<any[]>;
  selectedAdminLevelOnes = []; // chips list

  administrative_level_two = [];
  filteredAdminLevelTwos: Observable<any[]>;
  selectedAdminLevelTwos = []; // chips list

  species = [];
  filteredSpecies: Observable<any[]>;
  selectedSpecies = []; // chips list

  adminLevelTwosLoading = false;


  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      event_type: null,
      diagnosis: null,
      diagnosis_type: null,
      species: null,
      administrative_level_one: null,
      administrative_level_two: null,
      affected_count: null,
      affected_count_operator: '__gte',
      start_date: null,
      end_date: null,
      diagnosis_type_includes_all: false,
      diagnosis_includes_all: false,
      species_includes_all: false,
      administrative_level_one_includes_all: false,
      administrative_level_two_includes_all: false,
      and_params: [],
      openEventsOnly: false
    });
  }

  constructor(
    public searchDialogRef: MatDialogRef<SearchDialogComponent>,
    private formBuilder: FormBuilder,
    private searchDialogService: SearchDialogService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private _eventTypeService: EventTypeService,
    private _diagnosisTypeService: DiagnosisTypeService,
    private _diagnosisService: DiagnosisService,
    private _speciesService: SpeciesService,
    private eventService: EventService,
    private displayValuePipe: DisplayValuePipe,
    private datePipe: DatePipe,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.eventTypeControl = new FormControl();
    this.diagnosisTypeControl = new FormControl();
    this.diagnosisControl = new FormControl();
    this.adminLevelOneControl = new FormControl();
    this.adminLevelTwoControl = new FormControl();
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

          if (this.data.query && this.data.query['event_type'].length > 0) {
            for (const index in eventTypes) {
              if (this.data.query['event_type'].some(function (el) { return el === eventTypes[index].name; })) {
                this.dropdownSetup(this.eventTypeControl, this.selectedEventTypes, eventTypes[index]);
              }
            }
          }
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
          // alphabetize the diagnosis type options list
          this.diagnosisTypes.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredDiagnosisTypes = this.diagnosisTypeControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.diagnosisTypes, 'name'));

          if (this.data.query && this.data.query['diagnosis_type'].length > 0) {
            for (const index in diagnosisTypes) {
              if (this.data.query['diagnosis_type'].some(function (el) { return el === diagnosisTypes[index].name; })) {
                this.dropdownSetup(this.diagnosisTypeControl, this.selectedDiagnosisTypes, diagnosisTypes[index]);
              }
            }
          }
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
          // alphabetize the diagnosis options list
          this.diagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredDiagnoses = this.diagnosisControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.diagnoses, 'name'));

          if (this.data.query && this.data.query['diagnosis'].length > 0) {
            for (const index in diagnoses) {
              if (this.data.query['diagnosis'].some(function (el) { return el === diagnoses[index].name; })) {
                this.dropdownSetup(this.diagnosisControl, this.selectedDiagnoses, diagnoses[index]);
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
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
              if (this.data.query['administrative_level_one'].some(function (el) { return el === adminLevelOnes[index].name; })) {
                this.dropdownSetup(this.adminLevelOneControl, this.selectedAdminLevelOnes, adminLevelOnes[index]);
                this.updateAdminLevelTwoOptions(adminLevelOnes[index].id);
              }
            }
          }

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
      
    // get adminLevelTwos from the adminLevelTwo service
    // TODO: remove this from ngOnInit. Not performant. Move to the updateAdminLevelTwoOptions function
    /* if (this.data.query && this.data.query['administrative_level_two'].length > 0) {
      this.adminLevelTwoService.getAdminLevelTwos()
        .subscribe(
          (adminLevelTwos) => {
            this.administrative_level_two = adminLevelTwos;
            this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges
              .startWith(null)
              .map(val => this.filter(val, this.administrative_level_two, 'name'));

          },
          error => {
            this.errorMessage = <any>error;
          }
        ); */

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

          if (this.data.query && this.data.query['species'].length > 0) {
            for (const index in species) {
              if (this.data.query['species'].some(function (el) { return el === species[index].name; })) {
                this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    const query: SearchQuery = this.data.query;

    if (query && query['affected_count']) {
      this.searchForm.controls['affected_count'].setValue(query['affected_count']);
    }

    if (query && query['affected_count_operator']) {
      this.searchForm.controls['affected_count_operator'].setValue(query['affected_count_operator']);
    }

    if (query && query['start_date']) {
      this.searchForm.controls['start_date'].setValue(query['start_date']);
    }

    if (query && query['end_date']) {
      this.searchForm.controls['end_date'].setValue(query['end_date']);
    }

    // Handling of and_params
    if (query && query['diagnosis_type_includes_all'] === true) {
      this.searchForm.controls['diagnosis_type_includes_all'].setValue(true);
    }
    if (query && query['diagnosis_includes_all'] === true) {
      this.searchForm.controls['diagnosis_includes_all'].setValue(true);
    }
    if (query && query['species_includes_all'] === true) {
      this.searchForm.controls['species_includes_all'].setValue(true);
    }
    if (query && query['administrative_level_one_includes_all'] === true) {
      this.searchForm.controls['administrative_level_one_includes_all'].setValue(true);
    }
    if (query && query['administrative_level_two_includes_all'] === true) {
      this.searchForm.controls['administrative_level_two_includes_all'].setValue(true);
    }

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

  displayFn(diagnosis?: Diagnosis): string | undefined {
    return diagnosis ? diagnosis.name : undefined;
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
      case 'adminLevelOne': this.adminLevelOneControl.reset();
        break;
      case 'adminLevelTwo': this.adminLevelTwoControl.reset();
    }
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

    if (control === 'adminLevelOne') {

      this.adminLevelTwosLoading = true;

      this.adminLevelTwoService.queryAdminLevelTwos(selection.id)
        .subscribe(
          adminLevelTwos => {
            // needed to use the 'self' proxy for 'this' because of a not fully understood scoping issue
            self.administrative_level_two = self.administrative_level_two.concat(adminLevelTwos);
            // alphabetize the admmin level twos list
            self.administrative_level_two.sort(function (a, b) {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            });
            this.adminLevelTwosLoading = false;
            this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges
              .startWith(null)
              .map(val => this.filter(val, self.administrative_level_two, 'name'));
          },
          error => {
            this.errorMessage = <any>error;
            this.adminLevelTwosLoading = false;
          }
        );

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

  extractIDs(objectArray) {
    const idArray = [];
    for (const object of objectArray) {
      idArray.push(object.id);
    }
    return idArray;
  }

  updateAdminLevelTwoOptions(selectedAdminLevelOneID) {
    const id = Number(selectedAdminLevelOneID);

    // query the adminleveltwos endpoint for appropriate records
    // update the options for the adminLevelTwo select with the response

    this.adminLevelTwoService.queryAdminLevelTwos(id)
      .subscribe(
        (adminLevelTwos) => {
          //this.administrative_level_two.push(adminLevelTwos);
          this.administrative_level_two = this.administrative_level_two.concat(adminLevelTwos);
          this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges
            .startWith(null)
            .map(val => this.filter(val, this.administrative_level_two, 'name'));

          if (this.data.query && this.data.query['administrative_level_two'].length > 0) {
            for (const index in adminLevelTwos) {
              if (this.data.query['administrative_level_two'].some(function (el) { return el === adminLevelTwos[index]['name'] })) {
                this.dropdownSetup(this.adminLevelTwoControl, this.selectedAdminLevelTwos, adminLevelTwos[index]);
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  clearSelection() {

    this.selectedEventTypes = [];
    this.selectedDiagnosisTypes = [];
    this.selectedDiagnoses = [];
    this.selectedSpecies = [];
    this.selectedAdminLevelOnes = [];
    this.selectedAdminLevelTwos = [];

    // use defaault displayQuery for display in markup, send to searchDialogService
    this.searchDialogService.setDisplayQuery(this.defaultDisplayQuery);
    // use default search query, send to searchDialogService
    this.searchDialogService.setSearchQuery(this.defaultSearchQuery);

  }

  submitSearch(formValue) {

    const searchQuery: SearchQuery = {
      event_type: [],
      diagnosis: [],
      diagnosis_type: [],
      species: [],
      administrative_level_one: [],
      administrative_level_two: [],
      affected_count: formValue.affected_count,
      affected_count_operator: formValue.affected_count_operator,
      start_date: this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd'),
      end_date: this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd'),
      diagnosis_type_includes_all: formValue.diagnosis_type_includes_all,
      diagnosis_includes_all: formValue.diagnosis_includes_all,
      species_includes_all: formValue.species_includes_all,
      administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
      administrative_level_two_includes_all: formValue.administrative_level_two_includes_all,
      and_params: [],
      openEventsOnly: formValue.openEventsOnly
    };

    const displayQuery: DisplayQuery = {
      event_type: [],
      diagnosis: [],
      diagnosis_type: [],
      species: [],
      administrative_level_one: [],
      administrative_level_two: [],
      affected_count: formValue.affected_count,
      affected_count_operator: formValue.affected_count_operator,
      start_date: formValue.start_date,
      // start_date: this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd'),
      end_date: formValue.end_date,
      //end_date: this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd'),
      diagnosis_type_includes_all: formValue.diagnosis_type_includes_all,
      diagnosis_includes_all: formValue.diagnosis_includes_all,
      species_includes_all: formValue.species_includes_all,
      administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
      administrative_level_two_includes_all: formValue.administrative_level_two_includes_all,
      and_params: [],
      openEventsOnly: formValue.openEventsOnly
    };

    if (searchQuery.diagnosis_type_includes_all === true) {
      searchQuery.and_params.push('diagnosis_type');
    }
    if (searchQuery.diagnosis_includes_all === true) {
      searchQuery.and_params.push('diagnosis_type');
    }
    if (searchQuery.species_includes_all === true) {
      searchQuery.and_params.push('species');
    }
    if (searchQuery.administrative_level_one_includes_all === true) {
      searchQuery.and_params.push('administrative_level_one');
    }
    if (searchQuery.administrative_level_two_includes_all === true) {
      searchQuery.and_params.push('administrative_level_two');
    }

    // update the formValue array with full selection objects
    formValue.event_type = this.selectedEventTypes;
    formValue.diagnosis = this.selectedDiagnoses;
    formValue.diagnosis_type = this.selectedDiagnosisTypes;
    formValue.species = this.selectedSpecies;
    formValue.administrative_level_one = this.selectedAdminLevelOnes;
    formValue.administrative_level_two = this.selectedAdminLevelTwos;

    // use formValue to populate the Current Search panel
    for (const event_type of formValue.event_type) {
      displayQuery.event_type.push(event_type.name);
    }
    for (const diagnosis of formValue.diagnosis) {
      displayQuery.diagnosis.push(diagnosis.name);
    }
    for (const diagnosis_type of formValue.diagnosis_type) {
      displayQuery.diagnosis_type.push(diagnosis_type.name);
    }
    for (const species of formValue.species) {
      displayQuery.species.push(species.name);
    }
    for (const adminLevelOne of formValue.administrative_level_one) {
      displayQuery.administrative_level_one.push(adminLevelOne.name);
    }
    for (const adminLevelTwo of formValue.administrative_level_two) {
      displayQuery.administrative_level_two.push(adminLevelTwo.name);
    }

    // patch the searchForm value with the IDs of the selected objects
    // this.searchForm.patchValue({
    //   event_type: this.extractIDs(this.selectedEventTypes),
    //   diagnosis: this.extractIDs(this.selectedDiagnoses),
    //   diagnosis_type: this.extractIDs(this.selectedDiagnosisTypes),
    //   species: this.extractIDs(this.selectedSpecies),
    //   administrative_level_one: this.extractIDs(this.selectedAdminLevelOnes),
    //   administrative_level_two: this.extractIDs(this.selectedAdminLevelTwos)
    // });

    searchQuery.event_type = this.extractIDs(this.selectedEventTypes);
    searchQuery.diagnosis = this.extractIDs(this.selectedDiagnoses);
    searchQuery.diagnosis_type = this.extractIDs(this.selectedDiagnosisTypes);
    searchQuery.species = this.extractIDs(this.selectedSpecies);
    searchQuery.administrative_level_one = this.extractIDs(this.selectedAdminLevelOnes);
    searchQuery.administrative_level_two = this.extractIDs(this.selectedAdminLevelTwos);

    // TODO: query the eventService with the searchForm value, on success,
    // pass results to home component for display via searchDialogService
    // this.eventService.queryEvents(searchQuery)
    //   .subscribe(
    //     (queryResults) => {
    //       console.log(queryResults);

    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );

    // use displayQuery for display of current query in markup, send to searchDialogService
    this.searchDialogService.setDisplayQuery(displayQuery);
    // use searchForm.value to build the web service query, send to searchDialogService
    this.searchDialogService.setSearchQuery(searchQuery);

  }

}
