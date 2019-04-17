import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { EventService } from '@services/event.service';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Router, ActivatedRoute } from '@angular/router';

import { EventGroupsDataSource } from '@app/event-group/event-groups.datasource';
import { ResultsCountService } from '@services/results-count.service';
import { EventGroupService } from '@services/event-group.service';
import { EventGroupManagementComponent } from '@app/event-group-management/event-group-management.component';
import { EventGroupManagementService } from '@services/event-group-management.service';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.scss']
})
export class EventGroupComponent implements AfterViewInit, OnInit {

  eventGroupManagementDialogRef: MatDialogRef<EventGroupManagementComponent>;
  dataSource: EventGroupsDataSource;
  errorMessage = '';

  private eventGroupSubscription: Subscription;

  eventGroupCount;

  eventGroupCategories;

  orderParams = '';

  displayedColumns = [
    'select',
    'id',
    'category',
    'comment',
    'events'
  ];

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<Number>(this.allowMultiSelect, this.initialSelection);
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventGroupService: EventGroupService,
    private resultsCountService: ResultsCountService,
    private eventGroupManagementService: EventGroupManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {

    this.resultsCountService.eventGroupResultsCount.subscribe(count => {
      this.eventGroupCount = count;
      // this.refreshTable();
    });
  }

  ngOnInit() {
    this.dataSource = new EventGroupsDataSource(this.eventGroupService);
    this.dataSource.loadEventGroups('', 1, 20);

    ///////////////////
    this.eventGroupSubscription = this.eventGroupManagementService.getEventGroupReload().subscribe(
      response => {
        this.dataSource.loadEventGroups('', 1, 20);

      });
    ///////////////////////////

    this.eventGroupService.getEventGroupCategories()
      .subscribe(
        eventGroupCategories => {
          this.eventGroupCategories = eventGroupCategories;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
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

  refreshTable() {
    this.dataSource.loadEventGroups('', 1, 20);
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  updateSelectedEventGroup(eventGroup) {

    if (eventGroup === undefined) {
      this.eventGroupManagementService.setSelectedEventGroup(null);
    } else {
      this.eventGroupManagementService.setSelectedEventGroup(eventGroup);
    }
  }

  openEventGroupManagementDialog(selectedAction) {

    this.eventGroupManagementDialogRef = this.dialog.open(EventGroupManagementComponent, {
      disableClose: true,
      data: {
        action: selectedAction,
        eventGroup: this.selection.selected[0]
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


  deleteEventGroup(id: number) {
    this.eventGroupService.delete(id)
      .subscribe(
        () => {
          this.openSnackBar('Event Group successfully deleted', 'OK', 5000);
          this.refreshTable();
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Event Group not deleted. Error message: ' + error, 'OK', 8000);
        }
      );

  }

  openEventGroupDeleteConfirm(eventGroup) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Group Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this Event Group?\nThis action cannot be undone.',
          confirmButtonText: 'Yes, Delete Event Group',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventGroup(eventGroup.id);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.docsOnThisPage.length;
    const numRows = this.dataSource.eventGroupList.length;
    return (numSelected === numRows);
  }

  masterToggle() {
    this.isAllSelected() ?
      (
        this.docsOnThisPage.length = 0,
        this.dataSource.eventGroupList.forEach(row => this.selection.deselect(row.id))
      ) :
      this.dataSource.eventGroupList.forEach(
        row => {
          this.selection.select(row.id);
          this.docsOnThisPage.push(row);
        }
      );
  }


}
