import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable ,  Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MatSelect } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { Species } from '@interfaces/species';
import { SpeciesService } from '@services/species.service';

import { AgeBias } from '@interfaces/age-bias';
import { SexBias } from '@interfaces/sex-bias';

import { LocationSpeciesService } from '@services/location-species.service';
import { AgeBiasService } from '@app/services/age-bias.service';
import { SexBiasService } from '@app/services/sex-bias.service';

import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { DataUpdatedService } from '@app/services/data-updated.service';
declare let gtag: Function;

@Component({
  selector: 'app-edit-location-species',
  templateUrl: './edit-location-species.component.html',
  styleUrls: ['./edit-location-species.component.scss']
})
export class EditLocationSpeciesComponent implements OnInit {
  @ViewChild('speciesSelect') speciesSelect: MatSelect;
  locationSpeciesForm: FormGroup;

  species: Species[];
  // filteredSpecies: Observable<any[]>;

  eventID;
  eventlocation;
  locationspeciesString;
  administrative_level_one;
  administrative_level_two;

  submitLoading = false;

  action_text;
  action_button_text;

  errorMessage;

  ageBiases: AgeBias[];
  sexBiases: SexBias[];

  public filteredSpecies: ReplaySubject<Species[]> = new ReplaySubject<Species[]>(1);

  locationSpeciesNumbersViolation = false;

  speciesFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  buildLocationSpeciesForm() {
    this.locationSpeciesForm = this.formBuilder.group({
      id: null,
      event_location: null,
      species: null,
      population_count: [null, Validators.min(0)],
      sick_count: [null, Validators.min(0)],
      dead_count: [null, Validators.min(0)],
      sick_count_estimated: [null, Validators.min(0)],
      dead_count_estimated: [null, Validators.min(0)],
      captive: false,
      age_bias: null,
      sex_bias: null
    },
      {
        validator: [this.integer, this.estimatedSick, this.estimatedDead]
      }
    );
  }

  integer(AC: AbstractControl) {

    const population_count = AC.get('population_count').value;
    const sick_count = AC.get('sick_count').value;
    const dead_count = AC.get('dead_count').value;
    const sick_count_estimated = AC.get('sick_count_estimated').value;
    const dead_count_estimated = AC.get('dead_count_estimated').value;
    if (!Number.isInteger(population_count) && population_count !== null) {
      AC.get('population_count').setErrors({ integer: true });
    }
    if (!Number.isInteger(sick_count) && sick_count !== null) {
      AC.get('sick_count').setErrors({ integer: true });
    }
    if (!Number.isInteger(dead_count) && dead_count !== null) {
      AC.get('dead_count').setErrors({ integer: true });
    }
    if (!Number.isInteger(sick_count_estimated) && sick_count_estimated !== null) {
      AC.get('sick_count_estimated').setErrors({ integer: true });
    }
    if (!Number.isInteger(dead_count_estimated) && dead_count_estimated !== null) {
      AC.get('dead_count_estimated').setErrors({ integer: true });
    }
    return null;
  }

  constructor(
    private formBuilder: FormBuilder,
    public editLocationSpeciesDialogRef: MatDialogRef<EditLocationSpeciesComponent>,
    private locationSpeciesService: LocationSpeciesService,
    private ageBiasService: AgeBiasService,
    private sexBiasService: SexBiasService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    private speciesService: SpeciesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildLocationSpeciesForm();
  }

  ngOnInit() {

    this.ageBiasService.getAgeBiases()
      .subscribe(
        ageBiases => {
          this.ageBiases = ageBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.sexBiasService.getSexBiases()
      .subscribe(
        sexBiases => {
          this.sexBiases = sexBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // populate the search select options for the species control
    this.filteredSpecies.next(this.data.species);

    this.ageBiases = this.data.ageBiases;
    this.sexBiases = this.data.sexBiases;

    // listen for search field value changes
    this.speciesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSpecies();
      });

    if (this.data.eventlocation) {
      this.eventlocation = this.data.eventlocation;
      this.eventID = this.data.eventlocation.event;
      this.administrative_level_one = this.data.eventlocation.administrative_level_one_string;
      this.administrative_level_two = this.data.eventlocation.administrative_level_two_string;
    }

    if (this.data.location_species_action === 'add') {
      this.action_text = 'Add';
      this.action_button_text = 'Submit';
      this.locationSpeciesForm.get('dead_count_estimated').markAsTouched();
      this.locationSpeciesForm.get('sick_count_estimated').markAsTouched();

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

      if (this.data.locationspecies.age_bias !== null) {
        this.locationSpeciesForm.get('age_bias').setValue(this.data.locationspecies.age_bias.toString());
      }
      if (this.data.locationspecies.sex_bias !== null) {
        this.locationSpeciesForm.get('sex_bias').setValue(this.data.locationspecies.sex_bias.toString());
      }

      this.locationSpeciesForm.get('dead_count_estimated').markAsTouched();
      this.locationSpeciesForm.get('sick_count_estimated').markAsTouched();

      // this.locationSpeciesForm.get('species').disable();

      this.checkLocationSpeciesNumbers();
    }
  }

  private filterSpecies() {
    if (!this.data.species) {
      return;
    }
    // get the search keyword
    let search = this.speciesFilterCtrl.value;
    if (!search) {
      this.filteredSpecies.next(this.data.species.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredSpecies.next(
      this.data.species.filter(species => species.name.toLowerCase().indexOf(search) > -1)
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  estimatedSick(AC: AbstractControl) {
    AC.get('sick_count_estimated').setErrors(null);
    const sick_count = AC.get('sick_count').value;
    const sick_count_estimated = AC.get('sick_count_estimated').value;

    if (sick_count !== null && sick_count_estimated !== null) {
      if (sick_count_estimated <= sick_count) {
        AC.get('sick_count_estimated').setErrors({ estimatedSick: true });
      }
    }
  }

  estimatedDead(AC: AbstractControl) {
    AC.get('dead_count_estimated').setErrors(null);
    const dead_count = AC.get('dead_count').value;
    const dead_count_estimated = AC.get('dead_count_estimated').value;

    if (dead_count !== null && dead_count_estimated !== null) {
      if (dead_count_estimated <= dead_count) {
        AC.get('dead_count_estimated').setErrors({ estimatedDead: true });
      }
    }
  }


  checkLocationSpeciesNumbers() {
    this.locationSpeciesNumbersViolation = false;

    // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
    if (this.data.eventData.event_type === 1 || this.data.eventData.event_type === '1') {
      // set var to capture of requirement is met at any of the event locations
      let requirementMet = false;
      // add in the current form values to the if statement

      for (const eventlocation of this.data.eventData.eventlocations) {

        let locationspecies = [];
        // if in edit mode, filter out locationspecies that is currently being edited.
        // if in add mode, use the full locationspecies array.
        if (this.data.location_species_action === 'edit') {
          // tslint:disable-next-line:max-line-length
          // filter out the locationspecies that is currently being edited
          locationspecies = eventlocation.locationspecies.filter(locspecies => locspecies.id !== this.locationSpeciesForm.get('id').value);
        } else if (this.data.location_species_action === 'add') {
          locationspecies = eventlocation.locationspecies;
        }
        // check if the array has anything in it before looping
        if (locationspecies.length > 0) {
          for (const locspecies of locationspecies) {
            if (
              (
                locspecies.sick_count +
                locspecies.dead_count +
                locspecies.sick_count_estimated +
                locspecies.dead_count_estimated +
                this.locationSpeciesForm.get('sick_count').value +
                this.locationSpeciesForm.get('dead_count').value +
                this.locationSpeciesForm.get('sick_count_estimated').value +
                this.locationSpeciesForm.get('dead_count_estimated').value
              ) >= 1
            ) {
              requirementMet = true;
            }
          }
        } else {
          // if locationspecies array is empty, only use the form value to validate
          if (
            (this.locationSpeciesForm.get('sick_count').value +
              this.locationSpeciesForm.get('dead_count').value +
              this.locationSpeciesForm.get('sick_count_estimated').value +
              this.locationSpeciesForm.get('dead_count_estimated').value
            ) >= 1
          ) {
            requirementMet = true;
          }
        }
      }

      if (requirementMet) {
        this.locationSpeciesNumbersViolation = false;
      } else {
        this.locationSpeciesNumbersViolation = true;
      }
    }
  }

  // Tooltip text
  editLocationNameTooltip() { const string = FIELD_HELP_TEXT.editLocationNameTooltip; return string; }
  editStandardizedLocationNameTooltip() { const string = FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; }
  flywayTooltip() { const string = FIELD_HELP_TEXT.flywayTooltip; return string; }
  editLandOwnershipTooltip() { const string = FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; }
  longitudeTooltip() { const string = FIELD_HELP_TEXT.longitudeTooltip; return string; }
  latitudeTooltip() { const string = FIELD_HELP_TEXT.latitudeTooltip; return string; }
  editEventTypeTooltip() { const string = FIELD_HELP_TEXT.editEventTypeTooltip; return string; }
  editSpeciesTooltip() { const string = FIELD_HELP_TEXT.editSpeciesTooltip; return string; }
  speciesTooltip() { const string = FIELD_HELP_TEXT.speciesTooltip; return string; }
  editKnownDeadTooltip() { const string = FIELD_HELP_TEXT.editKnownDeadTooltip; return string; }
  editEstimatedDeadTooltip() { const string = FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; }
  editKnownSickTooltip() { const string = FIELD_HELP_TEXT.editKnownSickTooltip; return string; }
  editEstimatedSickTooltip() { const string = FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; }
  populationTooltip() { const string = FIELD_HELP_TEXT.populationTooltip; return string; }
  editAgeBiasTooltip() { const string = FIELD_HELP_TEXT.editAgeBiasTooltip; return string; }
  editSexBiasTooltip() { const string = FIELD_HELP_TEXT.editSexBiasTooltip; return string; }
  editCaptiveTooltip() { const string = FIELD_HELP_TEXT.editCaptiveTooltip; return string; }
  editSpeciesDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; }
  locationNameTooltip() { const string = FIELD_HELP_TEXT.locationNameTooltip; return string; }
  numberAffectedTooltip() { const string = FIELD_HELP_TEXT.numberAffectedTooltip; return string; }
  editRecordStatusTooltip() { const string = FIELD_HELP_TEXT.editRecordStatusTooltip; return string; }
  collaboratorsAddIndividualTooltip() { const string = FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; }
  collaboratorsAddCircleTooltip() { const string = FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; }

  onSubmit(formValue) {

    this.submitLoading = true;

    if (this.data.location_species_action === 'add') {

      formValue.event_location = this.data.eventlocation.id;

      this.locationSpeciesService.create(formValue)
        .subscribe(
          (event) => {
            this.submitLoading = false;
            this.openSnackBar('Species successfully added to this location', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.editLocationSpeciesDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Location Species Details', 'event_label': 'Species Added to Location, location: ' + event.event_location });
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
            this.dataUpdatedService.triggerRefresh();
            this.editLocationSpeciesDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Location Species Details', 'event_label': 'Species Location Edited, location: ' + event.event_location });
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species not updated. Error message: ' + error, 'OK', 8000);
          }
        );
    }
  }

  filter(val: any, searchArray: any, searchProperties: string[]): string[] {
    const result = [];
    for (const searchProperty of searchProperties) {
      if (isNaN(val)) {
        const realval = val && typeof val === 'object' ? val[searchProperty] : val;
        let lastOption = null;
        if (searchArray !== undefined) {
          for (let i = 0; i < searchArray.length; i++) {
            if (searchArray[i][searchProperty] != null && (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase()))) {
              if (searchArray[i][searchProperty] !== lastOption) {
                lastOption = searchArray[i][searchProperty];
                result.push(searchArray[i]);
              }
            }
          }
        }
      }
    }
    // this will return all records matching the val string
    return result;
  }

  displayFn(speciesId?: Species): string | undefined {
    let species_id_match;
    for (let i = 0; i < this['options']._results.length - 1; i++) {
      if (this['options']._results[i].value === speciesId) {
        species_id_match = this['options']._results[i].viewValue;
      }
    }
    return species_id_match;
  }
}
