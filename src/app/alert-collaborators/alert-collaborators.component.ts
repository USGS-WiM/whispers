import { Component, AfterViewInit, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
} from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  PatternValidator,
} from "@angular/forms/";

import { merge } from "rxjs";
import { tap } from "rxjs/operators";

import { APP_UTILITIES } from "@app/app.utilities";
import { APP_SETTINGS } from "@app/app.settings";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";

import { EventService } from "@services/event.service";
import { CurrentUserService } from "@services/current-user.service";

import { EventDetail } from "@interfaces/event-detail";

@Component({
  selector: "app-alert-collaborators",
  templateUrl: "./alert-collaborators.component.html",
  styleUrls: ["./alert-collaborators.component.scss"],
})
export class AlertCollaboratorsComponent implements OnInit {
  errorMessage = "";
  eventID: string;
  resultsLoading = false;
  tableLoading = false;
  eventData: EventDetail;
  dataSource;
  readCollaborators;
  writeCollaborators;
  collaboratorsArray = [];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Number>(
    this.allowMultiSelect,
    this.initialSelection
  );

  submitLoading = false;

  displayedColumns = ["select", "user"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  alertCollaboratorForm: FormGroup;

  buildAlertCollaboratorForm() {
    this.alertCollaboratorForm = this.formBuilder.group({
      event: null,
      recipients: [],
      comment: "",
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.buildAlertCollaboratorForm();
  }

  ngOnInit() {
    this.tableLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.eventID = params.get("id");

      // Actual request to event details service, using id
      this.eventService.getEventDetails(this.eventID).subscribe(
        (eventdetails) => {
          this.eventData = eventdetails;
          this.readCollaborators = this.eventData.read_collaborators;
          this.writeCollaborators = this.eventData.write_collaborators;
          // add the event owner (creator) to the collaboarator list
          let eventOwner = {
            id: this.eventData.created_by,
            first_name: this.eventData.created_by_first_name,
            last_name: this.eventData.created_by_last_name,
            organization: this.eventData.created_by_organization,
            organization_string:
              this.eventData.created_by_organization_string + " | Event Owner",
            username: this.eventData.created_by_string,
          };
          this.collaboratorsArray = this.collaboratorsArray.concat(eventOwner);
          this.collaboratorsArray = this.collaboratorsArray.concat(
            this.readCollaborators
          );
          this.collaboratorsArray = this.collaboratorsArray.concat(
            this.writeCollaborators
          );
          this.dataSource = new MatTableDataSource(this.collaboratorsArray);
          this.dataSource.paginator = this.paginator;
          // this.commentsDataSource.sort = this.sort;
          this.tableLoading = false;
        },
        (error) => {
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {
    this.submitLoading = true;

    formValue.event = this.eventID;

    // formValue.receipients needs to be initialized as an array
    formValue.recipients = [];

    // Note: the type of selection.selected is set to Number (despite being an object in this case)
    // so this extra dumy array (selectionArray) is needed to create a clean typed array that allows
    // for the Object property access in the next for loop.
    const selectionArray = [];
    for (const item of this.selection.selected) {
      selectionArray.push(item);
    }
    for (const user of selectionArray) {
      formValue.recipients.push(user.id);
    }

    this.eventService.alertCollaborators(formValue).subscribe(
      (response) => {
        this.submitLoading = false;
        this.openSnackBar(
          "Alert successfully sent to event collaborators.",
          "OK",
          5000
        );
      },
      (error) => {
        this.errorMessage = <any>error;
        this.openSnackBar(
          "Error. Collaboration request response not submitted. Error message: " +
            error,
          "OK",
          8000
        );
      }
    );

    // update the formValue.recipients array with the selected table values.
  }
}
