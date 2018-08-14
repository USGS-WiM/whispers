import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare let L: any;
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

  dataSource: MatTableDataSource<EventSummary>;

  testDataSource: EventSearchResultsDataSource;

  resultsLoading = false;

  locationMarkers;

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
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              // tslint:disable-next-line:max-line-length
              mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

            L.control.layers(baseMaps).addTo(this.map);

            /*this.icon = L.icon({
              iconUrl: '../../assets/icons/marker-icon.png',
              shadowUrl: '../../assets/icons/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [13, 40],
              popupAnchor: [0, -40]
            });*/

            this.mapResults(this.currentResults);

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

  }

  searchInArray(array, field: string, value) {
    for (const item of array) {
      if (item[field] === value) {
        console.log("Duplicate detected. Already existing ID: " + value);
        return true;
      }
    }
  }

  mapResults(currentResults: any) {

    let currentResultsMarkers = [];
    // tslint:disable-next-line:forin
    for (let event in currentResults) {

      let colorClass;
      let iconClasses = ' wmm-icon-circle wmm-icon-white ';
      const sizeClass = 'wmm-size-25';
      if (currentResults[event]['eventdiagnoses'][0] !== undefined) {
        switch (currentResults[event]['eventdiagnoses'][0].diagnosis_type) {
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

      if (currentResults[event]['complete'] === true) {
        iconClasses = ' wmm-icon-noicon wmm-icon-white ';
      }

      const eventCount = currentResults[event]['administrativeleveltwos'].length;

      this.icon = L.divIcon({
        className: 'wmm-circle ' + colorClass + iconClasses + sizeClass,
        html: eventCount
      });



      if (currentResults[event]['administrativeleveltwos'].length > 0) {


        // tslint:disable-next-line:forin
        for (const adminleveltwo in currentResults[event]['administrativeleveltwos']) {

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

          // Good code below, works to display markers
          // L.marker([Number(currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']),
          // Number(currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude'])],
          //   { icon: this.icon })
          //   .addTo(this.locationMarkers)
          //   .bindPopup('<h3>Event ' + this.testForUndefined(currentResults[event]['id']) + '</h3><br/>' +
          //     'Type: ' + this.testForUndefined(currentResults[event]['event_type_string']) + '<br/>' +
          //     'Dates: ' + this.testForUndefined(currentResults[event]['start_date']) + ' to ' + this.currentResults[event]['end_date'] + '<br/>' +
          //     'Location: ' + this.testForUndefined(currentResults[event]['administrativeleveltwos'][0]['name']) + ', ' + this.testForUndefined(currentResults[event]['administrativelevelones'][0]['name']) + '<br/>' +
          //     'Species: ' + this.testForUndefined(currentResults[event]['species'][0], 'name') + '<br/>' +
          //     'Affected: ' + this.testForUndefined(currentResults[event]['affected_count']) + '<br/>' +
          //     'Diagnosis: ' + this.testForUndefined(currentResults[event]['eventdiagnoses'][0], 'diagnosis_string'));
        }
      }
      //this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50] });
    }


    for (const marker of currentResultsMarkers) {

      let colorClass;
      let iconClasses = ' wmm-icon-circle wmm-icon-white ';
      let sizeClass = 'wmm-size-25';
      if (marker['event_diagnoses'][0] !== undefined) {
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
      }

      this.icon = L.divIcon({
        className: 'wmm-circle ' + colorClass + iconClasses + sizeClass,
        html: eventCount
      });

      let popupContent = '';

      for (const event of marker.events) {

        let locationContent = '';
        let speciesContent = '';

        for (const administrativeleveltwo of event.administrativeleveltwos) {
          locationContent = locationContent + administrativeleveltwo['name'] + ', ' +
            this.displayValuePipe.transform(administrativeleveltwo['administrative_level_one'], 'name', this.adminLevelOnes) + '</br>';
        }

        for (const species of event.species) {
          speciesContent = speciesContent + species['name'] + '</br>';
        }

        popupContent = popupContent + '<h4>Event ' + this.testForUndefined(event['id']) + '</h4>' +
          'Type: ' + this.testForUndefined(event['event_type_string']) + '<br/>' +
          'Dates: ' + this.testForUndefined(event['start_date']) + ' to ' + event['end_date'] + '<br/>' +
          'Location: ' + locationContent +
          // 'Location: ' + this.testForUndefined(event['administrativeleveltwos'][0]['name']) + ', ' + this.testForUndefined(event['administrativelevelones'][0]['name']) + '<br/>' +
          'Species: ' + speciesContent +
          // 'Species: ' + this.testForUndefined(event['species'][0], 'name') + '<br/>' +
          'Affected: ' + this.testForUndefined(event['affected_count']) + '<br/>' +
          'Diagnosis: ' + this.testForUndefined(event['eventdiagnoses'][0], 'diagnosis_string');
      }

      L.marker([marker.lat, marker.long],
        { icon: this.icon })
        .addTo(this.locationMarkers)
        .bindPopup(popupContent);
    }

    this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [50, 50] });

    console.log(currentResultsMarkers);
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

