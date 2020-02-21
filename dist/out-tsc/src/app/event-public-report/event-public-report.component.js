"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var pdfMake_1 = require("pdfmake/build/pdfMake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var L = require("leaflet");
pdfMake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var html2canvas_1 = require("html2canvas");
var rxjs_1 = require("rxjs");
var app_utilities_1 = require("@app/app.utilities");
var app_field_help_text_1 = require("@app/app.field-help-text");
var comment_type_service_1 = require("@app/services/comment-type.service");
var event_service_1 = require("@app/services/event.service");
var administrative_level_one_service_1 = require("@app/services/administrative-level-one.service");
var country_service_1 = require("@app/services/country.service");
var EventPublicReportComponent = /** @class */ (function () {
    function EventPublicReportComponent(eventPublicReportDialogRef, displayValuePipe, commentTypeService, eventService, administrativeLevelOneService, countryService, data) {
        this.eventPublicReportDialogRef = eventPublicReportDialogRef;
        this.displayValuePipe = displayValuePipe;
        this.commentTypeService = commentTypeService;
        this.eventService = eventService;
        this.administrativeLevelOneService = administrativeLevelOneService;
        this.countryService = countryService;
        this.data = data;
        this.canvas = document.createElement('canvas');
        this.loadingData = false;
        this.test = [];
        this.eventLocationSpecies = [];
        this.downloadingReport = false;
        this.unMappables = [];
        // creating variables for field definitions
        this.eventTypeDefinition = '';
        this.eventIdDefinition = '';
        this.contactOrgDefinition = '';
        this.recordStatusDefinition = '';
        this.numberOfLocationsDefinition = '';
        this.countyDefinition = '';
        this.eventDiagDefinition = '';
        this.labDefinition = '';
        this.numAnimalsAffectedDefinition = '';
        this.numSpeciesAffectedDefinition = '';
        this.speciesMostAffectedDefinition = '';
        this.startEndDatesDefinition = '';
        this.associatedEventsDefinition = '';
        this.eventVisibilityDefinition = '';
        this.stateDefinition = '';
        this.countryDefinition = '';
        this.startDateDefinition = '';
        this.endDateDefinition = '';
        this.speciesDefinition = '';
        this.populationDefinition = '';
        this.knownSickDefinition = '';
        this.knownDeadDefinition = '';
        this.estSickDefinition = '';
        this.estDeadDefinition = '';
        this.captiveDefinition = '';
        this.speciesDiagDefinition = '';
        this.numAssessedDefinition = '';
        this.numWithDiagDefinition = '';
        this.diagLabDefinition = '';
        this.commentTypeDefinition = '';
        this.commentSourceDefinition = '';
        this.locationNumber = 1;
        this.locationIdArray = [];
        this.eventsAndLinks = [];
        this.value = 0;
        this.printReady = false;
        this.loggedIn = false;
        this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    EventPublicReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingData = true;
        this.administrativeLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.countryService.getCountries()
            .subscribe(function (countries) {
            _this.country = countries;
        }, function (error) {
            _this.errorMessage = error;
        });
        var Attr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
        // tslint:disable-next-line:max-line-length
        Url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        var streets = L.tileLayer(Url, { id: 'mapbox.streets', attribution: Attr });
        var streets2 = L.tileLayer(Url, { id: 'mapbox.streets', attribution: Attr, noWrap: true });
        this.natMap = new L.Map('hiddenNatMap', {
            center: new L.LatLng(39.8283, -98.5795),
            zoomControl: false,
            zoom: 3,
            attributionControl: false,
            layers: [streets]
        });
        this.detailMap = new L.Map('detailMap', {
            center: new L.LatLng(39.8283, -98.5795),
            zoom: 5,
            zoomControl: false,
            attributionControl: false,
            layers: [streets2]
        });
        // adding scale bars
        L.control.scale({ position: 'bottomright' }).addTo(this.natMap);
        L.control.scale({ position: 'bottomright' }).addTo(this.detailMap);
        // Currently not displaying location markers because of display issue
        /* this.locationMarkers = L.featureGroup().addTo(this.detailMap); */
        this.mapEvent(this.data.event_data);
        setTimeout(function () {
            var view = [];
            view.push({
                lat: Number(_this.data.event_summary['administrativeleveltwos'][0]['centroid_latitude']),
                long: Number(_this.data.event_summary['administrativeleveltwos'][0]['centroid_longitude'])
            });
            _this.natMap.setView([view[0].lat, view[0].long]);
            _this.loadProgressBar();
            _this.loadingData = false;
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
        setTimeout(function () {
            _this.MapResults();
            _this.loadingData = true;
        }, 600);
        // Displays county image if needed
        /* const countyPreview = this.data.map;
        document.getElementById('countyPreview').src = countyPreview; */
        if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
            this.getlocations();
        }
        if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
            this.secondToLastPageNoFooter = true;
        }
        else {
            this.secondToLastPageNoFooter = false;
        }
        // get comment types from the commentTypes service
        this.commentTypeService.getCommentTypes()
            .subscribe(function (commentTypes) {
            _this.commentTypes = commentTypes;
        });
        // Setting variables for field definitions
        this.eventTypeDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip;
        this.eventIdDefinition = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip;
        this.contactOrgDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editContactOrganizationTooltip;
        this.recordStatusDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editRecordStatusTooltip;
        this.numberOfLocationsDefinition = app_field_help_text_1.FIELD_HELP_TEXT.numberOfLocationsDefinition;
        this.countyDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editCountyTooltip;
        this.eventDiagDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip;
        this.labDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editLabTooltip;
        this.numAnimalsAffectedDefinition = app_field_help_text_1.FIELD_HELP_TEXT.numAnimalsAffected;
        this.numSpeciesAffectedDefinition = app_field_help_text_1.FIELD_HELP_TEXT.numberOfSpeciesDefinition;
        this.speciesMostAffectedDefinition = app_field_help_text_1.FIELD_HELP_TEXT.speciesMostAffectedDefinition;
        this.startEndDatesDefinition = app_field_help_text_1.FIELD_HELP_TEXT.startEndDatesDefinition;
        this.associatedEventsDefinition = app_field_help_text_1.FIELD_HELP_TEXT.associatedEventDefinition;
        this.eventVisibilityDefinition = app_field_help_text_1.FIELD_HELP_TEXT.eventVisibility;
        this.stateDefinition = app_field_help_text_1.FIELD_HELP_TEXT.stateTooltip;
        this.countryDefinition = app_field_help_text_1.FIELD_HELP_TEXT.countryTooltip;
        this.startDateDefinition = app_field_help_text_1.FIELD_HELP_TEXT.locationStartDateTooltip;
        this.endDateDefinition = app_field_help_text_1.FIELD_HELP_TEXT.locationEndDateTooltip;
        this.speciesDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesTooltip;
        this.populationDefinition = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip;
        this.knownSickDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editKnownSickTooltip;
        this.knownDeadDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editKnownDeadTooltip;
        this.estSickDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedSickTooltip;
        this.estDeadDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedDeadTooltip;
        this.captiveDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editCaptiveTooltip;
        this.speciesDiagDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip;
        this.numAssessedDefinition = app_field_help_text_1.FIELD_HELP_TEXT.numberAssessedTooltip;
        this.numWithDiagDefinition = app_field_help_text_1.FIELD_HELP_TEXT.numberWithDiagnosisTooltip;
        this.diagLabDefinition = app_field_help_text_1.FIELD_HELP_TEXT.editLabTooltip;
        this.commentTypeDefinition = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTypeTooltip;
        this.commentSourceDefinition = app_field_help_text_1.FIELD_HELP_TEXT.commentSourceDefinition;
        // END Setting variables for field definitions
        // converting whipsers logo png to a dataURL for use in pdfMake
        var whispersLogo = './assets/logo-transparent.png';
        var context = this.canvas.getContext('2d');
        var base_image = new Image();
        this.canvas.width = 796;
        this.canvas.height = 90;
        base_image.src = whispersLogo;
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, 796, 90);
        };
        this.pngURL = this.canvas.toDataURL();
        if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
            setTimeout(function () {
                _this.combinedComments = _this.data.event_data.combined_comments;
                for (var _i = 0, _a = _this.combinedComments; _i < _a.length; _i++) {
                    var comment = _a[_i];
                    // set the comment type string for each comment
                    comment.comment_type_string = _this.displayValuePipe.transform(comment.comment_type, 'name', _this.commentTypes);
                    // set the source string for each comment
                    comment.source = _this.eventLocationName(comment);
                }
            }, 1000);
        }
        if (this.data.user.username) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    };
    EventPublicReportComponent.prototype.ngAfterViewInit = function () {
    };
    EventPublicReportComponent.prototype.loadProgressBar = function () {
        var _this = this;
        var source = rxjs_1.timer(5, 5);
        var subscribe = source.subscribe(function (val) {
            _this.value = val;
        });
    };
    EventPublicReportComponent.prototype.mapEvent = function (eventData) {
        var markers = [];
        var countyPolys = [];
        this.unMappables = [];
        for (var _i = 0, _a = eventData.eventlocations; _i < _a.length; _i++) {
            var eventlocation = _a[_i];
            // markers.push(eventlocation);
            if (eventlocation.administrative_level_two_points !== null) {
                countyPolys.push(JSON.parse(eventlocation.administrative_level_two_points.replace('Y', '')));
            }
        }
        /* console.log('mapevents ' + this.locationMarkers); */
        // let eventPolys;
        if (countyPolys.length > 0) {
            if (this.eventPolys) {
                this.detailMap.removeLayer(this.eventPolys);
            }
            this.eventPolys = L.polygon(countyPolys, { color: 'blue' }).addTo(this.detailMap);
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
        var bounds = L.latLngBounds([]);
        if (markers.length > this.unMappables.length) {
            var markerBounds = this.locationMarkers.getBounds();
            bounds.extend(markerBounds);
        }
        if (countyPolys.length > 0) {
            var countyBounds = this.eventPolys.getBounds();
            bounds.extend(countyBounds);
        }
        if (markers.length || countyPolys.length) {
            this.detailMap.fitBounds(bounds, { padding: [30, 30] });
        }
    };
    EventPublicReportComponent.prototype.getlocations = function () {
        var _this = this;
        // getting the locations that eventlocations
        this.data.event_data.eventlocations.forEach(function (e) {
            e.comments.forEach(function (s) {
                _this.locationIdArray.push(s);
            });
        });
        // stripping the objects that have duplicate object_ids so that the count is i++.
        this.locationIdArray = this.locationIdArray.filter(function (v, i, a) { return a.findIndex(function (t) { return (t.object_id === v.object_id); }) === i; });
    };
    EventPublicReportComponent.prototype.MapResults = function () {
        var currentResultsMarkers = [];
        currentResultsMarkers.push({
            lat: Number(this.data.event_summary['administrativeleveltwos'][0]['centroid_latitude']),
            long: Number(this.data.event_summary['administrativeleveltwos'][0]['centroid_longitude'])
        });
        this.icon = L.divIcon({
            className: 'wmm-circle wmm-blue wmm-icon-circle wmm-icon-blue wmm-size-20'
        });
        L.marker([currentResultsMarkers[0].lat, currentResultsMarkers[0].long], { icon: this.icon }).addTo(this.natMap);
    };
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
    EventPublicReportComponent.prototype.determineLocationName = function (name) {
        var locationName;
        if (name === '' || name === undefined) {
            locationName = 'Location ' + this.locationNumber;
        }
        else {
            locationName = 'Location ' + this.locationNumber + ' - ' + name;
        }
        return locationName;
    };
    // START defining event location table
    EventPublicReportComponent.prototype.makeLocationTable = function (data) {
        var table;
        var locationHeaders = {
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
                col_9: { text: '# Assessed/# with Diagnosis', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_10: { text: 'Diagnostic Lab', border: [true, false, false, false], style: 'tableHeader', bold: true, alignment: 'left', margin: [0, 8, 0, 0] }
            }
        };
        // [{image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}]
        var locationBody = [];
        // pushing header row into the table
        for (var key in locationHeaders) {
            if (locationHeaders.hasOwnProperty(key)) {
                var header = locationHeaders[key];
                var row = new Array();
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
        var rows = data;
        // pushing data into the rows
        for (var key in rows) {
            if (rows.hasOwnProperty(key)) {
                var elData = rows[key];
                var row = new Array();
                row.push({ text: elData.species, fontSize: 10 });
                row.push({ text: elData.population, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.known_sick, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.known_dead, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.est_sick, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.est_dead, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.captive, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.species_dia, alignment: 'left', fontSize: 10 });
                row.push({ text: elData.count, alignment: 'center', fontSize: 10 });
                row.push({ text: elData.lab, alignment: 'left', fontSize: 10 });
                locationBody.push(row);
            }
        }
        table = {
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
    };
    // END defining event location table
    // create header
    EventPublicReportComponent.prototype.makeHeader = function () {
        var header;
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
                    alignment: 'right',
                    text: 'Details of ' + this.data.event_data.event_type_string + ' Event ID ' + this.data.event_data.id,
                    margin: [0, 20, 0, 0]
                }
            ]
        };
        return header;
    };
    // create space
    EventPublicReportComponent.prototype.makeSpace = function () {
        var space;
        space = {
            text: ' \n'
        };
        return space;
    };
    // create location title
    EventPublicReportComponent.prototype.makeTitle = function (data) {
        var country;
        if (data.country === undefined) {
            country = 'Not Specified';
        }
        else {
            country = data.country;
        }
        var state = data.state;
        var county = data.county;
        var start_date = data.sdate;
        var end_date = data.edate;
        var name = data.name;
        var title = {
            style: 'tableExample',
            table: {
                widths: [150, 100, 200, 80, 80, 80, 80],
                body: [
                    [{ text: 'County (or equivalent):', bold: true, alignment: 'right' }, county, { text: name, bold: true }, '', '', '', ''],
                    [{ text: 'State (or equivalent):', bold: true, alignment: 'right' }, state, '', '', '', '', ''],
                    [{ text: 'Country: ', bold: true, alignment: 'right' }, country, ' ', { text: 'Start Date :', bold: true, alignment: 'right' }, start_date, { text: 'End Date: ', bold: true, alignment: 'right' }, end_date]
                ]
            },
            layout: 'noBorders'
        };
        return title;
    };
    EventPublicReportComponent.prototype.makeHorizontalLine = function () {
        var line;
        line = {
            canvas: [{ type: 'line', x1: 0, y1: 5, x2: 790 - 2 * 10, y2: 5, lineWidth: 1 }]
        };
        return line;
    };
    EventPublicReportComponent.prototype.makeCommentsTitle = function () {
        var title;
        title = {
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
                    alignment: 'right',
                    text: 'Comments Timeline for Event ID ' + this.data.event_data.id,
                    margin: [0, 20, 0, 0]
                },
            ]
        };
        return title;
    };
    EventPublicReportComponent.prototype.makeCommentsTable = function () {
        var commentTable;
        this.combinedComments = this.combinedComments.sort(function (a, b) { return a.date_sort - b.date_sort; });
        // START defining comment table
        var commentHeaders = {
            commentHeaders: {
                col_1: { text: 'Comments', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_2: { text: 'Comment Type', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_3: { text: 'Created Date', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_4: { text: 'User', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_5: { text: 'Organization', border: [false, false, true, true], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
                col_6: { text: 'Comment Source', border: [false, false, false, false], style: 'tableHeader', bold: true, alignment: 'center', margin: [0, 8, 0, 0] },
            }
        };
        var commentBody = [];
        // pushing header row into the table
        for (var key in commentHeaders) {
            if (commentHeaders.hasOwnProperty(key)) {
                var header = commentHeaders[key];
                var row = new Array();
                row.push(header.col_1);
                row.push(header.col_2);
                row.push(header.col_3);
                row.push(header.col_4);
                row.push(header.col_5);
                row.push(header.col_6);
                commentBody.push(row);
            }
        }
        var commentRows = this.combinedComments;
        // pushing data into the rows
        for (var key in commentRows) {
            if (commentRows.hasOwnProperty(key)) {
                var elData = commentRows[key];
                var row = new Array();
                row.push({ text: elData.comment, fontSize: 10 });
                row.push({ text: elData.comment_type_string, fontSize: 10 });
                row.push({ text: elData.created_date, fontSize: 10 });
                row.push({ text: elData.created_by_string, fontSize: 10 });
                row.push({ text: elData.created_by_organization_string, alignment: 'left', fontSize: 10 });
                row.push({ text: elData.source, alignment: 'left', fontSize: 10 });
                commentBody.push(row);
            }
        }
        // END defining comment table
        // Forming Location Table to push into doc defintion
        commentTable = {
            alignment: 'justify',
            table: {
                // heights: 40,
                widths: [400, '*', '*', '*', 100, '*'],
                headerRows: 1,
                dontBreakRows: true,
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
    };
    EventPublicReportComponent.prototype.makeExplanationDescription = function () {
        var explanationDescription;
        explanationDescription = {
            alignment: 'justify',
            text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n\n', { text: 'Disclaimer', fontSize: 11, bold: true }, '\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
            style: 'explanation',
        };
        return explanationDescription;
    };
    EventPublicReportComponent.prototype.explanationPageHeader = function () {
        // Forming Explanation info to push into doc defintion
        var explanationPageHeader;
        explanationPageHeader = {
            alignment: 'justify',
            columns: [
                {
                    image: this.pngURL,
                    width: 450,
                    height: 65
                },
                {
                    text: 'Explanation of Terms',
                    margin: [0, 20, 0, 0],
                    style: 'header',
                    alignment: 'right',
                }
            ]
        };
        return explanationPageHeader;
    };
    EventPublicReportComponent.prototype.explanationPartOne = function () {
        var explanationPartOne;
        explanationPartOne = {
            style: 'definitionsTable',
            table: {
                widths: [105, '*'],
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
                    [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesMostAffectedDefinition, border: [false, false, false, false] }],
                    [{ text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startEndDatesDefinition, border: [false, false, false, false] }],
                    [{ text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.associatedEventsDefinition, border: [false, false, false, false] }],
                    [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventVisibilityDefinition, border: [false, false, false, false] }],
                ]
            },
            layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
            }
        };
        return explanationPartOne;
    };
    EventPublicReportComponent.prototype.explanationOneForMoreDetails = function () {
        var explanationOneForMoreDetails;
        explanationOneForMoreDetails = {
            alignment: 'justify',
            margin: [0, 25, 0, 0],
            text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
            style: 'footer',
        };
        return explanationOneForMoreDetails;
    };
    EventPublicReportComponent.prototype.explanationPartTwoHeader = function () {
        var explanationPartTwoHeader;
        explanationPartTwoHeader = {
            alignment: 'justify',
            columns: [
                {
                    image: this.pngURL,
                    width: 450,
                    height: 65
                },
                {
                    text: 'Explanation of Terms cont...',
                    margin: [0, 20, 0, 0],
                    style: 'header',
                    alignment: 'right'
                }
            ]
        };
        return explanationPartTwoHeader;
    };
    EventPublicReportComponent.prototype.explanationPartTwo = function () {
        var explanationPartTwo;
        if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
            explanationPartTwo = {
                style: 'definitionsTable',
                id: 'explanationPartTwo',
                table: {
                    widths: [105, '*'],
                    body: [
                        [{ text: 'State (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.stateDefinition, border: [false, false, false, false] }],
                        [{ text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countryDefinition, border: [false, false, false, false] }],
                        [{ text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startDateDefinition, border: [false, false, false, false] }],
                        [{ text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.endDateDefinition, border: [false, false, false, false] }],
                        [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
                        [{ text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.populationDefinition, border: [false, false, false, false] }],
                        [{ text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownSickDefinition, border: [false, false, false, false] }],
                        [{ text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownDeadDefinition, border: [false, false, false, false] }],
                        [{ text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estSickDefinition, border: [false, false, false, false] }],
                        [{ text: 'Estimated Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estDeadDefinition, border: [false, false, false, false] }],
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
                }
            };
            return explanationPartTwo;
        }
        else {
            explanationPartTwo = {
                style: 'definitionsTable',
                id: 'explanationPartTwo',
                table: {
                    widths: [105, '*'],
                    body: [
                        [{ text: 'State (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.stateDefinition, border: [false, false, false, false] }],
                        [{ text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countryDefinition, border: [false, false, false, false] }],
                        [{ text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startDateDefinition, border: [false, false, false, false] }],
                        [{ text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.endDateDefinition, border: [false, false, false, false] }],
                        [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
                        [{ text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
                        [{ text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownSickDefinition, border: [false, false, false, false] }],
                        [{ text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownDeadDefinition, border: [false, false, false, false] }],
                        [{ text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estSickDefinition, border: [false, false, false, false] }],
                        [{ text: 'Estimated Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estDeadDefinition, border: [false, false, false, false] }],
                        [{ text: 'Captive', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.captiveDefinition, border: [false, false, false, false] }],
                        [{ text: 'Species Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDiagDefinition, border: [false, false, false, false] }],
                        [{ text: 'Number Assessed', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAssessedDefinition, border: [false, false, false, false] }],
                        [{ text: 'Number with this Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numWithDiagDefinition, border: [false, false, false, false] }],
                        [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }]
                    ]
                },
                layout: {
                    defaultBorder: false,
                    paddingLeft: function (i, node) { return 15; },
                    paddingRight: function (i, node) { return 10; },
                }
            };
            return explanationPartTwo;
        }
    };
    EventPublicReportComponent.prototype.explanationTwoForMoreDetails = function () {
        var explanationTwoForMoreDetails;
        if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {
            explanationTwoForMoreDetails = {
                alignment: 'justify',
                margin: [0, 70, 0, 0],
                text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
                style: 'footer',
            };
            return explanationTwoForMoreDetails;
        }
        else {
            explanationTwoForMoreDetails = {
                alignment: 'justify',
                margin: [0, 105, 0, 0],
                text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
                style: 'footer',
            };
            return explanationTwoForMoreDetails;
        }
    };
    EventPublicReportComponent.prototype.getEventVisibility = function () {
        var text;
        if ((this.data.event_data.public === undefined) || (this.data.event_data.public === true)) {
            text = {
                text: 'Visible to the public'
            };
        }
        else if (this.data.event_data.public === false) {
            text = {
                text: 'NOT VISIBLE TO THE PUBLIC', bold: true
            };
        }
        return text;
    };
    EventPublicReportComponent.prototype.getAssociatedEvents = function () {
        // Associated Events
        var associatedEvents;
        var eventIds = [];
        var eventLinks = [];
        var text;
        // Checking to see if there are event groups
        if (this.data.event_data.eventgroups.length === 0) {
            this.eventsAndLinks.push({ text: 'N/A' });
        }
        else {
            associatedEvents = [];
            this.data.event_data.eventgroups.forEach(function (eg) {
                // only showing the event groups that are category 1
                if (eg.category === 1) {
                    eg.events.forEach(function (element) {
                        associatedEvents.push(element);
                    });
                }
                else if (eg.category === undefined) { // public endpoint doesn't have the 'category' property on it but does post eventgroups
                    eg.events.forEach(function (element) {
                        associatedEvents.push(element);
                    });
                }
                text = associatedEvents.join(', ');
            });
            // associatedEvents = associatedEvents.join(', ');
            // converting to string and adding 'link' field
            for (var i = 0; i < associatedEvents.length; i++) {
                // formatting string so that there is not a ',' at the end of last associated event
                var addComma = associatedEvents.length - 1;
                if (i !== addComma) {
                    this.eventsAndLinks.push({ text: associatedEvents[i].toString(), link: window.location.origin + '/event/' + associatedEvents[i].toString(), color: 'blue' });
                    this.eventsAndLinks.push({ text: ', ' });
                }
                else {
                    this.eventsAndLinks.push({ text: associatedEvents[i].toString(), link: window.location.origin + '/' + associatedEvents[i].toString(), color: 'blue' });
                }
            }
        }
    };
    EventPublicReportComponent.prototype.getEventDates = function () {
        var startDate = this.data.event_data.start_date;
        var endDate = this.data.event_data.end_date;
        var text;
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        // getting date elements
        var sd = startDate.substr(8, 2);
        var sm = startDate.substr(5, 2);
        var sy = startDate.substr(0, 4);
        sm = Number(sm);
        sm = sm - 1;
        startDate = new Date(sy, sm, sd);
        if (endDate === null) {
            text = this.monthNames[sm] + ' ' + sd + ', ' + sy + ' - ' + ' N/A';
            return text;
        }
        else if (endDate !== null) {
            var ed = endDate.substr(8, 2);
            var em = endDate.substr(5, 2);
            var ey = endDate.substr(0, 4);
            em = Number(em);
            em = em - 1;
            endDate = new Date(ey, em, ed);
            var dayCount = void 0;
            dayCount = Math.round(Math.abs((startDate - endDate) / oneDay));
            /* const startMonth = startDate.getMonth() < 12 ? startDate.getMonth() + 1 : 1; */
            text = this.monthNames[sm] + ' ' + sd + ', ' + sy + ' - ' + this.monthNames[em] + ' ' + ed + ', ' + ey + ' (' + dayCount + ' days)';
            return text;
        }
    };
    EventPublicReportComponent.prototype.eventLocationName = function (comment) {
        var locationName = '';
        var count;
        if (comment.content_type_string === 'servicerequest') {
            locationName = 'Service Request';
        }
        else if (comment.content_type_string === 'event') {
            locationName = 'Event';
        }
        else if (comment.content_type_string === 'eventlocation') {
            if (comment.object_name !== '') {
                // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
                // comments (same as on event details tab).
                // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === comment.object_id; })) + 1;
                locationName = 'Location ' + count + ' - ' + comment.object_name;
            }
            else {
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === comment.object_id; })) + 1;
                locationName = 'Location ' + count;
            }
        }
        return locationName;
    };
    EventPublicReportComponent.prototype.checkForDuplicateDiagnosis = function (array) {
        var unique = array.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique.join(';\n');
    };
    EventPublicReportComponent.prototype.downloadEventReport = function () {
        var _this = this;
        this.downloadingReport = true;
        var detailMap = true;
        this.getAssociatedEvents();
        // google analytics event
        gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Downloaded Event Report' });
        // START national map
        // using html2Canvas to capture leaflet map for reports
        // solution found here: https://github.com/niklasvh/html2canvas/issues/567
        var natMapUrl;
        var detailMapUrl;
        var mapPane;
        mapPane = $('.leaflet-map-pane')[0];
        var mapTransform = mapPane.style.transform.split(',');
        // const mapX = parseFloat(mapTransform[0].split('(')[1].replace('px', ''));
        var mapX;
        // fix for firefox
        if (mapTransform[0] === undefined) {
            mapX = '';
        }
        if (mapTransform[0].split('(')[1] === undefined) {
            mapX = '';
        }
        else {
            mapX = parseFloat(mapTransform[0].split('(')[1].replace('px', ''));
        }
        var mapY;
        if (mapTransform[1] === undefined) {
            mapY = '';
        }
        else {
            mapY = parseFloat(mapTransform[1].replace('px', ''));
        }
        mapPane.style.transform = '';
        mapPane.style.left = mapX + 'px';
        mapPane.style.top = mapY + 'px';
        var myTiles = $('img.leaflet-tile');
        var tilesLeft = [];
        var tilesTop = [];
        var tileMethod = [];
        for (var i = 0; i < myTiles.length; i++) {
            if (myTiles[i].style.left !== '') {
                tilesLeft.push(parseFloat(myTiles[i].style.left.replace('px', '')));
                tilesTop.push(parseFloat(myTiles[i].style.top.replace('px', '')));
                tileMethod[i] = 'left';
            }
            else if (myTiles[i].style.transform !== '') {
                var tileTransform = myTiles[i].style.transform.split(',');
                tilesLeft[i] = parseFloat(tileTransform[0].split('(')[1].replace('px', ''));
                tilesTop[i] = parseFloat(tileTransform[1].replace('px', ''));
                myTiles[i].style.transform = '';
                tileMethod[i] = 'transform';
            }
            else {
                tilesLeft[i] = 0;
                // tilesRight[i] = 0;
                tileMethod[i] = 'neither';
            }
            myTiles[i].style.left = (tilesLeft[i]) + 'px';
            myTiles[i].style.top = (tilesTop[i]) + 'px';
        }
        var myDivicons = $('.leaflet-marker-icon');
        var dx = [];
        var dy = [];
        var mLeft = [];
        var mTop = [];
        for (var i = 0; i < myDivicons.length; i++) {
            var curTransform = myDivicons[i].style.transform;
            var splitTransform = curTransform.split(',');
            if (splitTransform[0] === '') {
            }
            else {
                dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
            }
            if (splitTransform[0] === '') {
                // when printing without reloading the style.transform property is blank
                // but the values we need are in the style.cssText string
                // so with the code below I'm manipulating those strings to get the values we need
                dx.push(myDivicons[i].style.cssText.split(' left: ')[1].split('px')[0]);
                dy.push(myDivicons[i].style.cssText.split('top')[1].replace('px;', ''));
            }
            else {
                dy.push(parseFloat(splitTransform[1].replace('px', '')));
            }
            // dx.push(parseFloat(splitTransform[0].split('(')[1].replace('px', '')));
            // dy.push(parseFloat(splitTransform[1].replace('px', '')));
            myDivicons[i].style.transform = '';
            myDivicons[i].style.left = dx[i] + 'px';
            myDivicons[i].style.top = dy[i] + 'px';
        }
        var mapWidth = parseFloat($('#map').css('width').replace('px', ''));
        var mapHeight = parseFloat($('#map').css('height').replace('px', ''));
        var linesLayer = $('svg.leaflet-zoom-animated')[0];
        var oldLinesWidth = linesLayer.getAttribute('width');
        var oldLinesHeight = linesLayer.getAttribute('height');
        var oldViewbox = linesLayer.getAttribute('viewBox');
        linesLayer.setAttribute('width', mapWidth.toString());
        linesLayer.setAttribute('height', mapHeight.toString());
        linesLayer.setAttribute('viewBox', '0 0 ' + mapWidth + ' ' + mapHeight);
        var linesTransform = linesLayer.style.transform.split(',');
        var linesX = parseFloat(linesTransform[0].split('(')[1].replace('px', ''));
        var linesY = parseFloat(linesTransform[1].replace('px', ''));
        linesLayer.style.transform = '';
        linesLayer.style.left = '';
        linesLayer.style.top = '';
        var options = {
            useCORS: true,
        };
        for (var i = 0; i < myTiles.length; i++) {
            if (tileMethod[i] === 'left') {
                myTiles[i].style.left = (tilesLeft[i]) + 'px';
                myTiles[i].style.top = (tilesTop[i]) + 'px';
            }
            else if (tileMethod[i] === 'transform') {
                myTiles[i].style.left = '';
                myTiles[i].style.top = '';
                myTiles[i].style.transform = 'translate(' + tilesLeft[i] + 'px, ' + tilesTop[i] + 'px)';
            }
            else {
                myTiles[i].style.left = '0px';
                myTiles[i].style.top = '0px';
                myTiles[i].style.transform = 'translate(0px, 0px)';
            }
        }
        for (var i = 0; i < myDivicons.length; i++) {
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
        var natMapEvent;
        html2canvas_1.default(document.getElementById('hiddenNatMap'), options)
            .then(function (canvas) {
            natMapEvent = new Event('natmap_ready');
            natMapUrl = canvas.toDataURL('image/png');
            window.dispatchEvent(natMapEvent); // Dispatching an event for when the image is done rendering
        });
        // END national map
        window.addEventListener('natmap_ready', function () {
            var mapPane2 = $('.leaflet-map-pane')[0];
            var mapTransform2 = mapPane2.style.transform.split(',');
            var mapX2;
            // fix for firefox
            if (mapTransform[0] === undefined) {
                mapX2 = '';
            }
            if (mapTransform[0].split('(')[1] === undefined) {
                mapX2 = '';
            }
            else {
                mapX2 = parseFloat(mapTransform2[0].split('(')[1].replace('px', ''));
            }
            // fix for firefox
            var mapY2;
            if (mapTransform2[1] === undefined) {
                mapY2 = '';
            }
            else {
                mapY2 = parseFloat(mapTransform2[1].replace('px', ''));
            }
            mapPane2.style.transform = '';
            mapPane2.style.left = mapX2 + 'px';
            mapPane2.style.top = mapY2 + 'px';
            var myTiles2 = $('img.leaflet-tile');
            var tilesLeft2 = [];
            var tilesTop2 = [];
            var tileMethod2 = [];
            for (var i = 0; i < myTiles2.length; i++) {
                if (myTiles2[i].style.left !== '') {
                    tilesLeft2.push(parseFloat(myTiles2[i].style.left.replace('px', '')));
                    tilesTop2.push(parseFloat(myTiles2[i].style.top.replace('px', '')));
                    tileMethod2[i] = 'left';
                }
                else if (myTiles2[i].style.transform !== '') {
                    var tileTransform = myTiles2[i].style.transform.split(',');
                    tilesLeft2[i] = parseFloat(tileTransform[0].split('(')[1].replace('px', ''));
                    tilesTop2[i] = parseFloat(tileTransform[1].replace('px', ''));
                    myTiles2[i].style.transform = '';
                    tileMethod2[i] = 'transform';
                }
                else {
                    tilesLeft2[i] = 0;
                    // tilesRight[i] = 0;
                    tileMethod2[i] = 'neither';
                }
                myTiles2[i].style.left = (tilesLeft2[i]) + 'px';
                myTiles2[i].style.top = (tilesTop2[i]) + 'px';
            }
            /* const myDivicons = $('.leaflet-marker-icon');
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
            } */
            var mapWidth2 = parseFloat($('#map').css('width').replace('px', ''));
            var mapHeight2 = parseFloat($('#map').css('height').replace('px', ''));
            var linesLayer2 = $('svg.leaflet-zoom-animated')[0];
            var oldLinesWidth2 = linesLayer2.getAttribute('width');
            var oldLinesHeight2 = linesLayer2.getAttribute('height');
            var oldViewbox2 = linesLayer2.getAttribute('viewBox');
            linesLayer2.setAttribute('width', mapWidth2.toString());
            linesLayer2.setAttribute('height', mapHeight2.toString());
            linesLayer2.setAttribute('viewBox', '0 0 ' + mapWidth2 + ' ' + mapHeight2);
            var linesTransform2 = linesLayer2.style.transform.split(',');
            var linesX2 = parseFloat(linesTransform2[0].split('(')[1].replace('px', ''));
            var linesY2 = parseFloat(linesTransform2[1].replace('px', ''));
            linesLayer2.style.transform = '';
            linesLayer2.style.left = '';
            linesLayer2.style.top = '';
            var options2 = {
                useCORS: true,
            };
            for (var i = 0; i < myTiles2.length; i++) {
                if (tileMethod2[i] === 'left') {
                    myTiles2[i].style.left = (tilesLeft2[i]) + 'px';
                    myTiles2[i].style.top = (tilesTop2[i]) + 'px';
                }
                else if (tileMethod2[i] === 'transform') {
                    myTiles2[i].style.left = '';
                    myTiles2[i].style.top = '';
                    myTiles2[i].style.transform = 'translate(' + tilesLeft2[i] + 'px, ' + tilesTop2[i] + 'px)';
                }
                else {
                    myTiles2[i].style.left = '0px';
                    myTiles2[i].style.top = '0px';
                    myTiles2[i].style.transform = 'translate(0px, 0px)';
                }
            }
            /* for (let i = 0; i < myDivicons.length; i++) {
              myDivicons[i].style.transform = 'translate(' + dx[i] + 'px, ' + dy[i] + 'px, 0)';
              myDivicons[i].style.marginLeft = mLeft[i] + 'px';
              myDivicons[i].style.marginTop = mTop[i] + 'px';
            } */
            linesLayer2.style.transform = 'translate(' + (linesX2) + 'px,' + (linesY2) + 'px)';
            linesLayer2.setAttribute('viewBox', oldViewbox2);
            linesLayer2.setAttribute('width', oldLinesWidth2);
            linesLayer2.setAttribute('height', oldLinesHeight2);
            mapPane2.style.transform = 'translate(' + (mapX2) + 'px,' + (mapY2) + 'px)';
            mapPane2.style.left = '';
            mapPane2.style.top = '';
            // END detail map
            var event;
            html2canvas_1.default(document.getElementById('detailMap'), options2)
                .then(function (canvas) {
                event = new Event('images_ready');
                detailMapUrl = canvas.toDataURL('image/png');
                window.dispatchEvent(event); // Dispatching an event for when the image is done rendering
            });
        }, {
            once: true
        });
        // need to give some time for html2canvas to finish rendering
        window.addEventListener('images_ready', function () {
            // Getting date/time for timestamp
            var date = app_utilities_1.APP_UTILITIES.getReportDateTime;
            // event details
            var data = _this.data.event_data;
            // looping thru all organizations incase there are multiple
            var organizations = [];
            if (data.organizations !== undefined) {
                for (var _i = 0, _a = data.organizations; _i < _a.length; _i++) {
                    var organization = _a[_i];
                    /* organizations.push(organization.organization.name); */
                    organizations.push(organization.organization.name);
                }
            }
            else {
                organizations.push('N/A');
            }
            // getting number of locations associated with event
            var locationCount;
            locationCount = data.eventlocations.length;
            // looping thru all counties of all locations
            var counties = [];
            var _loop_1 = function (i) {
                var formattedString = '';
                var stateAbbrev = void 0;
                var countryAbbrev = void 0;
                var semiColon = data.eventlocations.length - 1;
                stateAbbrev = _this.adminLevelOnes.find(function (item) { return item.name === data.eventlocations[i].administrative_level_one_string; });
                countryAbbrev = _this.country.find(function (item) { return item.name === data.eventlocations[i].country_string; });
                if (i !== semiColon) {
                    formattedString = data.eventlocations[i].administrative_level_two_string + ', ' + stateAbbrev.abbreviation + ', ' + countryAbbrev.abbreviation + '; ';
                    counties.push(formattedString);
                }
                else {
                    formattedString = data.eventlocations[i].administrative_level_two_string + ', ' + stateAbbrev.abbreviation + ', ' + countryAbbrev.abbreviation;
                    counties.push(formattedString);
                }
            };
            for (var i = 0; i < data.eventlocations.length; i++) {
                _loop_1(i);
            }
            // looping thru all event diagsoses incase there are multiple
            var eventDiagnosises = [];
            for (var _b = 0, _c = data.eventdiagnoses; _b < _c.length; _b++) {
                var diagnosis = _c[_b];
                eventDiagnosises.push(diagnosis.diagnosis_string);
            }
            // looping thru event locations to get labs
            var hasLabs = [];
            var noLabs = 'N/A';
            data.eventlocations.forEach(function (el) {
                el.locationspecies.forEach(function (ls) {
                    ls.speciesdiagnoses.forEach(function (sd) {
                        if (sd.organizations_string.length === 0) {
                            return;
                        }
                        else {
                            sd.organizations_string.forEach(function (org) {
                                hasLabs.push(org);
                            });
                        }
                    });
                });
            });
            // display 'N/A' if there are no labs
            if (hasLabs.length === 0) {
                _this.labs = noLabs;
            }
            else {
                _this.labs = _this.checkForDuplicateDiagnosis(hasLabs);
                // this.labs = hasLabs;
            }
            // getting species affected count
            var speciesAffectedCount = 0;
            data.eventlocations.forEach(function (el) {
                el.locationspecies.forEach(function (ls) {
                    speciesAffectedCount = speciesAffectedCount + 1;
                });
            });
            var startDate = data.start_date;
            var endDate = data.end_date;
            var formattedDate = data.start_date + ' - ' + data.end_date;
            // Species Most Affected
            var numberOfSpecies = 0;
            var eventType = data.event_type;
            var speciesArray;
            var speciesAffected;
            var affectedCount = 0;
            var positiveCount = 0;
            if (eventType === 1) {
                speciesArray = [];
            } // making speciesAffected an array only if the event is type 1)
            data.eventlocations.forEach(function (el) {
                el.locationspecies.forEach(function (ls) {
                    numberOfSpecies = numberOfSpecies + 1;
                    if (eventType === 1) { // if event is Morbidity/Mortality
                        var deads = void 0;
                        var sicks = void 0;
                        // summing the dead and sick counts and estimations
                        deads = ls.dead_count_estimated + ls.dead_count;
                        sicks = ls.sick_count_estimated + ls.sick_count;
                        affectedCount = deads + sicks;
                        speciesArray.push({ name: ls.species_string, affected_count: affectedCount });
                    }
                    else if (eventType === 2) { // if event is Surveillance
                        ls.speciesdiagnoses.forEach(function (sd) {
                            positiveCount = positiveCount + sd.positive_count;
                        });
                        affectedCount = positiveCount;
                        speciesAffected = affectedCount;
                    }
                    // sorting highest to lowest so that species most affected is first in the array
                    if (eventType === 1) {
                        var speciesMostAffectedArray = []; // incase there are two or more with the same amount affected
                        speciesArray = speciesArray.sort(function (a, b) { return b.affected_count - a.affected_count; });
                        var speciesWithMostAffectedCount = speciesArray[0].affected_count;
                        for (var _i = 0, speciesArray_1 = speciesArray; _i < speciesArray_1.length; _i++) {
                            var species = speciesArray_1[_i];
                            if (species.affected_count === speciesWithMostAffectedCount) {
                                speciesMostAffectedArray.push(species.name);
                            }
                        }
                        if (speciesMostAffectedArray.length > 0) {
                            speciesAffected = speciesMostAffectedArray.join(', ');
                        }
                        else {
                            speciesAffected = speciesArray[0].name;
                        }
                    }
                });
            });
            if (speciesAffected === undefined) {
                speciesAffected = 'N/A';
            }
            // Event Visibility
            var eventVisibility;
            if (data.public) {
                eventVisibility = 'VISIBLE TO THE PUBLIC';
            }
            else {
                eventVisibility = 'NOT VISIBLE TO THE PUBLIC';
            }
            // whispers logo
            _this.pngURL = _this.canvas.toDataURL();
            console.log(_this.pngURL);
            console.log(natMapUrl);
            // printing user's info
            var nameOrgString;
            if (!_this.loggedIn) {
                nameOrgString = '';
            }
            else {
                nameOrgString = 'by ' + _this.data.user.first_name + ' ' + _this.data.user.last_name + ' (' + _this.data.user.organization_string + ') ';
            }
            // formatting full URL for footer
            var url = window.location.href;
            var eventLocation = data.eventlocations[0].locationspecies;
            _this.eventLocsPlusDiagnoses = [];
            var speciesDiag = [];
            var labs = [];
            var eventLocNum = 0;
            for (var _d = 0, _e = _this.data.event_data.eventlocations; _d < _e.length; _d++) {
                var event_location = _e[_d];
                eventLocNum = eventLocNum + 1;
                labs = [];
                speciesDiag = [];
                // checking to see if this eventlocation has a species. If not, then we don't want to inlcude it in the array used to make the tables
                if (event_location.locationspecies.length !== 0) {
                    for (var _f = 0, _g = event_location.locationspecies; _f < _g.length; _f++) {
                        var locationspecies = _g[_f];
                        // checking to see if this location species has a species diagnosis. If not, then we add it to the array with 'Not Assesed' in diagnoses field.
                        if (locationspecies.speciesdiagnoses.length === 0) {
                            var captive = locationspecies.captive;
                            // pdfmake does not like 'undefined' values so setting them to empty string
                            var pop = locationspecies.population_count || ' ';
                            var ksick = locationspecies.sick_count || ' ';
                            var kdead = locationspecies.dead_count || ' ';
                            var esick = locationspecies.sick_count_estimated || ' ';
                            var edead = locationspecies.dead_count_estimated || ' ';
                            var sdate = void 0;
                            if ((event_location.start_date === null) || (event_location.start_date === undefined)) {
                                sdate = 'N/A';
                            }
                            else {
                                sdate = app_utilities_1.APP_UTILITIES.formatEventDates(event_location.start_date);
                            }
                            var edate = void 0;
                            if ((event_location.end_date === null) || (event_location.end_date === undefined)) {
                                edate = 'N/A';
                            }
                            else {
                                edate = app_utilities_1.APP_UTILITIES.formatEventDates(event_location.end_date);
                            }
                            captive = 'Yes' || 'No';
                            var s_diag = ' ';
                            var county = locationspecies.administrative_level_two_string || ' ';
                            var country = locationspecies.country_string || ' ';
                            var lab = ' ';
                            var locationName = void 0;
                            if (event_location.name === '' || event_location.name === undefined) {
                                locationName = 'Location ' + eventLocNum;
                            }
                            else {
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
                        if (locationspecies.speciesdiagnoses.length > 0) {
                            var multipleDiags = [];
                            var multipleNums = [];
                            var multipleLabs = [];
                            if (locationspecies.speciesdiagnoses.length > 0) {
                                for (var _h = 0, _j = locationspecies.speciesdiagnoses; _h < _j.length; _h++) {
                                    var speciesdiagnosis = _j[_h];
                                    var num = void 0;
                                    multipleDiags.push(speciesdiagnosis.diagnosis_string);
                                    if ((speciesdiagnosis.tested_count === null) && (speciesdiagnosis.diagnosis_count === null)) {
                                        num = 'N/A';
                                    }
                                    else {
                                        var testedCount = speciesdiagnosis.tested_count || 0;
                                        var diagnosisCount = speciesdiagnosis.diagnosis_count || 0;
                                        num = testedCount + '/' + diagnosisCount;
                                    }
                                    multipleNums.push(num);
                                    if (speciesdiagnosis.organizations_string === null) {
                                        multipleLabs.push('N/A');
                                    }
                                    else if (speciesdiagnosis.organizations_string.length > 0) {
                                        for (var _k = 0, _l = speciesdiagnosis.organizations_string; _k < _l.length; _k++) {
                                            var l = _l[_k];
                                            multipleLabs.push(l);
                                        }
                                    }
                                }
                            }
                            var captive = locationspecies.captive;
                            // pdfmake does not like 'undefined' values so setting them to empty string
                            var pop = locationspecies.population_count || ' ';
                            var ksick = locationspecies.sick_count || ' ';
                            var kdead = locationspecies.dead_count || ' ';
                            var esick = locationspecies.sick_count_estimated || ' ';
                            var edead = locationspecies.dead_count_estimated || ' ';
                            var sdate = void 0;
                            if ((event_location.start_date === null) || (event_location.start_date === undefined)) {
                                sdate = 'N/A';
                            }
                            else {
                                sdate = app_utilities_1.APP_UTILITIES.formatEventDates(event_location.start_date);
                            }
                            var edate = void 0;
                            if ((event_location.end_date === null) || (event_location.end_date === undefined)) {
                                edate = 'N/A';
                            }
                            else {
                                edate = app_utilities_1.APP_UTILITIES.formatEventDates(event_location.end_date);
                            }
                            captive = 'Yes' || 'No';
                            // accounting for multiple species diagnoses for 1 location species
                            var s_diag = void 0;
                            var lab = void 0;
                            var numAssess = void 0;
                            if (multipleDiags.length > 0) { // lab
                                s_diag = multipleDiags.join(';\n');
                                lab = multipleLabs.join(';\n');
                                numAssess = multipleNums.join(';\n');
                            }
                            else {
                                s_diag = locationspecies.speciesdiagnoses.diagnosis_string || ' ';
                                numAssess = '';
                                if (locationspecies.speciesdiagnoses.organizations_string === undefined) {
                                    lab = '';
                                }
                                else {
                                    lab = locationspecies.speciesdiagnoses.organizations_string[0];
                                }
                            }
                            // const s_diag = speciesdiagnosis.diagnosis_string || ' ';
                            var county = locationspecies.administrative_level_two_string || ' ';
                            var locationName = void 0;
                            if (event_location.name === '' || event_location.name === undefined) {
                                locationName = 'Location ' + eventLocNum;
                            }
                            else {
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
                    _this.eventLocsPlusDiagnoses.push(speciesDiag);
                }
            }
            var recordStatus;
            if (_this.data.event_data.complete) {
                recordStatus = 'Complete';
            }
            else {
                recordStatus = 'Incomplete';
            }
            // check for user role so that we show them the right report
            var docDefinition = {
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 35],
                footer: function (currentPage, pageCount) {
                    var SecondToLastPage = pageCount - 1;
                    if (currentPage === SecondToLastPage) {
                        return;
                    }
                    if (currentPage !== pageCount) {
                        return {
                            margin: [20, 0, 20, 0],
                            style: 'footer',
                            columns: [
                                {
                                    width: 700,
                                    text: ['Report generated ' + nameOrgString + 'from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at ', { text: 'https://whispers.usgs.gov', link: 'https://whispers.usgs.gov', color: '#0000EE' }, '.'
                                    ]
                                },
                                {
                                    width: 50,
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
                                image: _this.pngURL,
                                width: 450,
                                height: 65,
                                margin: [0, 0, 0, 30]
                            },
                            {
                                style: 'header',
                                alignment: 'right',
                                text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id,
                                margin: [0, 20, 0, 0]
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
                                                [{ border: [false, false, true, false], text: 'Contact Organization(s)', bold: true, alignment: 'right' }, organizations.join(';\n')],
                                                [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, recordStatus],
                                                [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                                                [{ border: [false, false, false, false], text: 'Summary Information', bold: true, fontSize: 22, margin: [30, 10], colSpan: 2 }, ' '],
                                                [{ border: [false, false, true, false], text: '# of Locations', bold: true, alignment: 'right' }, locationCount],
                                                [{ border: [false, false, true, false], text: 'County (or equivalent)', bold: true, alignment: 'right' }, [{ text: counties }]],
                                                [{ border: [false, false, true, false], text: 'Event Diagnosis', bold: true, alignment: 'right' }, eventDiagnosises.join(';\n')],
                                                [{ border: [false, false, true, false], text: 'Diagnostic Laboratory', bold: true, alignment: 'right' }, _this.labs],
                                                [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, data.affected_count],
                                                [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, speciesAffectedCount],
                                                [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, speciesAffected],
                                                [{ border: [false, false, true, false], text: 'Event Start Date - End Date', bold: true, alignment: 'right' }, _this.getEventDates()],
                                                [{ border: [false, false, true, false], text: 'Associated Events', bold: true, alignment: 'right' }, [{ text: _this.eventsAndLinks }]],
                                                [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, _this.getEventVisibility()]
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
                                            image: detailMapUrl,
                                            width: 300,
                                            height: 200
                                        },
                                    ],
                                ],
                            ],
                        },
                        layout: 'noBorders'
                    },
                ],
                images: {
                    logo: _this.pngURL,
                    detailMap: detailMapUrl,
                    nationalMap: natMapUrl
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
            // pushing pre-made tables and other elements into doc definition
            for (var _m = 0, _o = _this.eventLocsPlusDiagnoses; _m < _o.length; _m++) {
                var loc = _o[_m];
                docDefinition.content.push(_this.makeHeader());
                docDefinition.content.push(_this.makeTitle(loc[0]));
                docDefinition.content.push(_this.makeHorizontalLine());
                docDefinition.content.push(_this.makeSpace());
                docDefinition.content.push(_this.makeLocationTable(loc));
            }
            if (_this.data.user.role !== 7 && _this.data.user.role !== 6 && _this.data.user.role !== undefined) {
                docDefinition.content.push(_this.makeCommentsTitle());
                docDefinition.content.push(_this.makeCommentsTable());
            }
            docDefinition.content.push(_this.explanationPageHeader());
            docDefinition.content.push(_this.makeExplanationDescription());
            docDefinition.content.push(_this.explanationPartOne());
            docDefinition.content.push(_this.explanationOneForMoreDetails());
            docDefinition.content.push(_this.explanationPartTwoHeader());
            docDefinition.content.push(_this.explanationPartTwo());
            docDefinition.content.push(_this.explanationTwoForMoreDetails());
            pdfMake_1.default.createPdf(docDefinition).download('WHISPers_Event_' + _this.data.event_data.id + '_' + app_utilities_1.APP_UTILITIES.getFileNameDate + '.pdf');
            _this.downloadingReport = false;
            _this.eventPublicReportDialogRef.close();
        }, {
            once: true // Only add listnener once. If this is not set then it will print multiple times after the first print if the page is not reloaded
        });
    };
    EventPublicReportComponent = __decorate([
        core_1.Component({
            selector: 'app-event-public-report',
            templateUrl: './event-public-report.component.html',
            styleUrls: ['./event-public-report.component.scss']
        }),
        __param(6, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            display_value_pipe_1.DisplayValuePipe,
            comment_type_service_1.CommentTypeService,
            event_service_1.EventService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            country_service_1.CountryService, Object])
    ], EventPublicReportComponent);
    return EventPublicReportComponent;
}());
exports.EventPublicReportComponent = EventPublicReportComponent;
//# sourceMappingURL=event-public-report.component.js.map