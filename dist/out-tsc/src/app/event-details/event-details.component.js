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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var animations_1 = require("@angular/animations");
//declare let L: any;
var L = require("leaflet");
var esri = require("esri-leaflet");
var pdfMake_1 = require("pdfmake/build/pdfMake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
pdfMake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
// import * as esrilegend from 'esri-leaflet-legend';
var material_3 = require("@angular/material");
var event_service_1 = require("@services/event.service");
var administrative_level_one_service_1 = require("@services/administrative-level-one.service");
var current_user_service_1 = require("@services/current-user.service");
var edit_event_component_1 = require("@app/edit-event/edit-event.component");
var add_event_diagnosis_component_1 = require("@app/add-event-diagnosis/add-event-diagnosis.component");
var add_event_organization_component_1 = require("@app/add-event-organization/add-event-organization.component");
var edit_event_location_component_1 = require("@app/edit-event-location/edit-event-location.component");
var edit_location_species_component_1 = require("@app/edit-location-species/edit-location-species.component");
var land_ownership_service_1 = require("@services/land-ownership.service");
var confirm_component_1 = require("@app/confirm/confirm.component");
var event_location_service_1 = require("@app/services/event-location.service");
var event_organization_service_1 = require("@app/services/event-organization.service");
var event_details_share_component_1 = require("@app/event-details/event-details-share/event-details-share.component");
var user_service_1 = require("@app/services/user.service");
var species_service_1 = require("@services/species.service");
var sex_bias_service_1 = require("@app/services/sex-bias.service");
var age_bias_service_1 = require("@app/services/age-bias.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var event_diagnosis_service_1 = require("@app/services/event-diagnosis.service");
var comment_type_service_1 = require("@services/comment-type.service");
var comment_service_1 = require("@app/services/comment.service");
var add_comment_component_1 = require("@app/add-comment/add-comment.component");
var add_event_location_contact_component_1 = require("@app/add-event-location-contact/add-event-location-contact.component");
var add_service_request_component_1 = require("@app/add-service-request/add-service-request.component");
var event_public_report_component_1 = require("@app/event-public-report/event-public-report.component");
var event_location_contact_service_1 = require("@services/event-location-contact.service");
var contact_service_1 = require("@services/contact.service");
var create_contact_component_1 = require("@create-contact/create-contact.component");
var create_contact_service_1 = require("@create-contact/create-contact.service");
var app_settings_1 = require("@app/app.settings");
var app_field_help_text_1 = require("@app/app.field-help-text");
var organization_service_1 = require("@app/services/organization.service");
var circle_management_component_1 = require("@app/circle-management/circle-management.component");
var circle_choose_component_1 = require("@app/circle-management/circle-choose/circle-choose.component");
var circle_service_1 = require("@services/circle.service");
var collaboration_request_component_1 = require("@app/collaboration-request/collaboration-request.component");
var EventDetailsComponent = /** @class */ (function () {
    // this use of the viewPanels variable and associated functions is assumed (but not confirmed) deprecated.
    // the original purpose may have been superceded by later development. it was removed 12/30/19 to fix a bug
    // that involved breaking of location comments and location contacts collapse panels after a new item was added.
    // associated functions(commented out below): getViewPanelState, setViewPanelState
    // all left in for now in case issues are uncovered. - B.Draper 12/31/19
    // @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;
    function EventDetailsComponent(route, _eventService, userService, currentUserService, dataUpdatedService, createContactSevice, dialog, speciesService, adminLevelOneService, landownershipService, eventLocationService, eventDiagnosisService, eventLocationContactService, eventOrganizationService, ageBiasService, sexBiasService, commentTypeService, organizationService, commentService, contactService, circleService, snackBar, router) {
        var _this = this;
        this.route = route;
        this._eventService = _eventService;
        this.userService = userService;
        this.currentUserService = currentUserService;
        this.dataUpdatedService = dataUpdatedService;
        this.createContactSevice = createContactSevice;
        this.dialog = dialog;
        this.speciesService = speciesService;
        this.adminLevelOneService = adminLevelOneService;
        this.landownershipService = landownershipService;
        this.eventLocationService = eventLocationService;
        this.eventDiagnosisService = eventDiagnosisService;
        this.eventLocationContactService = eventLocationContactService;
        this.eventOrganizationService = eventOrganizationService;
        this.ageBiasService = ageBiasService;
        this.sexBiasService = sexBiasService;
        this.commentTypeService = commentTypeService;
        this.organizationService = organizationService;
        this.commentService = commentService;
        this.contactService = contactService;
        this.circleService = circleService;
        this.snackBar = snackBar;
        this.router = router;
        this.myEvent = new core_1.EventEmitter();
        this.administrative_level_one = [];
        this.species = [];
        this.speciesLoading = false;
        this.associatedEvents = [];
        this.currentlyOpenedItemIndex = -1;
        this.eventCommentsPanelOpen = false;
        this.serviceRequestPanelOpen = false;
        this.collaboratorsPanelOpen = false;
        this.locationCommentsPanelOpen = false;
        this.locationContactsPanelOpen = false;
        this.eventNotFound = false;
        this.showAddEventLocation = false;
        this.eventLocationSpecies = [];
        this.selection = [];
        this.possibleEventDiagnoses = [];
        this.laboratories = [];
        this.organizations = [];
        this.userCircles = [];
        this.eventDataLoading = true;
        this.unMappables = [];
        this.userContactsLoading = false;
        this.flywaysVisible = false;
        this.watershedsVisible = false;
        this.canvas = document.createElement('canvas');
        // selectedTab: number;
        this.locationSpeciesDisplayedColumns = [
            'species',
            'location',
            'population',
            'sick',
            'dead',
            'sick_estimated',
            'dead_estimated',
            'captive',
            'age_bias',
            'sex_bias',
            'diagnosis'
        ];
        this.readCollaboratorArray = [];
        this.writeCollaboratorArray = [];
        this.eventLocationSpecies = [];
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        dataUpdatedService.trigger.subscribe(function (action) {
            if (action === 'refresh') {
                _this.refreshEvent();
            }
        });
        createContactSevice.getCreatedContact().subscribe(function (createdContact) {
            _this.userContacts.push(createdContact);
            _this.userContacts.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
        });
    }
    EventDetailsComponent.prototype.ngOnInit = function () {
        // this.selectedTab = 0;
        var _this = this;
        var initialSelection = [];
        var allowMultiSelect = true;
        this.eventLocationSpecies = [];
        this.route.paramMap.subscribe(function (params) {
            _this.eventID = params.get('id');
            // Actual request to event details service, using id
            _this._eventService.getEventDetails(_this.eventID)
                .subscribe(function (eventdetails) {
                _this.eventData = eventdetails;
                for (var _i = 0, _a = _this.eventData.eventlocations; _i < _a.length; _i++) {
                    var event_location = _a[_i];
                    for (var _b = 0, _c = event_location.locationspecies; _b < _c.length; _b++) {
                        var locationspecies = _c[_b];
                        locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
                        locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
                        locationspecies.country_string = event_location.country_string;
                        _this.eventLocationSpecies.push(locationspecies);
                        _this.readCollaboratorArray = eventdetails.read_collaborators;
                        _this.writeCollaboratorArray = eventdetails.write_collaborators;
                        // for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                        //   if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                        //     this.possibleEventDiagnoses.push(speciesdiagnosis);
                        //   }
                        // }
                        for (var _d = 0, _e = locationspecies.speciesdiagnoses; _d < _e.length; _d++) {
                            var speciesdiagnosis = _e[_d];
                            if (!_this.searchInArray(_this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                                _this.possibleEventDiagnoses.push(speciesdiagnosis);
                            }
                            else {
                                // it is in there already:
                                // check if this one's suspect field is false
                                if (speciesdiagnosis.suspect === false) {
                                    // if it is, then we need to remove the previously added one and add this one which is suspect = false
                                    // loop thru possibleEventDiagnoses, if match, remove
                                    for (var i = 0; i < _this.possibleEventDiagnoses.length; i++) {
                                        if (_this.possibleEventDiagnoses[i].diagnosis === speciesdiagnosis.diagnosis) {
                                            _this.possibleEventDiagnoses.splice(i, 1);
                                        }
                                    }
                                    // then add the non suspect one
                                    _this.possibleEventDiagnoses.push(speciesdiagnosis);
                                }
                            }
                        }
                    }
                }
                // add the "Undetermined" diagnosis to possibleDiagnoses, only if not already in the list
                if (!_this.searchInArray(_this.possibleEventDiagnoses, 'diagnosis', app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis)) {
                    _this.possibleEventDiagnoses.push(app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN);
                }
                // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
                // else if (eventdetails.complete === false) {
                //   this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN);
                // }
                _this.eventDataLoading = false;
            }, function (error) {
                _this.errorMessage = error;
                _this.eventDataLoading = false;
                if (error.status !== 200) {
                    _this.eventNotFound = true;
                }
                // if (JSON.parse(error).detail === 'Not found.') {
                // }
            });
        });
        // get administrative_level_one  from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (administrative_level_one) {
            _this.administrative_level_one = administrative_level_one;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get landownerships from the landownership servce
        this.landownershipService.getLandOwnerships()
            .subscribe(function (landownerships) {
            _this.landownerships = landownerships;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get sexBiases from the sexBias service
        this.sexBiasService.getSexBiases()
            .subscribe(function (sexBiases) {
            _this.sexBiases = sexBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get ageBiases from the ageBias service
        this.ageBiasService.getAgeBiases()
            .subscribe(function (ageBiases) {
            _this.ageBiases = ageBiases;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get 'laboratories' from the organizations service
        // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
        this.organizationService.getLaboratories()
            .subscribe(function (laboratories) {
            _this.laboratories = laboratories;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get organizations from the OrganizationService
        this.organizationService.getOrganizations()
            .subscribe(function (organizations) {
            _this.organizations = organizations;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get comment types from the commentTypes service
        this.commentTypeService.getCommentTypes()
            .subscribe(function (commentTypes) {
            _this.commentTypes = commentTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        this.speciesLoading = true;
        // get event summary for reports
        this._eventService.getEventSummary(this.eventID)
            .subscribe(function (eventsummary) {
            _this.natMapPoints = eventsummary;
        });
        // get species from the species service
        this.speciesService.getSpecies()
            .subscribe(function (species) {
            _this.species = species;
            // alphabetize the species options list
            _this.species.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            _this.speciesLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.speciesLoading = false;
        });
        // TEMPORARY- will need to use user creds to query user contact list
        this.userContactsLoading = true;
        this.contactService.getContacts()
            .subscribe(function (contacts) {
            _this.userContacts = contacts;
            _this.userContacts.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
            _this.userContactsLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.userContactsLoading = false;
        });
        this.circleService.getAllUserCircles()
            .subscribe(function (circles) {
            _this.userCircles = circles;
        }, function (error) {
            _this.errorMessage = error;
        });
        setTimeout(function () {
            var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
            // tslint:disable-next-line:max-line-length
            mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            });
            var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
            var streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });
            _this.map = new L.Map('map', {
                center: new L.LatLng(39.8283, -98.5795),
                zoom: 4,
                layers: [streets]
            });
            _this.locationMarkers = L.featureGroup().addTo(_this.map);
            var baseMaps = {
                'Open Street Map': osm,
                'Grayscale': grayscale,
                'Streets': streets
            };
            // Flyways hosted by Fish and Wildlife Service
            var flyways = esri.featureLayer({
                url: 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWS_HQ_MB_Waterfowl_Flyway_Boundaries/FeatureServer/0',
                style: function (feature) {
                    if (feature.properties.NAME === 'Atlantic Flyway') {
                        return { color: '#28995b', weight: 2 };
                    }
                    else if (feature.properties.NAME === 'Pacific Flyway') {
                        return { color: '#ffbd4f', weight: 2 };
                    }
                    else if (feature.properties.NAME === 'Mississippi Flyway') {
                        return { color: '#eb5834', weight: 2 };
                    }
                    else if (feature.properties.NAME === 'Central Flyway') {
                        return { color: '#b43cc7', weight: 2 };
                    }
                }
            });
            // Watersheds hosted by The National Map (USGS)
            var watersheds = esri.dynamicMapLayer({
                url: 'https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer',
                opacity: 0.7
            });
            // Land use hosted by USGS
            var landUse = esri.dynamicMapLayer({
                url: 'https://gis1.usgs.gov/arcgis/rest/services/gap/GAP_Land_Cover_NVC_Class_Landuse/MapServer',
                opacity: 0.7
            });
            var overlays = {
                'Flyways': flyways,
                'Watersheds (HUC 2)': watersheds,
                'Land Use': landUse
            };
            // const x = { position: 'topleft'};
            L.control.layers(baseMaps, overlays, { position: 'topleft' }).addTo(_this.map);
            L.control.scale({ position: 'bottomright' }).addTo(_this.map);
            // L.control.layers(baseMaps).addTo(this.map);
            _this.mapEvent(_this.eventData);
            _this.map.on('overlayadd', function (e) {
                console.log('overlayadd');
                if (e.name === 'Flyways') {
                    _this.flywaysVisible = true;
                }
                else if (e.name === 'Watersheds (HUC 2)') {
                    _this.watershedsVisible = true;
                }
            });
            _this.map.on('overlayremove', function (e) {
                console.log('overlayremove');
                if (e.name === 'Flyways') {
                    _this.flywaysVisible = false;
                }
                else if (e.name === 'Watersheds (HUC 2)') {
                    _this.watershedsVisible = false;
                }
            });
            /* this.natMap = new L.Map('hiddenNatMap', {
              center: new L.LatLng(39.8283, -98.5795),
              zoom: 4,
              layers: [streets]
            }); */
        }, 3000);
    };
    EventDetailsComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EventDetailsComponent.prototype.searchInArray = function (array, field, value) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            if (item[field] === value) {
                // console.log('Duplicate detected. Already existing ID: ' + value);
                return true;
            }
        }
    };
    EventDetailsComponent.prototype.mapEvent = function (eventData) {
        var markers = [];
        var countyPolys = [];
        this.unMappables = [];
        for (var _i = 0, _a = eventData.eventlocations; _i < _a.length; _i++) {
            var eventlocation = _a[_i];
            markers.push(eventlocation);
            if (eventlocation.administrative_level_two_points !== null) {
                countyPolys.push(JSON.parse(eventlocation.administrative_level_two_points.replace('Y', '')));
            }
        }
        console.log('mapevents ' + this.locationMarkers);
        // let eventPolys;
        if (countyPolys.length > 0) {
            if (this.eventPolys) {
                this.map.removeLayer(this.eventPolys);
            }
            this.eventPolys = L.polygon(countyPolys, { color: 'blue' }).addTo(this.map);
        }
        for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
            var marker_1 = markers_1[_b];
            if (marker_1.latitude === null || marker_1.longitude === null || marker_1.latitude === undefined || marker_1.longitude === undefined) {
                this.unMappables.push(marker_1);
            }
            else if (marker_1.latitude !== null || marker_1.longitude !== null || marker_1.latitude !== undefined || marker_1.longitude !== undefined) {
                this.icon = L.divIcon({
                    className: 'wmm-pin wmm-white wmm-icon-circle wmm-icon-black wmm-size-25'
                });
                L.marker([Number(marker_1.latitude), Number(marker_1.longitude)], { icon: this.icon })
                    .addTo(this.locationMarkers);
            }
        }
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
            this.map.fitBounds(bounds);
        }
    };
    EventDetailsComponent.prototype.reloadMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.locationMarkers.clearLayers();
            _this.mapEvent(_this.eventData);
        }, 2500);
    };
    EventDetailsComponent.prototype.navigateToHome = function () {
        this.router.navigate(["../../home"], { relativeTo: this.route });
    };
    EventDetailsComponent.prototype.navigateToEventDetails = function (eventID) {
        this.eventLocationSpecies = [];
        this.router.navigate(["../" + eventID], { relativeTo: this.route });
        this.reloadMap();
        this.eventDetailsTabs.selectedIndex = 0;
        // location.reload();
        // this.refreshEvent();
    };
    // panels are closed when tabs are switched, but the panel boolean isn't actually changed. This is setting them all to false.
    EventDetailsComponent.prototype.resetExpansionPanels = function () {
        this.eventCommentsPanelOpen = false;
        this.serviceRequestPanelOpen = false;
        this.collaboratorsPanelOpen = false;
        this.locationCommentsPanelOpen = false;
        this.locationContactsPanelOpen = false;
    };
    EventDetailsComponent.prototype.setOpened = function (itemIndex) {
        this.currentlyOpenedItemIndex = itemIndex;
    };
    EventDetailsComponent.prototype.setClosed = function (itemIndex) {
        if (this.currentlyOpenedItemIndex === itemIndex) {
            this.currentlyOpenedItemIndex = -1;
        }
    };
    EventDetailsComponent.prototype.editEvent = function (id) {
        var _this = this;
        // Open dialog for editing event
        this.editEventDialogRef = this.dialog.open(edit_event_component_1.EditEventComponent, {
            disableClose: true,
            data: {
                eventData: this.eventData,
                organizations: this.organizations
            },
        });
        this.editEventDialogRef.afterClosed()
            .subscribe(function () {
            _this._eventService.getEventDetails(_this.eventID)
                .subscribe(function (eventdetails) {
                _this.eventData = eventdetails;
                _this.eventLocationSpecies = [];
                for (var _i = 0, _a = _this.eventData.eventlocations; _i < _a.length; _i++) {
                    var event_location = _a[_i];
                    for (var _b = 0, _c = event_location.locationspecies; _b < _c.length; _b++) {
                        var locationspecies = _c[_b];
                        locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
                        locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
                        locationspecies.country_string = event_location.country_string;
                        _this.eventLocationSpecies.push(locationspecies);
                    }
                }
                // console.log('eventLocationSpecies:', this.eventLocationSpecies);
                //  this.speciesTableRows = this.eventLocationSpecies;
                _this.eventDataLoading = false;
            }, function (error) {
                _this.errorMessage = error;
            });
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addEventDiagnosis = function (id) {
        var _this = this;
        // Open dialog for adding event diagnosis
        this.addEventDiagnosisDialogRef = this.dialog.open(add_event_diagnosis_component_1.AddEventDiagnosisComponent, {
            minWidth: '75%',
            data: {
                event_id: id,
                diagnosis_options: this.possibleEventDiagnoses,
                event_data: this.eventData
            }
        });
        this.addEventDiagnosisDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.downloadEventReport = function (id) {
        var _this = this;
        this.selectedTab = 0;
        setTimeout(function () {
            _this.eventPublicReportDialogRef = _this.dialog.open(event_public_report_component_1.EventPublicReportComponent, {
                minWidth: '40%',
                data: {
                    event_data: _this.eventData,
                    user: _this.currentUser,
                    event_summary: _this.natMapPoints
                }
            });
            _this.eventPublicReportDialogRef.afterClosed()
                .subscribe(function () {
                // this.refreshEvent();
            }, function (error) {
                _this.errorMessage = error;
            });
            // adding back leaflet layers and controls
            _this.locationMarkers = L.featureGroup().addTo(_this.map);
            _this.mapEvent(_this.eventData);
            $('.leaflet-control-zoom').css('visibility', 'visible');
            $('.leaflet-control-layers').css('visibility', 'visible');
            $('.leaflet-control-attribution').css('visibility', 'visible');
        }, 1000);
    };
    EventDetailsComponent.prototype.addEventOrganization = function (id) {
        var _this = this;
        // Open dialog for adding event diagnosis
        this.addEventOrganizationDialogRef = this.dialog.open(add_event_organization_component_1.AddEventOrganizationComponent, {
            minWidth: '75%',
            data: {
                event_id: id,
                organizations: this.organizations,
                existing_event_orgs: this.eventData.organizations
            }
        });
        this.addEventOrganizationDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addEventComment = function (id) {
        var _this = this;
        // Open dialog for adding event diagnosis
        this.addCommentDialogRef = this.dialog.open(add_comment_component_1.AddCommentComponent, {
            data: {
                object_id: id,
                title: 'Add Comment',
                titleIcon: 'add_comment',
                // confirmButtonText: 'Add comment',
                showCancelButton: true,
                action_button_text: 'Add Comment',
                actionButtonIcon: 'add_comment',
                comment_object: 'event'
            }
        });
        this.addCommentDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addEventLocationComment = function (id) {
        var _this = this;
        // Open dialog for adding event location comment
        this.addCommentDialogRef = this.dialog.open(add_comment_component_1.AddCommentComponent, {
            data: {
                object_id: id,
                title: 'Add Comment',
                titleIcon: 'add_comment',
                // confirmButtonText: 'Add comment',
                showCancelButton: true,
                action_button_text: 'Add Comment',
                actionButtonIcon: 'add_comment',
                comment_object: 'eventlocation'
            }
        });
        this.addCommentDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addServiceRequestComment = function (id) {
        var _this = this;
        // Open dialog for adding service request comment
        this.addCommentDialogRef = this.dialog.open(add_comment_component_1.AddCommentComponent, {
            data: {
                object_id: id,
                title: 'Add Comment',
                titleIcon: 'add_comment',
                // confirmButtonText: 'Add comment',
                showCancelButton: true,
                action_button_text: 'Add Comment',
                actionButtonIcon: 'add_comment',
                comment_object: 'servicerequest'
            }
        });
        this.addCommentDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addServiceRequestResponse = function (servicerequest) {
        var _this = this;
        // Open add service request dialog for response field update
        this.addServiceRequestDialogRef = this.dialog.open(add_service_request_component_1.AddServiceRequestComponent, {
            disableClose: true,
            data: {
                event_id: this.eventData.id,
                servicerequest: servicerequest,
                comment_types: this.commentTypes,
                title: 'Respond to service request',
                titleIcon: 'question_answer',
                showCancelButton: true,
                action_button_text: 'Save Response',
                actionButtonIcon: 'question_answer',
                action: 'respond'
            }
        });
        this.addServiceRequestDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addEventLocationContact = function (id) {
        var _this = this;
        // Open dialog for adding event location contact
        this.addEventLocationContactDialogRef = this.dialog.open(add_event_location_contact_component_1.AddEventLocationContactComponent, {
            disableClose: true,
            data: {
                event_location_id: id,
                userContacts: this.userContacts,
                title: 'Add Contact to event location',
                titleIcon: 'add_circle',
                // confirmButtonText: 'Add comment',
                showCancelButton: true,
                action_button_text: 'Add Contact',
                actionButtonIcon: 'add_circle'
            }
        });
        this.addEventLocationContactDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.addServiceRequest = function (id) {
        var _this = this;
        // Open dialog for adding event location contact
        this.addServiceRequestDialogRef = this.dialog.open(add_service_request_component_1.AddServiceRequestComponent, {
            disableClose: true,
            minWidth: '75%',
            data: {
                event_id: id,
                comment_types: this.commentTypes,
                title: 'Add a service request',
                titleIcon: 'add_circle',
                showCancelButton: true,
                action_button_text: 'Submit request',
                actionButtonIcon: 'question_answer',
                action: 'add'
            }
        });
        this.addServiceRequestDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    // Tooltip text
    EventDetailsComponent.prototype.editLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationNameTooltip; return string; };
    EventDetailsComponent.prototype.editStandardizedLocationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; };
    EventDetailsComponent.prototype.flywayTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.flywayTooltip; return string; };
    EventDetailsComponent.prototype.editLandOwnershipTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; };
    EventDetailsComponent.prototype.longitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.longitudeTooltip; return string; };
    EventDetailsComponent.prototype.latitudeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.latitudeTooltip; return string; };
    EventDetailsComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    EventDetailsComponent.prototype.editSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesTooltip; return string; };
    EventDetailsComponent.prototype.editKnownDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownDeadTooltip; return string; };
    EventDetailsComponent.prototype.editEstimatedDeadTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; };
    EventDetailsComponent.prototype.editKnownSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editKnownSickTooltip; return string; };
    EventDetailsComponent.prototype.editEstimatedSickTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; };
    EventDetailsComponent.prototype.populationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.populationTooltip; return string; };
    EventDetailsComponent.prototype.editAgeBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editAgeBiasTooltip; return string; };
    EventDetailsComponent.prototype.editSexBiasTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSexBiasTooltip; return string; };
    EventDetailsComponent.prototype.editCaptiveTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editCaptiveTooltip; return string; };
    EventDetailsComponent.prototype.editSpeciesDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; };
    EventDetailsComponent.prototype.locationNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationNameTooltip; return string; };
    EventDetailsComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    EventDetailsComponent.prototype.editRecordStatusTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editRecordStatusTooltip; return string; };
    EventDetailsComponent.prototype.collaboratorsAddIndividualTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; };
    EventDetailsComponent.prototype.collaboratorsAddCircleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; };
    EventDetailsComponent.prototype.editContactOrganizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editContactOrganizationTooltip; return string; };
    EventDetailsComponent.prototype.eventIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip; return string; };
    EventDetailsComponent.prototype.eventStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventStartDateTooltip; return string; };
    EventDetailsComponent.prototype.eventEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventEndDateTooltip; return string; };
    EventDetailsComponent.prototype.nwhcCarcassSubApprovalTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.nwhcCarcassSubApprovalTooltip; return string; };
    EventDetailsComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    EventDetailsComponent.prototype.locationsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationsTooltip; return string; };
    EventDetailsComponent.prototype.contactPersonTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactPersonTooltip; return string; };
    EventDetailsComponent.prototype.associatedEventsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.associatedEventsTooltip; return string; };
    EventDetailsComponent.prototype.deleteComment = function (id) {
        var _this = this;
        this.commentService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Comment successfully deleted', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Comment not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.openCommentDeleteConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Comment Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this comment?\nThis action cannot be undone.',
                confirmButtonText: 'Yes, Delete comment',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteComment(id);
            }
        });
    };
    EventDetailsComponent.prototype.deleteEventLocationComment = function (id) {
        var _this = this;
        this.commentService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Comment successfully deleted', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Comment not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.openEventLocationCommentDeleteConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Event Location Comment Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this comment? This action cannot be undone.',
                confirmButtonText: 'Yes, Delete comment',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventLocationComment(id);
            }
        });
    };
    EventDetailsComponent.prototype.deleteEventLocationContact = function (id) {
        var _this = this;
        this.eventLocationContactService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Contact successfully disassociated', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Contact not disassociated. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.openLocationContactRemoveConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Disassociate contact',
                titleIcon: 'remove_circle',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you wish to disassociate this contact with this event location? This does not delete the contact record.',
                confirmButtonText: 'Yes, remove this contact',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventLocationContact(id);
            }
        });
    };
    EventDetailsComponent.prototype.openCreateContactDialog = function () {
        this.createContactDialogRef = this.dialog.open(create_contact_component_1.CreateContactComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                contact_action: 'create'
            }
        });
    };
    EventDetailsComponent.prototype.addEventLocation = function () {
        this.showAddEventLocation = true;
    };
    EventDetailsComponent.prototype.openEventDetailsShare = function () {
        this.eventDetailsShareDialogRef = this.dialog.open(event_details_share_component_1.EventDetailsShareComponent, {
            data: {
                eventID: this.eventID,
            }
        });
    };
    EventDetailsComponent.prototype.editEventLocation = function (eventLocationData) {
        // Open dialog for editing event location
        this.editEventLocationDialogRef = this.dialog.open(edit_event_location_component_1.EditEventLocationComponent, {
            data: {
                eventLocationData: eventLocationData
            }
        });
    };
    EventDetailsComponent.prototype.deleteEventLocation = function (id) {
        var _this = this;
        this.eventLocationService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Event location successfully deleted', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Event location not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.openEventLocationDeleteConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Event Location Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                messageIcon: 'warning',
                message: 'Are you sure you want to delete this event location, and all its associated species, contacts, and comments? This action cannot be undone.',
                confirmButtonText: 'Yes, Delete location and all associated data',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventLocation(id);
            }
        });
    };
    EventDetailsComponent.prototype.openEventDiagnosisDeleteConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Event Diagnosis Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this event diagnosis? This action cannot be undone.',
                confirmButtonText: 'Yes, Delete Event Diagnosis',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventDiagnosis(id);
            }
        });
    };
    EventDetailsComponent.prototype.deleteEventDiagnosis = function (id) {
        var _this = this;
        this.eventDiagnosisService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Event diagnosis successfully deleted', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Event diagnosis not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.openEventOrganizationDeleteConfirm = function (id) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Event Organization Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete this event organization? This action cannot be undone.',
                confirmButtonText: 'Yes, Delete Event Organization',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteEventOrganization(id);
            }
        });
    };
    EventDetailsComponent.prototype.deleteEventOrganization = function (id) {
        var _this = this;
        this.eventOrganizationService.delete(id)
            .subscribe(function () {
            _this.refreshEvent();
            _this.openSnackBar('Event organization successfully deleted', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Event organization not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    EventDetailsComponent.prototype.addToEventGroup = function () {
    };
    EventDetailsComponent.prototype.openCollaborationRequestDialog = function (eventID) {
        var _this = this;
        // Open dialog for collaboration request
        this.collaborationRequestDialogRef = this.dialog.open(collaboration_request_component_1.CollaborationRequestComponent, {
            disableClose: true,
            data: {
                event_id: eventID,
                title: 'Request to Collaborate',
                titleIcon: 'group',
                showCancelButton: true,
                action_button_text: 'Submit request',
                actionButtonIcon: 'send'
            }
        });
        this.collaborationRequestDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.refreshEvent = function () {
        var _this = this;
        // see comment on line 182
        // this.viewPanelStates = new Object();
        // this.getViewPanelState(this.viewPanels);
        this.selectedTab = 0;
        console.log('Event Location Species list at start of refresh: ', this.eventLocationSpecies);
        this.eventLocationSpecies = [];
        console.log('Event Location Species list after set to blank array: ', this.eventLocationSpecies);
        this.possibleEventDiagnoses = [];
        this._eventService.getEventDetails(this.eventID)
            .subscribe(function (eventdetails) {
            _this.eventData = eventdetails;
            _this.eventLocationSpecies = [];
            // this.possibleEventDiagnoses = [];
            for (var _i = 0, _a = _this.eventData.eventlocations; _i < _a.length; _i++) {
                var event_location = _a[_i];
                for (var _b = 0, _c = event_location.locationspecies; _b < _c.length; _b++) {
                    var locationspecies = _c[_b];
                    locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
                    locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
                    locationspecies.country_string = event_location.country_string;
                    _this.eventLocationSpecies.push(locationspecies);
                    for (var _d = 0, _e = locationspecies.speciesdiagnoses; _d < _e.length; _d++) {
                        var speciesdiagnosis = _e[_d];
                        if (!_this.searchInArray(_this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                            _this.possibleEventDiagnoses.push(speciesdiagnosis);
                        }
                        else {
                            // it is in there already:
                            // check if this one's suspect field is false
                            if (speciesdiagnosis.suspect === false) {
                                // if it is, then we need to remove the previously added one and add this one which is suspect = false
                                // loop thru possibleEventDiagnoses, if match, remove
                                for (var i = 0; i < _this.possibleEventDiagnoses.length; i++) {
                                    if (_this.possibleEventDiagnoses[i].diagnosis === speciesdiagnosis.diagnosis) {
                                        _this.possibleEventDiagnoses.splice(i, 1);
                                    }
                                }
                                // then add the non suspect one
                                _this.possibleEventDiagnoses.push(speciesdiagnosis);
                            }
                        }
                    }
                }
            }
            console.log('Event Location Species list after populated: ', _this.eventLocationSpecies);
            // add the "Undetermined" diagnosis to possibleDiagnoses, only if not already in the list
            if (!_this.searchInArray(_this.possibleEventDiagnoses, 'diagnosis', app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis)) {
                _this.possibleEventDiagnoses.push(app_settings_1.APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN);
            }
            // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
            // else if (eventdetails.complete === false) {
            //   this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN);
            // }
            _this.readCollaboratorArray = eventdetails.read_collaborators;
            _this.writeCollaboratorArray = eventdetails.write_collaborators;
            _this.eventDataLoading = false;
            // see comment on line 182
            // setTimeout(() => {
            //   this.setViewPanelState(this.viewPanels);
            // });
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    // below deprecated. see comment on line 182
    // getViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
    //   viewPanels.forEach((element, index) => {
    //     this.viewPanelStates[index] = element.expanded;
    //   });
    // }
    // setViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
    //   viewPanels.forEach((element, index) => {
    //     if (this.viewPanelStates[index]) {
    //       element.open();
    //     }
    //   });
    // }
    EventDetailsComponent.prototype.addLocationSpecies = function (eventlocation) {
        var _this = this;
        // Open dialog for adding location species
        this.editLocationSpeciesDialogRef = this.dialog.open(edit_location_species_component_1.EditLocationSpeciesComponent, {
            data: {
                eventData: this.eventData,
                species: this.species,
                ageBiases: this.ageBiases,
                sexBiases: this.sexBiases,
                location_species_action: 'add',
                action_text: 'add',
                action_button_text: 'Submit',
                eventlocation: eventlocation,
                title: 'Add species to this location',
                titleIcon: 'add'
            }
        });
        this.editLocationSpeciesDialogRef.afterClosed()
            .subscribe(function () {
            _this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.determineLocationName = function (name, i) {
        var locationName;
        if (name === '' || name === undefined) {
            locationName = 'Location ' + i;
        }
        else {
            locationName = 'Location ' + i + ' - ' + name;
        }
        return locationName;
    };
    // Determine comment type based on id, return for display in app along side comment
    EventDetailsComponent.prototype.getCommentType = function (comment_id) {
        var comment_type;
        switch (comment_id) {
            case 1:
                comment_type = 'Site description';
                break;
            case 2:
                comment_type = 'History';
                break;
            case 3:
                comment_type = 'Environmental factors';
                break;
            case 4:
                comment_type = 'Clinical signs';
                break;
            case 5:
                comment_type = 'General';
                break;
        }
        return comment_type;
    };
    EventDetailsComponent.prototype.removeCollaborator = function (userID, list) {
        // WIP below. seems to be good. test a few more times.
        if (list === 'read') {
            var readIndex = this.readCollaboratorArray.findIndex(function (o) {
                return o.id === userID;
            });
            if (readIndex !== -1) {
                this.readCollaboratorArray.splice(readIndex, 1);
            }
        }
        else if (list === 'write') {
            var writeIndex = this.writeCollaboratorArray.findIndex(function (o) {
                return o.id === userID;
            });
            if (writeIndex !== -1) {
                this.writeCollaboratorArray.splice(writeIndex, 1);
            }
        }
        var readCollaboratorIDArray = [];
        for (var _i = 0, _a = this.readCollaboratorArray; _i < _a.length; _i++) {
            var user = _a[_i];
            readCollaboratorIDArray.push(user.id);
        }
        var writeCollaboratorIDArray = [];
        for (var _b = 0, _c = this.writeCollaboratorArray; _b < _c.length; _b++) {
            var user = _c[_b];
            writeCollaboratorIDArray.push(user.id);
        }
        this.updateCollaboratorList(readCollaboratorIDArray, writeCollaboratorIDArray);
    };
    EventDetailsComponent.prototype.addCollaborator = function (accessType) {
        var _this = this;
        this.circleManagementDialogRef = this.dialog.open(circle_management_component_1.CircleManagementComponent, {
            disableClose: true,
            data: {
                action: 'selectUser',
            }
        });
        this.circleManagementDialogRef.afterClosed()
            .subscribe(function (selectedUser) {
            if (selectedUser !== 'cancel') {
                if (accessType === 'read') {
                    _this.readCollaboratorArray.push(selectedUser);
                }
                else if (accessType === 'write') {
                    _this.writeCollaboratorArray.push(selectedUser);
                }
                var readCollaboratorIDArray = [];
                for (var _i = 0, _a = _this.readCollaboratorArray; _i < _a.length; _i++) {
                    var user = _a[_i];
                    readCollaboratorIDArray.push(user.id);
                }
                var writeCollaboratorIDArray = [];
                for (var _b = 0, _c = _this.writeCollaboratorArray; _b < _c.length; _b++) {
                    var user = _c[_b];
                    writeCollaboratorIDArray.push(user.id);
                }
                _this.updateCollaboratorList(readCollaboratorIDArray, writeCollaboratorIDArray);
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventDetailsComponent.prototype.openCircleChooseDialog = function (accessType) {
        var _this = this;
        this.circleChooseDialogRef = this.dialog.open(circle_choose_component_1.CircleChooseComponent, {
            minWidth: '60em',
            data: {
                userCircles: this.userCircles
            }
        });
        this.circleChooseDialogRef.afterClosed().subscribe(function (result) {
            if (result !== 'cancel') {
                if (accessType === 'read') {
                    // add the users array to the new_read_collaborators array
                    _this.readCollaboratorArray = _this.readCollaboratorArray.concat(result.users);
                    var readCollaboratorIDArray = [];
                    for (var _i = 0, _a = _this.readCollaboratorArray; _i < _a.length; _i++) {
                        var user = _a[_i];
                        readCollaboratorIDArray.push(user.id);
                    }
                    _this.updateCollaboratorList('read', readCollaboratorIDArray);
                }
                else if (accessType === 'write') {
                    _this.writeCollaboratorArray = _this.writeCollaboratorArray.concat(result.users);
                    var writeCollaboratorIDArray = [];
                    for (var _b = 0, _c = _this.writeCollaboratorArray; _b < _c.length; _b++) {
                        var user = _c[_b];
                        writeCollaboratorIDArray.push(user.id);
                    }
                    _this.updateCollaboratorList('write', writeCollaboratorIDArray);
                }
            }
        });
    };
    EventDetailsComponent.prototype.updateCollaboratorList = function (readCollaboratorArray, writeCollaboratorArray) {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_read_collaborators': readCollaboratorArray, 'new_write_collaborators': writeCollaboratorArray };
        // if (accessType === 'read') {
        //   update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_read_collaborators': userArray };
        // } else if (accessType === 'write') {
        //   update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_write_collaborators': userArray };
        // }
        this._eventService.update(update)
            .subscribe(function (event) {
            // this.submitLoading = false;
            _this.openSnackBar('Collaborator list updated.', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
        }, function (error) {
            // this.submitLoading = false;
            _this.openSnackBar('Error. Collaborator list not updated. Error message: ' + error, 'OK', 15000);
        });
    };
    // From angular material table sample on material api reference site
    /** Whether the number of selected elements matches the total number of rows. */
    // isAllSelected(i: number) {
    //   const numSelected = this.selection[i].selected.length;
    //   const numRows = this.locationSpeciesDataSource.data.length;
    //   return numSelected === numRows;
    // }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle(i: number) {
    //   this.isAllSelected(i) ?
    //     this.selection[i].clear() :
    //     this.locationSpeciesDataSource.data.forEach(row => this.selection[i].select(row));
    // }
    EventDetailsComponent.prototype.exportEventDetails = function () {
        this._eventService.getEventDetailsCSV(this.eventID);
        gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Exported Event Details' });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], EventDetailsComponent.prototype, "myEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EventDetailsComponent.prototype, "selectedTab", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], EventDetailsComponent.prototype, "locationSpeciesPaginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], EventDetailsComponent.prototype, "locationSpeciesSort", void 0);
    __decorate([
        core_1.ViewChild(event_public_report_component_1.EventPublicReportComponent),
        __metadata("design:type", event_public_report_component_1.EventPublicReportComponent)
    ], EventDetailsComponent.prototype, "eventReportComponent", void 0);
    __decorate([
        core_1.ViewChildren(material_1.MatExpansionPanel),
        __metadata("design:type", core_1.QueryList)
    ], EventDetailsComponent.prototype, "viewPanels", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatTabGroup),
        __metadata("design:type", material_1.MatTabGroup)
    ], EventDetailsComponent.prototype, "eventDetailsTabs", void 0);
    EventDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-event-details',
            templateUrl: './event-details.component.html',
            styleUrls: ['./event-details.component.scss'],
            // encapsulation: ViewEncapsulation.None,
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('void', animations_1.style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                    animations_1.state('*', animations_1.style({ height: '*', visibility: 'visible' })),
                    animations_1.transition('void <=> *', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            event_service_1.EventService,
            user_service_1.UserService,
            current_user_service_1.CurrentUserService,
            data_updated_service_1.DataUpdatedService,
            create_contact_service_1.CreateContactService,
            material_1.MatDialog,
            species_service_1.SpeciesService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            land_ownership_service_1.LandOwnershipService,
            event_location_service_1.EventLocationService,
            event_diagnosis_service_1.EventDiagnosisService,
            event_location_contact_service_1.EventLocationContactService,
            event_organization_service_1.EventOrganizationService,
            age_bias_service_1.AgeBiasService,
            sex_bias_service_1.SexBiasService,
            comment_type_service_1.CommentTypeService,
            organization_service_1.OrganizationService,
            comment_service_1.CommentService,
            contact_service_1.ContactService,
            circle_service_1.CircleService,
            material_3.MatSnackBar,
            router_1.Router])
    ], EventDetailsComponent);
    return EventDetailsComponent;
}());
exports.EventDetailsComponent = EventDetailsComponent;
//# sourceMappingURL=event-details.component.js.map