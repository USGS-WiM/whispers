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
//declare let L: any;
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var event_service_1 = require("@services/event.service");
var material_3 = require("@angular/material");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var search_dialog_component_1 = require("@search-dialog/search-dialog.component");
var search_dialog_service_1 = require("@app/search-dialog/search-dialog.service");
var router_1 = require("@angular/router");
var app_utilities_1 = require("@app/app.utilities");
var app_settings_1 = require("@app/app.settings");
var app_field_help_text_1 = require("@app/app.field-help-text");
var current_user_service_1 = require("@services/current-user.service");
var administrative_level_one_service_1 = require("@app/services/administrative-level-one.service");
var search_service_1 = require("@app/services/search.service");
var administrative_level_two_service_1 = require("@app/services/administrative-level-two.service");
var event_type_service_1 = require("@app/services/event-type.service");
var diagnosis_type_service_1 = require("@app/services/diagnosis-type.service");
var diagnosis_service_1 = require("@app/services/diagnosis.service");
var species_service_1 = require("@app/services/species.service");
var save_search_component_1 = require("@app/save-search/save-search.component");
var search_results_summary_report_component_1 = require("@app/search-results-summary-report/search-results-summary-report.component");
require("leaflet");
require("leaflet-draw");
var esri = require("esri-leaflet");
var user_registration_component_1 = require("@app/user-registration/user-registration.component");
var data_updated_service_1 = require("@services/data-updated.service");
// export class ResultsDataSource extends MatTableDataSource<any> {
//   constructor(private userService: EventService) {
//     super();
//   }
//   connect(): Observable<EventSummary[]> {
//     return this.eventService.queryEvents();
//   }
//   disconnect() { }
// }
var HomeComponent = /** @class */ (function () {
    function HomeComponent(eventService, dialog, snackBar, searchDialogService, dataUpdatedService, displayValuePipe, adminLevelOneService, adminLevelTwoService, eventTypeService, diagnosisTypeService, diagnosisService, speciesService, currentUserService, searchService, router, route) {
        var _this = this;
        this.eventService = eventService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.searchDialogService = searchDialogService;
        this.dataUpdatedService = dataUpdatedService;
        this.displayValuePipe = displayValuePipe;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.eventTypeService = eventTypeService;
        this.diagnosisTypeService = diagnosisTypeService;
        this.diagnosisService = diagnosisService;
        this.speciesService = speciesService;
        this.currentUserService = currentUserService;
        this.searchService = searchService;
        this.router = router;
        this.route = route;
        this.isloggedIn = app_settings_1.APP_SETTINGS.IS_LOGGEDIN;
        this.currentSearchQuery = sessionStorage.getItem('currentSearch') ? JSON.parse(sessionStorage.getItem('currentSearch')) : app_settings_1.APP_SETTINGS.DEFAULT_SEARCH_QUERY;
        this.currentDisplayQuery = sessionStorage.getItem('currentDisplayQuery') ? JSON.parse(sessionStorage.getItem('currentDisplayQuery')) : app_settings_1.APP_SETTINGS.DEFAULT_DISPLAY_QUERY;
        this.eventTypes = [];
        this.diagnosisTypes = [];
        this.diagnoses = [];
        this.allSpecies = [];
        this.administrative_level_one = [];
        this.administrative_level_two = [];
        this.popularSearches = [];
        this.parsedPopularSearches = [];
        this.searchResultsLoading = false;
        this.speciesLoading = true;
        this.flywaysVisible = false;
        this.watershedsVisible = false;
        this.displayedColumns = [
            'id',
            'event_type_string',
            'affected_count',
            'start_date',
            'end_date',
            // 'country',
            'locations',
            // 'administrativelevelones',
            // 'administrativeleveltwos',
            'species',
            'eventdiagnoses'
        ];
        // listen for a refresh data trigger
        dataUpdatedService.trigger.subscribe(function (action) {
            if (action === 'refresh') {
                _this.mapResults(_this.currentResults);
            }
        });
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(function (searchQuery) {
            var countLimit = 300;
            _this.searchResultsLoading = true;
            // this is the listener for a new search query
            _this.eventService.queryEventsCount(searchQuery)
                .subscribe(function (count) {
                if (count.count >= countLimit) {
                    // this.sampleQuerySizeErrorFlag = true;
                    _this.openSnackBar('Your Query result is too large. Please narrow your search and try again', 'OK', 8000);
                    _this.searchResultsLoading = false;
                }
                else if (count.count < countLimit) {
                    if (searchQuery) {
                        _this.eventService.queryEvents(searchQuery)
                            .subscribe(function (eventSummaries) {
                            _this.currentResults = eventSummaries;
                            _this.dataSource = new material_1.MatTableDataSource(_this.currentResults);
                            _this.dataSource.paginator = _this.paginator;
                            _this.dataSource.sort = _this.sort;
                            _this.searchResultsLoading = false;
                            setTimeout(function () {
                                /*this.map = new L.Map('map', {
                                  center: new L.LatLng(39.8283, -98.5795),
                                  zoom: 4,
                                });*/
                                _this.locationMarkers.clearLayers();
                                _this.mapResults(_this.currentResults);
                            }, 500);
                        }, function (error) {
                            _this.searchResultsLoading = false;
                            _this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
                            _this.errorMessage = error;
                        });
                    }
                    _this.dataSource = new material_1.MatTableDataSource(_this.currentResults);
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    searchQuery.and_params = [];
                    if (searchQuery.diagnosis_type_includes_all === true) {
                        searchQuery.and_params.push('diagnosis_type');
                    }
                    if (searchQuery.diagnosis_includes_all === true) {
                        searchQuery.and_params.push('diagnosis_type');
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
                    _this.currentSearchQuery = searchQuery;
                    // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                    // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                    // this.testDataSource.loadResults(searchQuery);
                    if (_this.searchDialogRef) {
                        _this.searchDialogRef.close();
                    }
                }
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
            });
        });
        this.searchQuerySubscription = this.searchDialogService.getDisplayQuery()
            .subscribe(function (displayQuery) {
            _this.currentDisplayQuery = displayQuery;
            console.log('New display query: ' + _this.currentDisplayQuery);
            console.log('Current Display Query adminlevelOne length: ' + _this.currentDisplayQuery.administrative_level_one.length);
            console.log(' Current Display Query Event types: ' + _this.currentDisplayQuery.event_type);
        });
        // use displayQuery for display of current query in markup, send to searchDialogService
        //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
        // use searchForm.value to build the web service query, send to searchDialogService
        //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);// use displayQuery for display of current query in markup, send to searchDialogService
        //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
        // use searchForm.value to build the web service query, send to searchDialogService
        //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
    }
    HomeComponent.prototype.openSearchDialog = function () {
        this.searchDialogRef = this.dialog.open(search_dialog_component_1.SearchDialogComponent, {
            minWidth: '60%',
            data: {
                query: this.currentDisplayQuery
            }
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var defaultEventQuery = app_settings_1.APP_SETTINGS.DEFAULT_SEARCH_QUERY;
        this.speciesLoading = true;
        this.searchResultsLoading = true;
        this.currentSearchQuery.and_params = [];
        //if (sessionStorage.getItem('currentSearch')) {
        //   this.openSnackBar('Current Search has been loaded from your previous visit.', 'OK', 8000);
        // }
        if (this.currentSearchQuery.diagnosis_type_includes_all === true) {
            this.currentSearchQuery.and_params.push('diagnosis_type');
        }
        if (this.currentSearchQuery.diagnosis_includes_all === true) {
            this.currentSearchQuery.and_params.push('diagnosis_type');
        }
        if (this.currentSearchQuery.species_includes_all === true) {
            this.currentSearchQuery.and_params.push('species');
        }
        if (this.currentSearchQuery.administrative_level_one_includes_all === true) {
            this.currentSearchQuery.and_params.push('administrative_level_one');
        }
        if (this.currentSearchQuery.administrative_level_two_includes_all === true) {
            this.currentSearchQuery.and_params.push('administrative_level_two');
        }
        // two lines below for the DataSource as separate class method (possibly revisit)
        // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
        // this.testDataSource.loadResults(defaultEventQuery);
        this.eventService.queryEvents(this.currentSearchQuery)
            .subscribe(function (eventSummaries) {
            _this.currentResults = eventSummaries;
            _this.dataSource = new material_1.MatTableDataSource(_this.currentResults);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.searchResultsLoading = false;
            setTimeout(function () {
                var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a> contributors.', 
                // tslint:disable-next-line:max-line-length
                mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
                var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'
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
                var overlays = {
                    'Flyways': flyways,
                    'Watersheds (HUC 2)': watersheds
                };
                var drawnItems = L.featureGroup().addTo(_this.map);
                L.control.layers(baseMaps, overlays, { position: 'topleft' }, { 'drawlayer': drawnItems }).addTo(_this.map);
                L.control.scale({ position: 'bottomright' }).addTo(_this.map);
                var drawControl = new L.Control.Draw({
                    edit: {
                        featureGroup: drawnItems,
                        poly: {
                            allowIntersection: false
                        }
                    },
                    draw: {
                        polygon: {
                            allowIntersection: false,
                            showArea: true
                        },
                        marker: false,
                        circle: false,
                        circlemarker: false,
                        rectangle: false
                    }
                });
                _this.map.addControl(drawControl);
                // Truncate value based on number of decimals
                var _round = function (num, len) {
                    return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
                };
                // Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
                var strLatLng = function (latlng) {
                    return '(' + _round(latlng.lat, 6) + ', ' + _round(latlng.lng, 6) + ')';
                };
                // Generate popup content based on layer type
                // - Returns HTML string, or null if unknown object
                var getPopupContent = function (layer) {
                    // Marker - add lat/long
                    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                        return strLatLng(layer.getLatLng());
                        // Circle - lat/long, radius
                    }
                    else if (layer instanceof L.Circle) {
                        var center = layer.getLatLng(), radius = layer.getRadius();
                        return 'Center: ' + strLatLng(center) + '<br />'
                            + 'Radius: ' + _round(radius, 2) + ' m';
                        // Rectangle/Polygon - area
                    }
                    else if (layer instanceof L.Polygon) {
                        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(), area = L.GeometryUtil.geodesicArea(latlngs);
                        return 'Area: ' + L.GeometryUtil.readableArea(area, true);
                        // Polyline - distance
                    }
                    else if (layer instanceof L.Polyline) {
                        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs();
                        var distance = 0;
                        if (latlngs.length < 2) {
                            return 'Distance: N/A';
                        }
                        else {
                            for (var i = 0; i < latlngs.length - 1; i++) {
                                distance += latlngs[i].distanceTo(latlngs[i + 1]);
                            }
                            return 'Distance: ' + _round(distance, 2) + ' m';
                        }
                    }
                    return null;
                };
                // Object created - bind popup to layer, add to feature group
                _this.map.on(L.Draw.Event.CREATED, function (event) {
                    var layer = event.layer;
                    var content = getPopupContent(layer);
                    if (content !== null) {
                        layer.bindPopup(content);
                    }
                    drawnItems.addLayer(layer);
                });
                // Object(s) edited - update popups
                _this.map.on(L.Draw.Event.EDITED, function (event) {
                    var layers = event.layers;
                    // const content = null;
                    layers.eachLayer(function (layer) {
                        var content = getPopupContent(layer);
                        if (content !== null) {
                            layer.setPopupContent(content);
                        }
                    });
                });
                _this.mapResults(_this.currentResults);
                // begin latLngScale utility logic/////////////////////////////////////////////////////////////////////////////////////////
                // grabbed from FEV
                // displays map scale on map load
                // map.on( 'load', function() {
                _this.map.whenReady(function () {
                    var mapZoom = _this.map.getZoom();
                    var tempMapScale = _this.scaleLookup(_this.map.getZoom());
                    _this.zoomLevel = mapZoom;
                    _this.mapScale = tempMapScale;
                    var initMapCenter = _this.map.getCenter();
                    _this.latitude = initMapCenter.lat.toFixed(4);
                    _this.longitude = initMapCenter.lng.toFixed(4);
                });
                // displays map scale on scale change (i.e. zoom level)
                _this.map.on('zoomend', function () {
                    var mapZoom = _this.map.getZoom();
                    var mapScale = _this.scaleLookup(mapZoom);
                    _this.mapScale = mapScale;
                    _this.zoomLevel = mapZoom;
                });
                // updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes 'map center' label
                _this.map.on('mousemove', function (cursorPosition) {
                    // $('#mapCenterLabel').css('display', 'none');
                    if (cursorPosition.latlng !== null) {
                        _this.latitude = cursorPosition.latlng.lat.toFixed(4);
                        _this.longitude = cursorPosition.latlng.lng.toFixed(4);
                    }
                });
                // updates lat/lng indicator to map center after pan and shows 'map center' label.
                _this.map.on('dragend', function () {
                    // displays latitude and longitude of map center
                    // $('#mapCenterLabel').css('display', 'inline');
                    var geographicMapCenter = _this.map.getCenter();
                    _this.latitude = geographicMapCenter.lat.toFixed(4);
                    _this.longitude = geographicMapCenter.lng.toFixed(4);
                });
                // end latLngScale utility logic/////////
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
            }, 500);
        }, function (error) {
            _this.errorMessage = error;
        });
        this.dataSource = new material_1.MatTableDataSource(this.currentResults);
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.adminLevelOnes = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get top ten searches from the SearchService
        this.searchService.getPopularSearches()
            .subscribe(function (searches) {
            _this.popularSearches = searches;
            // build parsed search list
            for (var _i = 0, _a = _this.popularSearches; _i < _a.length; _i++) {
                var search = _a[_i];
                var parsedSearch = app_utilities_1.APP_UTILITIES.parseSearch(search);
                _this.parsedPopularSearches.push(parsedSearch);
            }
            // build a list of relevant adminL1s
            var adminLevelOnes = [];
            for (var _b = 0, _c = _this.parsedPopularSearches; _b < _c.length; _b++) {
                var parsedSearch = _c[_b];
                if (parsedSearch.administrative_level_one) {
                    for (var _d = 0, _e = parsedSearch.administrative_level_one; _d < _e.length; _d++) {
                        var adminLevelOne = _e[_d];
                        adminLevelOnes.push(adminLevelOne);
                    }
                }
            }
            // query adminL2s from the relevant adminL1 list
            adminLevelOnes = adminLevelOnes.map(function (e) {
                return JSON.stringify(e);
            });
            var adminLevelOneString = adminLevelOnes.join(',');
            _this.adminLevelTwoService.queryAdminLevelTwos(adminLevelOneString)
                .subscribe(function (adminLevelTwos) {
                _this.administrative_level_two = adminLevelTwos;
            }, function (error) {
                _this.errorMessage = error;
            });
            console.log('Popular searches: ' + _this.parsedPopularSearches);
        }, function (error) {
            _this.errorMessage = error;
        });
        // get event types from the eventType service
        this.eventTypeService.getEventTypes()
            .subscribe(function (eventTypes) {
            _this.eventTypes = eventTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosis types from the diagnosisType service
        this.diagnosisTypeService.getDiagnosisTypes()
            .subscribe(function (diagnosisTypes) {
            _this.diagnosisTypes = diagnosisTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnoses from the diagnoses service
        this.diagnosisService.getDiagnoses()
            .subscribe(function (diagnoses) {
            _this.diagnoses = diagnoses;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.administrative_level_one = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get species from the species service
        this.speciesService.getSpecies()
            .subscribe(function (species) {
            _this.allSpecies = species;
            _this.speciesLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.speciesLoading = false;
        });
    };
    HomeComponent.prototype.scaleLookup = function (mapZoom) {
        switch (mapZoom) {
            case 19: return '1,128';
            case 18: return '2,256';
            case 17: return '4,513';
            case 16: return '9,027';
            case 15: return '18,055';
            case 14: return '36,111';
            case 13: return '72,223';
            case 12: return '144,447';
            case 11: return '288,895';
            case 10: return '577,790';
            case 9: return '1,155,581';
            case 8: return '2,311,162';
            case 7: return '4,622,324';
            case 6: return '9,244,649';
            case 5: return '18,489,298';
            case 4: return '36,978,596';
            case 3: return '73,957,193';
            case 2: return '147,914,387';
            case 1: return '295,828,775';
            case 0: return '591,657,550';
        }
    };
    HomeComponent.prototype.searchInArray = function (array, field, value) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            if (item[field] === value) {
                // console.log('Duplicate detected. Already existing ID: ' + value);
                return true;
            }
        }
    };
    HomeComponent.prototype.mapResults = function (currentResults) {
        this.locationMarkers.clearLayers();
        // set/reset currentResultsMarker var to an empty array
        var currentResultsMarkers = [];
        // tslint:disable-next-line:forin
        // loop through currentResults repsonse from a search query
        for (var event_1 in currentResults) {
            // if event has any administrativeleveltwos (counties), add them to the currentResultsMarkers array
            if (currentResults[event_1]['administrativeleveltwos'].length > 0) {
                // tslint:disable-next-line:forin
                for (var adminleveltwo in currentResults[event_1]['administrativeleveltwos']) {
                    // check if the administrativeleveltwo (county) of the event has already been placed into the currentResultsMarkers array.
                    // If it has, push its events array into the existing marker for that administrativeleveltwo. This is to ensure one
                    // marker per administrativeleveltwo, with events nested
                    // tslint:disable-next-line:max-line-length
                    if (this.searchInArray(currentResultsMarkers, 'adminleveltwo', currentResults[event_1]['administrativeleveltwos'][adminleveltwo]['id'])) {
                        for (var _i = 0, currentResultsMarkers_1 = currentResultsMarkers; _i < currentResultsMarkers_1.length; _i++) {
                            var marker = currentResultsMarkers_1[_i];
                            if (marker.adminleveltwo === currentResults[event_1]['administrativeleveltwos'][adminleveltwo]['id']) {
                                marker.events.push(currentResults[event_1]);
                            }
                        }
                    }
                    else {
                        currentResultsMarkers.push({
                            lat: Number(currentResults[event_1]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']),
                            long: Number(currentResults[event_1]['administrativeleveltwos'][adminleveltwo]['centroid_longitude']),
                            eventdiagnoses: currentResults[event_1]['eventdiagnoses'],
                            adminleveltwo: currentResults[event_1]['administrativeleveltwos'][adminleveltwo]['id'],
                            events: [currentResults[event_1]],
                            complete: currentResults[event_1]['complete']
                        });
                    }
                }
            }
        }
        // loop through currentResultsMarkers
        for (var _a = 0, currentResultsMarkers_2 = currentResultsMarkers; _a < currentResultsMarkers_2.length; _a++) {
            var marker = currentResultsMarkers_2[_a];
            // set vars for classes that will define the marker icons, per WIM markermaker CSS
            var colorClass = void 0;
            var shapeClass = 'wmm-circle ';
            var iconClasses = ' wmm-icon-circle wmm-icon-white ';
            var sizeClass = 'wmm-size-25';
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
            }
            else if (marker.events.length > 1) {
                // set a variable for alllEventsComplete, default to true
                var allEventsComplete = true;
                // loop through the events within the marker and check their 'complete' value
                for (var _b = 0, _c = marker.events; _b < _c.length; _b++) {
                    var event_2 = _c[_b];
                    // if any of the events are not complete, set allEventsComplete to false
                    if (event_2.complete === false) {
                        allEventsComplete = false;
                    }
                }
                // if all the events are complete, remove the white center to indicate closed/complete
                if (allEventsComplete) {
                    iconClasses = ' wmm-icon-noicon wmm-icon-white ';
                }
            }
            // eventCount var keeps track of number of events at the location. Do not show if less than 2.
            var eventCount = void 0;
            if (marker.events.length > 1) {
                // for location with multiple events, show event count on symbol, make larger and gray
                eventCount = marker.events.length;
                // iconClasses = ' wmm-icon-circle wmm-icon-white ';
                colorClass = 'wmm-mutedblue';
                sizeClass = 'wmm-size-35';
            }
            else {
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
            // establish an empty string as the variable for the popup HTML markup content
            var popupContent = '';
            // loop through the events that are part of each single marker
            for (var _d = 0, _e = marker.events; _d < _e.length; _d++) {
                var event_3 = _e[_d];
                // establish an empty string as the variable for the location list HTML markup content
                var locationContent = '';
                // establish an empty string as the variable for the species list HTML markup content
                var speciesContent = '';
                // loop through the adminleveltwos (counties) for location display, attaching it's related adminlevelone (state)
                for (var _f = 0, _g = event_3.administrativeleveltwos; _f < _g.length; _f++) {
                    var administrativeleveltwo = _g[_f];
                    locationContent = locationContent + administrativeleveltwo['name'] + ', ' +
                        this.displayValuePipe.transform(administrativeleveltwo['administrative_level_one'], 'name', this.adminLevelOnes) + '</br>';
                }
                // loop through the species for location display
                for (var _h = 0, _j = event_3.species; _h < _j.length; _h++) {
                    var species = _j[_h];
                    speciesContent = speciesContent + species['name'] + '</br>';
                }
                // if one event represented by marker, do a simple display. If multiple, display in collapsing panels
                if (marker.events.length === 1) {
                    // create a string with all the event diagnoses
                    var eventDiagnosesString = '';
                    for (var _k = 0, _l = event_3.eventdiagnoses; _k < _l.length; _k++) {
                        var eventdiagnosis = _l[_k];
                        eventDiagnosesString = eventDiagnosesString + eventdiagnosis['diagnosis_string'] + ',';
                    }
                    // removes the trailing comma
                    eventDiagnosesString = eventDiagnosesString.slice(0, -1);
                    // if event is not public, begin the markup with the not public icon
                    if (event_3.public === false) {
                        popupContent = popupContent + '<h3><img src="./assets/icons/visibility_off.png" alt="Not Public"> Event ' + this.testForUndefined(event_3['id']) + '</h3>';
                    }
                    else {
                        popupContent = popupContent + '<h3>Event ' + this.testForUndefined(event_3['id']) + '</h3>';
                    }
                    // else if (event.public === true) {
                    //   popupContent = '';
                    // }
                    // tslint:disable-next-line:max-line-length
                    popupContent = popupContent +
                        // '<h3>Event ' + this.testForUndefined(event['id']) + '</h3>' +
                        '<span class="popupLabel text-larger">' + (this.testForUndefined(event_3['complete']) ? 'Complete' : 'Incomplete') + '</span><br/>' +
                        '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event_3['event_type_string']) + '<br/>' +
                        '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event_3['start_date']) + ' to ' + event_3['end_date'] + '<br/>' +
                        '<span class="popupLabel">Location:</span> ' + locationContent +
                        '<span class="popupLabel">Species:</span> ' + speciesContent +
                        '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event_3['affected_count']) + '<br/>' +
                        // '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string') + '<br/>' +
                        '<span class="popupLabel">Diagnosis:</span> ' + eventDiagnosesString + '<br/>' +
                        '<a href="./event/' + this.testForUndefined(event_3['id']) + '">View Event Details </a>';
                }
                else if (marker.events.length > 1) {
                    // create a string with all the event diagnoses
                    var eventDiagnosesString = '';
                    for (var _m = 0, _o = event_3.eventdiagnoses; _m < _o.length; _m++) {
                        var eventdiagnosis = _o[_m];
                        eventDiagnosesString = eventDiagnosesString + eventdiagnosis['diagnosis_string'] + ',';
                    }
                    // removes the trailing comma
                    eventDiagnosesString = eventDiagnosesString.slice(0, -1);
                    // if event is not public, begin the markup with the not public icon
                    if (event_3.public === false) {
                        popupContent = popupContent + '<button class="accordion accButton"> <img src="./assets/icons/visibility_off.png" alt="Not Public"> Event ' + this.testForUndefined(event_3['id']) + '</button>';
                    }
                    else {
                        popupContent = popupContent + '<button class="accordion accButton">Event ' + this.testForUndefined(event_3['id']) + '</button>';
                    }
                    popupContent = popupContent +
                        //'<button class="accordion accButton">Event ' + this.testForUndefined(event['id']) + '</button>' +
                        // '<h4>Event ' + this.testForUndefined(event['id']) + '</h4>' +
                        '<div class="panel">' +
                        '<span class="popupLabel text-larger">' + (this.testForUndefined(event_3['complete']) ? 'Complete' : 'Incomplete') + '</span><br/>' +
                        '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event_3['event_type_string']) + '<br/>' +
                        '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event_3['start_date']) + ' to ' + event_3['end_date'] + '<br/>' +
                        '<span class="popupLabel">Location:</span> ' + locationContent +
                        '<span class="popupLabel">Species:</span> ' + speciesContent +
                        '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event_3['affected_count']) + '<br/>' +
                        // '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string') + '<br/>' +
                        '<span class="popupLabel">Diagnosis:</span> ' + eventDiagnosesString + '<br/>' +
                        '<span class="popupLabel"><a href="./event/' + this.testForUndefined(event_3['id']) + '">View Event Details </a> </span><p></div>';
                }
            }
            // establish leaflet popup var for binding to marker (include check for mapPanel height, to set max popup height)
            var popup = L.popup({ maxHeight: document.getElementById('mapPanel').offsetHeight - 50 })
                .setContent(popupContent);
            // establish leaflet marker var, passing in icon var from above, including on popupopen logic for accordion style collapsing panels
            L.marker([marker.lat, marker.long], { icon: this.icon })
                .addTo(this.locationMarkers)
                .bindPopup(popup, { maxHeight: 300, autoPan: true, autoPanPadding: [20, 20], keepInView: true })
                .on('popupopen', function (popup) {
                var acc = Array.from(document.querySelectorAll('button.accordion'));
                acc.forEach(function (button, i) {
                    acc[i].addEventListener('click', function (evt) {
                        this.classList.toggle('active');
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        }
                        else {
                            panel.style.maxHeight = panel.scrollHeight + 'px';
                        }
                        // let acc = document.getElementsByClassName('accordion');
                        var j;
                        for (j = 0; j < acc.length; j++) {
                            if (i !== j) {
                                var panel_1 = acc[j].nextElementSibling;
                                if (panel_1.style.maxHeight) {
                                    acc[j].classList.toggle('active');
                                    panel_1.style.maxHeight = null;
                                }
                            }
                        }
                    });
                });
                acc[0].classList.toggle('active');
                var panel = acc[0].nextElementSibling;
                panel.style.maxHeight = panel.scrollHeight + 'px';
            });
        }
        if (this.locationMarkers.getBounds().isValid() === true) {
            this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50], maxZoom: 10 });
        }
        else {
            this.openSnackBar('No events match your selected criteria. Please try again.', 'OK', 8000);
        }
    };
    HomeComponent.prototype.testForUndefined = function (value, property) {
        var valueReturned = 'n/a';
        if (value !== undefined) {
            if (property !== undefined) {
                valueReturned = value[property];
            }
            else {
                valueReturned = value;
            }
        }
        return valueReturned;
    };
    HomeComponent.prototype.eventIDTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventIDTooltip; return string; };
    HomeComponent.prototype.editEventTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventTypeTooltip; return string; };
    HomeComponent.prototype.numberAffectedTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.numberAffectedTooltip; return string; };
    HomeComponent.prototype.eventStartDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventStartDateTooltip; return string; };
    HomeComponent.prototype.eventEndDateTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventEndDateTooltip; return string; };
    HomeComponent.prototype.editSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editSpeciesTooltip; return string; };
    HomeComponent.prototype.editEventDiagnosisTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; };
    HomeComponent.prototype.locationsTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationsTooltip; return string; };
    HomeComponent.prototype.generalTableSpeciesTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.generalTableSpeciesTooltip; return string; };
    HomeComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    HomeComponent.prototype.openMetadataLink = function () {
        window.open(app_settings_1.APP_SETTINGS.WHISPERS_METADATA_URL, '_blank');
        gtag('event', 'click', { 'event_category': 'Home', 'event_label': 'Metadata Opened' });
    };
    // Function for creating a dialog to download results summary report pdf
    HomeComponent.prototype.generateResultsSummaryReport = function () {
        /**********
         *
         * TODO: Do a check for summaries equal to 0 (ZERO) to send notification to user to try again
         *
         * OR DISABLE BUTTON UNTIL AT LEAST ONE EVENT SUMMARY
         *
         *
         */
        var _this = this;
        this.resultsSummaryReportDialogRef = this.dialog.open(search_results_summary_report_component_1.SearchResultsSummaryReportComponent, {
            minHeight: '75%',
            data: {
                user: this.currentUser,
                current_results: this.currentResults,
                current_search_query: this.currentSearchQuery,
                // mapUrl: this.resultsMapUrl.__zone_symbol__value,
                adminLevelOnes: this.adminLevelOnes,
                adminLevelTwos: this.administrative_level_two,
                diagnosisTypes: this.diagnosisTypes,
                diagnoses: this.diagnoses,
                species: this.allSpecies
                // locations:
            }
        });
        this.resultsSummaryReportDialogRef.afterClosed()
            .subscribe(function () {
            // this.refreshEvent();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    HomeComponent.prototype.exportEventSummaries = function () {
        this.eventService.getEventSummaryCSV(this.currentSearchQuery);
        gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'Current Search Query Exported' });
        // .subscribe(
        //   eventSummaries => {
        //   },
        //   error => {
        //     this.errorMessage = <any>error;
        //   }
        // )
    };
    HomeComponent.prototype.saveSearch = function () {
        var _this = this;
        this.saveSearchDialogRef = this.dialog.open(save_search_component_1.SaveSearchComponent, {
            disableClose: true,
            data: {
                currentSearchQuery: this.currentSearchQuery,
                title: 'Save Search',
                titleIcon: 'save',
                showCancelButton: true,
                action_button_text: 'Save Search',
                actionButtonIcon: 'save'
            }
        });
        this.saveSearchDialogRef.afterClosed()
            .subscribe(function () {
            // TODO: show snackbar confirmation
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    HomeComponent.prototype.implementSearch = function (search) {
        sessionStorage.setItem('currentSearch', JSON.stringify(search));
        // TODO: currentDiplayQuery needs to be parsed from the search object
        var displayQuery = {
            event_type: [],
            diagnosis: [],
            diagnosis_type: [],
            species: [],
            administrative_level_one: [],
            administrative_level_two: [],
            affected_count: search.affected_count,
            affected_count_operator: search.affected_count_operator,
            start_date: search.start_date,
            end_date: search.end_date,
            diagnosis_type_includes_all: search.diagnosis_type_includes_all,
            diagnosis_includes_all: search.diagnosis_includes_all,
            species_includes_all: search.species_includes_all,
            administrative_level_one_includes_all: search.administrative_level_one_includes_all,
            administrative_level_two_includes_all: search.administrative_level_two_includes_all,
            and_params: [],
            complete: search.complete
        };
        if (search.event_type) {
            for (var _i = 0, _a = search.event_type; _i < _a.length; _i++) {
                var event_type = _a[_i];
                displayQuery.event_type.push(this.displayValuePipe.transform(event_type, 'name', this.eventTypes));
            }
        }
        if (search.diagnosis) {
            for (var _b = 0, _c = search.diagnosis; _b < _c.length; _b++) {
                var diagnosis = _c[_b];
                displayQuery.diagnosis.push(this.displayValuePipe.transform(diagnosis, 'name', this.diagnoses));
            }
        }
        if (search.diagnosis_type) {
            for (var _d = 0, _e = search.diagnosis_type; _d < _e.length; _d++) {
                var diagnosis_type = _e[_d];
                displayQuery.diagnosis_type.push(this.displayValuePipe.transform(diagnosis_type, 'name', this.diagnosisTypes));
            }
        }
        if (search.species) {
            for (var _f = 0, _g = search.species; _f < _g.length; _f++) {
                var species = _g[_f];
                displayQuery.species.push(this.displayValuePipe.transform(species, 'name', this.allSpecies));
            }
        }
        if (search.administrative_level_one) {
            for (var _h = 0, _j = search.administrative_level_one; _h < _j.length; _h++) {
                var adminLevelOne = _j[_h];
                displayQuery.administrative_level_one.push(this.displayValuePipe.transform(adminLevelOne, 'name', this.administrative_level_one));
            }
        }
        if (search.administrative_level_two) {
            for (var _k = 0, _l = search.administrative_level_two; _k < _l.length; _k++) {
                var adminLevelTwo = _l[_k];
                displayQuery.administrative_level_two.push(this.displayValuePipe.transform(adminLevelTwo, 'name', this.administrative_level_two));
            }
        }
        sessionStorage.setItem('currentDisplayQuery', JSON.stringify(displayQuery));
        // use displayQuery for display of current query in markup, send to searchDialogService
        this.searchDialogService.setDisplayQuery(displayQuery);
        // use searchForm.value to build the web service query, send to searchDialogService
        this.searchDialogService.setSearchQuery(search);
        //this.router.navigate([`../home/`], { relativeTo: this.route });
    };
    HomeComponent.prototype.register = function (type) {
        var _this = this;
        this.userRegistrationDialogRef = this.dialog.open(user_registration_component_1.UserRegistrationComponent, {
            minWidth: '60em',
            disableClose: true,
            data: {
                title: 'WHISPers Registration',
                titleIcon: 'person',
                showCancelButton: true,
                action_button_text: 'Submit',
                actionButtonIcon: 'send',
                registration_type: type
            }
        });
        this.userRegistrationDialogRef.afterClosed()
            .subscribe(function () {
            // TODO: show snackbar confirmation
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    // ngAfterViewInit() {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
    // applyFilter(filterValue: string) {
    //   filterValue = filterValue.trim(); // Remove whitespace
    //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //   this.dataSource.filter = filterValue;
    // }
    HomeComponent.prototype.selectEvent = function (event) {
        this.router.navigate(["../event/" + event.id], { relativeTo: this.route });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], HomeComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], HomeComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(search_results_summary_report_component_1.SearchResultsSummaryReportComponent),
        __metadata("design:type", search_results_summary_report_component_1.SearchResultsSummaryReportComponent)
    ], HomeComponent.prototype, "eventReresultsSummaryReportDialogRefportComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [event_service_1.EventService,
            material_2.MatDialog,
            material_3.MatSnackBar,
            search_dialog_service_1.SearchDialogService,
            data_updated_service_1.DataUpdatedService,
            display_value_pipe_1.DisplayValuePipe,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            event_type_service_1.EventTypeService,
            diagnosis_type_service_1.DiagnosisTypeService,
            diagnosis_service_1.DiagnosisService,
            species_service_1.SpeciesService,
            current_user_service_1.CurrentUserService,
            search_service_1.SearchService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map