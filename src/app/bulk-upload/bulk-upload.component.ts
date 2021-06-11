import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';


import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Papa } from 'ngx-papaparse';

import { BulkUploadRecord } from '@interfaces/bulk-upload-record';
import { EventSubmission } from '@interfaces/event-submission';
import { EventDiagnosisSubmission } from '@interfaces/event-submission';
import { NewEventLocation } from '@interfaces/event-submission';
import { NewLocationSpecies } from '@interfaces/event-submission';
import { NewSpeciesDiagnosis } from '@interfaces/event-submission';

import { CountryService } from '@services/country.service';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';
import { EventService } from '@services/event.service';
import { ConfirmComponent } from '@confirm/confirm.component';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  rawData;
  parsedData;
  speciesDiagnosisArray;
  newEventsArray: EventSubmission[];

  countries;
  adminLevelOnes;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  eventCount;
  responseCount;

  bulkUploadProcessing = false;

  constructor(
    public bulkUploadDialogRef: MatDialogRef<BulkUploadComponent>,
    public snackBar: MatSnackBar,
    private countryService: CountryService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private eventService: EventService,
    private datePipe: DatePipe,
    private papa: Papa,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    // get countries from the countryService
    this.countryService.getCountries()
      .subscribe(
        countries => {
          this.countries = countries;
          this.countries.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (administrative_level_one) => {
          this.adminLevelOnes = administrative_level_one;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    const options = {
      complete: (results, file) => {
        console.log('CSV Data Parsed: ', results, file);
        this.parsedData = results;
        this.speciesDiagnosisArray = results.data;
        this.parseSpeciesDiagnosisArray(this.speciesDiagnosisArray);
      },
      error: (error, file) => {
        console.log('There was an error parsing your CSV file: ', error, file);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    };

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.rawData = e.target.result;
        this.papa.parse(this.rawData, options);
      };
      reader.readAsText(inputNode.files[0]);
    }
  }

  buildEventRecord(eventObj: EventSubmission) { return eventObj; }

  buildEventDiagnosisArray(diagnosisIDArray) {
    const array = [];
    const stringArray = JSON.parse('[' + diagnosisIDArray + ']');
    for (const item of stringArray) {
      if (item !== undefined && item !== null ) {array.push({ 'diagnosis': item })};
    }
    return array;
  }

  lookupCountryID(countryAbbreviation) {
    const result = this.countries.filter(function (country) {
      return country.abbreviation === countryAbbreviation;
    });
    return result[0].id;
  }

  lookupAdminLevelOneID(adminLevelOneAbbreviation) {
    const result = this.adminLevelOnes.filter(function (adminLevelOne) {
      return adminLevelOne.abbreviation === adminLevelOneAbbreviation;
    });
    return result[0].id;
  }

  buildDiagnosisLabArray(orgIDArray) {
    const array = JSON.parse('[' + orgIDArray + ']');
    return array;
  }

  addeventLocation(eventLocation: NewEventLocation) {
    return eventLocation;
  }

  addLocationSpecies(locationSpecies: NewLocationSpecies) { return locationSpecies; }

  addSpeciesDiagnosis(speciesDiagnosis: NewSpeciesDiagnosis) { return speciesDiagnosis; }

  addDiagnosisOrganizations(organizationsInput) {
    if (organizationsInput === null) {
      return [];
    } else {
      if (typeof organizationsInput === 'number') {
        return [organizationsInput];
      } else if (typeof organizationsInput === 'string') {
        const array = JSON.parse('[' + organizationsInput + ']');
        return array;
      }
    }
  }

  parseSpeciesDiagnosisArray(dataArray) {

    this.newEventsArray = [];

    // loop through the parsed data array to build event(s) submission that is properly nested
    // for (let i = 0; i < dataArray.length; i++) { }

    let currentEventOrdinal = 0;
    let currentLocationOrdinal = 1;
    let currentLocationSpeciesOrdinal = 1;

    let currentEventIndex;
    let currentLocationIndex;
    let currentLocationSpeciesIndex;

    for (const item of dataArray as Array<BulkUploadRecord>) {

      if (item.event_ordinal > currentEventOrdinal) {
        // since the item's event_ordinal is larger than the currentEventOrdinal,
        // event record does not exist.
        // create new event record with all the child data from the CSV line
        // Note: the new_species_diagnosis field population below includes a ternary operator to catch undefined and null values and insert a blank array to satisfy serializer on the server/
        let newEvent: EventSubmission;
        newEvent = this.buildEventRecord({
          event_reference: item.event_reference,
          event_type: item.event_type,
          public: item.public,
          complete: item.complete,
          new_event_diagnoses: this.buildEventDiagnosisArray(item.eventdiagnoses),
          new_event_locations: [
            {
              name: item.name,
              start_date: this.datePipe.transform(item.start_date, 'yyyy-MM-dd'),
              end_date: this.datePipe.transform(item.end_date, 'yyyy-MM-dd'),
              country: this.lookupCountryID(item.country),
              administrative_level_one: this.lookupAdminLevelOneID(item.administrative_level_one),
              administrative_level_two: item.administrative_level_two,
              latitude: item.latitude,
              longitude: item.longitude,
              land_ownership: item.land_ownership,
              history: 'This event location was added using the bulk upload process.',
              new_location_species: [
                {
                  species: item.species,
                  population_count: item.population_count,
                  sick_count: item.sick_count,
                  dead_count: item.dead_count,
                  sick_count_estimated: item.sick_count_estimated,
                  dead_count_estimated: item.dead_count_estimated,
                  captive: item.captive,
                  new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                    {
                      diagnosis: item.diagnosis,
                      cause: item.cause,
                      basis: item.basis,
                      suspect: item.suspect,
                      tested_count: item.tested_count,
                      diagnosis_count: item.diagnosis_count,
                      new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                    }
                  ]
                }
              ]
            }
          ]
        });
        // push the new event record to the newEventsArray
        this.newEventsArray.push(newEvent);
        // update the currentEventOrdinal to the event_ordinal of the item just processed
        currentEventOrdinal = item.event_ordinal;
      } else {
        // since the item's event_ordinal is not larger than the currentEventOrdinal
        // the event record already exists.
        // Next step:
        // check location ordinal
        if (item.location_ordinal > currentLocationOrdinal) {
          // since the item's location_ordinal is larger than currentLocationOrdinal,
          // eventlocation record does not exist.
          // create new eventLocation record with all the child data from the CSV line
          let newEventLocation: NewEventLocation;
          newEventLocation = this.addeventLocation({
            name: item.name,
            start_date: this.datePipe.transform(item.start_date, 'yyyy-MM-dd'),
            end_date: this.datePipe.transform(item.end_date, 'yyyy-MM-dd'),
            country: this.lookupCountryID(item.country),
            administrative_level_one: this.lookupAdminLevelOneID(item.administrative_level_one),
            administrative_level_two: item.administrative_level_two,
            latitude: item.latitude,
            longitude: item.longitude,
            land_ownership: item.land_ownership,
            history: 'This event location was added using the bulk upload process.',
            new_location_species: [
              {
                species: item.species,
                population_count: item.population_count,
                sick_count: item.sick_count,
                dead_count: item.dead_count,
                sick_count_estimated: item.sick_count_estimated,
                dead_count_estimated: item.dead_count_estimated,
                captive: item.captive,
                new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                  {
                    diagnosis: item.diagnosis,
                    cause: item.cause,
                    basis: item.basis,
                    suspect: item.suspect,
                    tested_count: item.tested_count,
                    diagnosis_count: item.diagnosis_count,
                    new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                  }
                ]
              }
            ]
          });
          // get the array index for the current event record
          currentEventIndex = currentEventOrdinal - 1;
          // add the new event location to the current event record
          this.newEventsArray[currentEventIndex].new_event_locations.push(newEventLocation);
          // update the currentLocationOrdinal to the location_ordinal of the item just processed
          currentLocationOrdinal = item.location_ordinal;
          // update the currentLocationSpeciesOrdinal back to 1(starting position) since this is a new eventLocation
          currentLocationSpeciesOrdinal = 1;
        } else {
          // since the item's location_ordinal is not larger than the currentLocationOrdinal
          // the eventLocation record already exists.
          // Next step:
          // check location species ordinal
          if (item.location_species_ordinal > currentLocationSpeciesOrdinal) {
            // since the item's location_species_ordinal is larger than currentLocationSpeciesOrdinal,
            // locationSpecies record does not exist.
            // create new locationSpecies record with all the child data from the CSV line
            let newLocationSpecies: NewLocationSpecies;
            newLocationSpecies = this.addLocationSpecies({
              species: item.species,
              population_count: item.population_count,
              sick_count: item.sick_count,
              dead_count: item.dead_count,
              sick_count_estimated: item.sick_count_estimated,
              dead_count_estimated: item.dead_count_estimated,
              captive: item.captive,
              new_species_diagnoses: item.diagnosis === undefined || item.diagnosis === null ? [] : [
                {
                  diagnosis: item.diagnosis,
                  cause: item.cause,
                  basis: item.basis,
                  suspect: item.suspect,
                  tested_count: item.tested_count,
                  diagnosis_count: item.diagnosis_count,
                  new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
                }
              ]
            });
            // get the array index for the current location species
            currentLocationIndex = currentLocationOrdinal - 1;
            // get the array index for the current event record
            currentEventIndex = currentEventOrdinal - 1;
            // add the new location species to the currnent eventLocation record
            this.newEventsArray[currentEventIndex].new_event_locations[currentLocationIndex].new_location_species.push(newLocationSpecies);
            // update the currentLocationSpeciesOrdinal to the location_species_ordinal of the item just processed
            currentLocationSpeciesOrdinal = item.location_species_ordinal;
          } else {
            // since the item's location_species_ordinal is not larger than the currentLocationSpeciesOrdinal
            // (and must be equal)
            // the locationSpecies already exists.
            // Next step:
            // add the speciesDiagnosis
            // the only reason for a location species to appear more than once is to include an addtional species diagnosis, so there should be no case
            // where there is an undefined or null diagnosis value at this part of the logic tree, negating need for the ternary operator used above.
            let newSpeciesDiagnosis: NewSpeciesDiagnosis;
            newSpeciesDiagnosis = this.addSpeciesDiagnosis(
              {
                diagnosis: item.diagnosis,
                cause: item.cause,
                basis: item.basis,
                suspect: item.suspect,
                tested_count: item.tested_count,
                diagnosis_count: item.diagnosis_count,
                new_species_diagnosis_organizations: this.addDiagnosisOrganizations(item.organizations)
              }
            );
            // get the array index for the current event record
            currentEventIndex = currentEventOrdinal - 1;
            // get the array index for the current location species
            currentLocationIndex = currentLocationOrdinal - 1;
            // get the array index for the current location species
            currentLocationSpeciesIndex = currentLocationSpeciesOrdinal - 1;
            // add the new event location to the current event record
            this.newEventsArray[currentEventIndex].new_event_locations[currentLocationIndex].new_location_species[currentLocationSpeciesIndex].new_species_diagnoses.push(newSpeciesDiagnosis);
            // update the currentLocationOrdinal to the location_ordinal of the item just processed
            // currentSpeciesDiagnosisOrdinal = item.species_diagnosis_ordinal;
          }
        }
      }
    } // end of parsing loop
    console.log(this.newEventsArray);
    // send this.newEventsArray to the submitData function that sends it to the server
    this.submitData(this.newEventsArray);
  }

  submitEvent(eventSubmission) {
    this.eventService.create(eventSubmission)
      .subscribe(
        (event) => {
          this.submitLoading = false;

          this.confirmDialogRef = this.dialog.open(ConfirmComponent,
            {
              disableClose: true,
              data: {
                title: 'Event Saved',
                titleIcon: 'check',
                message: 'The event with the event reference "' + event.event_reference + '" was successfully saved. The Event ID is ' + event.id,
                confirmButtonText: 'OK',
                showCancelButton: false
              }
            }
          );
          this.iterateEventCount();
          return { success: true, event: event, error: null };

        },
        error => {
          // this.submitLoading = false;
          // this.openSnackBar('Error. Event not Submitted. Error message: ' + error, 'OK', 8000);
          this.confirmDialogRef = this.dialog.open(ConfirmComponent,
            {
              disableClose: true,
              data: {
                title: 'Event Save Failed',
                titleIcon: 'warning',
                message: 'The event with the event reference "' + eventSubmission.event_reference + '" failed to save. The error is: ' + error,
                confirmButtonText: 'OK',
                showCancelButton: false
              }
            }
          );
          this.iterateEventCount();
          return { success: false, event: null, error: error };
        }
      );
  }


  submitData(newEventsArray) {
    this.bulkUploadProcessing = true;
    this.responseCount = 0;
    this.eventCount = newEventsArray.length;
    const responseArray = [];
    for (const eventSubmission of newEventsArray) {
      responseArray.push(this.submitEvent(eventSubmission));
    }
  }

  iterateEventCount() {
    this.responseCount++;
    if (this.responseCount === this.eventCount) {
      this.bulkUploadProcessing = false;
      this.bulkUploadDialogRef.close();
    }
  }

  downloadGuidance() {
  }

  downloadTemplate() {

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

}

// export interface Response {
//   success: boolean;
//   event: Object;
// }






