import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { Inject } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import domtoimage from "dom-to-image";
import * as L from "leaflet";
import * as esri from "esri-leaflet";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatDialog, MatDialogRef } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { DisplayValuePipe } from "../pipes/display-value.pipe";
import { timer } from "rxjs";
import { APP_SETTINGS } from "@app/app.settings";
import { APP_UTILITIES } from "@app/app.utilities";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";
import { Comment } from "@interfaces/comment";
import { CommentService } from "@services/comment.service";
import { CommentTypeService } from "@app/services/comment-type.service";
import { EventService } from "@app/services/event.service";
import { AdministrativeLevelOneService } from "@app/services/administrative-level-one.service";
import { CountryService } from "@app/services/country.service";
import { CommentType } from "@interfaces/comment-type";
import { EventDetail } from "@interfaces/event-detail";
import { Title } from "@angular/platform-browser";
declare let gtag: Function;

@Component({
  selector: "app-event-public-report",
  templateUrl: "./event-public-report.component.html",
  styleUrls: ["./event-public-report.component.scss"],
})
export class EventPublicReportComponent implements OnInit, AfterViewInit {
  canvas = document.createElement("canvas");
  loadingData = false;
  labs;
  eventLocsPlusDiagnoses;
  test = [];
  combinedComments;
  eventLocationSpecies = [];
  natMap;
  detailMap;
  detailMapUrl;
  downloadingReport = false;
  locationMarkers;
  unMappables = [];
  eventPolys;
  icon;
  adminLevelOnes;
  country;
  noLargeComments = true;

  // creating variables for field definitions
  eventTypeDefinition = "";
  eventIdDefinition = "";
  contactOrgDefinition = "";
  recordStatusDefinition = "";
  numberOfLocationsDefinition = "";
  countyDefinition = "";
  eventDiagDefinition = "";
  labDefinition = "";
  numAnimalsAffectedDefinition = "";
  numSpeciesAffectedDefinition = "";
  speciesMostAffectedDefinition = "";
  startEndDatesDefinition = "";
  associatedEventsDefinition = "";
  eventVisibilityDefinition = "";
  stateDefinition = "";
  countryDefinition = "";
  startDateDefinition = "";
  endDateDefinition = "";
  speciesDefinition = "";
  populationDefinition = "";
  knownSickDefinition = "";
  knownDeadDefinition = "";
  estSickDefinition = "";
  estDeadDefinition = "";
  captiveDefinition = "";
  speciesDiagDefinition = "";
  numAssessedDefinition = "";
  numWithDiagDefinition = "";
  diagLabDefinition = "";
  commentTypeDefinition = "";
  commentSourceDefinition = "";
  // END creating variables for field definitions

  errorMessage;
  secondToLastPageNoFooter;
  locationNumber = 1;
  pngURL;
  locationIdArray = [];
  commentTypes: CommentType[];
  eventsAndLinks = [];
  value = 0;
  printReady = false;
  loggedIn = false;

  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  constructor(
    public eventPublicReportDialogRef: MatDialogRef<EventPublicReportComponent>,
    private displayValuePipe: DisplayValuePipe,
    private commentTypeService: CommentTypeService,
    public eventService: EventService,
    private administrativeLevelOneService: AdministrativeLevelOneService,
    private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadingData = true;

    this.administrativeLevelOneService.getAdminLevelOnes().subscribe(
      (adminLevelOnes) => {
        this.adminLevelOnes = adminLevelOnes;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    this.countryService.getCountries().subscribe(
      (countries) => {
        this.country = countries;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    // Code for maps with results to produce map images for report
    const streets = esri.basemapLayer("Streets");
    const streets2 = esri.basemapLayer("Streets");

    this.natMap = new L.Map("natMap", {
      center: new L.LatLng(39.8283, -98.5795),
      zoomControl: false,
      zoom: 3,
      attributionControl: true,
      layers: [streets],
    });

    this.detailMap = new L.Map("detailMap", {
      center: new L.LatLng(39.8283, -98.5795),
      zoom: 5,
      zoomControl: false,
      attributionControl: true,
      layers: [streets2],
    });

    // adding scale bars
    L.control.scale({ position: "bottomright" }).addTo(this.natMap);
    L.control.scale({ position: "bottomright" }).addTo(this.detailMap);

    // Currently not displaying location markers because of display issue
    /* this.locationMarkers = L.featureGroup().addTo(this.detailMap); */

    this.mapEvent(this.data.event_data);

    setTimeout(() => {
      const view = [];
      view.push({
        lat: Number(
          this.data.event_summary["administrativeleveltwos"][0][
            "centroid_latitude"
          ]
        ),
        long: Number(
          this.data.event_summary["administrativeleveltwos"][0][
            "centroid_longitude"
          ]
        ),
      });
      this.natMap.setView([view[0].lat, view[0].long]);
      this.loadProgressBar();
      this.loadingData = false;
    }, 1000);

    this.natMap.dragging.disable();
    this.natMap.touchZoom.disable();
    this.natMap.doubleClickZoom.disable();
    this.natMap.scrollWheelZoom.disable();

    this.detailMap.dragging.disable();
    this.detailMap.touchZoom.disable();
    this.detailMap.doubleClickZoom.disable();
    this.detailMap.scrollWheelZoom.disable();

    // mapping the event centroid for the national map
    setTimeout(() => {
      this.MapResults();
      this.loadingData = true;
    }, 600);

    // Displays county image if needed
    /* const countyPreview = this.data.map;
    document.getElementById('countyPreview').src = countyPreview; */
    if (
      this.data.user.role !== 7 &&
      this.data.user.role !== 6 &&
      this.data.user.role !== undefined
    ) {
      this.getlocations();
    }

    if (
      this.data.user.role !== 7 &&
      this.data.user.role !== 6 &&
      this.data.user.role !== undefined
    ) {
      this.secondToLastPageNoFooter = true;
    } else {
      this.secondToLastPageNoFooter = false;
    }
    // get comment types from the commentTypes service
    this.commentTypeService.getCommentTypes().subscribe((commentTypes) => {
      this.commentTypes = commentTypes;
    });

    // Setting variables for field definitions
    this.eventTypeDefinition = FIELD_HELP_TEXT.editEventTypeTooltip;
    this.eventIdDefinition = FIELD_HELP_TEXT.eventIDTooltip;
    this.contactOrgDefinition = FIELD_HELP_TEXT.editContactOrganizationTooltip;
    this.recordStatusDefinition = FIELD_HELP_TEXT.editRecordStatusTooltip;
    this.numberOfLocationsDefinition =
      FIELD_HELP_TEXT.numberOfLocationsDefinition;
    this.countyDefinition = FIELD_HELP_TEXT.editCountyTooltip;
    this.eventDiagDefinition = FIELD_HELP_TEXT.editEventDiagnosisTooltip;
    this.labDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.numAnimalsAffectedDefinition = FIELD_HELP_TEXT.numAnimalsAffected;
    this.numSpeciesAffectedDefinition =
      FIELD_HELP_TEXT.numberOfSpeciesDefinition;
    this.speciesMostAffectedDefinition =
      FIELD_HELP_TEXT.speciesMostAffectedDefinition;
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
    // END Setting variables for field definitions

    // converting whipsers logo png to a dataURL for use in pdfMake
    const whispersLogo = "./assets/logo-transparent.png";
    const context = this.canvas.getContext("2d");
    const base_image = new Image();
    this.canvas.width = 796;
    this.canvas.height = 90;
    base_image.src = whispersLogo;
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, 796, 90);
    };
    this.pngURL = this.canvas.toDataURL();

    if (
      this.data.user.role !== 7 &&
      this.data.user.role !== 6 &&
      this.data.user.role !== undefined
    ) {
      setTimeout(() => {
        if (this.data.event_data.combined_comments) {
          this.combinedComments = this.data.event_data.combined_comments;
          for (const comment of this.combinedComments) {
            // set the comment type string for each comment
            comment.comment_type_string = this.displayValuePipe.transform(
              comment.comment_type,
              "name",
              this.commentTypes
            );
            // set the source string for each comment
            comment.source = this.eventLocationName(comment);
          }
        }
      }, 1000);
    }
    if (this.data.user.username) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngAfterViewInit() {}

  loadProgressBar() {
    const source = timer(5, 5);
    const subscribe = source.subscribe((val) => {
      this.value = val;
    });
  }

  mapEvent(eventData) {
    const markers = [];
    const countyPolys = [];
    this.unMappables = [];
    // establish a temp array to store the admin level twos added in the loop, to prevent duplicates.
    let adminLevelTwos = [];
    for (const eventlocation of eventData.eventlocations) {
      // markers.push(eventlocation);
      if (
        eventlocation.administrative_level_two_points !== null &&
        !adminLevelTwos.includes(eventlocation.administrative_level_two)
      ) {
        countyPolys.push(
          JSON.parse(
            eventlocation.administrative_level_two_points.replace("Y", "")
          )
        );
        // push the AL2 of the current event location to the temp array
        adminLevelTwos.push(eventlocation.administrative_level_two);
      }
    }
    /* console.log('mapevents ' + this.locationMarkers); */
    // let eventPolys;
    if (countyPolys.length > 0) {
      if (this.eventPolys) {
        this.detailMap.removeLayer(this.eventPolys);
      }
      this.eventPolys = L.polygon(countyPolys, { color: "blue" }).addTo(
        this.detailMap
      );
    }
    /* for (const marker of markers) {
      if (marker.latitude === null || marker.longitude === null || marker.latitude === undefined || marker.longitude === undefined) {
        this.unMappables.push(marker);
      } else if (marker.latitude !== null || marker.longitude !== null || marker.latitude !== undefined || marker.longitude !== undefined) {

        this.icon = L.divIcon({
          className: 'wmm-pin wmm-white wmm-icon-circle wmm-icon-black wmm-size-25'
        });

        L.marker([Number(marker.latitude), Number(marker.longitude)],
          { icon: this.icon })
          .addTo(this.locationMarkers);
      }

    } */

    if (this.unMappables.length > 0) {
    }

    const bounds = L.latLngBounds([]);

    if (markers.length > this.unMappables.length) {
      const markerBounds = this.locationMarkers.getBounds();
      bounds.extend(markerBounds);
    }

    if (countyPolys.length > 0) {
      const countyBounds = this.eventPolys.getBounds();
      bounds.extend(countyBounds);
    }

    if (markers.length || countyPolys.length) {
      this.detailMap.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  getlocations() {
    // getting the locations that eventlocations
    this.data.event_data.eventlocations.forEach((e) => {
      if (e.comments) {
        e.comments.forEach((s) => {
          this.locationIdArray.push(s);
        });
      }
    });

    // stripping the objects that have duplicate object_ids so that the count is i++.
    this.locationIdArray = this.locationIdArray.filter(
      (v, i, a) => a.findIndex((t) => t.object_id === v.object_id) === i
    );
  }

  MapResults() {
    const currentResultsMarkers = [];

    currentResultsMarkers.push({
      lat: Number(
        this.data.event_summary["administrativeleveltwos"][0][
          "centroid_latitude"
        ]
      ),
      long: Number(
        this.data.event_summary["administrativeleveltwos"][0][
          "centroid_longitude"
        ]
      ),
    });
    this.icon = L.divIcon({
      className:
        "wmm-circle wmm-blue wmm-icon-circle wmm-icon-blue wmm-size-20",
    });
    L.marker([currentResultsMarkers[0].lat, currentResultsMarkers[0].long], {
      icon: this.icon,
    }).addTo(this.natMap);
  }

  // code for workaround for slanted text in pdfmake table. Not being used currently
  /* writeRotatedText = function (text) {
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
  }; */

  determineLocationName(name) {
    let locationName;

    if (name === "" || name === undefined) {
      locationName = "Location " + this.locationNumber;
    } else {
      locationName = "Location " + this.locationNumber + " - " + name;
    }

    return locationName;
  }

  // START defining event location table
  makeLocationTable(data) {
    let table;

    const locationHeaders = {
      eventLocationHeaders: {
        /* col_1: { image: this.writeRotatedText('Species'), style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] }, */
        col_1: {
          text: "Species",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_2: {
          text: "Population",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_3: {
          text: "Known Sick",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_4: {
          text: "Known Dead",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_5: {
          text: "Est. Sick",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_6: {
          text: "Est. Dead",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_7: {
          text: "Captive",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_8: {
          text: "Species Diagnosis",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_9: {
          text: "# Assessed/# with Diagnosis",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_10: {
          text: "Diagnostic Lab",
          border: [true, false, false, false],
          style: "tableHeader",
          bold: true,
          alignment: "left",
          margin: [0, 8, 0, 0],
        },
      },
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
        row.push({ text: elData.species, fontSize: 10 });
        row.push({
          text: elData.population,
          alignment: "center",
          fontSize: 10,
        });
        row.push({
          text: elData.known_sick,
          alignment: "center",
          fontSize: 10,
        });
        row.push({
          text: elData.known_dead,
          alignment: "center",
          fontSize: 10,
        });
        row.push({ text: elData.est_sick, alignment: "center", fontSize: 10 });
        row.push({ text: elData.est_dead, alignment: "center", fontSize: 10 });
        row.push({ text: elData.captive, alignment: "center", fontSize: 10 });
        row.push({ text: elData.species_dia, alignment: "left", fontSize: 10 });
        row.push({ text: elData.count, alignment: "center", fontSize: 10 });
        row.push({ text: elData.lab, alignment: "left", fontSize: 10 });
        locationBody.push(row);
      }
    }

    table = {
      /// item 4 in docDef
      alignment: "justify",
      table: {
        headerRows: 1,
        dontBreakRows: true,
        body: locationBody,
      },
      layout: {
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length
            ? "lightgray"
            : "lightgray";
        },
        vLineColor: function (i, node) {
          return i === 0 || i === node.table.widths.length
            ? "lightgray"
            : "lightgray";
        },
      },
      pageBreak: "after",
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
      alignment: "justify",
      columns: [
        {
          image: this.pngURL,
          width: 450,
          height: 65,
        },
        {
          style: "header",
          alignment: "right",
          text:
            "Details of " +
            this.data.event_data.event_type_string +
            " Event ID " +
            this.data.event_data.id,
          margin: [0, 20, 0, 0],
        },
      ],
    };
    return header;
  }

  // create space
  makeSpace() {
    let space;
    space = {
      text: " \n",
    };
    return space;
  }

  // create location title
  makeTitle(data) {
    let country;
    if (data.country === undefined) {
      country = "Not Specified";
    } else {
      country = data.country;
    }

    const state = data.state;
    const county = data.county;
    const start_date = data.sdate;
    const end_date = data.edate;
    const name = data.name;

    const title = {
      style: "tableExample",
      table: {
        widths: [150, 100, 200, 80, 80, 80, 80],
        body: [
          [
            { text: "County (or equivalent):", bold: true, alignment: "right" },
            county,
            { text: name, bold: true },
            "",
            "",
            "",
            "",
          ],
          [
            { text: "State (or equivalent):", bold: true, alignment: "right" },
            state,
            "",
            "",
            "",
            "",
            "",
          ],
          [
            { text: "Country: ", bold: true, alignment: "right" },
            country,
            " ",
            { text: "Start Date :", bold: true, alignment: "right" },
            start_date,
            { text: "End Date: ", bold: true, alignment: "right" },
            end_date,
          ],
        ],
      },
      layout: "noBorders",
    };
    return title;
  }

  makeHorizontalLine() {
    let line;
    line = {
      canvas: [
        { type: "line", x1: 0, y1: 5, x2: 790 - 2 * 10, y2: 5, lineWidth: 1 },
      ],
    };
    return line;
  }

  makeCommentsTitle() {
    let title;
    title = {
      alignment: "justify",
      columns: [
        {
          image: this.pngURL,
          width: 450,
          height: 65,
          margin: [0, 0, 0, 30],
        },
        {
          style: "header",
          alignment: "right",
          text: "Comments Timeline for Event ID " + this.data.event_data.id,
          margin: [0, 20, 0, 0],
        },
      ],
    };
    return title;
  }

  makeCommentsTable() {
    let commentTable;

    if (this.combinedComments) {
      this.combinedComments = this.combinedComments.sort(
        (a, b) => a.date_sort - b.date_sort
      );
    }

    // START defining comment table
    const commentHeaders = {
      commentHeaders: {
        col_1: {
          text: "Comments",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_2: {
          text: "Comment Type",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_3: {
          text: "Created Date",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_4: {
          text: "User",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_5: {
          text: "Organization",
          border: [false, false, true, true],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        col_6: {
          text: "Comment Source",
          border: [false, false, false, false],
          style: "tableHeader",
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
      },
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
        row.push({ text: elData.comment, fontSize: 10 });
        row.push({ text: elData.comment_type_string, fontSize: 10 });
        row.push({ text: elData.created_date, fontSize: 10 });
        row.push({ text: elData.created_by_string, fontSize: 10 });
        row.push({
          text: elData.created_by_organization_string,
          alignment: "left",
          fontSize: 10,
        });
        row.push({ text: elData.source, alignment: "left", fontSize: 10 });
        commentBody.push(row);

        // allowing large comments to break pages
        if (commentRows[key].comment.length > 2200) {
          this.noLargeComments = false;
        }
      }
    }
    // END defining comment table

    // Forming Location Table to push into doc defintion
    commentTable = {
      alignment: "justify",
      table: {
        // heights: 40,
        widths: [350, "*", "*", "*", 100, "*"],
        headerRows: 1,
        dontBreakRows: this.noLargeComments, // Some info on breaking table rows across pages: https://github.com/bpampuch/pdfmake/issues/1159
        body: commentBody,
      },
      layout: {
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length
            ? "lightgray"
            : "lightgray";
        },
        vLineColor: function (i, node) {
          return i === 0 || i === node.table.widths.length
            ? "lightgray"
            : "lightgray";
        },
      },
      pageBreak: "after",
    };
    return commentTable;
  }

  makeExplanationDescription() {
    let explanationDescription;
    explanationDescription = {
      alignment: "justify",
      text: [
        "WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n\n",
        { text: "Disclaimer", fontSize: 11, bold: true },
        "\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n",
      ],
      style: "explanation",
    };
    return explanationDescription;
  }

  explanationPageHeader() {
    // Forming Explanation info to push into doc defintion
    let explanationPageHeader;
    explanationPageHeader = {
      alignment: "justify",
      columns: [
        {
          image: this.pngURL,
          width: 450,
          height: 65,
        },
        {
          text: "Explanation of Terms",
          margin: [0, 20, 0, 0],
          style: "header",
          alignment: "right",
        },
      ],
    };
    return explanationPageHeader;
  }

  explanationPartOne() {
    let explanationPartOne;
    explanationPartOne = {
      style: "definitionsTable",
      table: {
        widths: [105, "*"],
        body: [
          [
            {
              text: "Event Type",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.eventTypeDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Event ID",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.eventIdDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Contact Organization",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.contactOrgDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Record Status",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.recordStatusDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "# of Locations",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.numberOfLocationsDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "County (or equivalent)",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.countyDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Event Diagnosis",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.eventDiagDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Diagnostic Laboratory",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            { text: this.labDefinition, border: [false, false, false, false] },
          ],
          [
            {
              text: "# of Animals Affected",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.numAnimalsAffectedDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "# of Species Affected",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.numSpeciesAffectedDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Species Most Affected",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.speciesMostAffectedDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Event Start Date - End Date",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.startEndDatesDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Associated Events",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.associatedEventsDefinition,
              border: [false, false, false, false],
            },
          ],
          [
            {
              text: "Event Visibility",
              border: [false, false, true, false],
              alignment: "right",
              bold: true,
            },
            {
              text: this.eventVisibilityDefinition,
              border: [false, false, false, false],
            },
          ],
        ],
      },
      layout: {
        defaultBorder: false,
        paddingLeft: function (i, node) {
          return 15;
        },
        paddingRight: function (i, node) {
          return 10;
        },
        // paddingTop: function(i, node) { return 10; }
      },
    };
    return explanationPartOne;
  }

  explanationOneForMoreDetails() {
    let explanationOneForMoreDetails;
    explanationOneForMoreDetails = {
      alignment: "justify",
      margin: [0, 25, 0, 0], // situating this text in the footer position
      text: [
        "\n\nFor more details, see WHISPers metadata at ",
        {
          text: "https://www.usgs.gov/nwhc/whispers",
          link: "https://www.usgs.gov/nwhc/whispers",
          color: "#0000EE",
        },
        ".",
      ],
      style: "footer",
    };
    return explanationOneForMoreDetails;
  }

  explanationPartTwoHeader() {
    let explanationPartTwoHeader;
    explanationPartTwoHeader = {
      alignment: "justify",
      columns: [
        {
          image: this.pngURL,
          width: 450,
          height: 65,
        },
        {
          text: "Explanation of Terms cont...",
          margin: [0, 20, 0, 0],
          style: "header",
          alignment: "right",
        },
      ],
    };
    return explanationPartTwoHeader;
  }
  explanationPartTwo() {
    let explanationPartTwo;
    if (
      this.data.user.role !== 7 &&
      this.data.user.role !== 6 &&
      this.data.user.role !== undefined
    ) {
      explanationPartTwo = {
        style: "definitionsTable",
        id: "explanationPartTwo",
        table: {
          widths: [105, "*"],
          body: [
            [
              {
                text: "State (or equivalent)",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.stateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Country",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.countryDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Start Date",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.startDateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "End Date",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.endDateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Species",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.speciesDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Population",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.populationDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Known Sick",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.knownSickDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Known Dead",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.knownDeadDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Estimated Sick",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.estSickDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Estimated Dead",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.estDeadDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Captive",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.captiveDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Species Diagnosis",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.speciesDiagDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Number Assessed",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.numAssessedDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Number with this Diagnosis",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.numWithDiagDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Diagnostic Laboratory",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.labDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Comment Type",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: "Flags comment as belonging to a certain category. See metadata for details on options.",
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Comment Source",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.commentSourceDefinition,
                border: [false, false, false, false],
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
          paddingLeft: function (i, node) {
            return 15;
          },
          paddingRight: function (i, node) {
            return 10;
          },
          // paddingTop: function(i, node) { return 10; }
        },
      };
      return explanationPartTwo;
    } else {
      explanationPartTwo = {
        style: "definitionsTable",
        id: "explanationPartTwo",
        table: {
          widths: [105, "*"],
          body: [
            [
              {
                text: "State (or equivalent)",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.stateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Country",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.countryDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Start Date",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.startDateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "End Date",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.endDateDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Species",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.speciesDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Population",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.speciesDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Known Sick",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.knownSickDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Known Dead",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.knownDeadDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Estimated Sick",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.estSickDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Estimated Dead",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.estDeadDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Captive",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.captiveDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Species Diagnosis",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.speciesDiagDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Number Assessed",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.numAssessedDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Number with this Diagnosis",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.numWithDiagDefinition,
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "Diagnostic Laboratory",
                border: [false, false, true, false],
                alignment: "right",
                bold: true,
              },
              {
                text: this.labDefinition,
                border: [false, false, false, false],
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
          paddingLeft: function (i, node) {
            return 15;
          },
          paddingRight: function (i, node) {
            return 10;
          },
          // paddingTop: function(i, node) { return 10; }
        },
      };
      return explanationPartTwo;
    }
  }

  explanationTwoForMoreDetails() {
    let explanationTwoForMoreDetails;
    if (
      this.data.user.role !== 7 &&
      this.data.user.role !== 6 &&
      this.data.user.role !== undefined
    ) {
      explanationTwoForMoreDetails = {
        alignment: "justify",
        margin: [0, 70, 0, 0], // situating this text in the footer position
        text: [
          "\n\nFor more details, see WHISPers metadata at ",
          {
            text: "https://www.usgs.gov/nwhc/whispers",
            link: "https://www.usgs.gov/nwhc/whispers",
            color: "#0000EE",
          },
          ".",
        ],
        style: "footer",
      };
      return explanationTwoForMoreDetails;
    } else {
      explanationTwoForMoreDetails = {
        alignment: "justify",
        margin: [0, 105, 0, 0], // situating this text in the footer position
        text: [
          "\n\nFor more details, see WHISPers metadata at ",
          {
            text: "https://www.usgs.gov/nwhc/whispers",
            link: "https://www.usgs.gov/nwhc/whispers",
            color: "#0000EE",
          },
          ".",
        ],
        style: "footer",
      };
      return explanationTwoForMoreDetails;
    }
  }

  getEventVisibility() {
    let text;
    if (
      this.data.event_data.public === undefined ||
      this.data.event_data.public === true
    ) {
      text = {
        text: "Visible to the public",
      };
    } else if (this.data.event_data.public === false) {
      text = {
        text: "NOT VISIBLE TO THE PUBLIC",
        bold: true,
      };
    }
    return text;
  }

  getAssociatedEvents() {
    // Associated Events
    let associatedEvents;
    const eventIds = [];
    const eventLinks = [];
    let text;

    // Checking to see if there are event groups
    if (this.data.event_data.eventgroups.length === 0) {
      this.eventsAndLinks.push({ text: "N/A" });
    } else {
      associatedEvents = [];
      this.data.event_data.eventgroups.forEach((eg) => {
        // only showing the event groups that are category 1
        if (eg.category === 1) {
          eg.events.forEach((element) => {
            associatedEvents.push(element);
          });
        } else if (eg.category === undefined) {
          // public endpoint doesn't have the 'category' property on it but does post eventgroups
          eg.events.forEach((element) => {
            associatedEvents.push(element);
          });
        }

        text = associatedEvents.join(", ");
      });

      // associatedEvents = associatedEvents.join(', ');
      // converting to string and adding 'link' field
      for (let i = 0; i < associatedEvents.length; i++) {
        // formatting string so that there is not a ',' at the end of last associated event
        const addComma = associatedEvents.length - 1;
        if (i !== addComma) {
          this.eventsAndLinks.push({
            text: associatedEvents[i].toString(),
            link:
              window.location.origin +
              "/event/" +
              associatedEvents[i].toString(),
            color: "blue",
          });
          this.eventsAndLinks.push({ text: ", " });
        } else {
          this.eventsAndLinks.push({
            text: associatedEvents[i].toString(),
            link: window.location.origin + "/" + associatedEvents[i].toString(),
            color: "blue",
          });
        }
      }
    }
  }

  getEventDates() {
    let startDate = this.data.event_data.start_date;
    let endDate = this.data.event_data.end_date;
    let text;

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    // getting date elements
    const sd = startDate.substr(8, 2);
    let sm = startDate.substr(5, 2);
    const sy = startDate.substr(0, 4);

    sm = Number(sm);
    sm = sm - 1;

    startDate = new Date(sy, sm, sd);

    if (endDate === null) {
      text = this.monthNames[sm] + " " + sd + ", " + sy + " - " + " N/A";
      return text;
    } else if (endDate !== null) {
      const ed = endDate.substr(8, 2);
      let em = endDate.substr(5, 2);
      const ey = endDate.substr(0, 4);

      em = Number(em);
      em = em - 1;

      endDate = new Date(ey, em, ed);
      let dayCount;

      dayCount = Math.round(Math.abs((startDate - endDate) / oneDay));

      /* const startMonth = startDate.getMonth() < 12 ? startDate.getMonth() + 1 : 1; */

      text =
        this.monthNames[sm] +
        " " +
        sd +
        ", " +
        sy +
        " - " +
        this.monthNames[em] +
        " " +
        ed +
        ", " +
        ey +
        " (" +
        dayCount +
        " days)";
      return text;
    }
  }

  eventLocationName(comment) {
    let locationName = "";
    let count;
    if (comment.content_type_string === "servicerequest") {
      locationName = "Service Request";
    } else if (comment.content_type_string === "event") {
      locationName = "Event";
    } else if (comment.content_type_string === "eventlocation") {
      if (comment.object_name !== "") {
        // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
        // comments (same as on event details tab).
        // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.

        count =
          this.locationIdArray.findIndex(
            (c) => c.object_id === comment.object_id
          ) + 1;
        locationName = "Location " + count + " - " + comment.object_name;
      } else {
        count =
          this.locationIdArray.findIndex(
            (c) => c.object_id === comment.object_id
          ) + 1;
        locationName = "Location " + count;
      }
    }
    return locationName;
  }

  checkForDuplicateDiagnosis(array) {
    const unique = array.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    return unique.join(";\n");
  }

  downloadEventReport() {
    this.downloadingReport = true;
    const detailMap = true;
    this.getAssociatedEvents();
    // google analytics event
    gtag("event", "click", {
      event_category: "Event Details",
      event_label: "Downloaded Event Report",
    });

    // using dom-to-image to capture leaflet map for reports
    let natMapUrl;
    let natMapEvent;
    let detailMapUrl;
    // converting detail map div to png and dataurl for use in pdfmake
    domtoimage
      .toPng(document.getElementById("detailMap"), {
        quality: 0.95,
        width: 400,
        height: 300,
      })
      .then(function (dataUrl) {
        var detailLink = document.createElement("a");
        detailLink.href = dataUrl;
        detailMapUrl = detailLink.href;
      });

      // converting national map div to png and dataurl for use in pdfmake
    domtoimage
      .toPng(document.getElementById("natMap"), {
        quality: 0.95,
        width: 400,
        height: 300,
      })
      .then(function (dataUrl) {
        var nationalLink = document.createElement("a");
        nationalLink.href = dataUrl;
        natMapUrl = nationalLink.href;
        natMapEvent = new Event("images_ready");

        // hack for now: leave time for image generation. without this timeout, results were inconsistent and 2nd map image 
        // to generate was undefined for the docDefinition below.
        setTimeout(() => {
          window.dispatchEvent(natMapEvent); // Dispatching an event for when the image is done rendering
        }, 2000);
      });

    // need to give some time for images to finish rendering
    window.addEventListener(
      "images_ready",
      (event) => {
        // Getting date/time for timestamp
        const date = APP_UTILITIES.getReportDateTime;

        event.stopPropagation();
        console.log(
          "images ready event fired. detailMapUrl value: " +
            detailMapUrl.toString()
        );

        // event details
        const data = this.data.event_data;

        // looping thru all organizations incase there are multiple
        const organizations = [];
        if (
          data.organizations !== undefined &&
          data.organizations.length !== 0
        ) {
          for (const organization of data.organizations) {
            /* organizations.push(organization.organization.name); */

            organizations.push(organization.organization.name);
          }
        } else {
          organizations.push("N/A");
        }

        // getting number of locations associated with event
        let locationCount;
        locationCount = data.eventlocations.length;

        // looping thru all counties of all locations
        const counties = [];
        for (let i = 0; i < data.eventlocations.length; i++) {
          let formattedString = "";
          let stateAbbrev;
          let countryAbbrev;
          const semiColon = data.eventlocations.length - 1;

          stateAbbrev = this.adminLevelOnes.find(
            (item) =>
              item.name ===
              data.eventlocations[i].administrative_level_one_string
          );
          countryAbbrev = this.country.find(
            (item) => item.name === data.eventlocations[i].country_string
          );
          if (i !== semiColon) {
            formattedString =
              data.eventlocations[i].administrative_level_two_string +
              ", " +
              stateAbbrev.abbreviation +
              ", " +
              countryAbbrev.abbreviation +
              "; ";
            counties.push(formattedString);
          } else {
            formattedString =
              data.eventlocations[i].administrative_level_two_string +
              ", " +
              stateAbbrev.abbreviation +
              ", " +
              countryAbbrev.abbreviation;
            counties.push(formattedString);
          }
        }

        // looping thru all event diagsoses incase there are multiple
        const eventDiagnosises = [];
        for (const diagnosis of data.eventdiagnoses) {
          eventDiagnosises.push(diagnosis.diagnosis_string);
        }

        // looping thru event locations to get labs
        const hasLabs = [];
        const noLabs = "N/A";

        data.eventlocations.forEach((el) => {
          el.locationspecies.forEach((ls) => {
            ls.speciesdiagnoses.forEach((sd) => {
              if (sd.organizations_string.length === 0) {
                return;
              } else {
                sd.organizations_string.forEach((org) => {
                  hasLabs.push(org);
                });
              }
            });
          });
        });

        // display 'N/A' if there are no labs
        if (hasLabs.length === 0) {
          this.labs = noLabs;
        } else {
          this.labs = this.checkForDuplicateDiagnosis(hasLabs);
          // this.labs = hasLabs;
        }

        // getting species affected count
        // putting all species for each eventlocation into an array
        const speciesTotal = [];
        let speciesAffectedCount = 0;
        data.eventlocations.forEach((el) => {
          el.locationspecies.forEach((ls) => {
            speciesTotal.push(ls.species);
          });
        });

        // function for filtering out duplicates
        const distinct = (value, index, self) => {
          return self.indexOf(value) === index;
        };
        // filtering out the duplicates
        const distinctSpecies = speciesTotal.filter(distinct);

        // setting distinct species count
        speciesAffectedCount = distinctSpecies.length;

        // Species Most Affected
        let numberOfSpecies = 0;
        const eventType = data.event_type;
        let speciesArray;
        let speciesAffected;
        let affectedCount = 0;
        let positiveCount = 0;

        if (eventType === 1) {
          speciesArray = [];
        } // making speciesAffected an array only if the event is type 1)

        data.eventlocations.forEach((el) => {
          el.locationspecies.forEach((ls) => {
            numberOfSpecies = numberOfSpecies + 1;
            if (eventType === 1) {
              // if event is Morbidity/Mortality

              let deads;
              let sicks;

              // summing the dead and sick counts and estimations
              deads = ls.dead_count_estimated + ls.dead_count;
              sicks = ls.sick_count_estimated + ls.sick_count;

              affectedCount = deads + sicks;

              speciesArray.push({
                name: ls.species_string,
                affected_count: affectedCount,
              });
            } else if (eventType === 2) {
              // if event is Surveillance
              ls.speciesdiagnoses.forEach((sd) => {
                positiveCount = positiveCount + sd.positive_count;
              });
              affectedCount = positiveCount;
              speciesAffected = affectedCount;
            }

            // sorting highest to lowest so that species most affected is first in the array
            if (eventType === 1) {
              const speciesMostAffectedArray = []; // incase there are two or more with the same amount affected
              speciesArray = speciesArray.sort(
                (a, b) => b.affected_count - a.affected_count
              );
              const speciesWithMostAffectedCount =
                speciesArray[0].affected_count;
              for (const species of speciesArray) {
                if (species.affected_count === speciesWithMostAffectedCount) {
                  speciesMostAffectedArray.push(species.name);
                }
              }
              if (speciesMostAffectedArray.length > 0) {
                speciesAffected = speciesMostAffectedArray.join(", ");
              } else {
                speciesAffected = speciesArray[0].name;
              }
            }
          });
        });

        if (speciesAffected === undefined) {
          speciesAffected = "N/A";
        }

        // Event Visibility
        let eventVisibility;
        if (data.public) {
          eventVisibility = "VISIBLE TO THE PUBLIC";
        } else {
          eventVisibility = "NOT VISIBLE TO THE PUBLIC";
        }

        // whispers logo
        this.pngURL = this.canvas.toDataURL();

        // printing user's info
        let nameOrgString;
        if (!this.loggedIn) {
          nameOrgString = "";
        } else {
          nameOrgString =
            "by " +
            this.data.user.first_name +
            " " +
            this.data.user.last_name +
            " (" +
            this.data.user.organization_string +
            ") ";
        }

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
                const pop = locationspecies.population_count || " ";
                const ksick = locationspecies.sick_count || " ";
                const kdead = locationspecies.dead_count || " ";
                const esick = locationspecies.sick_count_estimated || " ";
                const edead = locationspecies.dead_count_estimated || " ";
                let sdate;
                if (
                  event_location.start_date === null ||
                  event_location.start_date === undefined
                ) {
                  sdate = "N/A";
                } else {
                  sdate = APP_UTILITIES.formatEventDates(
                    event_location.start_date
                  );
                }
                let edate;
                if (
                  event_location.end_date === null ||
                  event_location.end_date === undefined
                ) {
                  edate = "N/A";
                } else {
                  edate = APP_UTILITIES.formatEventDates(
                    event_location.end_date
                  );
                }
                // setting text for captive boolean
                if (captive) {
                  captive = "Yes";
                } else {
                  captive = "No";
                }
                const s_diag = " ";
                const county =
                  locationspecies.administrative_level_two_string || " ";
                const country = locationspecies.country_string || " ";
                const lab = " ";

                let locationName;

                if (
                  event_location.name === "" ||
                  event_location.name === undefined
                ) {
                  locationName = "Location " + eventLocNum;
                } else {
                  locationName =
                    "Location " + eventLocNum + " - " + event_location.name;
                }

                speciesDiag.push({
                  species: locationspecies.species_string,
                  population: pop,
                  known_sick: ksick,
                  known_dead: kdead,
                  est_sick: esick,
                  est_dead: edead,
                  captive: captive,
                  species_dia: "Not Assessed",
                  count: " ",
                  lab: lab,
                  county: county,
                  state: locationspecies.administrative_level_one_string,
                  country: country,
                  sdate: sdate,
                  edate: edate,
                  name: locationName,
                });
              }

              if (locationspecies.speciesdiagnoses.length > 0) {
                const multipleDiags = [];
                const multipleNums = [];
                const multipleLabs = [];
                if (locationspecies.speciesdiagnoses.length > 0) {
                  for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                    let num;
                    multipleDiags.push(speciesdiagnosis.diagnosis_string);
                    if (
                      speciesdiagnosis.tested_count === null &&
                      speciesdiagnosis.diagnosis_count === null
                    ) {
                      num = "N/A";
                    } else {
                      const testedCount = speciesdiagnosis.tested_count || 0;
                      const diagnosisCount =
                        speciesdiagnosis.diagnosis_count || 0;
                      num = testedCount + "/" + diagnosisCount;
                    }
                    multipleNums.push(num);

                    if (speciesdiagnosis.organizations_string === null) {
                      multipleLabs.push("N/A");
                    } else if (
                      speciesdiagnosis.organizations_string.length > 0
                    ) {
                      for (const l of speciesdiagnosis.organizations_string) {
                        multipleLabs.push(l);
                      }
                    }
                  }
                }

                let captive = locationspecies.captive;

                // pdfmake does not like 'undefined' values so setting them to empty string
                const pop = locationspecies.population_count || " ";
                const ksick = locationspecies.sick_count || " ";
                const kdead = locationspecies.dead_count || " ";
                const esick = locationspecies.sick_count_estimated || " ";
                const edead = locationspecies.dead_count_estimated || " ";
                let sdate;
                if (
                  event_location.start_date === null ||
                  event_location.start_date === undefined
                ) {
                  sdate = "N/A";
                } else {
                  sdate = APP_UTILITIES.formatEventDates(
                    event_location.start_date
                  );
                }
                let edate;
                if (
                  event_location.end_date === null ||
                  event_location.end_date === undefined
                ) {
                  edate = "N/A";
                } else {
                  edate = APP_UTILITIES.formatEventDates(
                    event_location.end_date
                  );
                }

                // setting text for captive boolean
                if (captive) {
                  captive = "Yes";
                } else {
                  captive = "No";
                }

                // accounting for multiple species diagnoses for 1 location species
                let s_diag;
                let lab;
                let numAssess;
                if (multipleDiags.length > 0) {
                  // lab
                  s_diag = multipleDiags.join(";\n");
                  lab = multipleLabs.join(";\n");
                  numAssess = multipleNums.join(";\n");
                } else {
                  s_diag =
                    locationspecies.speciesdiagnoses.diagnosis_string || " ";
                  numAssess = "";
                  if (
                    locationspecies.speciesdiagnoses.organizations_string ===
                    undefined
                  ) {
                    lab = "";
                  } else {
                    lab =
                      locationspecies.speciesdiagnoses.organizations_string[0];
                  }
                }

                // const s_diag = speciesdiagnosis.diagnosis_string || ' ';
                const county =
                  locationspecies.administrative_level_two_string || " ";

                let locationName;

                if (
                  event_location.name === "" ||
                  event_location.name === undefined
                ) {
                  locationName = "Location " + eventLocNum;
                } else {
                  locationName =
                    "Location " + eventLocNum + " - " + event_location.name;
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

        let recordStatus;
        if (this.data.event_data.complete) {
          recordStatus = "Complete";
        } else {
          recordStatus = "Incomplete";
        }

        // check for user role so that we show them the right report
        const docDefinition = {
          pageOrientation: "landscape",
          pageMargins: [20, 20, 20, 35],
          footer: function (currentPage, pageCount) {
            const SecondToLastPage = pageCount - 1;
            if (currentPage === SecondToLastPage) {
              return;
            }
            if (currentPage !== pageCount) {
              return {
                margin: [20, 0, 20, 0],
                style: "footer",
                columns: [
                  {
                    width: 700,
                    text: [
                      "Report generated " + nameOrgString + "from ",
                      { text: url, link: url, color: "#0000EE" },
                      " on " +
                        date +
                        ". \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at ",
                      {
                        text: "https://whispers.usgs.gov",
                        link: "https://whispers.usgs.gov",
                        color: "#0000EE",
                      },
                      ".",
                    ],
                  },
                  {
                    width: 50,
                    alignment: "right",
                    text: "Page " + currentPage.toString(),
                  },
                ],
              };
            }
          },
          content: [
            {
              alignment: "justify",
              columns: [
                {
                  image: this.pngURL,
                  width: 450,
                  height: 65,
                  margin: [0, 0, 0, 30],
                },
                {
                  style: "header",
                  alignment: "right",
                  text:
                    "Summary of " +
                    data.event_type_string +
                    " Event ID " +
                    data.id,
                  margin: [0, 20, 0, 0],
                },
              ],
            },
            {
              // style: 'tableExample',
              table: {
                // width: [400, 'auto'],
                body: [
                  [
                    {
                      style: "smaller",
                      table: {
                        widths: [180, 250],
                        body: [
                          [
                            {
                              border: [false, false, true, false],
                              text: "Contact Organization(s)",
                              bold: true,
                              alignment: "right",
                            },
                            organizations.join(";\n"),
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Record Status",
                              bold: true,
                              alignment: "right",
                            },
                            recordStatus,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Report Generated On",
                              bold: true,
                              alignment: "right",
                            },
                            date,
                          ],
                          [
                            {
                              border: [false, false, false, false],
                              text: "Summary Information",
                              bold: true,
                              fontSize: 22,
                              margin: [30, 10],
                              colSpan: 2,
                            },
                            " ",
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "# of Locations",
                              bold: true,
                              alignment: "right",
                            },
                            locationCount,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "County (or equivalent)",
                              bold: true,
                              alignment: "right",
                            },
                            [{ text: counties }],
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Event Diagnosis",
                              bold: true,
                              alignment: "right",
                            },
                            eventDiagnosises.join(";\n"),
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Diagnostic Laboratory",
                              bold: true,
                              alignment: "right",
                            },
                            this.labs,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "# of Animals Affected",
                              bold: true,
                              alignment: "right",
                            },
                            data.affected_count,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "# of Species Affected",
                              bold: true,
                              alignment: "right",
                            },
                            speciesAffectedCount,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Species Most Affected",
                              bold: true,
                              alignment: "right",
                            },
                            speciesAffected,
                          ],
                          [
                            {
                              border: [false, false, true, false],
                              text: "Event Start Date - End Date",
                              bold: true,
                              alignment: "right",
                            },
                            this.getEventDates(),
                          ], // TODO: format according to wireframe & Create function to get count of total days event lasted
                          [
                            {
                              border: [false, false, true, false],
                              text: "Associated Events",
                              bold: true,
                              alignment: "right",
                            },
                            [{ text: this.eventsAndLinks }],
                          ], // TODO: Figure out what to do regarding links & Display none if there are none {text: eventIds, link: 'http://localhost:4200/event/' + associatedEvents, color: '#0000EE'}
                          [
                            {
                              border: [false, false, true, false],
                              text: "Event Visibility",
                              bold: true,
                              alignment: "right",
                            },
                            this.getEventVisibility(),
                          ],
                        ],
                      },
                      layout: {
                        defaultBorder: false,
                        paddingLeft: function (i, node) {
                          return 15;
                        },
                        paddingRight: function (i, node) {
                          return 10;
                        },
                      },
                    },
                    [
                      {
                        alignment: "center",
                        image: natMapUrl,
                        width: 300,
                        height: 200,
                      },
                      {
                        text: " \n\n",
                      },
                      {
                        alignment: "center",
                        image: detailMapUrl,
                        width: 300,
                        height: 200,
                      },
                    ],
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
          images: {
            logo: this.pngURL,
            detailMap: detailMapUrl,
            nationalMap: natMapUrl,
          },
          styles: {
            header: {
              fontSize: 15,
              bold: true,
            },
            bigger: {
              fontSize: 18,
              bold: true,
            },
            explanation: {
              fontSize: 9,
            },
            smaller: {
              fontSize: 10,
            },
            smallest: {
              fontSize: 8,
            },
            footer: {
              fontSize: 9,
            },
            definitionsTable: {
              fontSize: 9,
            },
          },
          defaultStyle: {
            columnGap: 20,
          },
        };

        // pushing pre-made tables and other elements into doc definition
        for (const loc of this.eventLocsPlusDiagnoses) {
          docDefinition.content.push(this.makeHeader());
          docDefinition.content.push(this.makeTitle(loc[0]));
          docDefinition.content.push(this.makeHorizontalLine());
          docDefinition.content.push(this.makeSpace());
          docDefinition.content.push(this.makeLocationTable(loc));
        }

        if (
          this.data.user.role !== 7 &&
          this.data.user.role !== 6 &&
          this.data.user.role !== undefined &&
          this.data.event_data.combined_comments
        ) {
          docDefinition.content.push(this.makeCommentsTitle());
          docDefinition.content.push(this.makeCommentsTable());
        }

        docDefinition.content.push(this.explanationPageHeader());
        docDefinition.content.push(this.makeExplanationDescription());
        docDefinition.content.push(this.explanationPartOne());
        docDefinition.content.push(this.explanationOneForMoreDetails());
        docDefinition.content.push(this.explanationPartTwoHeader());
        docDefinition.content.push(this.explanationPartTwo());
        docDefinition.content.push(this.explanationTwoForMoreDetails());

        pdfMake
          .createPdf(docDefinition)
          .download(
            "WHISPers_Event_" +
              this.data.event_data.id +
              "_" +
              APP_UTILITIES.getFileNameDate +
              ".pdf"
          );
        this.downloadingReport = false;
        this.eventPublicReportDialogRef.close();
      },
      {
        once: true, // Only add listnener once. If this is not set then it will print multiple times after the first print if the page is not reloaded
      }
    );
  }
}
