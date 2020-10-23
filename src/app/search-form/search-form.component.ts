import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';
import { Diagnosis } from '@app/interfaces/diagnosis';
import { DiagnosisType } from '@app/interfaces/diagnosis-type';
import { DisplayQuery } from '@app/interfaces/display-query';
import { EventType } from '@app/interfaces/event-type';
import { SearchQuery } from '@app/interfaces/search-query';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
import { EventTypeService } from '@app/services/event-type.service';
import { SpeciesService } from '@app/services/species.service';
import { forkJoin, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SearchFormService } from './search-form.service';
declare let gtag: Function;

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  errorMessage = '';
  // visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @Input('query') query: DisplayQuery;
  @Input() narrow: boolean = false;
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
  diagnosesLoading = false;
  speciesLoading = true;

  eventTypePanelOpenState = false;
  diagnosisTypePanelOpenState = false;
  diagnosisPanelOpenState = false;
  speciesPanelOpenState = false;
  adminLevelOnePanelOpenState = false;
  adminLevelTwoPanelOpenState = false;
  initialValues: any;

  endDateBeforeStart(AC: AbstractControl) {
    AC.get('end_date').setErrors(null);
    AC.get('start_date').setErrors(null);
    const start_date = AC.get('start_date').value;
    const end_date = AC.get('end_date').value;
    if ((start_date !== null && end_date !== null) && start_date > end_date) {
      AC.get('end_date').setErrors({ endDateBeforeStart: true });
    }
    return null;
  }

  noCriteriaSelected(AC: AbstractControl) {

    if (
      this.selectedEventTypes.length === 0 &&
      this.selectedDiagnoses.length === 0 &&
      this.selectedDiagnosisTypes.length === 0 &&
      this.selectedSpecies.length === 0 &&
      this.selectedAdminLevelOnes.length === 0 &&
      this.selectedAdminLevelTwos.length === 0 &&
      this.searchForm &&
      !this.searchForm.get("affected_count").value &&
      !this.searchForm.get("start_date").value &&
      !this.searchForm.get("end_date").value &&
      this.searchForm.get("complete").value === null
    ) {
      return { noCriteriaSelected: true };
    } else {
      return null;
    }
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group(
      {
        event_type: null,
        diagnosis: null,
        diagnosis_type: null,
        species: null,
        administrative_level_one: null,
        administrative_level_two: null,
        affected_count: null,
        affected_count_operator: "__gte",
        start_date: null,
        end_date: null,
        diagnosis_type_includes_all: false,
        diagnosis_includes_all: false,
        species_includes_all: false,
        administrative_level_one_includes_all: false,
        administrative_level_two_includes_all: false,
        and_params: [],
        complete: null,
      },
      {
        validator: [
          this.endDateBeforeStart,
          (ac) => this.noCriteriaSelected(ac),
        ],
      }
    );
    this.initialValues = this.searchForm.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private searchFormService: SearchFormService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private _eventTypeService: EventTypeService,
    private _diagnosisTypeService: DiagnosisTypeService,
    private diagnosisService: DiagnosisService,
    private _speciesService: SpeciesService,
    private datePipe: DatePipe,
    public snackBar: MatSnackBar,
  ) {

    this.eventTypeControl = new FormControl();
    this.diagnosisTypeControl = new FormControl();
    this.diagnosisControl = new FormControl();
    this.adminLevelOneControl = new FormControl();
    this.adminLevelTwoControl = new FormControl();
    this.speciesControl = new FormControl({ value: null, disabled: true });

    this.buildSearchForm();
  }

  ngOnInit() {


    // get event types from the eventType service
    const eventTypes$ = this._eventTypeService.getEventTypes();
    eventTypes$.subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
          this.filteredEventTypes = this.eventTypeControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.eventTypes, 'name')));
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosis types from the diagnosisType service
    const diagnosisTypes$ = this._diagnosisTypeService.getDiagnosisTypes();
    diagnosisTypes$.subscribe(
        (diagnosisTypes) => {
          this.diagnosisTypes = diagnosisTypes;
          // alphabetize the diagnosis type options list
          this.diagnosisTypes.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredDiagnosisTypes = this.diagnosisTypeControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.diagnosisTypes, 'name')));

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnoses from the diagnoses service
    const diagnoses$ = this.diagnosisService.getDiagnoses();
    diagnoses$.subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          // alphabetize the diagnosis options list
          this.diagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.filteredDiagnoses = this.diagnosisControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.diagnoses, 'name')));

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get adminLevelOnes from the adminLevelOne service
    const adminLevelOnes$ = this.adminLevelOneService.getAdminLevelOnes();
    adminLevelOnes$.subscribe(
        (adminLevelOnes) => {
          this.administrative_level_one = adminLevelOnes;
          this.filteredAdminLevelOnes = this.adminLevelOneControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.administrative_level_one, 'name')));

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
    const species$ = this._speciesService.getSpecies();
    species$.subscribe(
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

          this.speciesLoading = false;
          this.speciesControl.enable();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    forkJoin([eventTypes$, diagnosisTypes$, diagnoses$, adminLevelOnes$, species$]).subscribe(
      () => {
          this.setCurrentSearch(this.query);
          this.searchFormService.getDisplayQuery().subscribe(query => {
            this.setCurrentSearch(query);
          })
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  setCurrentSearch(query:DisplayQuery) {
    this.clearSelection();
    this.setCurrentEventTypes(query);
    this.setCurrentDiagnosisTypes(query);
    this.setCurrentDiagnoses(query);
    this.setCurrentAdminLevelOne(query);
    this.setCurrentSpecies(query);
    this.setNonLookupFormControls(query);
  }

  setCurrentEventTypes(query:DisplayQuery) {

    if (query && query['event_type'] && query['event_type'].length > 0) {
      for (const index in this.eventTypes) {
        if (query['event_type'].some(el => el === this.eventTypes[index].name)) {
          this.dropdownSetup(this.eventTypeControl, this.selectedEventTypes, this.eventTypes[index]);
        }
      }
    }
  }

  setCurrentDiagnosisTypes(query:DisplayQuery) {

    if (query && query['diagnosis_type'] && query['diagnosis_type'].length > 0) {
      /*for (const index in diagnosisTypes) {
        if (this.data.query['diagnosis_type'].some(function (el) { return el === diagnosisTypes[index].name; })) {
          this.dropdownSetup(this.diagnosisTypeControl, this.selectedDiagnosisTypes, diagnosisTypes[index]);
        }
      }*/
      for (const index in this.diagnosisTypes) {
        if (query['diagnosis_type'].some(
          el => {
            console.log(el);
            let match = false;
            if (typeof el == 'number') {
              if (el === this.diagnosisTypes[index].id) {
                match = true;
              }
            } else {
              if (el === this.diagnosisTypes[index].name) {
                match = true;
              }
            }
            return match;
          })) {
          this.dropdownSetup(this.diagnosisTypeControl, this.selectedDiagnosisTypes, this.diagnosisTypes[index]);
        }
      }
    }
  }

  setCurrentDiagnoses(query:DisplayQuery) {

    if (query && query['diagnosis'] && query['diagnosis'].length > 0) {
      for (const index in this.diagnoses) {
        if (query['diagnosis'].some(
          el => {
            // console.log(el);
            let match = false;
            if (typeof el === 'number') {
              if (el === this.diagnoses[index].id) {
                match = true;
              }
            } else {
              if (el === this.diagnoses[index].name) {
                match = true;
              }
            }
            return match;
          })) {
          this.dropdownSetup(this.diagnosisControl, this.selectedDiagnoses, this.diagnoses[index]);
        }
      }
    }
  }

  setCurrentAdminLevelOne(query:DisplayQuery) {

    if (query && query['administrative_level_one'].length > 0) {
      for (const index in this.administrative_level_one) {
        if (query['administrative_level_one'].some(
          el => {
            console.log('variable el: ' + el);
            let match = false;
            if (typeof el === 'number') {
              if (el === this.administrative_level_one[index].id) {
                match = true;
              }
            } else {
              if (el === this.administrative_level_one[index].name) {
                match = true;
              }
            }
            return match;
          })) {
          this.dropdownSetup(this.adminLevelOneControl, this.selectedAdminLevelOnes, this.administrative_level_one[index]);
          this.updateAdminLevelTwoOptions(this.administrative_level_one[index].id);
        }
      }
    }
  }

  setCurrentSpecies(query:DisplayQuery) {

    if (query && query['species'] && query['species'].length > 0) {
      /*for (const index in species) {
        if (this.data.query['species'].some(function (el) { return el === species[index].name; })) {
          this.dropdownSetup(this.speciesControl, this.selectedSpecies, species[index]);
        }
      }*/
      for (const index in this.species) {
        if (query['species'].some(
          el => {
            let match = false;
            if (typeof el == 'number') {
              if (el === this.species[index].id) {
                match = true;
              }
            } else {
              if (el === this.species[index].name) {
                match = true;
              }
            }
            return match;
          })) {
          this.dropdownSetup(this.speciesControl, this.selectedSpecies, this.species[index]);
        }
      }
    }
  }

  setNonLookupFormControls(query:DisplayQuery) {

    if (query && query['affected_count']) {
      this.searchForm.controls['affected_count'].setValue(query['affected_count']);
    }

    if (query && query['affected_count_operator']) {
      this.searchForm.controls['affected_count_operator'].setValue(query['affected_count_operator']);
    }

    if (query && query['start_date']) {
      const startDate = APP_UTILITIES.timeZoneAdjust(query['start_date']);
      this.searchForm.controls['start_date'].setValue(startDate);
    }

    if (query && query['end_date']) {
      const endDate = APP_UTILITIES.timeZoneAdjust(query['end_date']);
      this.searchForm.controls['end_date'].setValue(endDate);
    }

    //always set value, even if null, because null is valid value
    if (query['complete'] === undefined) {
      this.searchForm.controls['complete'].setValue(null);
    } else {
      this.searchForm.controls['complete'].setValue(query['complete']);
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
      case 'species': this.speciesControl.reset();
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


    ///////////////

    if (control === 'diagnosisType') {

      this.diagnosesLoading = true;

      const diagnosisTypeIDArray = [];
      for (const diagnosisType of selectedValuesArray) {
        diagnosisTypeIDArray.push(diagnosisType.id);
      }
      const diagnosisTypeQueryString = 'diagnosis_type=' + diagnosisTypeIDArray.toString();

      this.diagnosisService.queryDiagnoses(diagnosisTypeQueryString)
        .subscribe(
          diagnoses => {

            // needed to use the 'self' proxy for 'this' because of a not fully understood scoping issue
            self.diagnoses = diagnoses;
            // alphabetize the admmin level twos list
            self.diagnoses.sort(function (a, b) {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            });

            this.diagnosesLoading = false;
            this.filteredDiagnoses = this.diagnosisControl.valueChanges.pipe(
              startWith(null),
              map(val => this.filter(val, this.diagnoses, 'name')));
          },
          error => {
            this.errorMessage = <any>error;
            this.diagnosesLoading = false;
          }
        );

    }

    //////////////

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
            this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges.pipe(
              startWith(null),
              map(val => this.filter(val, self.administrative_level_two, 'name')));
          },
          error => {
            this.errorMessage = <any>error;
            this.adminLevelTwosLoading = false;
          }
        );

    }

    // Form validity must consider the 'selectedValuesArray' so manually trigger revalidation
    this.searchForm.updateValueAndValidity();
  }

  removeChip(chip: any, selectedValuesArray: any): void {
    // Find key of object in selectedValuesArray
    const index = selectedValuesArray.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from selectedValuesArray array
      selectedValuesArray.splice(index, 1);
    }

    // Form validity must consider the 'selectedValuesArray' so manually trigger revalidation
    this.searchForm.updateValueAndValidity();
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
          // this.administrative_level_two.push(adminLevelTwos);
          this.administrative_level_two = this.administrative_level_two.concat(adminLevelTwos);
          this.filteredAdminLevelTwos = this.adminLevelTwoControl.valueChanges.pipe(
            startWith(null),
            map(val => this.filter(val, this.administrative_level_two, 'name')));

          if (this.query && this.query['administrative_level_two'].length > 0) {
            for (const index in adminLevelTwos) {
              if (this.query['administrative_level_two'].some(function (el) { return el === adminLevelTwos[index]['name'] })) {
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

    // use default displayQuery for display in markup, send to searchDialogService
    //this.searchDialogService.setDisplayQuery(this.defaultDisplayQuery);
    // use default search query, send to searchDialogService
    //this.searchDialogService.setSearchQuery(this.defaultSearchQuery);

    this.clearDates();
    this.searchForm.reset(this.initialValues);
    this.searchForm.markAsTouched();
  }

  clearDates() {
    this.searchForm.get('start_date').setValue(null);
    this.searchForm.get('end_date').setValue(null);
  }

  resetToDefault() {

    this.searchFormService.setDisplayQuery(this.defaultDisplayQuery);
    this.searchFormService.setSearchQuery(this.defaultSearchQuery);
    this.clearSelection();

    // Assumes only start_date and end_date defined in defaultDisplayQuery
    if (this.defaultDisplayQuery['start_date']) {
      const startDate = APP_UTILITIES.timeZoneAdjust(this.defaultDisplayQuery['start_date']);
      this.searchForm.controls['start_date'].setValue(startDate);
    }

    if (this.defaultDisplayQuery['end_date']) {
      const endDate = APP_UTILITIES.timeZoneAdjust(this.defaultDisplayQuery['end_date']);
      this.searchForm.controls['end_date'].setValue(endDate);
    }
  }

  clearSearchForm() {
    // Note: we won't submit the search since the user needs to pick some
    // criteria before submitting the search
    this.clearSelection();
  }

  get invalid() {
    return this.searchForm.invalid;
  }

  get touched() {
    return this.searchForm.touched;
  }

  get errors() {
    return this.searchForm.errors;
  }

  submitSearch() {

    const formValue = this.searchForm.value;
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
      complete: formValue.complete
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
      // start_date: formValue.start_date,
      // end_date: formValue.end_date,
      start_date: this.datePipe.transform(formValue.start_date, 'yyyy-MM-dd'),
      end_date: this.datePipe.transform(formValue.end_date, 'yyyy-MM-dd'),
      diagnosis_type_includes_all: formValue.diagnosis_type_includes_all,
      diagnosis_includes_all: formValue.diagnosis_includes_all,
      species_includes_all: formValue.species_includes_all,
      administrative_level_one_includes_all: formValue.administrative_level_one_includes_all,
      administrative_level_two_includes_all: formValue.administrative_level_two_includes_all,
      and_params: [],
      complete: formValue.complete
    };

    if (searchQuery.diagnosis_type_includes_all === true) {
      searchQuery.and_params.push('diagnosis_type');
    }
    if (searchQuery.diagnosis_includes_all === true) {
      searchQuery.and_params.push('diagnosis');
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

    ///////
    // insert display query convert function here (?)
    // const displayQuery = APP_UTILITIES.convertSearchQuerytoDisplayQuery(formValue);

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

    // use displayQuery for display of current query in markup, send to searchFormService
    this.searchFormService.setDisplayQuery(displayQuery);
    // use searchForm.value to build the web service query, send to searchFormService
    this.searchFormService.setSearchQuery(searchQuery);

    gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'Search submitted, date range: ' + searchQuery.start_date + ' - ' + searchQuery.end_date });


  }
}
