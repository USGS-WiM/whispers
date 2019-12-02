import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { APP_UTILITIES } from '@app/app.utilities';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { EventService } from '@services/event.service';
import { CurrentUserService } from '@services/current-user.service';

import { EventDetail } from '@interfaces/event-detail';

@Component({
  selector: 'app-alert-collaborators',
  templateUrl: './alert-collaborators.component.html',
  styleUrls: ['./alert-collaborators.component.scss']
})
export class AlertCollaboratorsComponent implements OnInit {
  eventID: string;
  resultsLoading = false;
  tableLoading = false;
  eventData: EventDetail;
  dataSource;
  readCollaborators;
  writeCollaborators;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Number>(this.allowMultiSelect, this.initialSelection);

  displayedColumns = [
    'select',
    'user'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tableLoading = true;
    this.route.paramMap.subscribe(params => {
      this.eventID = params.get('id');

      // Actual request to event details service, using id
      this.eventService.getEventDetails(this.eventID)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;
            this.readCollaborators = this.eventData.read_collaborators;
            this.writeCollaborators = this.eventData.write_collaborators;
            this.dataSource = this.readCollaborators.concat(this.writeCollaborators);
            this.dataSource = new MatTableDataSource(this.dataSource);
            this.dataSource.paginator = this.paginator;
            // this.commentsDataSource.sort = this.sort;
            this.tableLoading = false;
          },
          error => {
            this.tableLoading = false;
          }
        );
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(this.dataSource);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
