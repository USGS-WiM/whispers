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

import { EventDetail } from '@interfaces/event-detail';
import { forEach } from '@angular/router/src/utils/collection';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
declare let gtag: Function;

@Component({
  selector: 'app-search-results-summary-report',
  templateUrl: './search-results-summary-report.component.html',
  styleUrls: ['./search-results-summary-report.component.scss']
})

export class SearchResultsSummaryReportComponent implements OnInit {

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

  readyToGenerate = false;
  mapImageProcessed = false;
  orgsLoaded = false;

  constructor(
    public resultsSummaryReportDialogRef: MatDialogRef<SearchResultsSummaryReportComponent>,
    private countryService: CountryService,
    private organizationService: OrganizationService,
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
          if (this.mapImageProcessed == true) {
            this.readyToGenerate = true;
          }
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
    const currentResultsMarkers = [];
    // tslint:disable-next-line:forin
    // loop through currentResults repsonse from a search query
    for (const event in currentResults) {

      // if event has any administrativeleveltwos (counties), add them to the currentResultsMarkers array
      if (currentResults[event]['administrativeleveltwos'].length > 0) {

        // tslint:disable-next-line:forin
        for (const adminleveltwo in currentResults[event]['administrativeleveltwos']) {

          // check if the administrativeleveltwo (county) of the event has already been placed into the currentResultsMarkers array.
          // If it has, push its events array into the existing marker for that administrativeleveltwo. This is to ensure one
          // marker per administrativeleveltwo, with events nested
          // tslint:disable-next-line:max-line-length
          if (this.searchInArray(currentResultsMarkers, 'adminleveltwo', currentResults[event]['administrativeleveltwos'][adminleveltwo]['id'])) {
            for (const marker of currentResultsMarkers) {
              if (marker.adminleveltwo === currentResults[event]['administrativeleveltwos'][adminleveltwo]['id']) {
                marker.events.push(currentResults[event]);
              }
            }
          } else {

            currentResultsMarkers.push({
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

    // loop through currentResultsMarkers
    for (const marker of currentResultsMarkers) {

      // set vars for classes that will define the marker icons, per WIM markermaker CSS
      let colorClass;
      let shapeClass = 'wmm-circle ';
      let iconClasses = ' wmm-icon-circle wmm-icon-white ';
      let sizeClass = 'wmm-size-25';
      if (marker['eventdiagnoses'][0] !== undefined) {
        // set color of marker based on diagnosis type
        switch (marker['eventdiagnoses'][0].diagnosis_type) {
          case 1: {
            colorClass = 'wmm-green';
            break;
          }
          case 2: {
            colorClass = 'wmm-blue';
            break;
          }
          case 3: {
            colorClass = 'wmm-red';
            break;
          }
          case 4: {
            colorClass = 'wmm-orange';
            break;
          }
          case 5: {
            colorClass = 'wmm-yellow';
            break;
          }
          case 6: {
            colorClass = 'wmm-purple';
            break;
          }
          case 7: {
            colorClass = 'wmm-sky';
            break;
          }
          case 8: {
            colorClass = 'wmm-mutedpink';
            break;
          }
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
        colorClass = 'wmm-mutedblue';
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
        col_9: { text: 'Event Visibility', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] }
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
        row.push(elData.id);
        row.push({ text: elData.start_date + " to " + ((elData.end_date == null) ? "open" : elData.end_date), alignment: 'left' });
        let adminLevelTwoCell = new Array();
        for (let key in elData.administrativeleveltwos) {
          let countryAbbrev;
          for (let countryKey in this.countries) {
            if (this.countries[countryKey].id == elData.administrativeleveltwos[key].country) {
              countryAbbrev = this.countries[countryKey].abbreviation;
            }
          }
          adminLevelTwoCell.push({
            text: elData.administrativeleveltwos[key].name + ", " + this.getAdminLevelOneAbbrev(elData, elData.administrativeleveltwos[key].administrative_level_one) + ", " + countryAbbrev + ";\n",
            alignment: 'left'
          });
        }
        row.push(adminLevelTwoCell);
        let eventDiagnosesCell = new Array();
        if (elData.eventdiagnoses) {
          for (let key in elData.eventdiagnoses) {
            eventDiagnosesCell.push({ text: elData.eventdiagnoses[key].diagnosis_string + "\n", alignment: 'left' });
          }
        } else {
          eventDiagnosesCell.push("");
        }
        row.push(eventDiagnosesCell);
        row.push(elData.affected_count);
        let speciesCell = new Array();
        for (let key in elData.species) {
          if (Number(key) == elData.species.length - 1) {
            speciesCell.push(elData.species[key].name);
          } else {
            speciesCell.push(elData.species[key].name + ",\n");
          }
        }
        row.push({ text: speciesCell, alignment: 'left' });
        row.push({ text: elData.event_status_string, alignment: 'left' });
        //TODO: need to come back and fix this. it's a number. Maybe need to have organization_string added to event? Or maybe just use organization service
        if (elData.organizations) {

          //row.push(elData.organizations[0].toString());
        } else {
          //row.push('');
        }
        let orgCell = new Array();
        for (let key in elData.organizations) {
          let organization;
          for (let orgKey in this.orgs) {
            if (this.orgs[orgKey].id == elData.organizations[key]) {
              organization = this.orgs[orgKey].name;
            }
          }
          if (Number(key) % 2 == 0) {
            orgCell.push({ text: organization + "\n", alignment: 'left', color: 'black' });
          } else {
            orgCell.push({ text: organization + "\n", alignment: 'left', color: 'gray' });
          }
        }
        row.push(orgCell);
        if (elData.public) {
          row.push({ text: "Visible to the public", alignment: 'left' });
        } else {
          row.push({ text: "NOT VISIBLE TO THE PUBLIC", bold: true, alignment: 'left' });
        }
        locationBody.push(row);
      }
    }

    // table object to be placed in doc definition
    table = {
      alignment: 'justify',
      table: {
        headerRows: 1,
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

    return table;
  }
  // END defining event location table

  getAdminLevelOneAbbrev(data, state) {
    let abbrev;

    for (let key in data.administrativelevelones) {
      if (data.administrativelevelones[key].id == state) {
        abbrev = data.administrativelevelones[key].abbreviation;
      }
    }

    return abbrev;
  }

  loadProgressBar() {
    const source = timer(5, 5); // this is exactly how it's done in the event report but for some reason it's choppy and very slow here
    const subscribe = source.subscribe(val => {
      this.value = val;
    });

  }

  downloadResultsSummaryReport() {
    this.loadingReport = true;
    let mapurl;
    // using html2Canvas to capture leaflet map for reports
    // solution found here: https://github.com/niklasvh/html2canvas/issues/567
    const mapPane = $('.leaflet-map-pane')[0];
    const mapTransform = mapPane.style.transform.split(',');
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
    mapPane.style.transform = '';
    mapPane.style.left = mapX + 'px';
    mapPane.style.top = mapY + 'px';

    const myTiles = $('img.leaflet-tile');
    const tilesLeft = [];
    const tilesTop = [];
    const tileMethod = [];
    for (let i = 0; i < myTiles.length; i++) {
      if (myTiles[i].style.left !== '') {
        tilesLeft.push(parseFloat(myTiles[i].style.left.replace('px', '')));
        tilesTop.push(parseFloat(myTiles[i].style.top.replace('px', '')));
        tileMethod[i] = 'left';
      } else if (myTiles[i].style.transform !== '') {
        const tileTransform = myTiles[i].style.transform.split(',');
        tilesLeft[i] = parseFloat(tileTransform[0].split('(')[1].replace('px', ''));
        tilesTop[i] = parseFloat(tileTransform[1].replace('px', ''));
        myTiles[i].style.transform = '';
        tileMethod[i] = 'transform';
      } else {
        tilesLeft[i] = 0;
        // tilesRight[i] = 0;
        tileMethod[i] = 'neither';
      }
      myTiles[i].style.left = (tilesLeft[i]) + 'px';
      myTiles[i].style.top = (tilesTop[i]) + 'px';
    }

    const myDivicons = $('.leaflet-marker-icon');
    const dx = [];
    const dy = [];
    const mLeft = [];
    const mTop = [];
    for (let i = 0; i < myDivicons.length; i++) {
      const curTransform = myDivicons[i].style.transform;
      const splitTransform = curTransform.split(',');
      if (splitTransform[0] === '') {

      } else {
        dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
      }
      if (splitTransform[0] === '') {

      } else {
        dy.push(parseFloat(splitTransform[1].replace('px', '')));
      }
      // dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
      // dy.push(parseFloat(splitTransform[1].replace('px', '')));
      myDivicons[i].style.transform = '';
      myDivicons[i].style.left = dx[i] + 'px';
      myDivicons[i].style.top = dy[i] + 'px';
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
    html2canvas(document.getElementById('resultsMap'), options).then(function (canvas) {
      mapurl = canvas.toDataURL('image/png');
    });

    this.mapImageProcessed = true;
    for (let i = 0; i < myTiles.length; i++) {
      if (tileMethod[i] === 'left') {
        myTiles[i].style.left = (tilesLeft[i]) + 'px';
        myTiles[i].style.top = (tilesTop[i]) + 'px';
      } else if (tileMethod[i] === 'transform') {
        myTiles[i].style.left = '';
        myTiles[i].style.top = '';
        myTiles[i].style.transform = 'translate(' + tilesLeft[i] + 'px, ' + tilesTop[i] + 'px)';
      } else {
        myTiles[i].style.left = '0px';
        myTiles[i].style.top = '0px';
        myTiles[i].style.transform = 'translate(0px, 0px)';
      }
    }
    for (let i = 0; i < myDivicons.length; i++) {
      myDivicons[i].style.transform = 'translate(' + dx[i] + 'px, ' + dy[i] + 'px, 0)';
      myDivicons[i].style.marginLeft = mLeft[i] + 'px';
      myDivicons[i].style.marginTop = mTop[i] + 'px';
    }
    /* linesLayer.style.transform = 'translate(' + (linesX) + 'px,' + (linesY) + 'px)';
    linesLayer.setAttribute('viewBox', oldViewbox);
    linesLayer.setAttribute('width', oldLinesWidth);
    linesLayer.setAttribute('height', oldLinesHeight); */
    mapPane.style.transform = 'translate(' + (mapX) + 'px,' + (mapY) + 'px)';
    mapPane.style.left = '';
    mapPane.style.top = '';
    // placeholder for google analytics event
    // gtag('event', 'click', { 'event_category': 'Search Results', 'event_label': 'Downloaded Search Results Summary Report' });

    // Getting date/time for timestamp

    let legendURL;

    html2canvas(document.getElementById('legendImage'), options).then(function (canvas) {
      legendURL = canvas.toDataURL('image/png');
    });
    // need to give some time for html2canvas to finish rendering
    setTimeout(() => {
      const date = APP_UTILITIES.getDateTime;

      // whispers logo
      this.pngURL = this.canvas.toDataURL();

      // search query
      const search_query = this.data.current_search_query;
      // results summary details
      const result_data = this.data.current_results;

    // printing user's info
    // determine if user is logged in and gather name/org
    let reportNameOrgString;
    if (this.data.user.username != "") {
      reportNameOrgString = 'Report generated by ' + this.data.user.first_name + ' ' + this.data.user.last_name + ' (' + this.data.user.organization_string + ')';
    } else {
      reportNameOrgString = 'Report generated';
    }
    
    // formatting full URL for footer
    const url = window.location.href;
    this.mapImageProcessed = true;
    // Section with SEARCH CRITERIA for page 1
    // TODO: calculation of record status for page 1
    let record_status;
    if (search_query.complete == true) {
      record_status = "Complete events only";
    } else if (search_query.complete == false) {
      record_status = "Incomplete events only";
    } else {
      record_status = "Complete and incomplete events";
    }

      // get string for admin level ones in search criteria
      let search_admin_level_one;
      if (search_query.administrative_level_one === null) {
      } else {
        search_query.administrative_level_one.forEach(search_level_one => {
          this.adminLevelOnes.forEach(level_one => {
            if (search_level_one == Number(level_one.id)) {
              if (search_admin_level_one == null) {
                search_admin_level_one = level_one.name;
              } else {
                search_admin_level_one += ", " + level_one.name;
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
            if (search_level_two == Number(level_two.id)) {
              if (search_admin_level_two == null) {
                search_admin_level_two = level_two.name;
              } else {
                search_admin_level_two += ", " + level_two.name;
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
            if (search_diag_type == Number(diag_type.id)) {
              if (search_diagnosis_type == null) {
                search_diagnosis_type = diag_type.name;
              } else {
                search_diagnosis_type += ", " + diag_type.name;
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
            if (search_event_diag == event_diag.id) {
              if (search_event_diagnosis == null) {
                search_event_diagnosis = event_diag.name;
              } else {
                search_event_diagnosis += ", " + event_diag.name;
              }
            }
          });
        });
      }

    /************
     *
     * Check with Lauren's code to see if she has any functions reformatting dates from YYYY-MM-DD format
     * Lauren: Hi, yes I have a couple ways for formatting todays date in the app.utilities.ts file, function name: getReportDateTime or formatEventDates
     * Nick: oh hai fren
     * Lauren: hai fren
     *
     * Coordinate with her to use a common function to get it into the format NHWC requests
     * Lauren: We put common functions like that in the app.utilites.ts file. There may be an existing one that will work, if not feel free to add one
     */

      // Section with SEARCH RESULTS SUMMARY
      let number_events = result_data.length.toString();

      let most_frequent_diagnosis;
      let diagnosisArray = [];

      let number_animals_affected = 0;
      let number_species_affected = 0;

      let species_most_affected;
      let speciesArray = [];

      let average_event_time_span;
      let total_days_all_events = 0;

      let event_with_most_affected;
      let event_with_most_affected_count = 0;

      let longest_running_event;
      let longest_running_event_count = 0;

      let event_visibility;
      let public_count = 0;
      let not_public_count = 0;

      result_data.forEach(element => {
        if (!element.hasOwnProperty('public')) {
          element["public"] = true;
        }
        //initial calc Most Frequent Diagnosis
        if (diagnosisArray.length == 0) {
          element.eventdiagnoses.forEach(diagnosis => {
            diagnosisArray.push({ name: diagnosis.diagnosis_string, count: 1 })
          });
        }
        element.eventdiagnoses.forEach(diagnosis => {
          if (diagnosisArray.find(function (item) {
            return diagnosis.diagnosis_string == item.name;
          })) {
            diagnosisArray.forEach(diagnosisItem => {
              if (diagnosis.diagnosis_string == diagnosisItem.name) {
                diagnosisItem.count += 1;
              }
            });
          } else {
            diagnosisArray.push({ name: diagnosis.diagnosis_string, count: 1 })
          };
        });

        //calc for Number of Animals Affected
        number_animals_affected += element.affected_count;
        //calc for Number Species Affected
        number_species_affected += element.species.length;

        //initial calc for Species Most Affected
        if (speciesArray.length == 0) {
          element.species.forEach(species => {
            speciesArray.push({ name: species.name, count: 1 })
          });
        }
        element.species.forEach(species => {
          if (speciesArray.find(function (item) {
            return species.name == item.name;
          })) {
            speciesArray.forEach(speciesItem => {
              if (species.name == speciesItem.name) {
                speciesItem.count += 1;
              }
            });
          } else {
            speciesArray.push({ name: species.name, count: 1 })
          };
        });

        //inital calc for Average Event Time Span
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

        //calc for Event with Most Affected
        if (element.affected_count > event_with_most_affected_count) {
          event_with_most_affected = element.id;
          event_with_most_affected_count = element.affected_count;
        }

        //calc for Longest Running Event
        if (num_days > longest_running_event_count) {
          longest_running_event = element.id;
          longest_running_event_count = num_days;
        }

        //initial calc for Event Visibility
        if (public_count == 0 && element.public == true) {
          public_count = 1;
        } else if (not_public_count == 0 && element.public == false) {
          not_public_count = 1;
        }

      });

      //final determination of Most Frequent Diagnosis
      let diagnosis_count_test = 0;
      diagnosisArray.forEach(diagnosisItem => {
        if (diagnosisItem.count > diagnosis_count_test) {
          diagnosis_count_test = diagnosisItem.count;
          most_frequent_diagnosis = diagnosisItem.name;
        } else if (diagnosisItem.count == diagnosis_count_test) {
          most_frequent_diagnosis += ", " + diagnosisItem.name;
        }
      })

      //final determination of Speciest Most Affected
      let species_count_test = 0;
      speciesArray.forEach(speciesItem => {
        if (speciesItem.count > species_count_test) {
          species_count_test = speciesItem.count;
          species_most_affected = speciesItem.name;
        } else if (speciesItem.count == species_count_test) {
          species_most_affected += ", " + speciesItem.name;
        }
      })

      //final determination of Average Event Time Span
      average_event_time_span = total_days_all_events / Number(number_events);

      //final determination of Event Visibility
      if (public_count == 1 && not_public_count == 1) {
        event_visibility = { text: 'See details', bold: true };
      } else if (public_count == 1) {
        event_visibility = 'Visible to the public';
      } else if (not_public_count == 1) {
        event_visibility = { text: 'NOT VISIBLE TO THE PUBLIC', bold: true };
      } else {
        event_visibility = { text: 'See details', bold: true };
      }

      let affected_count;

      if (search_query.affected_count != undefined) {
        affected_count = 'Affected Count ' + search_query.affected_count_operator + ' ' + search_query.affected_count.toString();
      } else {
        affected_count = '';
      }

      let event_type = '';

      if (search_query.event_type === null) {
      } else {
        search_query.event_type.forEach(eventTypeItem => {
          if (eventTypeItem == 1) {
            event_type += "Mortality/Morbidity";
          } else if (eventTypeItem == 2 && event_type != '') {
            event_type += ", Surveillance";
          } else if (eventTypeItem == 2) {
            event_type = "Surveillance";
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
                  style: 'smallest',
                  text: [reportNameOrgString + ' from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information, see “About” at ', { text: 'https://whispers.usgs.gov', link: 'https://whispers.usgs.gov', color: '#0000EE'}, '.']
                },
                {
                  width: 50,
                  style: 'smaller',
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
          },/*
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
                    [{ border: [false, false, true, false], text: 'Average Event Time Span', bold: true, alignment: 'right' }, average_event_time_span.toFixed(0).toString() + " days"],
                    [{ border: [false, false, true, false], text: 'Event with Most Affected', bold: true, alignment: 'right' }, [{ text: [{ text: event_with_most_affected, link: window.location.href.split('/home')[0] + "/event/" + event_with_most_affected, color: 'blue' }, " (" + event_with_most_affected_count + " affected)"] }]],
                    [{ border: [false, false, true, false], text: 'Longest Running Event', bold: true, alignment: 'right' }, [{ text: [{ text: longest_running_event, link: window.location.href.split('/home')[0] + "/event/" + longest_running_event, color: 'blue' }, " (" + longest_running_event_count.toFixed(0) + " days)"] }]],
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
                width: 110,
                height: 240
              }
            ],
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
                text: 'Summary of Search Results',
                margin: [0, 15, 0, 0]
              },
            ]
          },
          {
            text: 'Morbidity/Mortality Events',
            alignment: 'center',
            style: 'bigger',
            margin: [30, 10]
          },
          {
            alignment: 'justify',
            columns: [
              this.makeResultsSummaryTable(this.data.current_results)
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
                text: 'Explanation of Terms',
                margin: [0, 15, 0, 0]
              }
            ]
          },
          {
            alignment: 'justify',
            text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n\n', { text: 'Disclaimer', fontSize: 11, bold: true, paddingTop: 20, paddingBottom: 20 }, '\n\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
            style: 'smaller',
          },
          {
            style: 'definitionsTable',
            table: {
              body: [
                [{ text: '# of Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Number of WHISPers events.', border: [false, false, false, false] }],
                [{ text: 'Most Frequent Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Top event diagnosis or diagnoses based on the number of events with that diagnosis reported.', border: [false, false, false, false] }],
                [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.', border: [false, false, false, false] }],
                [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Total number of species affected.', border: [false, false, false, false] }],
                [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Top species affected based on sick and dead numbers reported.', border: [false, false, false, false] }],
                [{ text: 'Average Event Time Span', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Mean number of days between start and end dates across all events. If no end date provided for an event, date of report generation was used.', border: [false, false, false, false] }],
                [{ text: 'Event with Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'WHISPers event with the highest number of animals affected.', border: [false, false, false, false] }],
                [{ text: 'Longest Running Event', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'WHISPers event with the longest time span in days. If no end date provided for an event, date of report generation was used.', border: [false, false, false, false] }],
                [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Indicates whether event is visible to the public or not.', border: [false, false, false, false] }]
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
            margin: [0, 115, 0, 0],
            text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
            style: 'smallest',
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
                text: 'Explanation of Terms cont...',
                margin: [0, 15, 0, 0]
              }
            ]
          },
          {
            style: 'definitionsTable',
            table: {
              body: [
                [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.', border: [false, false, false, false] }],
                [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'System-generated unique identifier for an event.', border: [false, false, false, false] }],
                [{ text: 'Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Beginning date of the event (considering all locations). Ending date of the event (considering all locations).', border: [false, false, false, false] }],
                [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'County of location (or equivalent, such as parish or borough in the United States).', border: [false, false, false, false] }],
                [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness.', border: [false, false, false, false] }],
                [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Species affected at this location.', border: [false, false, false, false] }],
                [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: '"Complete" if 1.) the event has ended, 2.) diagnostic tests are finalized, and 3.) all information is updated in WHISPers. Otherwise, "Incomplete".', border: [false, false, false, false] }],
                [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Organization(s) to contact regarding general inquiries about the event.', border: [false, false, false, false] }],
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
            margin: [0, 260, 0, 0],
            text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
            style: 'smallest'
          },
        ],
        images: {
          logo: this.pngURL,
          nationalMap: mapurl,
          legend: legendURL
        },
        styles: {
          header: {
            fontSize: 16,
            bold: true
          },
          bigger: {
            fontSize: 18,
            bold: true
          },
          smaller: {
            fontSize: 10
          },
          smallest: {
            fontSize: 8
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
      this.resultsSummaryReportDialogRef.close();
    }, 5500); // I know I know, I hate that I'm using timeouts too. This is here because if the pdfmake functions run before the images are are ready then they end up undefined which causes the whole thing to fail
  }
}
