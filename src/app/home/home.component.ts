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

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';

import { DisplayQuery } from '@interfaces/display-query';
import { APP_SETTINGS } from '@app/app.settings';

import { EventSearchResultsDataSource } from '@app/event-search-results-data-source';

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

  dataSource: MatTableDataSource<EventSummary>;

  testDataSource: EventSearchResultsDataSource;

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
    private route: ActivatedRoute
  ) {

    this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(
      searchQuery => {

        const countLimit = 300;

        // this is the listener for a new search query

        this.eventService.queryEventsCount(searchQuery)
          .subscribe(
            count => {
              if (count.count >= countLimit) {
                //this.sampleQuerySizeErrorFlag = true;
                this.openSnackBar('Your Query result is too large. Please narrow your search and try again', 'OK', 8000);
              } else if (count.count < countLimit) {

                this.eventService.queryEvents(searchQuery)
                  .subscribe(
                    eventSummaries => {
                      this.currentResults = eventSummaries;
                      this.dataSource = new MatTableDataSource(this.currentResults);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;

                      setTimeout(() => {
                        /*this.map = new L.Map('map', {
                          center: new L.LatLng(39.8283, -98.5795),
                          zoom: 4,
                        });*/


                        this.locationMarkers.clearLayers();

                        for (const event in this.currentResults) {

                          let wimClass;
                          if (this.currentResults[event]['eventdiagnoses'][0] !== undefined) {
                            switch (this.currentResults[event]['eventdiagnoses'][0].diagnosis_type) {
                              case 1: {
                                wimClass = 'wmm-green';
                                break;
                              }
                              case 2: {
                                wimClass = 'wmm-blue';
                                break;
                              }
                              case 3: {
                                wimClass = 'wmm-red';
                                break;
                              }
                              case 4: {
                                wimClass = 'wmm-orange';
                                break;
                              }
                              case 5: {
                                wimClass = 'wmm-yellow';
                                break;
                              }
                              case 6: {
                                wimClass = 'wmm-purple';
                                break;
                              }
                              case 7: {
                                wimClass = 'wmm-sky';
                                break;
                              }
                              case 8: {
                                wimClass = 'wmm-mutedpink';
                                break;
                              }
                            }
                          }
            
                          this.icon = L.divIcon({
                            className: 'wmm-circle ' + wimClass + ' wmm-icon-circle wmm-icon-white wmm-size-25',
                            popupAnchor: [12, 12]
                          });
            
                          if (this.currentResults[event]['administrativeleveltwos'].length > 0) {
                            for (let adminleveltwo in this.currentResults[event]['administrativeleveltwos']) {
                              L.marker([Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']),
                              Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude'])],
                                { icon: this.icon })
                                .addTo(this.locationMarkers)
                                .bindPopup("<h3>Event " + this.testForUndefined(this.currentResults[event]['id']) + "</h3><br/>" +
                                  "Type: " + this.testForUndefined(this.currentResults[event]['event_type_string']) + "<br/>" +
                                  "Dates: " + this.testForUndefined(this.currentResults[event]['start_date']) + this.currentResults[event]['end_date'] + "<br/>" +
                                  "Location: " + this.testForUndefined(this.currentResults[event]['administrativeleveltwos'][0]) + ", " + this.testForUndefined(this.currentResults[event]['administrativelevelones'][0]) + "<br/>" +
                                  "Species: " + this.testForUndefined(this.currentResults[event]['species'][0], 'name') + "<br/>" +
                                  "Affected: " + this.testForUndefined(this.currentResults[event]['affected_count']) + "<br/>" +
                                  "Diagnosis: " + this.testForUndefined(this.currentResults[event]['eventdiagnoses'][0], 'diagnosis_string'));
                            }
                          }
                        }

                      }, 500);

                    },
                    error => {
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
            this.map = new L.Map('map', {
              center: new L.LatLng(39.8283, -98.5795),
              zoom: 4,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            this.locationMarkers = L.layerGroup().addTo(this.map);

            /*this.icon = L.icon({
              iconUrl: '../../assets/icons/marker-icon.png',
              shadowUrl: '../../assets/icons/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [13, 40],
              popupAnchor: [0, -40]
            });*/


            for (const event in this.currentResults) {

              let wimClass;
              if (this.currentResults[event]['eventdiagnoses'][0] !== undefined) {
                switch (this.currentResults[event]['eventdiagnoses'][0].diagnosis_type) {
                  case 1: {
                    wimClass = 'wmm-green';
                    break;
                  }
                  case 2: {
                    wimClass = 'wmm-blue';
                    break;
                  }
                  case 3: {
                    wimClass = 'wmm-red';
                    break;
                  }
                  case 4: {
                    wimClass = 'wmm-orange';
                    break;
                  }
                  case 5: {
                    wimClass = 'wmm-yellow';
                    break;
                  }
                  case 6: {
                    wimClass = 'wmm-purple';
                    break;
                  }
                  case 7: {
                    wimClass = 'wmm-sky';
                    break;
                  }
                  case 8: {
                    wimClass = 'wmm-mutedpink';
                    break;
                  }
                }
              }

              this.icon = L.divIcon({
                className: 'wmm-circle ' + wimClass + ' wmm-icon-circle wmm-icon-white wmm-size-25',
                popupAnchor: [12, 12]
              });

              if (this.currentResults[event]['administrativeleveltwos'].length > 0) {
                for (let adminleveltwo in this.currentResults[event]['administrativeleveltwos']) {
                  L.marker([Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']),
                  Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude'])],
                    { icon: this.icon })
                    .addTo(this.locationMarkers)
                    .bindPopup("<h3>Event " + this.testForUndefined(this.currentResults[event]['id']) + "</h3><br/>" +
                      "Type: " + this.testForUndefined(this.currentResults[event]['event_type_string']) + "<br/>" +
                      "Dates: " + this.testForUndefined(this.currentResults[event]['start_date']) + this.currentResults[event]['end_date'] + "<br/>" +
                      "Location: " + this.testForUndefined(this.currentResults[event]['administrativeleveltwos'][0]) + ", " + this.testForUndefined(this.currentResults[event]['administrativelevelones'][0]) + "<br/>" +
                      "Species: " + this.testForUndefined(this.currentResults[event]['species'][0], 'name') + "<br/>" +
                      "Affected: " + this.testForUndefined(this.currentResults[event]['affected_count']) + "<br/>" +
                      "Diagnosis: " + this.testForUndefined(this.currentResults[event]['eventdiagnoses'][0], 'diagnosis_string'));
                }
              }
            }

          }, 500);

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.dataSource = new MatTableDataSource(this.currentResults);

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

