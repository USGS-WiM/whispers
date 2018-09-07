import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//declare let L: any;
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';
import { MatSnackBar } from '@angular/material';

import { DisplayValuePipe } from '../pipes/display-value.pipe';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';

import { DisplayQuery } from '@interfaces/display-query';
import { APP_SETTINGS } from '@app/app.settings';

import { EventSearchResultsDataSource } from '@app/event-search-results-data-source';
import { isNgTemplate } from '@angular/compiler';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { SearchService } from '@app/services/search.service';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { EventTypeService } from '@app/services/event-type.service';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
import { SpeciesService } from '@app/services/species.service';

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

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

  searchDialogRef: MatDialogRef<SearchDialogComponent>;

  private searchQuerySubscription: Subscription;

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  currentSearchQuery = APP_SETTINGS.DEFAULT_EVENT_QUERY;
  currentDisplayQuery: DisplayQuery;

  currentResults: EventSummary[];

  adminLevelOnes;

  eventTypes = [];
  diagnosisTypes = [];
  diagnoses = [];
  species = [];
  administrative_level_one = [];
  administrative_level_two = [];


  dataSource: MatTableDataSource<EventSummary>;

  testDataSource: EventSearchResultsDataSource;

  popularSearches = [];
  parsedPopularSearches = [];

  resultsLoading = false;

  locationMarkers;

  mapScale;
  latitude;
  longitude;
  zoomLevel;

  displayedColumns = [
    'id',
    'event_type_string',
    'affected_count',
    'start_date',
    'end_date',
    'administrativelevelones',
    'administrativeleveltwos',
    'species',
    'event_diagnoses'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private searchDialogService: SearchDialogService,
    private displayValuePipe: DisplayValuePipe,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private eventTypeService: EventTypeService,
    private diagnosisTypeService: DiagnosisTypeService,
    private diagnosisService: DiagnosisService,
    private speciesService: SpeciesService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {

    this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(
      searchQuery => {

        const countLimit = 300;

        this.resultsLoading = true;

        // this is the listener for a new search query

        this.eventService.queryEventsCount(searchQuery)
          .subscribe(
            count => {
              if (count.count >= countLimit) {
                // this.sampleQuerySizeErrorFlag = true;
                this.openSnackBar('Your Query result is too large. Please narrow your search and try again', 'OK', 8000);
                this.resultsLoading = false;
              } else if (count.count < countLimit) {

                this.eventService.queryEvents(searchQuery)
                  .subscribe(
                    eventSummaries => {
                      this.currentResults = eventSummaries;
                      this.dataSource = new MatTableDataSource(this.currentResults);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      this.resultsLoading = false;

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
                      this.resultsLoading = false;
                      this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
                      this.errorMessage = <any>error;
                    }
                  );


                this.dataSource = new MatTableDataSource(this.currentResults);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.currentSearchQuery = searchQuery;
                // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
                // this.testDataSource.loadResults(searchQuery);

                this.searchDialogRef.close();

              }

            },
            error => {
              this.errorMessage = <any>error;
              this.openSnackBar('Query failed due to web service error. Please try again later.', 'OK', 8000);
            }
          );


      });

    this.searchQuerySubscription = this.searchDialogService.getDisplayQuery().subscribe(
      displayQuery => {
        this.currentDisplayQuery = displayQuery;

      });
  }

  openSearchDialog() {
    this.searchDialogRef = this.dialog.open(SearchDialogComponent, {
      minWidth: '60%',
      data: {
        query: this.currentDisplayQuery
      }
      // height: '75%'
    });
  }

  ngOnInit() {

    const defaultEventQuery = APP_SETTINGS.DEFAULT_EVENT_QUERY;

    // two lines below for the DataSource as separate class method (possibly revisit)
    // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
    // this.testDataSource.loadResults(defaultEventQuery);
    this.eventService.queryEvents(defaultEventQuery)
      .subscribe(
        eventSummaries => {
          this.currentResults = eventSummaries;
          this.dataSource = new MatTableDataSource(this.currentResults);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          setTimeout(() => {

            const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Map shows centroid of county where event occured.',
              // tslint:disable-next-line:max-line-length
              mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Map shows centroid of county where event occured.'

            });

            const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
            const streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

            this.map = new L.Map('map', {
              center: new L.LatLng(39.8283, -98.5795),
              zoom: 4,
              layers: [osm]
            });
            this.locationMarkers = L.featureGroup().addTo(this.map);

            const baseMaps = {
              'Open Street Map': osm,
              'Grayscale': grayscale,
              'Streets': streets
            };

            // Flyways hosted by Fish and Wildlife Service
            var flyways = esri.featureLayer({url: 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWS_HQ_MB_Waterfowl_Flyway_Boundaries/FeatureServer/0'}).addTo(this.map);
            //L.control.layers(flyways).addTo(this.map);

            // Watersheds hosted by The National Map (USGS)
            var watersheds = esri.dynamicMapLayer({
              url: 'https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer',
              opacity: 0.7
            }).addTo(this.map);
            //L.control.layers(watersheds).addTo(this.map);
            
            // Land use hosted by USGS
            var landUse = esri.dynamicMapLayer({
              url: 'https://gis1.usgs.gov/arcgis/rest/services/gap/GAP_Land_Cover_NVC_Class_Landuse/MapServer',
              opacity: 0.7
            }).addTo(this.map);
            //L.control.layers(landUse).addTo(this.map);

            const overlays = {
              'Flyways': flyways,
              'Watersheds (HUC 2)': watersheds,
              'Land Use': landUse
            }

            const x = { position: 'topleft'};

            L.control.layers(baseMaps, overlays, x).addTo(this.map);
            L.control.scale({ position: 'bottomright' }).addTo(this.map);
            
            
            // const legend = L.control({ position: 'bottomright' });

            // legend.onAdd = function (map) {
            //   const div = L.DomUtil.create('div', 'legend');
            //   div.innerHTML = "<h3>Explanation</h3>" +
            //     "<span><div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-green wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Bacteria</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-blue wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Fungus</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-red wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Nut/Met/Dev</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-orange wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Other</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-yellow wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Parasite</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-purple wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Toxin</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-sky wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Virus</label>" +
            //     "</span>" +
            //     "<br/>" +
            //     "<span>" +
            //     "<div id='iconHolder'>" +
            //     "<div class='wmm-circle wmm-mutedpink wmm-icon-circle wmm-icon-white wmm-size-25'></div>" +
            //     "</div>" +
            //     "<label id='expLabel'>Trauma</label>" +
            //     "</span>";

            //     return div;
            // };

            // legend.addTo(this.map);


            /*this.icon = L.icon({
              iconUrl: '../../assets/icons/marker-icon.png',
              shadowUrl: '../../assets/icons/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [13, 40],
              popupAnchor: [0, -40]
            });*/

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

          for (const search of this.popularSearches) {
            const parsedSearch = APP_UTILITIES.parseSearch(search);
            this.parsedPopularSearches.push(parsedSearch);
          }

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
          this.species = species;
        },
        error => {
          this.errorMessage = <any>error;
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
              event_diagnoses: currentResults[event]['eventdiagnoses'],
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
      if (marker['event_diagnoses'][0] !== undefined) {
        // set color of marker based on diagnosis type
        switch (marker['event_diagnoses'][0].diagnosis_type) {
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

      // if event is complete, remove the white center to indicate 'closed'
      if (marker['complete'] === true) {
        iconClasses = ' wmm-icon-noicon wmm-icon-white ';
      }

      // eventCount var keeps track of number of events at the location. Do not show if less than 2.
      let eventCount;
      if (marker.events.length > 1) {
        // for location with multiple events, show event count on symbol, make larger and gray
        eventCount = marker.events.length;
        iconClasses = ' wmm-icon-circle wmm-icon-white ';
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
          popupContent = popupContent + '<h3>Event ' + this.testForUndefined(event['id']) + '</h3>' +
            '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event['event_type_string']) + '<br/>' +
            '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event['start_date']) + ' to ' + event['end_date'] + '<br/>' +
            '<span class="popupLabel">Location:</span> ' + locationContent +
            '<span class="popupLabel">Species:</span> ' + speciesContent +
            '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event['affected_count']) + '<br/>' +
            '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string');
        } else if (marker.events.length > 1) {

          popupContent = popupContent + '<button class="accordion accButton">Event ' + this.testForUndefined(event['id']) + '</button>' +
            // '<h4>Event ' + this.testForUndefined(event['id']) + '</h4>' +
            '<div class="panel">' +
            '<span class="popupLabel">Type:</span> ' + this.testForUndefined(event['event_type_string']) + '<br/>' +
            '<span class="popupLabel">Dates:</span> ' + this.testForUndefined(event['start_date']) + ' to ' + event['end_date'] + '<br/>' +
            '<span class="popupLabel">Location:</span> ' + locationContent +
            '<span class="popupLabel">Species:</span> ' + speciesContent +
            '<span class="popupLabel">Affected:</span> ' + this.testForUndefined(event['affected_count']) + '<br/>' +
            '<span class="popupLabel">Diagnosis:</span> ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string') +
            '<p></div>';
        }
      }

      // establish leaflet popup var for binding to marker (include check for mapPanel height, to set max popup height)
      const popup = L.popup({ maxHeight: document.getElementById("mapPanel").offsetHeight - 150 })
        .setContent(popupContent);

      // establish leaflet marker var, passing in icon var from above, including on popupopen logic for accordion style collapsing panels
      L.marker([marker.lat, marker.long],
        { icon: this.icon })
        .addTo(this.locationMarkers)
        .bindPopup(popup)
        .on('popupopen', function (popup) {

          const acc = document.getElementsByClassName('accordion');
          let i;

          for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', function () {
              for (let j = 0; j < acc.length; j++) {
                acc[j].classList.toggle('active');
              }
              this.classList.toggle('active');
              const panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
              }
            });
          }

          // let acc = document.getElementsByClassName("accordion");
          // let i;

          // for (i = 0; i < acc.length; i++) {
          //     acc[i].addEventListener("click", function() {
          //         /* Toggle between adding and removing the "active" class,
          //         to highlight the button that controls the panel */
          //         this.classList.toggle("active");

          //         /*Toggle between hiding and showing the active panel */
          //         var panel = this.nextElementSibling;
          //         if (panel.style.display === "block") {
          //             panel.style.display = "none";
          //         } else {
          //             panel.style.display = "block";
          //         }
          //     });
          // }
        });
    }

    this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50] });
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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  exportEventSummaries() {
    this.eventService.getEventSummaryCSV(this.currentSearchQuery);
    // .subscribe(
    //   eventSummaries => {

    //   },
    //   error => {
    //     this.errorMessage = <any>error;
    //   }
    // )
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

