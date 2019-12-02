import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { EventService } from '@services/event.service';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { Router, ActivatedRoute } from '@angular/router';

import { UserEventsDataSource } from '@app/user-events/user-events.datasource';
import { ResultsCountService } from '@services/results-count.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
@Injectable()
export class UserEventsComponent implements AfterViewInit, OnInit {

  dataSource: UserEventsDataSource;

  // pageData: PageData;

  eventCount;

  orderParams = '';

  displayedColumns = [
    'id',
    'event_type',
    'affected_count',
    'start_date',
    'end_date',
    'locations',
    'species',
    'eventdiagnoses',
    'permission_source'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventService: EventService,
    private resultsCountService: ResultsCountService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    resultsCountService.userEventsResultsCount.subscribe(count => {
      this.eventCount = count;
    });
  }

  ngOnInit() {
    this.dataSource = new UserEventsDataSource(this.eventService);
    this.dataSource.loadEvents('', 1, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEventsPage())
      )
      .subscribe();

    // this.paginator.page
    //   .pipe(
    //     tap(() => this.loadEventsPage())
    //   )
    //   .subscribe();
  }

  eventIDTooltip() { const string = FIELD_HELP_TEXT.eventIDTooltip; return string; }
  editEventTypeTooltip() { const string = FIELD_HELP_TEXT.editEventTypeTooltip; return string; }
  numberAffectedTooltip() { const string = FIELD_HELP_TEXT.numberAffectedTooltip; return string; }
  eventStartDateTooltip() { const string = FIELD_HELP_TEXT.eventStartDateTooltip; return string; }
  eventEndDateTooltip() { const string = FIELD_HELP_TEXT.eventEndDateTooltip; return string; }
  editEventDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; }
  locationsTooltip() { const string = FIELD_HELP_TEXT.locationsTooltip; return string; }
  generalTableSpeciesTooltip() { const string = FIELD_HELP_TEXT.generalTableSpeciesTooltip; return string; }
  permissionSourceTooltip() { const string = FIELD_HELP_TEXT.permissionSourceTooltip; return string; }

  loadEventsPage() {

    this.orderParams = this.sort.active;
    if (this.sort.direction === 'desc') {
      this.orderParams = '-' + this.sort.active;
    }
    this.dataSource.loadEvents(
      this.orderParams,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }


}
