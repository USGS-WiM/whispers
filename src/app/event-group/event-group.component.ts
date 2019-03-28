import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Injectable } from '@angular/core';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { EventService } from '@services/event.service';

import { Router, ActivatedRoute } from '@angular/router';

import { EventGroupsDataSource } from '@app/event-group/event-groups.datasource';
import { ResultsCountService } from '@services/results-count.service';
import { EventGroupService } from '@services/event-group.service';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.scss']
})
export class EventGroupComponent implements AfterViewInit, OnInit {

  dataSource: EventGroupsDataSource;

  eventGroupCount;

  orderParams = '';

  displayedColumns = [
    'id',
    'category',
    'comment',
    'events'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventGroupService: EventGroupService,
    private resultsCountService: ResultsCountService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    resultsCountService.eventGroupResultsCount.subscribe(count => {
      this.eventGroupCount = count;
    });
  }

  ngOnInit() {
    this.dataSource = new EventGroupsDataSource(this.eventGroupService);
    this.dataSource.loadEventGroups('', 1, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEventGroupsPage())
      )
      .subscribe();
  }

  loadEventGroupsPage() {

    this.orderParams = this.sort.active;
    if (this.sort.direction === 'desc') {
      this.orderParams = '-' + this.sort.active;
    }
    this.dataSource.loadEventGroups(
      this.orderParams,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }


}
