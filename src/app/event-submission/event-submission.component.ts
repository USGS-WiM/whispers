import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { State } from '@interfaces/state';
import { StateService } from '@services/state.service';

import { EventType } from '@interfaces/event-type';
import { EventTypeService } from '@app/services/event-type.service';

import { LegalStatus } from '@interfaces/legal-status';
import { LegalStatusService } from '@app/services/legal-status.service';

import { Diagnosis } from '@interfaces/diagnosis';
import { DiagnosisService } from '@services/diagnosis.service';

import { DiagnosisType } from '@interfaces/diagnosis-type';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';

import { County } from '@interfaces/county';
import { CountyService } from '@services/county.service';

import { Species } from '@interfaces/species';
import { SpeciesService } from '@services/species.service';

import { Country } from '@interfaces/country';
import { CountryService } from '@app/services/country.service';


@Component({
  selector: 'app-event-submission',
  templateUrl: './event-submission.component.html',
  styleUrls: ['./event-submission.component.scss']
})
export class EventSubmissionComponent implements OnInit {
  eventTypes: EventType[];
  legalStatuses: LegalStatus[];
  countries: Country[];

  errorMessage;

  eventSubmissionForm: FormGroup;

  buildEventSubmissionForm() {
    this.eventSubmissionForm = this.formBuilder.group({
      event_reference: '',
      event_type: null,
      legal_status: null,
      legal_number: '',
      event_locations: this.formBuilder.array([
        this.initEventLocation()
      ])
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private eventTypeService: EventTypeService,
    private legalStatusService: LegalStatusService,
    private countryService: CountryService
  ) {
    this.buildEventSubmissionForm();
  }

  ngOnInit() {

    // get event types from the EventTypeService
    this.eventTypeService.getEventTypes()
      .subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // get legal statues from the LegalStatusService
    this.legalStatusService.getLegalStatuses()
      .subscribe(
        legalStatuses => {
          this.legalStatuses = legalStatuses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get countries from the countryService
    this.countryService.getCountries()
      .subscribe(
        countries => {
          this.countries = countries;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  initEventLocation() {
    return this.formBuilder.group({
      start_date: null,
      end_date: null,
      country: null,
      administrative_level_one: null,
      administrative_level_two: null,
      latitude: null,
      longitude: null,
      land_ownership: null,
      gnis_name: '',
      location_species: this.formBuilder.array([
        this.initLocationSpecies()
      ])
    });
  }

  initLocationSpecies() {
    return this.formBuilder.group({
      species: null,
      population: null,
      sick: null,
      dead: null,
      estimated_sick: null,
      estimated_dead: null,
      priority: null,
      captive: null,
      age_bias: null,
      sex_bias: null
    });
  }

  addEventLocation() {
    const control = <FormArray>this.eventSubmissionForm.get('event_locations');
    control.push(this.initEventLocation());
  }

  getEventLocations(form) {
    return form.controls.event_locations.controls;
  }

}
