import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare let L: any;
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';

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

  currentSearchQuery;
  currentDisplayQuery: DisplayQuery;

  currentResults: EventSummary[];

  dataSource: MatTableDataSource<EventSummary>;

  testDataSource: EventSearchResultsDataSource;

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
    private router: Router,
    private searchDialogService: SearchDialogService,
    private route: ActivatedRoute
  ) {

    this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(
      searchQuery => {

        // this is the listener for a new search query

        this.eventService.queryEvents(searchQuery)
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

                this.icon = L.icon({ iconUrl: '../../assets/icons/marker-icon.png', shadowUrl: '../../assets/icons/marker-shadow.png' })

                for (const event in this.currentResults) {
                  if (this.currentResults[event]['administrativeleveltwos'].length > 0) {
                    for (let adminleveltwo in this.currentResults[event]['administrativeleveltwos']) {
                      console.log('is it here?');
                      L.marker([Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']), Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude'])], { icon: this.icon }).addTo(this.map);
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

        // this.currentSearchQuery = searchQuery;
        // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
        // this.testDataSource = new EventSearchResultsDataSource(this.eventService);
        // this.testDataSource.loadResults(searchQuery);

        this.searchDialogRef.close();

      });

    this.searchQuerySubscription = this.searchDialogService.getDisplayQuery().subscribe(
      displayQuery => {
        this.currentDisplayQuery = displayQuery;

      });
  }

  openSearchDialog() {
    this.searchDialogRef = this.dialog.open(SearchDialogComponent, {
      minWidth: '60%',
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

            this.icon = L.icon({ iconUrl: '../../assets/icons/marker-icon.png', shadowUrl: '../../assets/icons/marker-shadow.png' })

            for (const event in this.currentResults) {
              if (this.currentResults[event]['administrativeleveltwos'].length > 0) {
                for (let adminleveltwo in this.currentResults[event]['administrativeleveltwos']) {
                  console.log('is it here?');
                  L.marker([Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_latitude']), Number(this.currentResults[event]['administrativeleveltwos'][adminleveltwo]['centroid_longitude'])], { icon: this.icon }).addTo(this.map);
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

