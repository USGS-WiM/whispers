import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
} from "@angular/material";
import { Injectable } from "@angular/core";

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from "@angular/material";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
} from "rxjs/operators";
import { merge, Subscription } from "rxjs";

import { ConfirmComponent } from "@app/confirm/confirm.component";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material";

import { Router, ActivatedRoute } from "@angular/router";
import { ResultsCountService } from "@services/results-count.service";

import { CircleManagementComponent } from "@app/circle-management/circle-management.component";
import { CirclesDataSource } from "@app/circles/circles.datasource";
import { CircleService } from "@services/circle.service";
import { Circle } from "@interfaces/circle";
import { CircleManagementService } from "@app/services/circle-management.service";

import { FIELD_HELP_TEXT } from "@app/app.field-help-text";

@Component({
  selector: "app-circles",
  templateUrl: "./circles.component.html",
  styleUrls: ["./circles.component.scss"],
})
export class CirclesComponent implements AfterViewInit, OnInit {
  circleManagementDialogRef: MatDialogRef<CircleManagementComponent>;
  dataSource: CirclesDataSource;
  errorMessage = "";

  private circlesSubscription: Subscription;

  circlesCount;

  orderParams = "";

  displayedColumns = [
    "select",
    // 'id',
    "name",
    "description",
    "users",
  ];

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<Number>(
    this.allowMultiSelect,
    this.initialSelection
  );
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private circleService: CircleService,
    private resultsCountService: ResultsCountService,
    private circleManagementService: CircleManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.resultsCountService.circlesResultsCount.subscribe((count) => {
      this.circlesCount = count;
    });
  }

  ngOnInit() {
    this.dataSource = new CirclesDataSource(this.circleService);
    this.dataSource.loadCircles("", 1, 20);

    // the following block triggers the reloading of the circles after a change is made to a circle
    this.circlesSubscription = this.circleManagementService
      .getCircleReload()
      .subscribe((response) => {
        this.dataSource.loadCircles("", 1, 20);
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCirclesPage()))
      .subscribe();
  }

  loadCirclesPage() {
    this.orderParams = this.sort.active;
    if (this.sort.direction === "desc") {
      this.orderParams = "-" + this.sort.active;
    }
    this.dataSource.loadCircles(
      this.orderParams,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  refreshTable() {
    this.dataSource.loadCircles("", 1, 20);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openCircleManagementDialog(selectedAction) {
    this.circleManagementDialogRef = this.dialog.open(
      CircleManagementComponent,
      {
        disableClose: true,
        data: {
          action: selectedAction,
          circle: this.selection.selected[0],
        },
      }
    );

    this.circleManagementDialogRef.afterClosed().subscribe(
      () => {},
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  deleteCircle(id: number) {
    this.circleService.delete(id).subscribe(
      () => {
        this.openSnackBar("Circle successfully deleted", "OK", 5000);
        this.refreshTable();
      },
      (error) => {
        this.errorMessage = <any>error;
        this.openSnackBar(
          "Error. Circle not deleted. Error message: " + error,
          "OK",
          8000
        );
      }
    );
  }

  openCircleDeleteConfirm(circle) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Delete Circle Confirm",
        titleIcon: "delete_forever",
        // tslint:disable-next-line:max-line-length
        message:
          "Are you sure you want to delete this Circle?\nThis action cannot be undone.",
        confirmButtonText: "Yes, Delete Circle",
        messageIcon: "",
        showCancelButton: true,
      },
    });

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteCircle(circle.id);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.docsOnThisPage.length;
    const numRows = this.dataSource.circlesList.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? ((this.docsOnThisPage.length = 0),
        this.dataSource.circlesList.forEach((row) =>
          this.selection.deselect(row.id)
        ))
      : this.dataSource.circlesList.forEach((row) => {
          this.selection.select(row.id);
          this.docsOnThisPage.push(row);
        });
  }

  // hover text
  circleNameTooltip() {
    const string = FIELD_HELP_TEXT.circleNameTooltip;
    return string;
  }
  circleDiscriptionTooltip() {
    const string = FIELD_HELP_TEXT.circleDiscriptionTooltip;
    return string;
  }
}
