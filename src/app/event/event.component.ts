import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { EventService } from '@services/event.service';

import { Router, ActivatedRoute } from '@angular/router';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';
import { Subscription } from 'rxjs/Subscription';

import { DisplayQuery } from '@interfaces/display-query';

import { APP_UTILITIES } from '@app/app.utilities';
import { APP_SETTINGS } from '@app/app.settings';

import { EventsDataSource } from '@app/event/events.datasource';
import { ResultsCountService } from '@services/results-count.service';
import { EventSummary } from '@interfaces/event-summary';
import { ConfirmComponent } from '@confirm/confirm.component';
import { EventGroupManagementComponent } from '@app/event-group-management/event-group-management.component';

@Component({
  selector: 'app-event-table',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements AfterViewInit, OnInit {

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  searchDialogRef: MatDialogRef<SearchDialogComponent>;
  private searchQuerySubscription: Subscription;
  errorMessage: string;

  resultsLoading = false;

  eventGroupManagementDialogRef: MatDialogRef<EventGroupManagementComponent>;

  // below variables are for implementation of removeable chips (WIP)
  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  dataSource: EventsDataSource;

  eventCount;

  orderParams = '';

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<EventSummary>(this.allowMultiSelect, this.initialSelection);

  displayedColumns = [
    'select',
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

  // tslint:disable-next-line:max-line-length
  currentSearchQuery = sessionStorage.getItem('currentSearch') ? JSON.parse(sessionStorage.getItem('currentSearch')) : APP_SETTINGS.DEFAULT_SEARCH_QUERY;
  currentDisplayQuery: DisplayQuery = sessionStorage.getItem('currentDisplayQuery') ? JSON.parse(sessionStorage.getItem('currentDisplayQuery')) : APP_SETTINGS.DEFAULT_DISPLAY_QUERY;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    private eventService: EventService,
    private resultsCountService: ResultsCountService,
    private searchDialogService: SearchDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    resultsCountService.eventQueryResultsCount.subscribe(count => {
      this.eventCount = count;
    });

    this.searchQuerySubscription = this.searchDialogService.getSearchQuery().subscribe(
      searchQuery => {

        // this.resultsLoading = true;

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

        this.dataSource.queryEvents(searchQuery, '', 1, 5);

        if (this.searchDialogRef) {
          this.searchDialogRef.close();
        }


      });

    this.searchQuerySubscription = this.searchDialogService.getDisplayQuery().subscribe(
      displayQuery => {
        this.currentDisplayQuery = displayQuery;
        console.log('New display query: ' + this.currentDisplayQuery);
        console.log('Current Display Query adminlevelOne length: ' + this.currentDisplayQuery.administrative_level_one.length);
        console.log(' Current Display Query Event types: ' + this.currentDisplayQuery.event_type);
      });
  }

  ngOnInit() {

    this.currentSearchQuery.and_params = [];

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

    // replace this direct call to the service with a call of the query function of the dataSource, allow it to do the actual query
    this.dataSource = new EventsDataSource(this.eventService);
    this.dataSource.queryEvents(this.currentSearchQuery, '', 1, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEventsPage())
      )
      .subscribe();
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openEventGroupManagementDialog(selectedAction) {

    console.log(this.selection);
    this.eventGroupManagementDialogRef = this.dialog.open(EventGroupManagementComponent, {
      disableClose: true,
      data: {
        action: selectedAction
      }
    });

    this.eventGroupManagementDialogRef.afterClosed()
      .subscribe(
        () => {

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  loadEventsPage() {

    this.orderParams = this.sort.active;
    if (this.sort.direction === 'desc') {
      this.orderParams = '-' + this.sort.active;
    }
    this.dataSource.queryEvents(
      this.currentSearchQuery,
      this.orderParams,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  selectEvent(event) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Open event ' + event.id,
          // tslint:disable-next-line:max-line-length
          message: 'Navigate to event details page for Event ' + event.id + '?',
          confirmButtonText: 'GO',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.navigateToEvent(event);
      }
    });
  }

  navigateToEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }

  openSearchDialog() {
    this.searchDialogRef = this.dialog.open(SearchDialogComponent, {
      minWidth: '60%',
      data: {
        query: this.currentDisplayQuery
      }
    });
  }

  // code below is for implementation of removeable chips (WIP)
  // remove(event) {
  //   const index = this.indexOfSelected(event);

  //   if (index >= 0) {
  //     this.selection.selected.splice(index, 1);
  //   }
  // }

  // indexOfSelected(event) {
  //   for (let i = 0; i < this.selection.selected.length; i++) {
  //     if (this.selection.selected[i].id === event.id && this.selection.selected[i].id === event.id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // add() {}

}

