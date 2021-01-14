import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { timer } from 'rxjs';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatDialog, MatDialogRef, MatChipRemove } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import html2canvas from 'html2canvas';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { CountryService } from '@app/services/country.service';
import { OrganizationService } from '@app/services/organization.service';
import { DataUpdatedService } from '@app/services/data-updated.service';

import { EventDetail } from '@interfaces/event-detail';
import { forEach } from '@angular/router/src/utils/collection';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
import { EventSummary } from '@app/interfaces/event-summary';
import { getAnimalTypes } from '@app/interfaces/species';
declare let gtag: Function;

@Component({
  selector: 'app-search-results-summary-report',
  templateUrl: './search-results-summary-report.component.html',
  styleUrls: ['./search-results-summary-report.component.scss']
})

export class SearchResultsSummaryReportComponent implements OnInit {

  // creating variables for field definitions
  eventTypeDefinition = '';
  eventIdDefinition = '';
  contactOrgDefinition = '';
  recordStatusDefinition = '';
  numberOfLocationsDefinition = '';
  countyDefinition = '';
  eventDiagDefinition = '';
  labDefinition = '';
  numAnimalsAffectedDefinition = '';
  numSpeciesAffectedDefinition = '';
  speciesMostAffectedDefinition = '';
  startEndDatesDefinition = '';
  associatedEventsDefinition = '';
  eventVisibilityDefinition = '';
  stateDefinition = '';
  countryDefinition = '';
  startDateDefinition = '';
  endDateDefinition = '';
  speciesDefinition = '';
  populationDefinition = '';
  knownSickDefinition = '';
  knownDeadDefinition = '';
  estSickDefinition = '';
  estDeadDefinition = '';
  captiveDefinition = '';
  speciesDiagDefinition = '';
  numAssessedDefinition = '';
  numWithDiagDefinition = '';
  diagLabDefinition = '';
  commentTypeDefinition = '';
  commentSourceDefinition = '';
  numOfEvents = '';
  mostFrequentEvtDiag = '';
  avgEventTimeSpan = '';
  eventWithMostAffected = '';
  longestRunningEvent = '';
  // END creating variables for field definitions

  errorMessage: string;

  canvas = document.createElement('canvas');
  loadingData = false;
  loadingReport = false;

  adminLevelOnes = [];
  adminLevelTwos = [];
  diagnosisTypes = [];
  eventDiagnoses = [];
  countries = [];
  orgs = [];
  value = 0;
  pngURL;

  resultsMap;
  resultsMapUrl;
  clicked = false;
  icon;
  locationMarkers;
  donePrinting = false;
  readyToGenerate = false;
  orgsLoaded = false;

  constructor(
    public resultsSummaryReportDialogRef: MatDialogRef<SearchResultsSummaryReportComponent>,
    private countryService: CountryService,
    private organizationService: OrganizationService,
    private dataUpdatedService: DataUpdatedService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

    this.loadProgressBar();

    // converting whipsers logo png to a dataURL for use in pdfMake
    const whispersLogo = './assets/logo-transparent.png';
    const context = this.canvas.getContext('2d');
    const base_image = new Image();
    this.canvas.width = 796;
    this.canvas.height = 90;
    base_image.src = whispersLogo;
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, 796, 90);
    };
    this.pngURL = this.canvas.toDataURL();

    // Code for map with results to produce map image for report
    let Attr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      // tslint:disable-next-line:max-line-length
      Url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const streets = L.tileLayer(Url, { id: 'mapbox.streets', attribution: Attr });

    this.resultsMap = new L.Map('resultsMap', {
      center: new L.LatLng(39.8283, -98.5795),
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      layers: [streets]
    });

    this.locationMarkers = L.featureGroup().addTo(this.resultsMap);
    L.control.scale({ position: 'bottomright' }).addTo(this.resultsMap);
    this.mapResults(this.data.current_results);

    this.resultsMap.dragging.disable();
    this.resultsMap.touchZoom.disable();
    this.resultsMap.doubleClickZoom.disable();
    this.resultsMap.scrollWheelZoom.disable();
    // End code for map with results to produce map image for report

    this.adminLevelOnes = this.data.adminLevelOnes;
    this.adminLevelTwos = this.data.adminLevelTwos;
    this.diagnosisTypes = this.data.diagnosisTypes;
    this.eventDiagnoses = this.data.diagnoses;

    // Setting variables for field definitions
    this.eventTypeDefinition = FIELD_HELP_TEXT.editEventTypeTooltip;
    this.eventIdDefinition = FIELD_HELP_TEXT.eventIDTooltip;
    this.contactOrgDefinition = FIELD_HELP_TEXT.editContactOrganizationTooltip;
    this.recordStatusDefinition = FIELD_HELP_TEXT.editRecordStatusTooltip;
    this.numberOfLocationsDefinition = FIELD_HELP_TEXT.numberOfLocationsDefinition;
    this.countyDefinition = FIELD_HELP_TEXT.editCountyTooltip;
    this.eventDiagDefinition = FIELD_HELP_TEXT.editEventDiagnosisTooltip;
    this.labDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.numAnimalsAffectedDefinition = FIELD_HELP_TEXT.numAnimalsAffected;
    this.numSpeciesAffectedDefinition = FIELD_HELP_TEXT.numberOfSpeciesDefinition;
    this.speciesMostAffectedDefinition = FIELD_HELP_TEXT.speciesMostAffectedDefinition;
    this.startEndDatesDefinition = FIELD_HELP_TEXT.startEndDatesDefinition;
    this.associatedEventsDefinition = FIELD_HELP_TEXT.associatedEventDefinition;
    this.eventVisibilityDefinition = FIELD_HELP_TEXT.eventVisibility;
    this.stateDefinition = FIELD_HELP_TEXT.stateTooltip;
    this.countryDefinition = FIELD_HELP_TEXT.countryTooltip;
    this.startDateDefinition = FIELD_HELP_TEXT.locationStartDateTooltip;
    this.endDateDefinition = FIELD_HELP_TEXT.locationEndDateTooltip;
    this.speciesDefinition = FIELD_HELP_TEXT.editSpeciesTooltip;
    this.populationDefinition = FIELD_HELP_TEXT.populationTooltip;
    this.knownSickDefinition = FIELD_HELP_TEXT.editKnownSickTooltip;
    this.knownDeadDefinition = FIELD_HELP_TEXT.editKnownDeadTooltip;
    this.estSickDefinition = FIELD_HELP_TEXT.editEstimatedSickTooltip;
    this.estDeadDefinition = FIELD_HELP_TEXT.editEstimatedDeadTooltip;
    this.captiveDefinition = FIELD_HELP_TEXT.editCaptiveTooltip;
    this.speciesDiagDefinition = FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip;
    this.numAssessedDefinition = FIELD_HELP_TEXT.numberAssessedTooltip;
    this.numWithDiagDefinition = FIELD_HELP_TEXT.numberWithDiagnosisTooltip;
    this.diagLabDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.commentTypeDefinition = FIELD_HELP_TEXT.locationCommentTypeTooltip;
    this.commentSourceDefinition = FIELD_HELP_TEXT.commentSourceDefinition;
    this.numOfEvents = FIELD_HELP_TEXT.numOfEvents;
    this.mostFrequentEvtDiag = FIELD_HELP_TEXT.mostFrequentEvtDiag;
    this.avgEventTimeSpan = FIELD_HELP_TEXT.avgEventTimeSpan;
    this.eventWithMostAffected = FIELD_HELP_TEXT.eventWithMostAffected;
    this.longestRunningEvent = FIELD_HELP_TEXT.longestRunningEvent;
    // END Setting variables for field definitions

    this.countryService.getCountries()
      .subscribe(
        (countries) => {
          this.countries = countries;

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.organizationService.getOrganizations()
      .subscribe(
        (organizations) => {
          this.orgs = organizations;
          this.orgsLoaded = true;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  searchInArray(array, field: string, value) {
    for (const item of array) {
      if (item[field] === value) {
        // console.log('Duplicate detected. Already existing ID: ' + value);
        return true;
      }
    }
  }

  mapResults(currentResults: any) {

    // set/reset currentResultsMarker var to an empty array
    const markers = [];
    // tslint:disable-next-line:forin
    // loop through currentResults repsonse from a search query
    for (const event in currentResults) {

      // if event has any administrativeleveltwos (counties), add them to the markers array
      if (currentResults[event]['administrativeleveltwos'].length > 0) {

        // tslint:disable-next-line:forin
        for (const adminleveltwo in currentResults[event]['administrativeleveltwos']) {

          // check if the administrativeleveltwo (county) of the event has already been placed into the markers array.
          // If it has, push its events array into the existing marker for that administrativeleveltwo. This is to ensure one
          // marker per administrativeleveltwo, with events nested
          // tslint:disable-next-line:max-line-length
          if (this.searchInArray(markers, 'adminleveltwo', currentResults[event]['administrativeleveltwos'][adminleveltwo]['id'])) {
            for (const marker of markers) {
              if (marker.adminleveltwo === currentResults[event]['administrativeleveltwos'][adminleveltwo]['id']) {
                marker.events.push(currentResults[event]);
              }
            }
          } else {

            markers.push({
              lat: Number(currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']),
              long: Number(currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude']),
              eventdiagnoses: currentResults[event]['eventdiagnoses'],
              adminleveltwo: currentResults[event]['administrativeleveltwos'][adminleveltwo]['id'],
              events: [currentResults[event]],
              complete: currentResults[event]['complete']
            });

          }

        }
      }
    }

    // loop through markers
    for (const marker of markers) {

      // set vars for classes that will define the marker icons, per WIM markermaker CSS
      let colorClass;
      let shapeClass = 'wmm-circle ';
      let iconClasses = ' wmm-icon-circle wmm-icon-white ';
      let sizeClass = 'wmm-size-25';
      let animalTypes = this.getUniqueAnimalTypes(marker.events);
      if (animalTypes.length > 1) {
        // grey for multiple animal types
        colorClass = 'wmm-mutedblue';
      } else {
        switch (animalTypes[0]) {
          case "Mammal":
            colorClass = 'wmm-red';
            break;
          case "Bird":
            colorClass = 'wmm-yellow';
            break;
          case "Reptile/Amphibian":
            colorClass = 'wmm-green';
            break;
          case "Fish":
            colorClass = 'wmm-sky';
            break;
          case "Other":
            colorClass = 'wmm-purple';
            break;
        }
      }


      if (marker.events.length === 1) {
        // if event is complete, remove the white center to indicate closed/complete
        if (marker['complete'] === true) {
          iconClasses = ' wmm-icon-noicon wmm-icon-white ';
        }

      } else if (marker.events.length > 1) {
        // set a variable for alllEventsComplete, default to true
        let allEventsComplete = true;
        // loop through the events within the marker and check their 'complete' value
        for (const event of marker.events) {
          // if any of the events are not complete, set allEventsComplete to false
          if (event.complete === false) {
            allEventsComplete = false;
          }
        }
        // if all the events are complete, remove the white center to indicate closed/complete
        if (allEventsComplete) {
          iconClasses = ' wmm-icon-noicon wmm-icon-white ';
        }
      }


      // eventCount var keeps track of number of events at the location. Do not show if less than 2.
      let eventCount;
      if (marker.events.length > 1) {
        // for location with multiple events, show event count on symbol, make larger and gray
        eventCount = marker.events.length;
        // iconClasses = ' wmm-icon-circle wmm-icon-white ';
        sizeClass = 'wmm-size-35';

      } else {
        // eventCount set to empty string if just one event at location
        eventCount = '';
        // set icon shape to a diamond if event_type = 2 (surveillance)
        if (marker.events[0].event_type === 2) {
          shapeClass = 'wmm-diamond ';
          iconClasses = ' wmm-icon-diamond wmm-icon-white ';
          sizeClass = 'wmm-size-20';
        }
      }
      // set icon to the proper combination of classnames set above (from WIM markermaker and some custom css)
      this.icon = L.divIcon({
        className: shapeClass + colorClass + iconClasses + sizeClass,
        html: eventCount
      });

      // establish leaflet marker var, passing in icon var from above
      L.marker([marker.lat, marker.long],
        { icon: this.icon })
        .addTo(this.locationMarkers);
    }

    if (this.locationMarkers.getBounds().isValid() === true) {
      this.resultsMap.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50], maxZoom: 10 });
    }

  }

  /**
   * Return unique animal types for class names of the species identified in
   * the given events. Animal types are a more user-friendly general
   * classification of related species that will be displayed in the map and is
   * meant to be used for color-coded categorization of events.
   * @param events
   */
  getUniqueAnimalTypes(events:EventSummary[]) {
    const animalTypes = [];
    for (const event of events) {
      Array.prototype.push.apply(animalTypes, getAnimalTypes(event.species));
    }
    // Return just unique values
    return Array.from(new Set(animalTypes));
  }

  // START defining event location table
  makeResultsSummaryTable(data) {

    let table;

    const locationHeaders = {
      eventLocationHeaders: {
        col_1: { text: 'Event ID', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Start Date-End Date', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'County (or equivalent)', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Event Diagnosis', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_5: { text: '# of Animals Affected', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_6: { text: 'Species', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_7: { text: 'Record Status', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_8: { text: 'Contact Organization', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_9: { text: 'Event Visibility', border: [false, false, false, false], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] }
      }
    };
    // [{image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}]
    const locationBody = [];

    // pushing header row into the table
    for (const key in locationHeaders) {
      if (locationHeaders.hasOwnProperty(key)) {
        const header = locationHeaders[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        row.push(header.col_7);
        row.push(header.col_8);
        row.push(header.col_9);
        locationBody.push(row);
      }
    }

    // pushing data into the rows
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const elData = data[key];
        const row = new Array();
        row.push({ text: elData.id, link: window.location.origin + '/event/' + elData.id, color: 'blue', fontSize: 10, alignment: 'center' });
        row.push({ text: elData.start_date + ' to ' + ((elData.end_date == null) ? 'open' : elData.end_date), alignment: 'left', fontSize: 10 });
        const adminLevelTwoCell = new Array();
        const semiColonCounty = elData.administrativeleveltwos.length - 1;
        for (let i = 0; i < elData.administrativeleveltwos.length; i++) {
          let countryAbbrev;
          for (const countryKey in this.countries) {
            if (this.countries[countryKey].id === elData.administrativeleveltwos[i].country) {
              countryAbbrev = this.countries[countryKey].abbreviation;
            }
          }
          if (i !== semiColonCounty) {
            adminLevelTwoCell.push({
              text: elData.administrativeleveltwos[i].name + ', ' + this.getAdminLevelOneAbbrev(elData, elData.administrativeleveltwos[i].administrative_level_one) + ', ' + countryAbbrev + ';\n',
              alignment: 'left', fontSize: 10
            });
          } else {
            adminLevelTwoCell.push({
              text: elData.administrativeleveltwos[i].name + ', ' + this.getAdminLevelOneAbbrev(elData, elData.administrativeleveltwos[i].administrative_level_one) + ', ' + countryAbbrev + '\n',
              alignment: 'left', fontSize: 10
            });
          }
        }
        row.push(adminLevelTwoCell);
        const eventDiagnosesCell = new Array();
        if (elData.eventdiagnoses) {
          const semiColon = elData.eventdiagnoses.length - 1;
          for (let i = 0; i < elData.eventdiagnoses.length; i++) {
            if (i !== semiColon) {
              eventDiagnosesCell.push({ text: elData.eventdiagnoses[i].diagnosis_string + '; ', alignment: 'left', fontSize: 10 });
            } else {
              eventDiagnosesCell.push({ text: elData.eventdiagnoses[i].diagnosis_string, alignment: 'left', fontSize: 10 });
            }
          }
        } else {
          eventDiagnosesCell.push('');
        }
        row.push({ text: eventDiagnosesCell, fontSize: 10 });
        row.push({ text: elData.affected_count, fontSize: 10, alignment: 'center' });
        const speciesCell = new Array();
        for (let key in elData.species) {
          if (Number(key) === elData.species.length - 1) {
            speciesCell.push(elData.species[key].name);
          } else {
            speciesCell.push(elData.species[key].name + ',\n');
          }
        }
        row.push({ text: speciesCell, alignment: 'left', fontSize: 10 });
        let recordStatus;
        if (elData.complete) {
          recordStatus = 'Complete';
        } else {
          recordStatus = 'Incomplete';
        }
        row.push({ text: recordStatus, alignment: 'left', fontSize: 10 });
        const organizationCell = new Array();
        if (elData.organizations !== null && elData.organizations !== undefined) {

          const semiColon = elData.organizations.length - 1;
          for (let i = 0; i < elData.organizations.length; i++) {
            if (i !== semiColon) {
              organizationCell.push({ text: elData.organizations[i].name + ';\n', alignment: 'left', fontSize: 10 });
            } else {
              organizationCell.push({ text: elData.organizations[i].name, alignment: 'left', fontSize: 10 });
            }
          }

        } else {
          organizationCell.push('');
        }
        row.push({ text: organizationCell, fontSize: 10 });

        if (elData.public) {
          row.push({ text: 'Visible to the public', alignment: 'left', fontSize: 10 });
        } else {
          row.push({ text: 'NOT VISIBLE TO THE PUBLIC', bold: true, alignment: 'left', fontSize: 10 });
        }
        locationBody.push(row);
      }
    }

    // table object to be placed in doc definition
    table = {
      alignment: 'justify',
      margin: [0, 10, 0, 0],
      table: {
        widths: [35, '*', '*', 120, 60, '*', '*', '*', '*'],
        headerRows: 1,
        dontBreakRows: true,
        body: locationBody,
      },
      layout: {
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'lightgray' : 'lightgray';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'lightgray' : 'lightgray';
        },
      },
      pageBreak: 'after'
    };

    if (data.length === 0) {
      return;
    } else {
      return table;
    }
  }
  // END defining event location table

  getAdminLevelOneAbbrev(data, state) {
    let abbrev;

    for (const key in data.administrativelevelones) {
      if (data.administrativelevelones[key].id === state) {
        abbrev = data.administrativelevelones[key].abbreviation;
      }
    }

    return abbrev;
  }

  getBanner(data) {
    let image;
    image = [{
      image: this.pngURL,
      width: 450,
      height: 65,
    },
    {
      style: 'header',
      alignment: 'right',
      text: 'Details of Search Results',
      margin: [0, -45, 0, 40],
      paddingBottom: 100
    }];


    if (data.length !== 0) {
      return image;
    } else {
      return; // return nothing if there is no data
    }
  }

  getText(data) {
    let text;
    let eventtype;
    if (data.length !== 0) {
      eventtype = data[0].event_type; // data passed are of the same event type. Establish eventtype in this function so that we display the correct title text for the table
      if (eventtype === 1) {
        text = {
          text: 'Mortality/Morbidity Events',
          alignment: 'center',
          style: 'bigger',
          margin: [30, 0, 10, 20]
        };
      } else if (eventtype === 2) {
        text = {
          text: 'Surveillance Events',
          alignment: 'center',
          style: 'bigger',
          margin: [30, 0, 10, 20]
        };
      }

      return text;
    } else {
      return; // return nothing if there is no data
    }
  }

  loadProgressBar() {
    const source = timer(5, 5); // this is exactly how it's done in the event report but for some reason it's choppy and very slow here
    const subscribe = source.subscribe(val => {
      this.value = val;
    });

  }

  downloadResultsSummaryReport() {
    this.loadingReport = true;
    gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'Downloaded Summary Report' });
    let mapurl;
    // using html2Canvas to capture leaflet map for reports
    // solution found here: https://github.com/niklasvh/html2canvas/issues/567
    const contextMapPane = $('.leaflet-map-pane')[0];
    const mapTransform = contextMapPane.style.transform.split(',');
    // const mapX = parseFloat(mapTransform[0].split('(')[1].replace('px', ''));
    let mapX;

    // fix for firefox
    if ((mapTransform[0] === undefined) || (mapTransform[0] === '')) {
      mapX = '';
    } else {
      mapX = parseFloat(mapTransform[0].split('(')[1].replace('px', ''));
    }
    let mapY;
    // fix for firefox
    if ((mapTransform[1] === undefined) || (mapTransform[1] === '')) {
      mapY = '';
    } else {
      mapY = parseFloat(mapTransform[1].replace('px', ''));
    }
    contextMapPane.style.transform = '';
    contextMapPane.style.left = mapX + 'px';
    contextMapPane.style.top = mapY + 'px';

    const contextMapTiles = $('img.leaflet-tile');
    const tilesLeft = [];
    const tilesTop = [];
    const tileMethod = [];
    for (let i = 0; i < contextMapTiles.length; i++) {
      if (contextMapTiles[i].style.left !== '') {
        tilesLeft.push(parseFloat(contextMapTiles[i].style.left.replace('px', '')));
        tilesTop.push(parseFloat(contextMapTiles[i].style.top.replace('px', '')));
        tileMethod[i] = 'left';
      } else if (contextMapTiles[i].style.transform !== '') {
        const tileTransform = contextMapTiles[i].style.transform.split(',');
        tilesLeft[i] = parseFloat(tileTransform[0].split('(')[1].replace('px', ''));
        tilesTop[i] = parseFloat(tileTransform[1].replace('px', ''));
        contextMapTiles[i].style.transform = '';
        tileMethod[i] = 'transform';
      } else {
        tilesLeft[i] = 0;
        // tilesRight[i] = 0;
        tileMethod[i] = 'neither';
      }
      contextMapTiles[i].style.left = (tilesLeft[i]) + 'px';
      contextMapTiles[i].style.top = (tilesTop[i]) + 'px';
    }

    const contextMapDivIcons = $('.leaflet-marker-icon');
    const dx = [];
    const dy = [];
    const mLeft = [];
    const mTop = [];
    for (let i = 0; i < contextMapDivIcons.length; i++) {
      const curTransform = contextMapDivIcons[i].style.transform;
      const splitTransform = curTransform.split(',');
      if (splitTransform[0] === '') {

      } else {
        dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
      }
      if (splitTransform[0] === '') {

        // when printing without reloading the style.transform property is blank
        // but the values we need are in the style.cssText string
        // so with the code below I'm manipulating those strings to get the values we need

        dx.push(contextMapDivIcons[i].style.cssText.split(' left: ')[1].split('px')[0]);
        dy.push(contextMapDivIcons[i].style.cssText.split('top')[1].replace('px;', ''));
      } else {
        dy.push(parseFloat(splitTransform[1].replace('px', '')));
      }
      // dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
      // dy.push(parseFloat(splitTransform[1].replace('px', '')));
      contextMapDivIcons[i].style.transform = '';
      contextMapDivIcons[i].style.left = dx[i] + 'px';
      contextMapDivIcons[i].style.top = dy[i] + 'px';
    }

    const mapWidth = parseFloat($('#map').css('width').replace('px', ''));
    const mapHeight = parseFloat($('#map').css('height').replace('px', ''));

    /* const linesLayer = $('svg.leaflet-zoom-animated')[0];
    let oldLinesWidth;
    if (oldLinesWidth === undefined) {
      oldLinesWidth = '';
    } else {
      oldLinesWidth = linesLayer.getAttribute('width');
    }
    const oldLinesHeight = linesLayer.getAttribute('height');
    const oldViewbox = linesLayer.getAttribute('viewBox');
    linesLayer.setAttribute('width', mapWidth.toString());
    linesLayer.setAttribute('height', mapHeight.toString());
    linesLayer.setAttribute('viewBox', '0 0 ' + mapWidth + ' ' + mapHeight);
    const linesTransform = linesLayer.style.transform.split(',');
    const linesX = parseFloat(linesTransform[0].split('(')[1].replace('px', ''));
    const linesY = parseFloat(linesTransform[1].replace('px', ''));
    linesLayer.style.transform = '';
    linesLayer.style.left = '';
    linesLayer.style.top = ''; */

    const options = {
      useCORS: true,
    };

    /* this.resultsMapUrl = html2canvas(document.getElementById('resultsMap'), options).then((canvas) => {
      url = canvas.toDataURL('image/png');
      console.log('results map url returned');
      this.mapImageProcessed = true;
      return url;
    }); */

    for (let i = 0; i < contextMapTiles.length; i++) {
      if (tileMethod[i] === 'left') {
        contextMapTiles[i].style.left = (tilesLeft[i]) + 'px';
        contextMapTiles[i].style.top = (tilesTop[i]) + 'px';
      } else if (tileMethod[i] === 'transform') {
        contextMapTiles[i].style.left = '';
        contextMapTiles[i].style.top = '';
        contextMapTiles[i].style.transform = 'translate(' + tilesLeft[i] + 'px, ' + tilesTop[i] + 'px)';
      } else {
        contextMapTiles[i].style.left = '0px';
        contextMapTiles[i].style.top = '0px';
        contextMapTiles[i].style.transform = 'translate(0px, 0px)';
      }
    }
    for (let i = 0; i < contextMapDivIcons.length; i++) {
      contextMapDivIcons[i].style.transform = 'translate(' + dx[i] + 'px, ' + dy[i] + 'px, 0)';
      contextMapDivIcons[i].style.marginLeft = mLeft[i] + 'px';
      contextMapDivIcons[i].style.marginTop = mTop[i] + 'px';
    }

    // Not need lines of code for what we're doing but leaving in incase it's needed sometime in the future
    /* linesLayer.style.transform = 'translate(' + (linesX) + 'px,' + (linesY) + 'px)';
    linesLayer.setAttribute('viewBox', oldViewbox);
    linesLayer.setAttribute('width', oldLinesWidth);
    linesLayer.setAttribute('height', oldLinesHeight); */

    contextMapPane.style.transform = 'translate(' + (mapX) + 'px,' + (mapY) + 'px)';
    contextMapPane.style.left = '';
    contextMapPane.style.top = '';
    // placeholder for google analytics event
    let legendURL;
    let event;
    html2canvas(document.getElementById('legendImage'), options).then(function (canvas) {
      legendURL = canvas.toDataURL('image/png');
    });
    // Getting date/time for timestamp
    html2canvas(document.getElementById('resultsMap'), options)
      .then(function (canvas) {
        event = new Event('image_ready');
        mapurl = canvas.toDataURL('image/png');
        window.dispatchEvent(event); // Dispatching an event for when the image is done rendering
        console.log('canvas success');
      })
      .catch(err => {
        console.log('error canvas', err);
      });

    window.addEventListener('image_ready', () => {
      const mortEvents = [];
      const survEvents = [];
      for (const event of this.data.current_results) {
        if (event.event_type === 1) {
          mortEvents.push(event);
        }
        if (event.event_type === 2) {
          survEvents.push(event);
        }
      }

      // setting data for tables
      const morTable = mortEvents;
      const surTable = survEvents;

      // creating a formatted report data
      const date = APP_UTILITIES.getReportDateTime;

      // whispers logo
      this.pngURL = this.canvas.toDataURL();

      // search query
      const search_query = this.data.current_search_query;

      // results summary details
      const result_data = this.data.current_results;

      // printing user's info
      // determine if user is logged in and gather name/org
      let reportNameOrgString;
      if (this.data.user.username !== '') {
        reportNameOrgString = 'Report generated by ' + this.data.user.first_name + ' ' + this.data.user.last_name + ' (' + this.data.user.organization_string + ')';
      } else {
        reportNameOrgString = 'Report generated';
      }

      // formatting full URL for footer
      const url = window.location.href;
      // Section with SEARCH CRITERIA for page 1
      // TODO: calculation of record status for page 1
      let record_status;
      if (search_query.complete === true) {
        record_status = 'Complete events only';
      } else if (search_query.complete === false) {
        record_status = 'Incomplete events only';
      } else {
        record_status = 'Complete and incomplete events';
      }

      // get string for admin level ones in search criteria
      let search_admin_level_one;
      if (search_query.administrative_level_one === null) {
      } else {
        search_query.administrative_level_one.forEach(search_level_one => {
          this.adminLevelOnes.forEach(level_one => {
            if (search_level_one === Number(level_one.id)) {
              if (search_admin_level_one == null) {
                search_admin_level_one = level_one.name;
              } else {
                search_admin_level_one += ', ' + level_one.name;
              }
            }
          });
        });
      }

      // get string for admin level twos in search criteria
      let search_admin_level_two;
      if (search_query.administrative_level_two === null) {
      } else {
        search_query.administrative_level_two.forEach(search_level_two => {
          this.adminLevelTwos.forEach(level_two => {
            if (search_level_two === Number(level_two.id)) {
              if (search_admin_level_two == null) {
                search_admin_level_two = level_two.name;
              } else {
                search_admin_level_two += ', ' + level_two.name;
              }
            }
          });
        });
      }

      // get string for diagnosis types in search criteria
      let search_diagnosis_type;
      if (search_query.administrative_level_two === null) {
      } else {
        search_query.diagnosis_type.forEach(search_diag_type => {
          this.diagnosisTypes.forEach(diag_type => {
            if (search_diag_type === Number(diag_type.id)) {
              if (search_diagnosis_type == null) {
                search_diagnosis_type = diag_type.name;
              } else {
                search_diagnosis_type += ', ' + diag_type.name;
              }
            }
          });
        });
      }

      // get string for event diagnosis in search criteria
      let search_event_diagnosis;
      if (search_query.diagnosis === null) {
      } else {
        search_query.diagnosis.forEach(search_event_diag => {
          this.eventDiagnoses.forEach(event_diag => {
            if (search_event_diag === event_diag.id) {
              if (search_event_diagnosis == null) {
                search_event_diagnosis = event_diag.name;
              } else {
                search_event_diagnosis += ', ' + event_diag.name;
              }
            }
          });
        });
      }

      // Section with SEARCH RESULTS SUMMARY
      const number_events = result_data.length.toString();

      let most_frequent_diagnosis;
      const diagnosisArray = [];

      let number_animals_affected = 0;
      let number_species_affected = 0;

      let species_most_affected;
      const speciesArray = [];

      let average_event_time_span;
      let total_days_all_events = 0;

      let event_with_most_affected;
      let event_with_most_affected_count = 0;

      let longest_running_event;
      let longest_running_event_count = 0;

      let event_visibility;
      let public_count = 0;
      let not_public_count = 0;
      const eventsAndDayCounts = [];
      const multipleLongRunEvt = [];
      const eventsAndMostAffCounts = [];
      const multipleMostAffected = [];
      const speciesTotal = [];

      result_data.forEach(element => {
        if (!element.hasOwnProperty('public')) {
          element['public'] = true;
        }
        // initial calc Most Frequent Diagnosis
        if (diagnosisArray.length === 0) {
          element.eventdiagnoses.forEach(diagnosis => {
            diagnosisArray.push({ name: diagnosis.diagnosis_string, count: 1 });
          });
        }
        element.eventdiagnoses.forEach(diagnosis => {
          if (diagnosisArray.find(function (item) {
            return diagnosis.diagnosis_string === item.name;
          })) {
            diagnosisArray.forEach(diagnosisItem => {
              if (diagnosis.diagnosis_string === diagnosisItem.name) {
                diagnosisItem.count += 1;
              }
            });
          } else {
            diagnosisArray.push({ name: diagnosis.diagnosis_string, count: 1 });
          }
        });

        // calc for Number of Animals Affected
        number_animals_affected += element.affected_count;

        // initial calc for Species Most Affected
        if (speciesArray.length === 0) {
          element.species.forEach(species => {
            speciesArray.push({ name: species.name, count: 1 });
          });
        }
        element.species.forEach(species => {
          if (speciesArray.find(function (item) {
            return species.name === item.name;
          })) {
            speciesArray.forEach(speciesItem => {
              if (species.name === speciesItem.name) {
                speciesItem.count += 1;
              }
            });
          } else {
            speciesArray.push({ name: species.name, count: 1 });
          }
        });

        // initial calc for Average Event Time Span
        let start_date;
        start_date = new Date(element.start_date);
        let end_date;
        let num_days;
        if (element.end_date == null) {
          end_date = new Date();
        } else {
          end_date = new Date(element.end_date);
        }
        // num_days also used to test for longest running event below
        num_days = (end_date - start_date) / (1000 * 3600 * 24);
        total_days_all_events += num_days;

        // calc for Event with Most Affected
        if (element.affected_count > event_with_most_affected_count) {
          event_with_most_affected = element.id;
          event_with_most_affected_count = element.affected_count;
        }
        eventsAndMostAffCounts.push({ id: element.id, count: element.affected_count });

        // calc for Longest Running Event
        if (num_days > longest_running_event_count) {
          longest_running_event = element.id;
          longest_running_event_count = num_days;
        }
        eventsAndDayCounts.push({ id: element.id, count: num_days });

        // initial calc for Event Visibility
        if (public_count === 0 && element.public === true) {
          public_count = 1;
        } else if (not_public_count === 0 && element.public === false) {
          not_public_count = 1;
        }

      });

      // getting species affected count
      // putting all species for each eventlocation into an array
      result_data.forEach(rd => {
        rd.species.forEach(sp => {
          speciesTotal.push(sp.id);
        });
      });

      // function for filtering out duplicates
      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      // filtering out the duplicates
      const distinctSpecies = speciesTotal.filter(distinct);

      // setting distinct species count
      number_species_affected = distinctSpecies.length;

      const eventsAndlinksLongest = [];
      // check to see if there are multiple longest running events
      for (const evt of eventsAndDayCounts) {
        if (evt.count === longest_running_event_count) {
          multipleLongRunEvt.push({ id: evt.id });
        }
      }
      if (multipleLongRunEvt.length > 0) {
        for (let i = 0; i < multipleLongRunEvt.length; i++) {

          // formatting string so that there is not a ',' at the end of last associated event
          const addComma = multipleLongRunEvt.length - 1;
          if (i !== addComma) {
            eventsAndlinksLongest.push({ text: multipleLongRunEvt[i].id.toString(), link: window.location.origin + '/event/' + multipleLongRunEvt[i].id, color: 'blue' });
            eventsAndlinksLongest.push({ text: ', ' }); // pushing it separately so that that the ',' is not part of the link
          } else {
            eventsAndlinksLongest.push({ text: multipleLongRunEvt[i].id.toString(), link: window.location.origin + '/event/' + multipleLongRunEvt[i].id, color: 'blue' });
            eventsAndlinksLongest.push({ text: ' (' + longest_running_event_count.toFixed(0) + ' days)' });
          }
        }
      }

      const eventsAndlinksAffected = [];
      // check to see if there are multiple events with the same number of most affected
      for (const evt of eventsAndMostAffCounts) {
        if (evt.count === event_with_most_affected_count) {
          multipleMostAffected.push({ id: evt.id });
        }
      }
      if (multipleMostAffected.length > 0) {
        for (let i = 0; i < multipleMostAffected.length; i++) {

          // formatting string so that there is not a ',' at the end of last associated event
          const addComma = multipleMostAffected.length - 1;
          if (i !== addComma) {
            eventsAndlinksAffected.push({ text: multipleMostAffected[i].id.toString(), link: window.location.origin + '/event/' + multipleMostAffected[i].id, color: 'blue' });
            eventsAndlinksAffected.push({ text: ', ' }); // pushing it separately so that that the ',' is not part of the link
          } else {
            eventsAndlinksAffected.push({ text: multipleMostAffected[i].id.toString(), link: window.location.origin + '/event/' + multipleMostAffected[i].id, color: 'blue' });
            eventsAndlinksAffected.push({ text: ' (' + event_with_most_affected_count.toFixed(0) + ' affected)' });
          }
        }
      }

      // final determination of Most Frequent Diagnosis
      let diagnosis_count_test = 0;
      diagnosisArray.forEach(diagnosisItem => {
        if (diagnosisItem.count > diagnosis_count_test) {
          diagnosis_count_test = diagnosisItem.count;
          most_frequent_diagnosis = diagnosisItem.name;
        } else if (diagnosisItem.count === diagnosis_count_test) {
          most_frequent_diagnosis += ', ' + diagnosisItem.name;
        }
      });

      // final determination of Speciest Most Affected
      let species_count_test = 0;
      speciesArray.forEach(speciesItem => {
        if (speciesItem.count > species_count_test) {
          species_count_test = speciesItem.count;
          species_most_affected = speciesItem.name;
        } else if (speciesItem.count === species_count_test) {
          species_most_affected += ', ' + speciesItem.name;
        }
      });

      // final determination of Average Event Time Span
      average_event_time_span = total_days_all_events / Number(number_events);

      // final determination of Event Visibility
      if (public_count === 1 && not_public_count === 1) {
        event_visibility = { text: 'See details', bold: true };
      } else if (public_count === 1) {
        event_visibility = 'Visible to the public';
      } else if (not_public_count === 1) {
        event_visibility = { text: 'NOT VISIBLE TO THE PUBLIC', bold: true };
      } else {
        event_visibility = { text: 'See details', bold: true };
      }

      let affected_count;
      if (search_query.affected_count !== null) {
        if (search_query.affected_count !== undefined) {
          if (search_query.affected_count_operator === '__gte') {
            affected_count = 'Affected Count ' + '=>' + ' ' + search_query.affected_count.toString();
          }
          if (search_query.affected_count_operator === '__lte') {
            affected_count = 'Affected Count ' + '<=' + ' ' + search_query.affected_count.toString();
          }
        } else {
          affected_count = '';
        }
      }
      if (affected_count === undefined) {
        affected_count = '';
      }

      let event_type = '';

      if (search_query.event_type === null) {
      } else {
        search_query.event_type.forEach(eventTypeItem => {
          if (eventTypeItem === 1) {
            event_type += 'Mortality/Morbidity';
          } else if (eventTypeItem === 2 && event_type !== '') {
            event_type += ', Surveillance';
          } else if (eventTypeItem === 2) {
            event_type = 'Surveillance';
          }
        });
      }

      const docDefinition = {
        pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 35],
        footer: function (currentPage, pageCount) {
          const SecondToLastPage = pageCount - 1;
          if (currentPage === SecondToLastPage) { return; }
          if (currentPage !== pageCount) {
            return {
              margin: [20, 0, 20, 0],
              style: 'footer',
              columns: [
                {
                  width: 700,
                  style: 'footer',
                  text: [reportNameOrgString + ' from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about these events, connect with the Contact Organization.\n For more information about WHISPers, see “About” at ', { text: 'https://whispers.usgs.gov', link: 'https://whispers.usgs.gov', color: '#0000EE' }, '.']
                },
                {
                  width: 50,
                  style: 'footer',
                  alignment: 'right',
                  text: 'Page ' + currentPage.toString()
                }
              ]
            };
          }
        },
        content: [
          {
            alignment: 'justify',
            columns: [
              {
                image: this.pngURL,
                width: 450,
                height: 65
              },
              {
                style: 'header',
                text: 'Summary of Search Results',
                alignment: 'right',
                margin: [0, 15, 0, 0]
              },
            ]
          },
          {
            text: 'Search Criteria',
            style: 'bigger',
            margin: [30, 10]
          },
          {
            text: ((search_query.start_date) ? 'Start Date: ' + APP_UTILITIES.formatEventDates(search_query.start_date) + ' | ' : 'No Start Date | ') // start date
              + ((search_query.end_date) ? 'End Date: ' + APP_UTILITIES.formatEventDates(search_query.end_date) + ' | ' : 'No End Date | ') // end date
              + record_status + ' | ' // record status
              + ((search_admin_level_one && search_admin_level_one.length > 0) ? search_admin_level_one + ' | ' : '') // admin level ones
              + ((search_admin_level_two && search_admin_level_two.length > 0) ? search_admin_level_two + ' | ' : '')
              + ((affected_count !== '') ? affected_count + ' | ' : '')
              + ((event_type !== '') ? event_type + ' | ' : '')
              + ((search_diagnosis_type && search_diagnosis_type.length > 0) ? search_diagnosis_type + ' | ' : '')
              + ((search_event_diagnosis && search_event_diagnosis.length > 0) ? search_event_diagnosis + ' | ' : ''),
            margin: [30, 10]
          },
          /*
                   {
                     alignment: 'justify',
                     columns: [
                       {
                         style: 'smaller',
                         table: {
                           widths: [150, 250],
                           body: [
                             [{ border: [false, false, true, false], text: 'Start Date', bold: true, alignment: 'right' }, (search_query.start_date) ? search_query.start_date : 'n/a'],
                             [{ border: [false, false, true, false], text: 'End Date', bold: true, alignment: 'right' }, (search_query.end_date) ? search_query.end_date : 'n/a'],
                             [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, record_status],
                             [{ border: [false, false, true, false], text: 'State (or equivalent)', bold: true, alignment: 'right' }, (search_admin_level_one) ? search_admin_level_one : 'n/a'],
                             [{ border: [false, false, true, false], text: 'Country (or equivalent)', bold: true, alignment: 'right' }, 'xxxxx'],
                           ]
                         },
                         layout: { defaultBorder: false,
                           paddingLeft: function(i, node) { return 15; },
                           paddingRight: function(i, node) { return 10; },
                          }
                       }
                     ]
                   },*/
          {
            text: 'Search Results Summary',
            style: 'bigger',
            margin: [30, 10]
          },
          {
            alignment: 'justify',
            columns: [
              {
                style: 'smaller',
                table: {
                  widths: [150, 125],
                  body: [
                    [{ border: [false, false, true, false], text: '# of Events', bold: true, alignment: 'right' }, number_events.toString()],
                    [{ border: [false, false, true, false], text: 'Most Frequent Event Diagnosis', bold: true, alignment: 'right' }, { text: most_frequent_diagnosis, alignment: 'left' }],
                    [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, number_animals_affected],
                    [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, number_species_affected],
                    [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, { text: species_most_affected, alignment: 'left' }],
                    [{ border: [false, false, true, false], text: 'Average Event Time Span', bold: true, alignment: 'right' }, average_event_time_span.toFixed(0).toString() + ' days'],
                    [{ border: [false, false, true, false], text: 'Event with Most Affected', bold: true, alignment: 'right' }, [{ text: eventsAndlinksAffected, alignment: 'left' }]],
                    [{ border: [false, false, true, false], text: 'Longest Running Event', bold: true, alignment: 'right' }, [{ text: eventsAndlinksLongest, alignment: 'left' }]],
                    [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, event_visibility],
                  ]
                },
                layout: {
                  defaultBorder: false,
                  paddingLeft: function (i, node) { return 15; },
                  paddingRight: function (i, node) { return 10; },
                }
              },
              {
                alignment: 'justify',
                image: mapurl,
                width: 320,
                height: 270
              },
              {
                alignment: 'justify',
                image: legendURL,
                width: 120,
                height: 300
              }
            ],
            pageBreak: 'after'
          },
          {

            columns: [
              this.getBanner(morTable)
            ]
          },
          {
            text: this.getText(morTable)
          },
          {
            alignment: 'justify',
            columns: [
              this.makeResultsSummaryTable(morTable)
            ],
          },
          {

            columns: [
              this.getBanner(surTable)
            ]
          },
          {
            text: this.getText(surTable)
          },
          {
            alignment: 'justify',
            columns: [
              this.makeResultsSummaryTable(surTable)
            ],
          },
          {
            alignment: 'justify',
            columns: [
              {
                image: this.pngURL,
                width: 450,
                height: 65
              },
              {
                style: 'header',
                alignment: 'right',
                text: 'Explanation of Terms',
                margin: [0, 15, 0, 0]
              }
            ]
          },
          {
            alignment: 'justify',
            text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n\n', { text: 'Disclaimer', fontSize: 11, bold: true, paddingTop: 20, paddingBottom: 20 }, '\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
            style: 'explanation',
          },
          {
            style: 'definitionsTable',
            table: {
              widths: [105, '*'],
              body: [
                [{ text: '# of Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numOfEvents, border: [false, false, false, false] }],
                [{ text: 'Most Frequent Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.mostFrequentEvtDiag, border: [false, false, false, false] }],
                [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAnimalsAffectedDefinition, border: [false, false, false, false] }],
                [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numSpeciesAffectedDefinition, border: [false, false, false, false] }],
                [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesMostAffectedDefinition, border: [false, false, false, false] }],
                [{ text: 'Average Event Time Span', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.avgEventTimeSpan, border: [false, false, false, false] }],
                [{ text: 'Event with Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventWithMostAffected, border: [false, false, false, false] }],
                [{ text: 'Longest Running Event', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.longestRunningEvent, border: [false, false, false, false] }],
                [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventVisibilityDefinition, border: [false, false, false, false] }]
              ]
            },
            layout: {
              defaultBorder: false,
              paddingLeft: function (i, node) { return 15; },
              paddingRight: function (i, node) { return 10; },
              // paddingTop: function(i, node) { return 10; }
            }
          },
          {
            alignment: 'justify',
            margin: [0, 130, 0, 0],
            text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
            style: 'footer',
            pageBreak: 'after'
          },
          {
            alignment: 'justify',
            columns: [
              {
                image: this.pngURL,
                width: 450,
                height: 65
              },
              {
                style: 'header',
                alignment: 'right',
                text: 'Explanation of Terms cont...',
                margin: [0, 15, 0, 0]
              }
            ]
          },
          {
            style: 'definitionsTable',
            table: {
              widths: [105, '*'],
              body: [
                [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventTypeDefinition, border: [false, false, false, false] }],
                [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventIdDefinition, border: [false, false, false, false] }],
                [{ text: 'Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startEndDatesDefinition, border: [false, false, false, false] }],
                [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countyDefinition, border: [false, false, false, false] }],
                [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventDiagDefinition, border: [false, false, false, false] }],
                [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
                [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.recordStatusDefinition, border: [false, false, false, false] }],
                [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.contactOrgDefinition, border: [false, false, false, false] }],
              ]
            },
            layout: {
              defaultBorder: false,
              paddingLeft: function (i, node) { return 15; },
              paddingRight: function (i, node) { return 10; },
              // paddingTop: function(i, node) { return 10; }
            }
          },
          {
            alignment: 'justify',
            margin: [0, 270, 0, 0],
            text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
            style: 'footer'
          },
        ],
        images: {
          logo: this.pngURL,
          nationalMap: mapurl,
          legend: legendURL
        },
        styles: {
          header: {
            fontSize: 15,
            bold: true
          },
          bigger: {
            fontSize: 18,
            bold: true
          },
          explanation: {
            fontSize: 9
          },
          smaller: {
            fontSize: 10
          },
          smallest: {
            fontSize: 8
          },
          footer: {
            fontSize: 9
          },
          definitionsTable: {
            fontSize: 9
          }
        },
        defaultStyle: {
          columnGap: 20
        }
      };
      pdfMake.createPdf(docDefinition).download('WHISPers_Search_Results_' + APP_UTILITIES.getFileNameDate + '.pdf');
      this.loadingReport = false;
      this.dataUpdatedService.triggerRefresh();
      this.resultsSummaryReportDialogRef.close();
    }, {
      once: true // Only add listnener once. If this is not set then it will print multiple times after the first print if the page is not reloaded
    });
  }
}
