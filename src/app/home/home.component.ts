import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
//declare let L: any;
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';
import { MatSnackBar } from '@angular/material';
import html2canvas from 'html2canvas';

import { DisplayValuePipe } from '../pipes/display-value.pipe';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';

import { DisplayQuery } from '@interfaces/display-query';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { CurrentUserService } from '@services/current-user.service';

import { EventSearchResultsDataSource } from '@app/event-search-results-data-source';
import { isNgTemplate } from '@angular/compiler';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { SearchService } from '@app/services/search.service';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { EventTypeService } from '@app/services/event-type.service';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
import { SpeciesService } from '@app/services/species.service';

import { ConfirmComponent } from '@confirm/confirm.component';

import { SaveSearchComponent } from '@app/save-search/save-search.component';
import { SearchResultsSummaryReportComponent } from '@app/search-results-summary-report/search-results-summary-report.component';


import { User } from '@interfaces/user';

declare let L: any;
import 'leaflet';
import 'leaflet-draw';
import * as esri from 'esri-leaflet';
import { UserRegistrationComponent } from '@app/user-registration/user-registration.component';
import { DataUpdatedService } from '@services/data-updated.service';
declare let gtag: Function;

// export class ResultsDataSource extends MatTableDataSource<any> {
//   constructor(private userService: EventService) {
//     super();
//   }
//   connect(): Observable<EventSummary[]> {
//     return this.eventService.queryEvents();
//   }
//   disconnect() { }
// }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errorMessage: string;

  map;
  icon;

  currentUser;

  searchDialogRef: MatDialogRef<SearchDialogComponent>;
  saveSearchDialogRef: MatDialogRef<SaveSearchComponent>;
  userRegistrationDialogRef: MatDialogRef<UserRegistrationComponent>;

  private searchQuerySubscription: Subscription;

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  resultsSummaryReportDialogRef: MatDialogRef<SearchResultsSummaryReportComponent>;

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  currentSearchQuery = sessionStorage.getItem('currentSearch') ? JSON.parse(sessionStorage.getItem('currentSearch')) : APP_SETTINGS.DEFAULT_SEARCH_QUERY;
  currentDisplayQuery: DisplayQuery = sessionStorage.getItem('currentDisplayQuery') ? JSON.parse(sessionStorage.getItem('currentDisplayQuery')) : APP_SETTINGS.DEFAULT_DISPLAY_QUERY;

  currentResults: EventSummary[];

  adminLevelOnes;

  eventTypes = [];
  diagnosisTypes = [];
  diagnoses = [];
  allSpecies = [];
  administrative_level_one = [];
  administrative_level_two = [];


  dataSource: MatTableDataSource<EventSummary>;

  testDataSource: EventSearchResultsDataSource;

  popularSearches = [];
  parsedPopularSearches = [];

  searchResultsLoading = false;

  speciesLoading = true;

  locationMarkers;

  mapScale;
  latitude;
  longitude;
  zoomLevel;

  resultsMapUrl;

  flywaysVisible = false;
  watershedsVisible = false;

  displayedColumns = [
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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(SearchResultsSummaryReportComponent) eventReresultsSummaryReportDialogRefportComponent: SearchResultsSummaryReportComponent;


  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private searchDialogService: SearchDialogService,
    private dataUpdatedService: DataUpdatedService,
    private displayValuePipe: DisplayValuePipe,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private eventTypeService: EventTypeService,
    private diagnosisTypeService: DiagnosisTypeService,
    private diagnosisService: DiagnosisService,
    private speciesService: SpeciesService,
    private currentUserService: CurrentUserService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    // listen for a refresh data trigger
    dataUpdatedService.trigger.subscribe((action) => {
      if (action === 'refresh') {
        this.mapResults(this.currentResults);
      }
    });

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(
      searchQuery => {

        const countLimit = 300;

        this.searchResultsLoading = true;

        // this is the listener for a new search query

        this.eventService.queryEventsCount(searchQuery)
          .subscribe(
            count => {
              if (count.count >= countLimit) {
                // this.sampleQuerySizeErrorFlag = true;
                this.openSnackBar('Your Query result is too large. Please narrow your search and try again', 'OK', 8000);
                this.searchResultsLoading = false;
              } else if (count.count < countLimit) {

                if (searchQuery) {
                  this.eventService.queryEvents(searchQuery)
                    .subscribe(
                      eventSummaries => {
                        this.currentResults = eventSummaries;
                        this.dataSource = new MatTableDataSource(this.currentResults);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.searchResultsLoading = false;

                        setTimeout(() => {
                          /*this.map = new L.Map('map', {
                            center: new L.LatLng(39.8283, -98.5795),
                            zoom: 4,
                          });*/


                          this.locationMarkers.clearLayers();


                          this.mapResults(this.currentResults);


                        }, 500);

                      },
                      error => {
                        this.searchResultsLoading = false;
                        this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
                        this.errorMessage = <any>error;
                      }
                    );
                }

                this.dataSource = new MatTableDataSource(this.currentResults);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

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

                this.currentSearchQuery = searchQuery;
                // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                // this.testDataSource.loadResults(searchQuery);

                if (this.searchDialogRef) {
                  this.searchDialogRef.close();
                }

              }

            },
            error => {
              this.errorMessage = <any>error;
              this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
            }
          );


      });

    this.searchQuerySubscription = this.searchDialogService.getDisplayQuery()
      .subscribe(
        displayQuery => {
          this.currentDisplayQuery = displayQuery;
          console.log('New display query: ' + this.currentDisplayQuery);
          console.log('Current Display Query adminlevelOne length: ' + this.currentDisplayQuery.administrative_level_one.length);
          console.log(' Current Display Query Event types: ' + this.currentDisplayQuery.event_type)
        });

    // use displayQuery for display of current query in markup, send to searchDialogService
    //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
    // use searchForm.value to build the web service query, send to searchDialogService
    //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);// use displayQuery for display of current query in markup, send to searchDialogService
    //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
    // use searchForm.value to build the web service query, send to searchDialogService
    //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
  }

  openSearchDialog() {
    this.searchDialogRef = this.dialog.open(SearchDialogComponent, {
      minWidth: '60%',
      data: {
        query: this.currentDisplayQuery
      }
    });
  }


  ngOnInit() {

    const defaultEventQuery = APP_SETTINGS.DEFAULT_SEARCH_QUERY;

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
      .subscribe(
        eventSummaries => {

          this.currentResults = eventSummaries;
          this.dataSource = new MatTableDataSource(this.currentResults);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.searchResultsLoading = false;

          setTimeout(() => {

            const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a> contributors.',
              // tslint:disable-next-line:max-line-length
              mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'

            });

            const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
            const streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

            this.map = new L.Map('map', {
              center: new L.LatLng(39.8283, -98.5795),
              zoom: 4,
              layers: [streets]
            });
            this.locationMarkers = L.featureGroup().addTo(this.map);

            const baseMaps = {
              'Open Street Map': osm,
              'Grayscale': grayscale,
              'Streets': streets
            };

            // Flyways hosted by Fish and Wildlife Service
            const flyways = esri.featureLayer({
              url: 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWS_HQ_MB_Waterfowl_Flyway_Boundaries/FeatureServer/0',
              style: function (feature) {
                if (feature.properties.NAME === 'Atlantic Flyway') {
                  return { color: '#28995b', weight: 2 };
                } else if (feature.properties.NAME === 'Pacific Flyway') {
                  return { color: '#ffbd4f', weight: 2 };
                } else if (feature.properties.NAME === 'Mississippi Flyway') {
                  return { color: '#eb5834', weight: 2 };
                } else if (feature.properties.NAME === 'Central Flyway') {
                  return { color: '#b43cc7', weight: 2 };
                }
              }
            });

            // Watersheds hosted by The National Map (USGS)
            const watersheds = esri.dynamicMapLayer({
              url: 'https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer',
              opacity: 0.7
            });

            const overlays = {
              'Flyways': flyways,
              'Watersheds (HUC 2)': watersheds
            };

            const drawnItems = L.featureGroup().addTo(this.map);

            L.control.layers(
              baseMaps,
              overlays, { position: 'topleft' }, { 'drawlayer': drawnItems }).addTo(this.map);

            L.control.scale({ position: 'bottomright' }).addTo(this.map);

            const drawControl = new L.Control.Draw({
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

            this.map.addControl(drawControl);

            // Truncate value based on number of decimals
            const _round = function (num, len) {
              return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
            };
            // Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
            const strLatLng = function (latlng) {
              return '(' + _round(latlng.lat, 6) + ', ' + _round(latlng.lng, 6) + ')';
            };

            // Generate popup content based on layer type
            // - Returns HTML string, or null if unknown object
            const getPopupContent = function (layer) {
              // Marker - add lat/long
              if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                return strLatLng(layer.getLatLng());
                // Circle - lat/long, radius
              } else if (layer instanceof L.Circle) {
                const center = layer.getLatLng(),
                  radius = layer.getRadius();
                return 'Center: ' + strLatLng(center) + '<br />'
                  + 'Radius: ' + _round(radius, 2) + ' m';
                // Rectangle/Polygon - area
              } else if (layer instanceof L.Polygon) {
                const latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
                  area = L.GeometryUtil.geodesicArea(latlngs);
                return 'Area: ' + L.GeometryUtil.readableArea(area, true);
                // Polyline - distance
              } else if (layer instanceof L.Polyline) {
                const latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs();
                let distance = 0;
                if (latlngs.length < 2) {
                  return 'Distance: N/A';
                } else {
                  for (let i = 0; i < latlngs.length - 1; i++) {
                    distance += latlngs[i].distanceTo(latlngs[i + 1]);
                  }
                  return 'Distance: ' + _round(distance, 2) + ' m';
                }
              }
              return null;
            };

            // Object created - bind popup to layer, add to feature group
            this.map.on(L.Draw.Event.CREATED, function (event) {
              const layer = event.layer;
              const content = getPopupContent(layer);
              if (content !== null) {
                layer.bindPopup(content);
              }
              drawnItems.addLayer(layer);
            });

            // Object(s) edited - update popups
            this.map.on(L.Draw.Event.EDITED, function (event) {
              const layers = event.layers;
              // const content = null;
              layers.eachLayer(function (layer) {
                const content = getPopupContent(layer);
                if (content !== null) {
                  layer.setPopupContent(content);
                }
              });
            });

            this.mapResults(this.currentResults);

            // begin latLngScale utility logic/////////////////////////////////////////////////////////////////////////////////////////
            // grabbed from FEV
            // displays map scale on map load
            // map.on( 'load', function() {
            this.map.whenReady(() => {
              const mapZoom = this.map.getZoom();
              const tempMapScale = this.scaleLookup(this.map.getZoom());
              this.zoomLevel = mapZoom;
              this.mapScale = tempMapScale;
              const initMapCenter = this.map.getCenter();
              this.latitude = initMapCenter.lat.toFixed(4);
              this.longitude = initMapCenter.lng.toFixed(4);
            });

            // displays map scale on scale change (i.e. zoom level)
            this.map.on('zoomend', () => {
              const mapZoom = this.map.getZoom();
              const mapScale = this.scaleLookup(mapZoom);
              this.mapScale = mapScale;
              this.zoomLevel = mapZoom;
            });

            // updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes 'map center' label
            this.map.on('mousemove', (cursorPosition) => {
              // $('#mapCenterLabel').css('display', 'none');
              if (cursorPosition.latlng !== null) {
                this.latitude = cursorPosition.latlng.lat.toFixed(4);
                this.longitude = cursorPosition.latlng.lng.toFixed(4);
              }
            });
            // updates lat/lng indicator to map center after pan and shows 'map center' label.
            this.map.on('dragend', () => {
              // displays latitude and longitude of map center
              // $('#mapCenterLabel').css('display', 'inline');
              const geographicMapCenter = this.map.getCenter();
              this.latitude = geographicMapCenter.lat.toFixed(4);
              this.longitude = geographicMapCenter.lng.toFixed(4);
            });
            // end latLngScale utility logic/////////

            this.map.on('overlayadd', (e) => {
              console.log('overlayadd');
              if (e.name === 'Flyways') {
                this.flywaysVisible = true;
              } else if (e.name === 'Watersheds (HUC 2)') {
                this.watershedsVisible = true;
              }
            });

            this.map.on('overlayremove', (e) => {
              console.log('overlayremove');
              if (e.name === 'Flyways') {
                this.flywaysVisible = false;
              } else if (e.name === 'Watersheds (HUC 2)') {
                this.watershedsVisible = false;
              }
            });

          }, 500);

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.dataSource = new MatTableDataSource(this.currentResults);

    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.adminLevelOnes = adminLevelOnes;

        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // get top ten searches from the SearchService
    this.searchService.getPopularSearches()
      .subscribe(
        (searches) => {
          this.popularSearches = searches;

          // build parsed search list
          for (const search of this.popularSearches) {
            const parsedSearch = APP_UTILITIES.parseSearch(search);
            this.parsedPopularSearches.push(parsedSearch);
          }

          // build a list of relevant adminL1s
          let adminLevelOnes = [];
          for (const parsedSearch of this.parsedPopularSearches) {
            if (parsedSearch.administrative_level_one) {
              for (const adminLevelOne of parsedSearch.administrative_level_one) {
                adminLevelOnes.push(adminLevelOne);
              }
            }
          }

          // query adminL2s from the relevant adminL1 list
          adminLevelOnes = adminLevelOnes.map(function (e) {
            return JSON.stringify(e);
          });
          const adminLevelOneString = adminLevelOnes.join(',');
          this.adminLevelTwoService.queryAdminLevelTwos(adminLevelOneString)
            .subscribe(
              (adminLevelTwos) => {
                this.administrative_level_two = adminLevelTwos;

              },
              error => {
                this.errorMessage = <any>error;
              }
            );
          console.log('Popular searches: ' + this.parsedPopularSearches);

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get event types from the eventType service
    this.eventTypeService.getEventTypes()
      .subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosis types from the diagnosisType service
    this.diagnosisTypeService.getDiagnosisTypes()
      .subscribe(
        (diagnosisTypes) => {
          this.diagnosisTypes = diagnosisTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.administrative_level_one = adminLevelOnes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get species from the species service
    this.speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.allSpecies = species;
          this.speciesLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.speciesLoading = false;
        }
      );


  }

  scaleLookup(mapZoom) {
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

    this.locationMarkers.clearLayers();

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

      // establish an empty string as the variable for the popup HTML markup content
      let popupContent = '';


      // loop through the events that are part of each single marker
      for (const event of marker.events) {


        // establish an empty string as the variable for the location list HTML markup content
        let locationContent = '';
        // establish an empty string as the variable for the species list HTML markup content
        let speciesContent = '';

        // loop through the adminleveltwos (counties) for location display, attaching it's related adminlevelone (state)
        for (const administrativeleveltwo of event.administrativeleveltwos) {
          locationContent = locationContent + administrativeleveltwo['name'] + ', ' +
            this.displayValuePipe.transform(administrativeleveltwo['administrative_level_one'], 'name', this.adminLevelOnes) + '</br>';
        }

        // loop through the species for location display
        for (const species of event.species) {
          speciesContent = speciesContent + species['name'] + '</br>';
        }


        // if one event represented by marker, do a simple display. If multiple, display in collapsing panels
        if (marker.events.length === 1) {

          // create a string with all the event diagnoses
          let eventDiagnosesString = '';
          for (const eventdiagnosis of event.eventdiagnoses) {
            eventDiagnosesString = eventDiagnosesString + eventdiagnosis['diagnosis_string'] + ',';
          }
          // removes the trailing comma
          eventDiagnosesString = eventDiagnosesString.slice(0, -1);

          // if event is not public, begin the markup with the not public icon
          if (event.public === false) {
            popupContent = popupContent + '<h3><img src="./assets/icons/visibility_off.png" alt="Not Public"> Event ' + this.testForUndefined(event['id']) + '</h3>';
          } else {
            popupContent = popupContent + '<h3>Event ' + this.testForUndefined(event['id']) + '</h3>';
          }

          // else if (event.public === true) {
          //   popupContent = '';
          // }

          // tslint:disable-next-line:max-line-length
          popupContent = popupContent +
            // '<h3>Event ' + this.testForUndefined(event['id']) + '</h3>' +
            '<span class="popupLabel text-larger">' + (this.testForUndefined(event['complete']) ? 'Complete' : 'Incomplete') + '</span><br/>' +
            '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event['event_type_string']) + '<br/>' +
            '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event['start_date']) + ' to ' + event['end_date'] + '<br/>' +
            '<span class="popupLabel">Location:</span> ' + locationContent +
            '<span class="popupLabel">Species:</span> ' + speciesContent +
            '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event['affected_count']) + '<br/>' +
            // '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string') + '<br/>' +
            '<span class="popupLabel">Diagnosis:</span> ' + eventDiagnosesString + '<br/>' +
            '<a href="./event/' + this.testForUndefined(event['id']) + '">View Event Details </a>';

        } else if (marker.events.length > 1) {

          // create a string with all the event diagnoses
          let eventDiagnosesString = '';
          for (const eventdiagnosis of event.eventdiagnoses) {
            eventDiagnosesString = eventDiagnosesString + eventdiagnosis['diagnosis_string'] + ',';
          }
          // removes the trailing comma
          eventDiagnosesString = eventDiagnosesString.slice(0, -1);


          // if event is not public, begin the markup with the not public icon
          if (event.public === false) {
            popupContent = popupContent + '<button class="accordion accButton"> <img src="./assets/icons/visibility_off.png" alt="Not Public"> Event ' + this.testForUndefined(event['id']) + '</button>';
          } else {
            popupContent = popupContent + '<button class="accordion accButton">Event ' + this.testForUndefined(event['id']) + '</button>';
          }

          popupContent = popupContent +
            //'<button class="accordion accButton">Event ' + this.testForUndefined(event['id']) + '</button>' +
            // '<h4>Event ' + this.testForUndefined(event['id']) + '</h4>' +
            '<div class="panel">' +
            '<span class="popupLabel text-larger">' + (this.testForUndefined(event['complete']) ? 'Complete' : 'Incomplete') + '</span><br/>' +
            '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event['event_type_string']) + '<br/>' +
            '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event['start_date']) + ' to ' + event['end_date'] + '<br/>' +
            '<span class="popupLabel">Location:</span> ' + locationContent +
            '<span class="popupLabel">Species:</span> ' + speciesContent +
            '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event['affected_count']) + '<br/>' +
            // '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string') + '<br/>' +
            '<span class="popupLabel">Diagnosis:</span> ' + eventDiagnosesString + '<br/>' +
            '<span class="popupLabel"><a href="./event/' + this.testForUndefined(event['id']) + '">View Event Details </a> </span><p></div>';
        }
      }

      // establish leaflet popup var for binding to marker (include check for mapPanel height, to set max popup height)
      const popup = L.popup({ maxHeight: document.getElementById('mapPanel').offsetHeight - 50 })
        .setContent(popupContent);

      // establish leaflet marker var, passing in icon var from above, including on popupopen logic for accordion style collapsing panels
      L.marker([marker.lat, marker.long],
        { icon: this.icon })
        .addTo(this.locationMarkers)
        .bindPopup(popup, { maxHeight: 300, autoPan: true, autoPanPadding: [20, 20], keepInView: true })
        .on('popupopen', function (popup) {

          const acc = Array.from(document.querySelectorAll('button.accordion'));

          acc.forEach(function (button, i) {
            acc[i].addEventListener('click', function (evt) {
              this.classList.toggle('active');
              const panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
              }
              // let acc = document.getElementsByClassName('accordion');
              let j;
              for (j = 0; j < acc.length; j++) {
                if (i !== j) {
                  const panel: HTMLElement = acc[j].nextElementSibling as HTMLElement;
                  if (panel.style.maxHeight) {
                    acc[j].classList.toggle('active');
                    panel.style.maxHeight = null;
                  }
                }
              }
            });
          });
          acc[0].classList.toggle('active');
          const panel: HTMLElement = acc[0].nextElementSibling as HTMLElement;
          panel.style.maxHeight = panel.scrollHeight + 'px';
        });
    }

    if (this.locationMarkers.getBounds().isValid() === true) {
      this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50], maxZoom: 10 });
    } else {
      this.openSnackBar('No events match your selected criteria. Please try again.', 'OK', 8000);

    }

    /* setTimeout(() => {
      let url;
      // using html2Canvas to capture leaflet map for reports
      // solution found here: https://github.com/niklasvh/html2canvas/issues/567
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

      //const linesLayer = $('svg.leaflet-zoom-animated')[0];
      //const oldLinesWidth = linesLayer.getAttribute('width');
      //const oldLinesHeight = linesLayer.getAttribute('height');
      //const oldViewbox = linesLayer.getAttribute('viewBox');
      //linesLayer.setAttribute('width', mapWidth.toString());
      //linesLayer.setAttribute('height', mapHeight.toString());
      //linesLayer.setAttribute('viewBox', '0 0 ' + mapWidth + ' ' + mapHeight);
      //const linesTransform = linesLayer.style.transform.split(',');
      //const linesX = parseFloat(linesTransform[0].split('(')[1].replace('px', ''));
      //const linesY = parseFloat(linesTransform[1].replace('px', ''));
      //linesLayer.style.transform = '';
      //linesLayer.style.left = '';
      //linesLayer.style.top = '';

      const options = {
        useCORS: true,
      };

      this.resultsMapUrl = html2canvas(document.getElementById('map'), options).then(function (canvas) {
        url = canvas.toDataURL('image/png');
        return url;
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
      //linesLayer.style.transform = 'translate(' + (linesX) + 'px,' + (linesY) + 'px)';
      //linesLayer.setAttribute('viewBox', oldViewbox);
      //linesLayer.setAttribute('width', oldLinesWidth);
      //linesLayer.setAttribute('height', oldLinesHeight);
      mapPane.style.transform = 'translate(' + (mapX) + 'px,' + (mapY) + 'px)';
      mapPane.style.left = '';
      mapPane.style.top = '';
      // END national map
    }, 2000); // reduced this from 5000 to 2000; if you make it too quick it doesn't get the basemap tiles */
  }

  testForUndefined(value: any, property?: any) {
    let valueReturned = 'n/a';

    if (value !== undefined) {
      if (property !== undefined) {
        valueReturned = value[property];
      } else {
        valueReturned = value;
      }
    }

    return valueReturned;

  }

  eventIDTooltip() { const string = FIELD_HELP_TEXT.eventIDTooltip; return string; }
  editEventTypeTooltip() { const string = FIELD_HELP_TEXT.editEventTypeTooltip; return string; }
  numberAffectedTooltip() { const string = FIELD_HELP_TEXT.numberAffectedTooltip; return string; }
  eventStartDateTooltip() { const string = FIELD_HELP_TEXT.eventStartDateTooltip; return string; }
  eventEndDateTooltip() { const string = FIELD_HELP_TEXT.eventEndDateTooltip; return string; }
  editSpeciesTooltip() { const string = FIELD_HELP_TEXT.editSpeciesTooltip; return string; }
  editEventDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; }
  locationsTooltip() { const string = FIELD_HELP_TEXT.locationsTooltip; return string; }
  generalTableSpeciesTooltip() { const string = FIELD_HELP_TEXT.generalTableSpeciesTooltip; return string; }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openMetadataLink() {
    window.open(APP_SETTINGS.WHISPERS_METADATA_URL, '_blank');
    gtag('event', 'click', { 'event_category': 'Home', 'event_label': 'Metadata Opened' });
  }


  // Function for creating a dialog to download results summary report pdf
  generateResultsSummaryReport() {

    /**********
     * 
     * TODO: Do a check for summaries equal to 0 (ZERO) to send notification to user to try again
     *
     * OR DISABLE BUTTON UNTIL AT LEAST ONE EVENT SUMMARY
     * 
     * 
     */

    this.resultsSummaryReportDialogRef = this.dialog.open(SearchResultsSummaryReportComponent, {
      data: {
        user: this.currentUser,
        current_results: this.currentResults,
        current_search_query: this.currentSearchQuery,
        //mapUrl: this.resultsMapUrl.__zone_symbol__value,
        adminLevelOnes: this.adminLevelOnes,
        adminLevelTwos: this.administrative_level_two,
        diagnosisTypes: this.diagnosisTypes,
        diagnoses: this.diagnoses,
        species: this.allSpecies
        //locations: 
      }
    });

    this.resultsSummaryReportDialogRef.afterClosed()
      .subscribe(
        () => {
          // this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  exportEventSummaries() {
    this.eventService.getEventSummaryCSV(this.currentSearchQuery);
    gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'Current Search Query Exported' });
    // .subscribe(
    //   eventSummaries => {

    //   },
    //   error => {
    //     this.errorMessage = <any>error;
    //   }
    // )
  }

  saveSearch() {

    this.saveSearchDialogRef = this.dialog.open(SaveSearchComponent, {
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
      .subscribe(
        () => {
          // TODO: show snackbar confirmation
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  implementSearch(search) {
    sessionStorage.setItem('currentSearch', JSON.stringify(search));

    // TODO: currentDiplayQuery needs to be parsed from the search object
    const displayQuery: DisplayQuery = {
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
      for (const event_type of search.event_type) {
        displayQuery.event_type.push(this.displayValuePipe.transform(event_type, 'name', this.eventTypes));
      }
    }

    if (search.diagnosis) {
      for (const diagnosis of search.diagnosis) {
        displayQuery.diagnosis.push(this.displayValuePipe.transform(diagnosis, 'name', this.diagnoses));
      }
    }
    if (search.diagnosis_type) {
      for (const diagnosis_type of search.diagnosis_type) {
        displayQuery.diagnosis_type.push(this.displayValuePipe.transform(diagnosis_type, 'name', this.diagnosisTypes));
      }
    }

    if (search.species) {
      for (const species of search.species) {
        displayQuery.species.push(this.displayValuePipe.transform(species, 'name', this.allSpecies));
      }
    }

    if (search.administrative_level_one) {
      for (const adminLevelOne of search.administrative_level_one) {
        displayQuery.administrative_level_one.push(this.displayValuePipe.transform(adminLevelOne, 'name', this.administrative_level_one));
      }
    }

    if (search.administrative_level_two) {
      for (const adminLevelTwo of search.administrative_level_two) {
        displayQuery.administrative_level_two.push(this.displayValuePipe.transform(adminLevelTwo, 'name', this.administrative_level_two));
      }
    }

    sessionStorage.setItem('currentDisplayQuery', JSON.stringify(displayQuery));
    // use displayQuery for display of current query in markup, send to searchDialogService
    this.searchDialogService.setDisplayQuery(displayQuery);


    // use searchForm.value to build the web service query, send to searchDialogService
    this.searchDialogService.setSearchQuery(search);
    //this.router.navigate([`../home/`], { relativeTo: this.route });
  }


  register(type) {
    this.userRegistrationDialogRef = this.dialog.open(UserRegistrationComponent, {
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
      .subscribe(
        () => {
          // TODO: show snackbar confirmation
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }


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

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }

  // onSelect({ selected }) {
  //   console.log('Select Event', selected, this.selected);
  // }

  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }

}

