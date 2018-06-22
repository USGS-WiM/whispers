import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  dataSource: MatTableDataSource<EventSummary>;

  errorMessage;
  events;

  displayedColumns = [
    'id',
    'event_type_string',
    'affected_count',
    'start_date',
    'end_date',
    'administrativelevelones',
    'administrativeleveltwos',
    'species',
    'eventdiagnoses'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    
    //const events: EventSummary[] = this._eventService.getTestData();
    
    this._eventService.getUserDashboardEventSummaries()
      .subscribe(
        (eventsummaries) => {
          this.events = eventsummaries;
          this.dataSource = new MatTableDataSource(this.events);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

      this.dataSource = new MatTableDataSource(this.events);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectEvent(event) {
    //this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }


}
