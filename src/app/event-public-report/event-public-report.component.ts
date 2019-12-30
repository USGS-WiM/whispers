import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DisplayValuePipe } from '../pipes/display-value.pipe';
import html2canvas from 'html2canvas';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
import { Comment } from '@interfaces/comment';
import { CommentService } from '@services/comment.service';
import { CommentTypeService } from '@app/services/comment-type.service';
import { EventService } from '@app/services/event.service';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { CountryService } from '@app/services/country.service';
import { CommentType } from '@interfaces/comment-type';
import { EventDetail } from '@interfaces/event-detail';
import { Title } from '@angular/platform-browser';
declare let gtag: Function;

@Component({
  selector: 'app-event-public-report',
  templateUrl: './event-public-report.component.html',
  styleUrls: ['./event-public-report.component.scss']
})

export class EventPublicReportComponent implements OnInit, AfterViewInit {

  canvas = document.createElement('canvas');
  loadingData = false;
  labs;
  eventLocsPlusDiagnoses;
  test = [];
  combinedComments;
  eventLocationSpecies = [];
  natMap;
  downloadingReport = false;
  natMapPoints;
  icon;
  adminLevelOnes;
  country;

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
  speceisMostAffectedDefinition = '';
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
  errorMessage;

  locationNumber = 1;
  pngURL;
  locationIdArray = [];
  commentTypes: CommentType[];

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(
    public eventPublicReportDialogRef: MatDialogRef<EventPublicReportComponent>,
    private displayValuePipe: DisplayValuePipe,
    private commentTypeService: CommentTypeService,
    public eventService: EventService,
    private administrativeLevelOneService: AdministrativeLevelOneService,
    private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.loadingData = true;
    this.eventService.getEventSummary(this.data.event_data.id)
      .subscribe(
        (eventsummary) => {
          this.natMapPoints = eventsummary;
        }
      );

    this.administrativeLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.adminLevelOnes = adminLevelOnes;

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.countryService.getCountries()
      .subscribe(
        (countries) => {
          this.country = countries;

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    const Attr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      // tslint:disable-next-line:max-line-length
      Url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const streets = L.tileLayer(Url, { id: 'mapbox.streets', attribution: Attr });
    this.natMap = new L.Map('hiddenNatMap', {
      center: new L.LatLng(39.8283, -98.5795),
      zoomControl: false,
      zoom: 3,
      layers: [streets]
    });

    setTimeout(() => {
      const view = [];
      view.push({
        lat: Number(this.natMapPoints['administrativeleveltwos'][0]['centroid_latitude']),
        long: Number(this.natMapPoints['administrativeleveltwos'][0]['centroid_longitude'])
      });
      this.natMap.setView([view[0].lat, view[0].long]);
    }, 400);

    this.natMap.dragging.disable();
    this.natMap.touchZoom.disable();
    this.natMap.doubleClickZoom.disable();
    this.natMap.scrollWheelZoom.disable();

    // mapping the event centroid for the national map
    setTimeout(() => {
      this.MapResults(this.natMapPoints);
      this.loadingData = true;
    }, 550);

    // Displays county image if needed
    /* const countyPreview = this.data.map;
    document.getElementById('countyPreview').src = countyPreview; */
    if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
      this.getlocations();
    }
    // get comment types from the commentTypes service
    this.commentTypeService.getCommentTypes()
      .subscribe(
        commentTypes => {
          this.commentTypes = commentTypes;
        },
      );

    // creating variables for field definitions
    this.eventTypeDefinition = FIELD_HELP_TEXT.editEventTypeTooltip;
    this.eventIdDefinition = FIELD_HELP_TEXT.eventIDTooltip;
    this.contactOrgDefinition = FIELD_HELP_TEXT.contactOrganizationTooltip;
    this.recordStatusDefinition = FIELD_HELP_TEXT.recordStatusTooltip;
    this.numberOfLocationsDefinition = FIELD_HELP_TEXT.numberOfLocationsDefinition;
    this.countyDefinition = FIELD_HELP_TEXT.countyTooltip;
    this.eventDiagDefinition = FIELD_HELP_TEXT.eventDiagnosisTooltip;
    this.labDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.numAnimalsAffectedDefinition = FIELD_HELP_TEXT.numberAffectedTooltip;
    this.numSpeciesAffectedDefinition = FIELD_HELP_TEXT.numberOfSpeciesDefinition;
    this.speceisMostAffectedDefinition = FIELD_HELP_TEXT.speciesMostAffectedDefinition;
    this.startEndDatesDefinition = FIELD_HELP_TEXT.startEndDatesDefinition;
    this.associatedEventsDefinition = FIELD_HELP_TEXT.eventGroupIDTooltip;
    this.eventVisibilityDefinition = FIELD_HELP_TEXT.associatedEventDefinition;
    this.stateDefinition = FIELD_HELP_TEXT.stateTooltip;
    this.countryDefinition = FIELD_HELP_TEXT.countryTooltip;
    this.startDateDefinition = FIELD_HELP_TEXT.eventStartDateTooltip;
    this.endDateDefinition = FIELD_HELP_TEXT.eventEndDateTooltip;
    this.speciesDefinition = FIELD_HELP_TEXT.editSpeciesTooltip;
    this.speciesDefinition = FIELD_HELP_TEXT.populationTooltip;
    this.knownSickDefinition = FIELD_HELP_TEXT.knownSickTooltip;
    this.knownDeadDefinition = FIELD_HELP_TEXT.knownDeadTooltip;
    this.estSickDefinition = FIELD_HELP_TEXT.estimatedSickTooltip;
    this.estDeadDefinition = FIELD_HELP_TEXT.estimatedDeadTooltip;
    this.captiveDefinition = FIELD_HELP_TEXT.captiveTooltip;
    this.speciesDiagDefinition = FIELD_HELP_TEXT.speciesDiagnosisTooltip;
    this.numAssessedDefinition = FIELD_HELP_TEXT.numberAssessedTooltip;
    this.numWithDiagDefinition = FIELD_HELP_TEXT.numberWithDiagnosisTooltip;
    this.diagLabDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.commentTypeDefinition = FIELD_HELP_TEXT.locationCommentTypeTooltip;
    this.commentSourceDefinition = FIELD_HELP_TEXT.commentSourceDefinition;

    // converting whipsers logo png to a dataURL for use in pdfMake
    const whispersLogo = 'src/assets/logo-transparent.png';
    const context = this.canvas.getContext('2d');
    const base_image = new Image();
    this.canvas.width = 796;
    this.canvas.height = 90;
    base_image.src = whispersLogo;
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, 796, 90);
    };
    this.pngURL = this.canvas.toDataURL();

    if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
      setTimeout(() => {
        this.combinedComments = this.data.event_data.combined_comments;
        for (const comment of this.combinedComments) {
          // set the comment type string for each comment
          comment.comment_type_string = this.displayValuePipe.transform(comment.comment_type, 'name', this.commentTypes);
          // set the source string for each comment
          comment.source = this.eventLocationName(comment);
        }
      }, 1000);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingData = false;
    }, 1001);
  }

  getlocations() {
    // getting the locations that eventlocations
    this.data.event_data.eventlocations.forEach(e => {
      e.comments.forEach(s => {
        this.locationIdArray.push(s);
      });
    });

    // stripping the objects that have duplicate object_ids so that the count is i++.
    this.locationIdArray = this.locationIdArray.filter((v, i, a) => a.findIndex(t => (t.object_id === v.object_id)) === i);
  }

  MapResults(natMapPoints) {
    setTimeout(() => {
      const currentResultsMarkers = [];

      currentResultsMarkers.push({
        lat: Number(natMapPoints['administrativeleveltwos'][0]['centroid_latitude']),
        long: Number(natMapPoints['administrativeleveltwos'][0]['centroid_longitude'])
      });
      this.icon = L.divIcon({
        className: 'wmm-circle wmm-blue wmm-icon-circle wmm-icon-blue wmm-size-20'
      });

      L.marker([currentResultsMarkers[0].lat, currentResultsMarkers[0].long], { icon: this.icon }).addTo(this.natMap);
    }, 600);
  }

  // code for workaround for slanted text in pdfmake table. Not being used currently
  writeRotatedText = function (text) {
    let ctx;
    const canvas = document.createElement('canvas');
    // I am using predefined dimensions so either make this part of the arguments or change at will
    canvas.width = 60;
    canvas.height = 100;
    ctx = canvas.getContext('2d');
    ctx.font = '12pt Arial';
    ctx.save();
    ctx.translate(10, 100);
    ctx.rotate(-0.4 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fillText(text, 0, 0);
    ctx.restore();
    return canvas.toDataURL();
  };

  determineLocationName(name) {
    let locationName;

    if (name === '' || name === undefined) {
      locationName = 'Location ' + this.locationNumber;
    } else {
      locationName = 'Location ' + this.locationNumber + ' - ' + name;
    }

    return locationName;
  }

  // START defining event location table
  makeLocationTable(data) {
    let table;

    const locationHeaders = {
      eventLocationHeaders: {
        /* col_1: { image: this.writeRotatedText('Species'), style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] }, */
        col_1: { text: 'Species', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Population', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Known Sick', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Known Dead', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_5: { text: 'Est. Sick', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_6: { text: 'Est. Dead', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_7: { text: 'Captive', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_8: { text: 'Species Diagnosis', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_9: { text: '# Assessed/ # diagnosis', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_10: { text: 'Diagnostic Lab', border: [true, false, true, false], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] }
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
        row.push(header.col_10);
        locationBody.push(row);
      }
    }

    const rows = data;

    // pushing data into the rows
    for (const key in rows) {
      if (rows.hasOwnProperty(key)) {
        const elData = rows[key];
        const row = new Array();
        row.push(elData.species);
        row.push(elData.population);
        row.push(elData.known_sick);
        row.push({ text: elData.known_dead, alignment: 'center' });
        row.push({ text: elData.est_sick, alignment: 'center' });
        row.push({ text: elData.est_dead, alignment: 'center' });
        row.push({ text: elData.captive, alignment: 'center' });
        row.push(elData.species_dia);
        row.push({ text: elData.count, alignment: 'center' });
        row.push(elData.lab);
        locationBody.push(row);
      }
    }

    table = { /// item 4 in docDef
      alignment: 'justify',
      table: {
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
        }
      },
      pageBreak: 'after'
    };

    // attempted aligning rows
    /* const rowCount = locationBody.length;
    for (let i = 1; i < rowCount; i++) {
      locationBody[i][8].alignment = 'center';
    } */

    return table;
  }
  // END defining event location table

  // create header
  makeHeader() {
    let header;
    header = {
      alignment: 'justify',
      columns: [
        {
          image: this.pngURL,
          width: 450,
          height: 65
        },
        {
          style: 'header',
          text: 'Details of ' + this.data.event_data.event_type_string + ' Event ID ' + this.data.event_data.id,
          margin: [0, 10, 0, 0]
        }
      ]
    };
    return header;
  }

  // create location title
  makeTitle(data) {
    let country;
    if (data.country === undefined) {
      country = 'Not Specified';
    } else {
      country = data.country;
    }

    const state = data.state;
    const county = data.county;
    const start_date = data.sdate;
    const end_date = data.edate;
    const name = data.name;

    const title = {
      style: 'tableExample',
      table: {
        widths: [150, 100, 'auto', 120, 80, 80, 80],
        body: [
          [{ text: 'County (or equivalent):', bold: true, alignment: 'right' }, county, { text: name, bold: true }, '', '', '', ''],
          [{ text: 'State (or equivalent):', bold: true, alignment: 'right' }, state, '', '', '', '', ''],
          [{ text: 'Country: ', bold: true, alignment: 'right' }, country, ' ', { text: 'Start Date :', bold: true, alignment: 'right' }, start_date, { text: 'End Date: ', bold: true, alignment: 'right' }, end_date]
        ]
      },
      layout: 'noBorders'
    };
    return title;
  }

  makeHorizontalLine() {
    let line;
    line = {
      canvas: [{ type: 'line', x1: 0, y1: 5, x2: 790 - 2 * 10, y2: 5, lineWidth: 1 }]
    };
    return line;
  }

  makeCommentsTable() {
    let commentTable;
    this.combinedComments = this.combinedComments.sort((a, b) => a.date_sort - b.date_sort);

    // START defining comment table
    const commentHeaders = {
      commentHeaders: {
        col_1: { text: 'Comments', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Comment Type', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Created Date', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'User', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_5: { text: 'Organization', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
        col_6: { text: 'Comment Source', border: [false, false, false, false], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
      }
    };

    const commentBody = [];

    // pushing header row into the table
    for (const key in commentHeaders) {
      if (commentHeaders.hasOwnProperty(key)) {
        const header = commentHeaders[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        commentBody.push(row);
      }
    }

    const commentRows = this.combinedComments;

    // pushing data into the rows
    for (const key in commentRows) {
      if (commentRows.hasOwnProperty(key)) {
        const elData = commentRows[key];
        const row = new Array();
        row.push({ text: elData.comment, fontSize: 9 });
        row.push({ text: elData.comment_type_string, fontSize: 9 });
        row.push({ text: elData.created_date, fontSize: 9 });
        row.push({ text: elData.created_by_string, fontSize: 9 });
        row.push({ text: elData.created_by_organization_string, fontSize: 9 });
        row.push({ text: elData.source, fontSize: 9 });
        commentBody.push(row);
      }
    }
    // END defining comment table


    // Forming Location Table to push into doc defintion
    commentTable = {
      alignment: 'justify',
      table: {
        // heights: 40,
        headerRows: 1,
        dontBreakRows: true, // Some info on breaking table rows across pages: https://github.com/bpampuch/pdfmake/issues/1159
        body: commentBody,
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
    return commentTable;
  }

  makeExplanationDescription() {
    let explanationDescription;
    explanationDescription = {
      alignment: 'justify',
      text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n', { text: 'Disclaimer', fontSize: 11, bold: true }, '\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
      style: 'smaller',
    };
    return explanationDescription;
  }

  explanationPageHeader() {
    // Forming Explanation info to push into doc defintion
    let explanationPageHeader;
    explanationPageHeader = {
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
    };
    return explanationPageHeader;
  }

  explanationPartOne() {
    let explanationPartOne;
    explanationPartOne = {
      style: 'definitionsTable',
      table: {
        body: [
          [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventTypeDefinition, border: [false, false, false, false] }],
          [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventIdDefinition, border: [false, false, false, false] }],
          [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.contactOrgDefinition, border: [false, false, false, false] }],
          [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.recordStatusDefinition, border: [false, false, false, false] }],
          [{ text: '# of Locations', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numberOfLocationsDefinition, border: [false, false, false, false] }],
          [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countyDefinition, border: [false, false, false, false] }],
          [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventDiagDefinition, border: [false, false, false, false] }],
          [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }],
          [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAnimalsAffectedDefinition, border: [false, false, false, false] }],
          [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numSpeciesAffectedDefinition, border: [false, false, false, false] }],
          [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speceisMostAffectedDefinition, border: [false, false, false, false] }],
          [{ text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startEndDatesDefinition, border: [false, false, false, false] }],
          [{ text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.associatedEventsDefinition, border: [false, false, false, false] }],
          [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventVisibilityDefinition, border: [false, false, false, false] }],
        ]
      },
      layout: {
        defaultBorder: false,
        paddingLeft: function (i, node) { return 15; },
        paddingRight: function (i, node) { return 10; },
        // paddingTop: function(i, node) { return 10; }
      }
    };
    return explanationPartOne;
  }

  explanationOneForMoreDetails() {
    let explanationOneForMoreDetails;
    explanationOneForMoreDetails = {
      alignment: 'justify',
      text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
      style: 'smallest',
      pageBreak: 'after'
    };
    return explanationOneForMoreDetails;
  }

  explanationPartTwoHeader() {
    let explanationPartTwoHeader;
    explanationPartTwoHeader = {
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
    };
    return explanationPartTwoHeader;
  }
  explanationPartTwo() {
    let explanationPartTwo;
    explanationPartTwo = {
      style: 'definitionsTable',
      table: {
        body: [
          [{ text: 'State (or Equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.stateDefinition, border: [false, false, false, false] }],
          [{ text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countryDefinition, border: [false, false, false, false] }],
          [{ text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startDateDefinition, border: [false, false, false, false] }],
          [{ text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.endDateDefinition, border: [false, false, false, false] }],
          [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
          [{ text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
          [{ text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownSickDefinition, border: [false, false, false, false] }],
          [{ text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownDeadDefinition, border: [false, false, false, false] }],
          [{ text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estSickDefinition, border: [false, false, false, false] }],
          [{ text: 'Estimate Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estDeadDefinition, border: [false, false, false, false] }],
          [{ text: 'Captive', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.captiveDefinition, border: [false, false, false, false] }],
          [{ text: 'Species Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDiagDefinition, border: [false, false, false, false] }],
          [{ text: 'Number Assessed', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAssessedDefinition, border: [false, false, false, false] }],
          [{ text: 'Number with this Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numWithDiagDefinition, border: [false, false, false, false] }],
          [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }],
          [{ text: 'Comment Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Flags comment as belonging to a certain category. See metadata for details on options.', border: [false, false, false, false] }],
          [{ text: 'Comment Source', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.commentSourceDefinition, border: [false, false, false, false] }],
        ]
      },
      layout: {
        defaultBorder: false,
        paddingLeft: function (i, node) { return 15; },
        paddingRight: function (i, node) { return 10; },
        // paddingTop: function(i, node) { return 10; }
      }
    };
    return explanationPartTwo;
  }

  explanationTwoForMoreDetails() {
    let explanationTwoForMoreDetails;
    explanationTwoForMoreDetails = {
      alignment: 'justify',
      text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
      style: 'smallest',
    };
    return explanationTwoForMoreDetails;
  }

  getEventVisibility() {
    let text;
    if (this.data.event_data.public) {
      text = {
        text: 'VISIBLE TO THE PUBLIC'
      };
    } else {
      text = {
        text: 'NOT VISIBLE TO THE PUBLIC', bold: true
      };
    }
    return text;
  }

  getAssociatedEvents() {
    // Associated Events
    let associatedEvents;
    const eventsAndLinks = [];
    const eventIds = [];
    const eventLinks = [];
    let text;

    // Checking to see if there are event groups
    if (this.data.event_data.eventgroups.length === 0) {
      text = 'N/A';
    } else {
      associatedEvents = [];
      this.data.event_data.eventgroups.forEach(eg => {
        // only showing the event groups that are category 1
        if (eg.category === 1) {
          eg.events.forEach(element => {
            associatedEvents.push(element);
          });
        }
        text = associatedEvents.join(', ');
      });

      // associatedEvents = associatedEvents.join(', ');
      // converting to string and adding 'link' field
      for (let i = 0; i < associatedEvents.length; i++) {

        // formatting string so that there is not a ',' at the end of last associated event
        const addComma = associatedEvents.length - 1;
        if (i !== addComma) {
          eventsAndLinks.push({ text: associatedEvents[i].toString() + ', ', link: window.location.origin + '/' + associatedEvents[i].toString() });
        } else {
          eventsAndLinks.push({ text: associatedEvents[i].toString(), link: window.location.origin + '/' + associatedEvents[i].toString() });
        }
      }

      eventsAndLinks.forEach(el => {
        eventIds.push(el.text);
        eventLinks.push(el.link);
      });
    }
    return text;
  }

  getEventDates() {
    let startDate = this.data.event_data.start_date;
    let endDate = this.data.event_data.end_date;
    let text;

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    // getting date elements
    const sd = startDate.substr(8, 2);
    const sm = startDate.substr(5, 2);
    const sy = startDate.substr(0, 4);
    startDate = new Date(sy, sm, sd);

    if (endDate === null) {
      text = this.monthNames[startDate.getMonth() - 1] + ' ' + sd + ', ' + sy + ' - ' + ' N/A';
      return text;
    } else if (endDate !== null) {
      const ed = endDate.substr(8, 2);
      const em = endDate.substr(5, 2);
      const ey = endDate.substr(0, 4);
      endDate = new Date(ey, em, ed);
      let dayCount;

      dayCount = Math.round(Math.abs((startDate - endDate) / oneDay));

      text = this.monthNames[startDate.getMonth()] + ' ' + sd + ', ' + sy + ' - ' + this.monthNames[endDate.getMonth()] + ' ' + ed + ', ' + ey + ' (' + dayCount + ' days)';
      return text;
    }
  }

  eventLocationName(comment) {
    let locationName = '';
    let count;
    if (comment.content_type_string === 'servicerequest') {
      locationName = 'Service Request';
    } else if (comment.content_type_string === 'event') {
      locationName = 'Event';
    } else if (comment.content_type_string === 'eventlocation') {
      if (comment.object_name !== '') {

        // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
        // comments (same as on event details tab).
        // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.

        count = (this.locationIdArray.findIndex(c => c.object_id === comment.object_id)) + 1;
        locationName = 'Location ' + count + ' - ' + comment.object_name;
      } else {
        count = (this.locationIdArray.findIndex(c => c.object_id === comment.object_id)) + 1;
        locationName = 'Location ' + count;
      }
    }
    return locationName;
  }

  downloadEventReport() {
    this.downloadingReport = true;

    // google analytics event
    gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Downloaded Event Report' });

    // using html2Canvas to capture leaflet map for reports
    // solution found here: https://github.com/niklasvh/html2canvas/issues/567
    let natMapUrl;
    const mapPane = $('.leaflet-map-pane')[0];
    const mapTransform = mapPane.style.transform.split(',');
    const mapX = parseFloat(mapTransform[0].split('(')[1].replace('px', ''));
    const mapY = parseFloat(mapTransform[1].replace('px', ''));
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
      dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
      dy.push(parseFloat(splitTransform[1].replace('px', '')));
      myDivicons[i].style.transform = '';
      myDivicons[i].style.left = dx[i] + 'px';
      myDivicons[i].style.top = dy[i] + 'px';
    }

    const mapWidth = parseFloat($('#map').css('width').replace('px', ''));
    const mapHeight = parseFloat($('#map').css('height').replace('px', ''));

    const linesLayer = $('svg.leaflet-zoom-animated')[0];
    const oldLinesWidth = linesLayer.getAttribute('width');
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
    linesLayer.style.top = '';

    const options = {
      useCORS: true,
    };

    html2canvas(document.getElementById('hiddenNatMap'), options).then(function (canvas) {
      natMapUrl = canvas.toDataURL('image/png');
    });

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
    linesLayer.style.transform = 'translate(' + (linesX) + 'px,' + (linesY) + 'px)';
    linesLayer.setAttribute('viewBox', oldViewbox);
    linesLayer.setAttribute('width', oldLinesWidth);
    linesLayer.setAttribute('height', oldLinesHeight);
    mapPane.style.transform = 'translate(' + (mapX) + 'px,' + (mapY) + 'px)';
    mapPane.style.left = '';
    mapPane.style.top = '';
    // END national map

    // need to give some time for html2canvas to finish rendering
    setTimeout(() => {
      // Getting date/time for timestamp
      const date = APP_UTILITIES.getDateTime;

      // event details
      const data = this.data.event_data;

      // looping thru all organizations incase there are multiple
      const organizations = [];
      let orgString;
      for (const organization of data.eventorganizations) {
        organizations.push(organization.organization.name);
      }
      orgString = organizations.join(', ');

      // getting number of locations associated with event
      let locationCount;
      locationCount = data.eventlocations.length;

      // looping thru all counties of all locations
      const counties = [];
      for (const eventlocation of data.eventlocations) {
        let formattedString = '';
        let stateAbbrev;
        let countryAbbrev;

        stateAbbrev = this.adminLevelOnes.find(item => item.name === eventlocation.administrative_level_one_string);
        countryAbbrev = this.country.find(item => item.name === eventlocation.country_string);

        formattedString = eventlocation.administrative_level_two_string + ', ' + stateAbbrev.abbreviation + ', ' + countryAbbrev.abbreviation;
        counties.push(formattedString);
      }

      // looping thru all event diagsoses incase there are multiple
      const eventDiagnosises = [];
      for (const diagnosis of data.eventdiagnoses) {
        eventDiagnosises.push(diagnosis.diagnosis_string);
      }

      // looping thru event locations to get labs
      const hasLabs = [];
      const noLabs = 'N/A';

      data.eventlocations.forEach(el => {
        el.locationspecies.forEach(ls => {
          ls.speciesdiagnoses.forEach(sd => {
            if (sd.organizations_string.length === 0) {
              return;
            } else {
              hasLabs.push(sd.organizations_string);
            }
          });
        });
      });

      // display 'N/A' if there are no labs
      if (hasLabs.length === 0) {
        this.labs = noLabs;
      } else {
        this.labs = hasLabs;
      }


      // getting species affected count
      let speciesAffectedCount = 0;
      data.eventlocations.forEach(el => {
        el.locationspecies.forEach(ls => {
          speciesAffectedCount = speciesAffectedCount + 1;
        });
      });

      const startDate = data.start_date;
      const endDate = data.end_date;
      const formattedDate = data.start_date + ' - ' + data.end_date;

      // Species Most Affected
      let numberOfSpecies = 0;
      const eventType = data.event_type;
      let speciesArray;
      let speciesAffected;
      let affectedCount = 0;
      let positiveCount = 0;

      if (eventType === 1) { speciesArray = []; } // making speciesAffected an array only if the event is type 1)

      data.eventlocations.forEach(el => {
        el.locationspecies.forEach(ls => {
          numberOfSpecies = numberOfSpecies + 1;
          if (eventType === 1) { // if event is Morbidity/Mortality

            let deads;
            let sicks;

            // summing the dead and sick counts and estimations
            deads = ls.dead_count_estimated + ls.dead_count;
            sicks = ls.sick_count_estimated + ls.sick_count;

            affectedCount = deads + sicks;

            speciesArray.push({ name: ls.species_string, affected_count: affectedCount });

          } else if (eventType === 2) { // if event is Surveillance
            ls.speciesdiagnoses.forEach(sd => {
              positiveCount = positiveCount + sd.positive_count;
            });
            affectedCount = positiveCount;
            speciesAffected = affectedCount;
          }

          // sorting highest to lowest so that species most affected is first in the array
          if (eventType === 1) {
            const speciesMostAffectedArray = []; // incase there are two or more with the same amount affected
            speciesArray = speciesArray.sort((a, b) => b.affected_count - a.affected_count);
            const speciesWithMostAffectedCount = speciesArray[0].affected_count;
            for (const species of speciesArray) {
              if (species.affected_count === speciesWithMostAffectedCount) {
                speciesMostAffectedArray.push(species.name);
              }
            }
            if (speciesMostAffectedArray.length > 0) {
              speciesAffected = speciesMostAffectedArray.join(', ');
            } else {
              speciesAffected = speciesArray[0].name;
            }
          }
        });
      });

      // Event Visibility
      let eventVisibility;
      if (data.public) {
        eventVisibility = 'VISIBLE TO THE PUBLIC';
      } else {
        eventVisibility = 'NOT VISIBLE TO THE PUBLIC';
      }

      // whispers logo
      this.pngURL = this.canvas.toDataURL();
      console.log(this.pngURL);
      console.log(this.data.map);
      console.log(natMapUrl);

      // printing user's info
      const nameOrgString = this.data.user.first_name + ' ' + this.data.user.last_name + ' (' + this.data.user.organization_string + ')';

      // formatting full URL for footer
      const url = window.location.href;

      const eventLocation = data.eventlocations[0].locationspecies;
      this.eventLocsPlusDiagnoses = [];
      let speciesDiag = [];
      let labs = [];
      let eventLocNum = 0;
      for (const event_location of this.data.event_data.eventlocations) {
        eventLocNum = eventLocNum + 1;
        labs = [];
        speciesDiag = [];

        // checking to see if this eventlocation has a species. If not, then we don't want to inlcude it in the array used to make the tables
        if (event_location.locationspecies.length !== 0) {
          for (const locationspecies of event_location.locationspecies) {

            // checking to see if this location species has a species diagnosis. If not, then we add it to the array with 'Not Assesed' in diagnoses field.
            if (locationspecies.speciesdiagnoses.length === 0) {
              let captive = locationspecies.captive;
              // pdfmake does not like 'undefined' values so setting them to empty string
              const pop = locationspecies.population_count || ' ';
              const ksick = locationspecies.sick_count || ' ';
              const kdead = locationspecies.dead_count || ' ';
              const esick = locationspecies.sick_count_estimated || ' ';
              const edead = locationspecies.dead_count_estimated || ' ';
              const sdate = event_location.start_date || 'N/A';
              const edate = event_location.end_date || 'N/A';
              captive = 'Yes' || 'No';
              const s_diag = ' ';
              const county = ' ';
              const country = locationspecies.country_string || ' ';
              const lab = ' ';

              let locationName;

              if (event_location.name === '' || event_location.name === undefined) {
                locationName = 'Location ' + eventLocNum;
              } else {
                locationName = 'Location ' + eventLocNum + ' - ' + event_location.name;
              }

              speciesDiag.push({
                species: locationspecies.species_string,
                population: pop,
                known_sick: ksick,
                known_dead: kdead,
                est_sick: esick,
                est_dead: edead,
                captive: captive,
                species_dia: 'Not Assessed',
                count: ' ',
                lab: lab,
                county: county,
                state: locationspecies.administrative_level_one_string,
                country: country,
                sdate: sdate,
                edate: edate,
                name: locationName,
              });
            }

            // Loop through each species diagnoses for a location species
            for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
              const numAssess = speciesdiagnosis.tested_count + '/' + speciesdiagnosis.diagnosis_count;
              let captive = locationspecies.captive;

              // pdfmake does not like 'undefined' values so setting them to empty string
              const pop = locationspecies.population_count || ' ';
              const ksick = locationspecies.sick_count || ' ';
              const kdead = locationspecies.dead_count || ' ';
              const esick = locationspecies.sick_count_estimated || ' ';
              const edead = locationspecies.dead_count_estimated || ' ';
              const sdate = event_location.start_date || 'N/A';
              const edate = event_location.end_date || 'N/A';
              captive = 'Yes' || 'No';
              const s_diag = speciesdiagnosis.diagnosis_string || ' ';
              const county = locationspecies.administrative_level_two_string || ' ';
              let lab = speciesdiagnosis.organizations_string[0] || ' ';

              let locationName;

              if (event_location.name === '' || event_location.name === undefined) {
                locationName = 'Location ' + eventLocNum;
              } else {
                locationName = 'Location ' + eventLocNum + ' - ' + event_location.name;
              }

              if (speciesdiagnosis.organizations_string.length > 0) {
                for (const l of speciesdiagnosis.organizations_string) {
                  labs.push(speciesdiagnosis.organizations_string[0]);
                }
                lab = labs.join(', ');
              }

              speciesDiag.push({
                species: locationspecies.species_string,
                population: pop,
                known_sick: ksick,
                known_dead: kdead,
                est_sick: esick,
                est_dead: edead,
                captive: captive,
                species_dia: s_diag,
                count: numAssess,
                lab: lab,
                county: county,
                state: locationspecies.administrative_level_one_string,
                country: locationspecies.country_string,
                sdate: sdate,
                edate: edate,
                name: locationName,
              });
            }
          }
          this.eventLocsPlusDiagnoses.push(speciesDiag);
        }
      }


      // check for user role so that we show them the right report
      const docDefinition = {
        pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 35],
        footer: function (currentPage, pageCount) {
          return {
            margin: [20, 0, 20, 0],
            style: 'smallest',
            columns: [
              {
                width: 700,
                text: ['Report generated by +' + nameOrgString + ' from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at https://whispers.usgs.gov.'
                ]
              },
              {
                width: 50,
                alignment: 'right',
                text: 'Page ' + currentPage.toString() + ' of ' + pageCount
              }
            ]
          };
        },
        content: [
          {
            alignment: 'justify',
            columns: [
              {
                image: this.pngURL,
                width: 450,
                height: 65,
                margin: [0, 0, 0, 30]
              },
              {
                style: 'header',
                text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id,
                margin: [0, 15, 0, 0]
              },
            ]
          },
          {
            // style: 'tableExample',
            table: {
              // width: [400, 'auto'],
              body: [
                [
                  {
                    style: 'smaller',
                    table: {
                      widths: [180, 250],
                      body: [
                        [{ border: [false, false, true, false], text: 'Contact Organziation(s)', bold: true, alignment: 'right' }, { text: orgString }],
                        [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, data.event_status_string],
                        [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                        [{ border: [false, false, false, false], text: 'Summary Info', bold: true, fontSize: 16, margin: [30, 10] }, ' '],
                        [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                        [{ border: [false, false, true, false], text: '# of Locations', bold: true, alignment: 'right' }, locationCount],
                        [{ border: [false, false, true, false], text: 'County (or Equivalent)', bold: true, alignment: 'right' }, counties.toString()],
                        [{ border: [false, false, true, false], text: 'Event Diagnosis', bold: true, alignment: 'right' }, eventDiagnosises],
                        [{ border: [false, false, true, false], text: 'Diagnostic Laboratory', bold: true, alignment: 'right' }, this.labs],
                        [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, data.affected_count],
                        [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, speciesAffectedCount],
                        [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, speciesAffected],
                        [{ border: [false, false, true, false], text: 'Event Start Date - End Date', bold: true, alignment: 'right' }, this.getEventDates()], // TODO: format according to wireframe & Create function to get count of total days event lasted
                        [{ border: [false, false, true, false], text: 'Associated Events', bold: true, alignment: 'right' }, this.getAssociatedEvents()], // TODO: Figure out what to do regarding links & Display none if there are none {text: eventIds, link: 'http://localhost:4200/event/' + associatedEvents, color: '#0000EE'}
                        [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, this.getEventVisibility()]
                      ],
                    },
                    layout: {
                      defaultBorder: false,
                      paddingLeft: function (i, node) { return 15; },
                      paddingRight: function (i, node) { return 10; },
                    },
                  },
                  [
                    {
                      alignment: 'center',
                      image: natMapUrl,
                      width: 300,
                      height: 200
                    },
                    {
                      text: ' \n\n'
                    },
                    {
                      alignment: 'center',
                      image: this.data.map,
                      width: 200,
                      height: 200,
                    },
                  ],
                ],
              ],
            },
            layout: 'noBorders'
          },
        ],
        images: {
          logo: this.pngURL,
          map: this.data.map,
          nationalMap: natMapUrl
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

      // pushing pre-made tables and other elements into doc definition
      for (const loc of this.eventLocsPlusDiagnoses) {
        docDefinition.content.push(this.makeHeader());
        docDefinition.content.push(this.makeTitle(loc[0]));
        docDefinition.content.push(this.makeHorizontalLine());
        docDefinition.content.push(this.makeLocationTable(loc));
      }

      if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
        docDefinition.content.push(this.makeCommentsTable());
      }

      docDefinition.content.push(this.explanationPageHeader());
      docDefinition.content.push(this.makeExplanationDescription());
      docDefinition.content.push(this.explanationPartOne());
      docDefinition.content.push(this.explanationOneForMoreDetails());

      if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
        docDefinition.content.push(this.explanationPartTwoHeader());
        docDefinition.content.push(this.explanationPartTwo());
        docDefinition.content.push(this.explanationTwoForMoreDetails());
      }

      pdfMake.createPdf(docDefinition).download();
      this.downloadingReport = false;
      this.eventPublicReportDialogRef.close();
    }, 4000);
  }

}
