import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";
//declare let L: any;
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Observable, Subscription } from "rxjs";

import { Event } from "@interfaces/event";
import { EventSummary } from "@interfaces/event-summary";
import { EventService } from "@services/event.service";
import { MatSnackBar } from "@angular/material";

import { DisplayValuePipe } from "../pipes/display-value.pipe";

import { Router, ActivatedRoute } from "@angular/router";

import { APP_UTILITIES } from "@app/app.utilities";

import { DisplayQuery } from "@interfaces/display-query";
import { APP_SETTINGS } from "@app/app.settings";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";

import { CurrentUserService } from "@services/current-user.service";

import { EventSearchResultsDataSource } from "@app/event-search-results-data-source";
import { isNgTemplate } from "@angular/compiler";
import { AdministrativeLevelOneService } from "@app/services/administrative-level-one.service";
import { SearchService } from "@app/services/search.service";
import { AdministrativeLevelTwoService } from "@app/services/administrative-level-two.service";
import { EventTypeService } from "@app/services/event-type.service";
import { DiagnosisTypeService } from "@app/services/diagnosis-type.service";
import { DiagnosisService } from "@app/services/diagnosis.service";
import { SpeciesService } from "@app/services/species.service";

import { ConfirmComponent } from "@confirm/confirm.component";

import { SaveSearchComponent } from "@app/save-search/save-search.component";
import { SearchResultsSummaryReportComponent } from "@app/search-results-summary-report/search-results-summary-report.component";

import { User } from "@interfaces/user";

declare let L: any;
import "leaflet";
import "leaflet-draw";
import { GestureHandling } from "leaflet-gesture-handling";
import * as esri from "esri-leaflet";
import { DataUpdatedService } from "@services/data-updated.service";
import { getAnimalTypes } from "@interfaces/species";
import { SearchFormService } from "@search-form/search-form.service";
import { SearchFormComponent } from "@search-form/search-form.component";
import clientStorage from "@app/client-storage";
import { EventDetail } from "@app/interfaces/event-detail";
declare let gtag: Function;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(SearchResultsSummaryReportComponent)
  eventReresultsSummaryReportDialogRefportComponent: SearchResultsSummaryReportComponent;
  @ViewChild(SearchFormComponent) searchFormComponent: SearchFormComponent;

  errorMessage: string;

  map;
  icon;

  currentUser;

  saveSearchDialogRef: MatDialogRef<SaveSearchComponent>;

  private searchQuerySubscription: Subscription;

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  resultsSummaryReportDialogRef: MatDialogRef<SearchResultsSummaryReportComponent>;

  isloggedIn = APP_SETTINGS.IS_LOGGEDIN;

  currentSearchQuery = clientStorage.getItem("currentSearch")
    ? JSON.parse(clientStorage.getItem("currentSearch"))
    : APP_SETTINGS.DEFAULT_SEARCH_QUERY;
  currentDisplayQuery: DisplayQuery = clientStorage.getItem(
    "currentDisplayQuery"
  )
    ? JSON.parse(clientStorage.getItem("currentDisplayQuery"))
    : APP_SETTINGS.DEFAULT_DISPLAY_QUERY;

  // currentResults: EventSummary[];
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
    "id",
    "event_type_string",
    "affected_count",
    "start_date",
    "end_date",
    // 'country',
    "locations",
    // 'administrativelevelones',
    // 'administrativeleveltwos',
    "species",
    "eventdiagnoses",
  ];
  searchQuerySizeTooLargeErrorMessage: string = null;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private searchFormService: SearchFormService,
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
      if (action === "refresh") {
        this.mapResults(this.currentResults);
      }
    });

    currentUserService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    this.searchQuerySubscription = this.searchFormService
      .getSearchQuery()
      .subscribe((searchQuery) => {
        this.searchResultsLoading = true;
        this.searchQuerySizeTooLargeErrorMessage = null;

        // this is the listener for a new search query

        this.eventService.queryEventsCount(searchQuery).subscribe(
          (count) => {
            if (count.count >= APP_SETTINGS.QUERY_COUNT_LIMIT) {
              // this.sampleQuerySizeErrorFlag = true;
              this.searchQuerySizeTooLargeErrorMessage =
                "Your search result is too large. Please narrow your search and try again.";
              this.searchResultsLoading = false;
              this.currentResults = [];
              this.displayCurrentResults();
            } else if (count.count < APP_SETTINGS.QUERY_COUNT_LIMIT) {
              if (searchQuery) {
                this.eventService.queryEvents(searchQuery).subscribe(
                  (eventSummaries) => {
                    this.searchResultsLoading = false;
                    this.currentResults = eventSummaries;
                    this.displayCurrentResults();

                    if (!eventSummaries || eventSummaries.length === 0) {
                      this.openSnackBar(
                        "No events match your selected criteria. Please try again.",
                        "OK",
                        8000
                      );
                    }
                  },
                  (error) => {
                    this.searchResultsLoading = false;
                    this.openSnackBar(
                      "Query failed due to web service error. Please try again later.",
                      "OK",
                      8000
                    );
                    this.errorMessage = <any>error;
                  }
                );
              }

              searchQuery.and_params = [];

              if (searchQuery.diagnosis_type_includes_all === true) {
                searchQuery.and_params.push("diagnosis_type");
              }
              if (searchQuery.diagnosis_includes_all === true) {
                searchQuery.and_params.push("diagnosis_type");
              }
              if (searchQuery.species_includes_all === true) {
                searchQuery.and_params.push("species");
              }
              if (searchQuery.administrative_level_one_includes_all === true) {
                searchQuery.and_params.push("administrative_level_one");
              }
              if (searchQuery.administrative_level_two_includes_all === true) {
                searchQuery.and_params.push("administrative_level_two");
              }

              this.currentSearchQuery = searchQuery;
              // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
              // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
              // this.testDataSource.loadResults(searchQuery);
            }
          },
          (error) => {
            this.errorMessage = <any>error;
            this.openSnackBar(
              "Query failed due to web service error. Please try again later.",
              "OK",
              8000
            );
          }
        );
      });

    this.searchQuerySubscription = this.searchFormService
      .getDisplayQuery()
      .subscribe((displayQuery) => {
        this.currentDisplayQuery = displayQuery;
        console.log("New display query: " + this.currentDisplayQuery);
        console.log(
          "Current Display Query adminlevelOne length: " +
            this.currentDisplayQuery.administrative_level_one.length
        );
        console.log(
          " Current Display Query Event types: " +
            this.currentDisplayQuery.event_type
        );
      });

    // use displayQuery for display of current query in markup, send to searchDialogService
    //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
    // use searchForm.value to build the web service query, send to searchDialogService
    //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);// use displayQuery for display of current query in markup, send to searchDialogService
    //this.searchDialogService.setDisplayQuery(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
    // use searchForm.value to build the web service query, send to searchDialogService
    //this.searchDialogService.setSearchQuery(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
  }

  applyFilter() {
    this.searchFormComponent.submitSearch();
  }

  resetToDefault() {
    this.searchFormComponent.resetToDefault();
  }

  clearSearchForm() {
    // Note: this won't trigger a submission of the search since the user needs
    // to pick some criteria before submitting the search
    this.searchFormComponent.clearSelection();
    // Clear the map too
    this.currentResults = [];
    this.displayCurrentResults();
  }

  ngOnInit() {
    this.speciesLoading = true;

    this.searchResultsLoading = true;

    this.searchQuerySizeTooLargeErrorMessage = null;

    this.currentSearchQuery.and_params = [];

    //if (sessionStorage.getItem('currentSearch')) {
    //   this.openSnackBar('Current Search has been loaded from your previous visit.', 'OK', 8000);
    // }

    if (this.currentSearchQuery.diagnosis_type_includes_all === true) {
      this.currentSearchQuery.and_params.push("diagnosis_type");
    }
    if (this.currentSearchQuery.diagnosis_includes_all === true) {
      this.currentSearchQuery.and_params.push("diagnosis_type");
    }
    if (this.currentSearchQuery.species_includes_all === true) {
      this.currentSearchQuery.and_params.push("species");
    }
    if (
      this.currentSearchQuery.administrative_level_one_includes_all === true
    ) {
      this.currentSearchQuery.and_params.push("administrative_level_one");
    }
    if (
      this.currentSearchQuery.administrative_level_two_includes_all === true
    ) {
      this.currentSearchQuery.and_params.push("administrative_level_two");
    }

    // needed hack to ensure scrolling remains present on legend
    const elem = L.DomUtil.get("legend");
    L.DomEvent.on(elem, "mousewheel", L.DomEvent.stopPropagation);

    this.eventService.queryEventsCount(this.currentSearchQuery).subscribe(
      (count) => {
        if (count.count >= APP_SETTINGS.QUERY_COUNT_LIMIT) {
          // this.sampleQuerySizeErrorFlag = true;
          this.searchQuerySizeTooLargeErrorMessage =
            "Your search result is too large. Please narrow your search and try again.";
          this.searchResultsLoading = false;
          this.currentResults = [];
          // Refresh display, which will remove any previous displayed result
          // so the current search criteria are in sync with the map
          this.displayCurrentResults();
        } else if (count.count < APP_SETTINGS.QUERY_COUNT_LIMIT) {
          this.eventService.queryEvents(this.currentSearchQuery).subscribe(
            (eventSummaries) => {
              this.searchResultsLoading = false;
              this.currentResults = eventSummaries;
              this.displayCurrentResults();

              if (!eventSummaries || eventSummaries.length === 0) {
                this.openSnackBar(
                  "No events match your selected criteria. Please try again.",
                  "OK",
                  8000
                );
              }
            },
            (error) => {
              this.errorMessage = <any>error;
            }
          );
        }
      },
      (error) => {
        this.errorMessage = <any>error;
        this.openSnackBar(
          "Query failed due to web service error. Please try again later.",
          "OK",
          8000
        );
      }
    );

    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes().subscribe(
      (adminLevelOnes) => {
        this.adminLevelOnes = adminLevelOnes;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    // get top ten searches from the SearchService
    this.searchService.getPopularSearches().subscribe(
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
        const adminLevelOneString = adminLevelOnes.join(",");
        this.adminLevelTwoService
          .queryAdminLevelTwos(adminLevelOneString)
          .subscribe(
            (adminLevelTwos) => {
              this.administrative_level_two = adminLevelTwos;
            },
            (error) => {
              this.errorMessage = <any>error;
            }
          );
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    // get event types from the eventType service
    this.eventTypeService.getEventTypes().subscribe(
      (eventTypes) => {
        this.eventTypes = eventTypes;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
    // get diagnosis types from the diagnosisType service
    this.diagnosisTypeService.getDiagnosisTypes().subscribe(
      (diagnosisTypes) => {
        this.diagnosisTypes = diagnosisTypes;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses().subscribe(
      (diagnoses) => {
        this.diagnoses = diagnoses;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes().subscribe(
      (adminLevelOnes) => {
        this.administrative_level_one = adminLevelOnes;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
    // get species from the species service
    this.speciesService.getSpecies().subscribe(
      (species) => {
        this.allSpecies = species;
        this.speciesLoading = false;
      },
      (error) => {
        this.errorMessage = <any>error;
        this.speciesLoading = false;
      }
    );
  }

  displayCurrentResults() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.currentResults);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.map === undefined) {
        this.buildMap();
      } else {
        this.mapResults(this.currentResults);
      }
    }, 500);
  }

  scaleLookup(mapZoom) {
    switch (mapZoom) {
      case 19:
        return "1,128";
      case 18:
        return "2,256";
      case 17:
        return "4,513";
      case 16:
        return "9,027";
      case 15:
        return "18,055";
      case 14:
        return "36,111";
      case 13:
        return "72,223";
      case 12:
        return "144,447";
      case 11:
        return "288,895";
      case 10:
        return "577,790";
      case 9:
        return "1,155,581";
      case 8:
        return "2,311,162";
      case 7:
        return "4,622,324";
      case 6:
        return "9,244,649";
      case 5:
        return "18,489,298";
      case 4:
        return "36,978,596";
      case 3:
        return "73,957,193";
      case 2:
        return "147,914,387";
      case 1:
        return "295,828,775";
      case 0:
        return "591,657,550";
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

  buildMap() {
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
      }
    );

    const grayscale = esri.basemapLayer("Gray");
    const streets = esri.basemapLayer("Streets");

    if (this.map === undefined) {
      this.map = new L.Map("map", {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
        layers: [streets],
      });
      this.map.addHandler("gestureHandling", GestureHandling);
      this.map.gestureHandling.enable();
    }

    if (this.locationMarkers) {
      this.locationMarkers.clearLayers();
    }

    this.locationMarkers = L.featureGroup().addTo(this.map);

    const baseMaps = {
      "Open Street Map": osm,
      Grayscale: grayscale,
      Streets: streets,
    };

    // Flyways hosted by Fish and Wildlife Service
    const flyways = esri.featureLayer({
      url: "https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWS_HQ_MB_Waterfowl_Flyway_Boundaries/FeatureServer/0",
      style: function (feature) {
        if (feature.properties.NAME === "Atlantic Flyway") {
          return { color: "#28995b", weight: 2 };
        } else if (feature.properties.NAME === "Pacific Flyway") {
          return { color: "#ffbd4f", weight: 2 };
        } else if (feature.properties.NAME === "Mississippi Flyway") {
          return { color: "#eb5834", weight: 2 };
        } else if (feature.properties.NAME === "Central Flyway") {
          return { color: "#b43cc7", weight: 2 };
        }
      },
    });

    // Watersheds hosted by The National Map (USGS)
    const watersheds = esri.dynamicMapLayer({
      url: "https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer",
      opacity: 0.7,
    });

    const overlays = {
      Flyways: flyways,
      Watersheds: watersheds,
    };

    const drawnItems = L.featureGroup().addTo(this.map);

    L.control
      .layers(
        baseMaps,
        overlays,
        { position: "topleft" },
        { drawlayer: drawnItems }
      )
      .addTo(this.map);

    L.control.scale({ position: "bottomright" }).addTo(this.map);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: {
          allowIntersection: false,
        },
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
        marker: false,
        circle: false,
        circlemarker: false,
        rectangle: false,
      },
    });

    this.map.addControl(drawControl);

    // Truncate value based on number of decimals
    const _round = function (num, len) {
      return Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
    };
    // Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
    const strLatLng = function (latlng) {
      return "(" + _round(latlng.lat, 6) + ", " + _round(latlng.lng, 6) + ")";
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
        return (
          "Center: " +
          strLatLng(center) +
          "<br />" +
          "Radius: " +
          _round(radius, 2) +
          " m"
        );
        // Rectangle/Polygon - area
      } else if (layer instanceof L.Polygon) {
        const latlngs = layer._defaultShape
            ? layer._defaultShape()
            : layer.getLatLngs(),
          area = L.GeometryUtil.geodesicArea(latlngs);
        return "Area: " + L.GeometryUtil.readableArea(area, true);
        // Polyline - distance
      } else if (layer instanceof L.Polyline) {
        const latlngs = layer._defaultShape
          ? layer._defaultShape()
          : layer.getLatLngs();
        let distance = 0;
        if (latlngs.length < 2) {
          return "Distance: N/A";
        } else {
          for (let i = 0; i < latlngs.length - 1; i++) {
            distance += latlngs[i].distanceTo(latlngs[i + 1]);
          }
          return "Distance: " + _round(distance, 2) + " m";
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
    this.map.on("zoomend", () => {
      const mapZoom = this.map.getZoom();
      const mapScale = this.scaleLookup(mapZoom);
      this.mapScale = mapScale;
      this.zoomLevel = mapZoom;
    });

    // updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes 'map center' label
    this.map.on("mousemove", (cursorPosition) => {
      // $('#mapCenterLabel').css('display', 'none');
      if (cursorPosition.latlng !== null) {
        this.latitude = cursorPosition.latlng.lat.toFixed(4);
        this.longitude = cursorPosition.latlng.lng.toFixed(4);
      }
    });
    // updates lat/lng indicator to map center after pan and shows 'map center' label.
    this.map.on("dragend", () => {
      // displays latitude and longitude of map center
      // $('#mapCenterLabel').css('display', 'inline');
      const geographicMapCenter = this.map.getCenter();
      this.latitude = geographicMapCenter.lat.toFixed(4);
      this.longitude = geographicMapCenter.lng.toFixed(4);
    });
    // end latLngScale utility logic/////////

    this.map.on("overlayadd", (e) => {
      console.log("overlayadd");
      if (e.name === "Flyways") {
        this.flywaysVisible = true;
      } else if (e.name === "Watersheds") {
        this.watershedsVisible = true;
      }
    });

    this.map.on("overlayremove", (e) => {
      console.log("overlayremove");
      if (e.name === "Flyways") {
        this.flywaysVisible = false;
      } else if (e.name === "Watersheds") {
        this.watershedsVisible = false;
      }
    });

    // add a click handler here to listen for popup event details links and programmatically handle the route
    document.getElementById("map").addEventListener("click", (e) => {
      const el = e.target as Element;
      if (el && el.hasAttribute("href") && el.matches("[data-router-link]")) {
        this.router.navigate([el.getAttribute("href")]);
        e.preventDefault();
      }
    });
  }

  mapResults(currentResults: any) {
    if (this.locationMarkers) {
      this.locationMarkers.clearLayers();
    }

    // set/reset currentResultsMarker var to an empty array
    const currentResultsMarkers = [];
    // tslint:disable-next-line:forin
    // loop through currentResults repsonse from a search query
    for (const event in currentResults) {
      // if event has any administrativeleveltwos (counties), add them to the currentResultsMarkers array
      if (currentResults[event]["administrativeleveltwos"].length > 0) {
        // tslint:disable-next-line:forin
        for (const adminleveltwo in currentResults[event][
          "administrativeleveltwos"
        ]) {
          // check if the administrativeleveltwo (county) of the event has already been placed into the currentResultsMarkers array.
          // If it has, push its events array into the existing marker for that administrativeleveltwo. This is to ensure one
          // marker per administrativeleveltwo, with events nested
          // tslint:disable-next-line:max-line-length
          if (
            this.searchInArray(
              currentResultsMarkers,
              "adminleveltwo",
              currentResults[event]["administrativeleveltwos"][adminleveltwo][
                "id"
              ]
            )
          ) {
            for (const marker of currentResultsMarkers) {
              if (
                marker.adminleveltwo ===
                currentResults[event]["administrativeleveltwos"][adminleveltwo][
                  "id"
                ]
              ) {
                marker.events.push(currentResults[event]);
              }
            }
          } else {
            currentResultsMarkers.push({
              lat: Number(
                currentResults[event]["administrativeleveltwos"][adminleveltwo][
                  "centroid_latitude"
                ]
              ),
              long: Number(
                currentResults[event]["administrativeleveltwos"][adminleveltwo][
                  "centroid_longitude"
                ]
              ),
              eventdiagnoses: currentResults[event]["eventdiagnoses"],
              adminleveltwo:
                currentResults[event]["administrativeleveltwos"][adminleveltwo][
                  "id"
                ],
              events: [currentResults[event]],
              complete: currentResults[event]["complete"],
            });
          }
        }
      }
    }

    // loop through currentResultsMarkers
    for (const marker of currentResultsMarkers) {
      // set vars for classes that will define the marker icons, per WIM markermaker CSS
      let colorClass = this.getMarkerColorClass(marker.events);
      let shapeClass = "wmm-circle ";
      let iconClasses = " wmm-icon-circle wmm-icon-white ";
      let sizeClass = "wmm-size-25";

      if (marker.events.length === 1) {
        // if event is complete, remove the white center to indicate closed/complete
        if (marker["complete"] === true) {
          iconClasses = " wmm-icon-noicon wmm-icon-white ";
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
          iconClasses = " wmm-icon-noicon wmm-icon-white ";
        }
      }

      // eventCount var keeps track of number of events at the location. Do not show if less than 2.
      let eventCount;
      if (marker.events.length > 1) {
        // for location with multiple events, show event count on symbol, make larger and gray
        eventCount = marker.events.length;
        // iconClasses = ' wmm-icon-circle wmm-icon-white ';
        sizeClass = "wmm-size-35";
      } else {
        // eventCount set to empty string if just one event at location
        eventCount = "";
        // set icon shape to a diamond if event_type = 2 (surveillance)
        if (marker.events[0].event_type === 2) {
          shapeClass = "wmm-diamond ";
          iconClasses = " wmm-icon-diamond wmm-icon-white ";
          sizeClass = "wmm-size-20";
          // remove white center (icon) if complete
          if (marker.events[0].complete) {
            iconClasses = " wmm-icon-noicon ";
          }
        }
      }
      // set icon to the proper combination of classnames set above (from WIM markermaker and some custom css)
      this.icon = L.divIcon({
        className: shapeClass + colorClass + iconClasses + sizeClass,
        html: eventCount,
      });

      // establish an empty string as the variable for the popup HTML markup content
      let popupContent = "";
      let adminLevelTwo = marker.events[0].administrativeleveltwos.find(
        (levelTwo) => levelTwo.id === marker.adminleveltwo
      );
      let markerLocationContent =
        adminLevelTwo.name +
        ", " +
        this.displayValuePipe.transform(
          adminLevelTwo.administrative_level_one,
          "name",
          this.adminLevelOnes
        );

      popupContent = "<h3>" + markerLocationContent + "</h3>";
      // loop through the events that are part of each single marker
      for (let event of marker.events) {
        let eventIconClasses = event.complete
          ? "wmm-icon-noicon"
          : "wmm-icon-circle wmm-icon-white";
        let eventColorClass = this.getMarkerColorClass([event]);
        let eventShapeClass =
          event.event_type === 1
            ? "wmm-circle"
            : "wmm-diamond wmm-icon-diamond";

        if (event.event_type === 2 && !event.complete) {
          eventIconClasses = "wmm-icon-diamond wmm-icon-white";
        }
        let eventSizeClass = "wmm-size-20";
        const eventMarkerClasses = [
          eventIconClasses,
          eventColorClass,
          eventShapeClass,
          eventSizeClass,
        ].join(" ");
        popupContent = popupContent + '<div class="popup-event-details">';
        popupContent =
          popupContent + '<div class="popup-event-details-header">';
        popupContent =
          popupContent +
          '<div class="marker-icon ' +
          eventMarkerClasses +
          '" title="' +
          this.getUniqueAnimalTypes([event]).join(", ") +
          '"></div>';
        if (event.public === false) {
          popupContent =
            popupContent +
            '<img class="not-public-icon" src="./assets/icons/visibility_off.png" alt="Not Public">';
        }
        popupContent =
          popupContent +
          '<a class="event-details-link" data-router-link href="./event/' +
          this.testForUndefined(event["id"]) +
          '">Event ' +
          this.testForUndefined(event["id"]) +
          "</a>";
        popupContent = popupContent + "</div>"; // close popup-event-details-header

        if (event.administrativeleveltwos.length > 1) {
          let locationContent = "<strong>Other Counties:</strong><br/>";
          // loop through the adminleveltwos (counties) for location display, attaching it's related adminlevelone (state)
          for (const administrativeleveltwo of event.administrativeleveltwos) {
            // skip the location for this marker
            if (administrativeleveltwo.id === marker.adminleveltwo) {
              continue;
            }
            locationContent =
              locationContent +
              administrativeleveltwo["name"] +
              ", " +
              this.displayValuePipe.transform(
                administrativeleveltwo["administrative_level_one"],
                "name",
                this.adminLevelOnes
              ) +
              "<br/>";
          }
          popupContent =
            popupContent +
            '<button class="popup-event-details-toggle"></button>';
          popupContent =
            popupContent +
            '<div class="popup-event-details-panel">' +
            locationContent +
            "</div>";
        }
        popupContent = popupContent + "</div>"; // closes popup-event-details
      }

      // establish leaflet popup var for binding to marker (include check for mapPanel height, to set max popup height)
      const popup = L.popup({
        maxHeight: document.getElementById("mapPanel").offsetHeight - 50,
      }).setContent(popupContent);

      // establish leaflet marker var, passing in icon var from above, including on popupopen logic for accordion style collapsing panels
      L.marker([marker.lat, marker.long], { icon: this.icon })
        .addTo(this.locationMarkers)
        .bindPopup(popup, {
          maxHeight: 300,
          minWidth: 200,
          autoPan: true,
          autoPanPadding: [20, 20],
          keepInView: true,
        })
        .on("popupopen", function (popup) {
          const acc = Array.from(
            document.querySelectorAll(".popup-event-details-toggle")
          );

          if (acc.length > 0) {
            acc.forEach(function (button, i) {
              acc[i].addEventListener("click", function (evt) {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                  panel.style.maxHeight = null;
                } else {
                  panel.style.maxHeight = panel.scrollHeight + "px";
                }
                let j;
                for (j = 0; j < acc.length; j++) {
                  if (i !== j) {
                    const panel: HTMLElement = acc[j]
                      .nextElementSibling as HTMLElement;
                    if (panel.style.maxHeight) {
                      acc[j].classList.toggle("active");
                      panel.style.maxHeight = null;
                    }
                  }
                }
              });
            });
          }
        });
    }

    if (this.locationMarkers.getBounds().isValid() === true) {
      // The legend on the right is 230px wide
      this.map.fitBounds(this.locationMarkers.getBounds(), {
        paddingTopLeft: [50, 50],
        paddingBottomRight: [230, 50],
        maxZoom: 10,
      });
    }
  }

  /**
   * Return unique animal types for class names of the species identified in
   * the given events. Animal types are a more user-friendly general
   * classification of related species that will be displayed in the map and is
   * meant to be used for color-coded categorization of events.
   * @param events
   */
  getUniqueAnimalTypes(events: EventSummary[]) {
    const animalTypes = [];
    for (const event of events) {
      Array.prototype.push.apply(animalTypes, getAnimalTypes(event.species));
    }
    // Return just unique values
    return Array.from(new Set(animalTypes));
  }

  getMarkerColorClass(events: EventSummary[]) {
    let colorClass;
    let animalTypes = this.getUniqueAnimalTypes(events);
    if (animalTypes.length > 1) {
      // grey for multiple animal types
      colorClass = "wmm-mutedblue";
    } else {
      switch (animalTypes[0]) {
        case "Mammal":
          colorClass = "wmm-red";
          break;
        case "Bird":
          colorClass = "wmm-yellow";
          break;
        case "Reptile/Amphibian":
          colorClass = "wmm-green";
          break;
        case "Fish":
          colorClass = "wmm-sky";
          break;
        case "Other":
          colorClass = "wmm-purple";
          break;
      }
    }
    return colorClass;
  }

  getMarkerClasses(event: EventSummary) {
    // set vars for classes that will define the marker icons, per WIM markermaker CSS
    let colorClass = this.getMarkerColorClass([event]);
    let shapeClass = "wmm-circle ";
    let iconClasses = " wmm-icon-circle wmm-icon-white ";
    let sizeClass = "wmm-size-25";

    if (event.complete === true) {
      iconClasses = " wmm-icon-noicon wmm-icon-white ";
    }

    if (event.event_type === 2) {
      shapeClass = "wmm-diamond ";
      iconClasses = " wmm-icon-diamond wmm-icon-white ";
      sizeClass = "wmm-size-20";
    }

    let className = shapeClass + colorClass + iconClasses + sizeClass;
    return className;
  }

  testForUndefined(value: any, property?: any) {
    let valueReturned = "n/a";

    if (value !== undefined) {
      if (property !== undefined) {
        valueReturned = value[property];
      } else {
        valueReturned = value;
      }
    }
    return valueReturned;
  }

  eventIDTooltip() {
    const string = FIELD_HELP_TEXT.eventIDTooltip;
    return string;
  }
  editEventTypeTooltip() {
    const string = FIELD_HELP_TEXT.editEventTypeTooltip;
    return string;
  }
  numberAffectedTooltip() {
    const string = FIELD_HELP_TEXT.numberAffectedTooltip;
    return string;
  }
  eventStartDateTooltip() {
    const string = FIELD_HELP_TEXT.eventStartDateTooltip;
    return string;
  }
  eventEndDateTooltip() {
    const string = FIELD_HELP_TEXT.eventEndDateTooltip;
    return string;
  }
  editSpeciesTooltip() {
    const string = FIELD_HELP_TEXT.editSpeciesTooltip;
    return string;
  }
  editEventDiagnosisTooltip() {
    const string = FIELD_HELP_TEXT.editEventDiagnosisTooltip;
    return string;
  }
  locationsTooltip() {
    const string = FIELD_HELP_TEXT.locationsTooltip;
    return string;
  }
  generalTableSpeciesTooltip() {
    const string = FIELD_HELP_TEXT.generalTableSpeciesTooltip;
    return string;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openMetadataLink() {
    window.open(APP_SETTINGS.WHISPERS_METADATA_URL, "_blank");
    gtag("event", "click", {
      event_category: "Home",
      event_label: "Metadata Opened",
    });
  }

  // Function for creating a dialog to download results summary report pdf
  generateResultsSummaryReport() {
    this.resultsSummaryReportDialogRef = this.dialog.open(
      SearchResultsSummaryReportComponent,
      {
        // Needs to be tall enough to display the entire legend
        minHeight: "600px",
        data: {
          user: this.currentUser,
          current_results: this.currentResults,
          current_search_query: this.currentSearchQuery,
          // mapUrl: this.resultsMapUrl.__zone_symbol__value,
          adminLevelOnes: this.adminLevelOnes,
          adminLevelTwos: this.administrative_level_two,
          diagnosisTypes: this.diagnosisTypes,
          diagnoses: this.diagnoses,
          species: this.allSpecies,
          // locations:
        },
      }
    );

    this.resultsSummaryReportDialogRef.afterClosed().subscribe(
      () => {
        // this.refreshEvent();
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  exportEventSummaries() {
    this.eventService.getEventSummaryCSV(this.currentSearchQuery);
    gtag("event", "click", {
      event_category: "Search",
      event_label: "Current Search Query Exported",
    });
  }

  saveSearch() {
    this.saveSearchDialogRef = this.dialog.open(SaveSearchComponent, {
      disableClose: true,
      data: {
        currentSearchQuery: this.currentSearchQuery,
        title: "Save Search",
        titleIcon: "save",
        showCancelButton: true,
        action_button_text: "Save Search",
        actionButtonIcon: "save",
      },
    });

    // this block not currently in use
    // this.saveSearchDialogRef.afterClosed()
    //   .subscribe(
    //     () => {
    //       // the logic for closing this dialog is handled within the SaveSearchComponent.
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );
  }

  implementSearch(search) {
    // TODO: currentDiplayQuery needs to be parsed from the search object
    const displayQuery: DisplayQuery = {
      event_id: [],
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
      administrative_level_one_includes_all:
        search.administrative_level_one_includes_all,
      administrative_level_two_includes_all:
        search.administrative_level_two_includes_all,
      and_params: [],
      complete: search.complete,
    };

    if (search.event_id) {
      for (const event_id of search.event_id) {
        displayQuery.event_id.push(event_id);
      }
    }

    if (search.event_type) {
      for (const event_type of search.event_type) {
        displayQuery.event_type.push(
          this.displayValuePipe.transform(event_type, "name", this.eventTypes)
        );
      }
    }

    if (search.diagnosis) {
      for (const diagnosis of search.diagnosis) {
        displayQuery.diagnosis.push(
          this.displayValuePipe.transform(diagnosis, "name", this.diagnoses)
        );
      }
    }
    if (search.diagnosis_type) {
      for (const diagnosis_type of search.diagnosis_type) {
        displayQuery.diagnosis_type.push(
          this.displayValuePipe.transform(
            diagnosis_type,
            "name",
            this.diagnosisTypes
          )
        );
      }
    }

    if (search.species) {
      for (const species of search.species) {
        displayQuery.species.push(
          this.displayValuePipe.transform(species, "name", this.allSpecies)
        );
      }
    }

    if (search.administrative_level_one) {
      for (const adminLevelOne of search.administrative_level_one) {
        displayQuery.administrative_level_one.push(
          this.displayValuePipe.transform(
            adminLevelOne,
            "name",
            this.administrative_level_one
          )
        );
      }
    }

    if (search.administrative_level_two) {
      for (const adminLevelTwo of search.administrative_level_two) {
        displayQuery.administrative_level_two.push(
          this.displayValuePipe.transform(
            adminLevelTwo,
            "name",
            this.administrative_level_two
          )
        );
      }
    }

    clientStorage.setItem("currentDisplayQuery", JSON.stringify(displayQuery));
    // use displayQuery for display of current query in markup, send to searchDialogService
    this.searchFormService.setDisplayQuery(displayQuery);

    // use searchForm.value to build the web service query, send to searchDialogService
    this.searchFormService.setSearchQuery(search);
    // this.router.navigate([`../home/`], { relativeTo: this.route });
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }
}
