import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare let L: any;
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Event } from '@interfaces/event';
import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  searchDialogRef: MatDialogRef<SearchDialogComponent>;

  map;

  displayedColumns = [
    'id',
    'event_type_string',
    'affected_count',
    'start_date',
    'end_date',
    'states',
    'counties',
    'species',
    'event_diagnosis'
  ];

  dataSource: MatTableDataSource<Event>;

  // ngx-datatable ///////////////

  // eventsTableRows = [];
  // selected = [];

  // eventsTableColumns: any[] = [
  //   { prop: 'ID' },
  //   { name: 'Event Type' },
  //   { name: 'Affected' },
  //   { name: 'Start Date' },
  //   { name: 'End Date' },
  //   { name: 'States' },
  //   { name: 'Counties' },
  //   { name: 'Species' },
  //   { name: 'Diagnosis' }
  // ];

  // ngx-datatable ///////////////

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _eventService: EventService, private _dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  openSearchDialog() {
    this.searchDialogRef = this._dialog.open(SearchDialogComponent, {
      minWidth: '60%',
      // height: '75%'
    });
  }

  ngOnInit() {

    const events: EventSummary[] = this._eventService.getTestData();

    // this.eventsTableRows = events;

    this.dataSource = new MatTableDataSource(events);

    setTimeout(() => {
      this.map = new L.Map('map', {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    }, 500);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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

