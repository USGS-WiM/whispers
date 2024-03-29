import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatTabGroup,
} from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

import { MatSnackBar } from "@angular/material";

import { ContactService } from "@app/services/contact.service";

import { Contact } from "@interfaces/contact";

import { CreateContactComponent } from "@create-contact/create-contact.component";
import { CurrentUserService } from "@services/current-user.service";

import { EventService } from "@services/event.service";

import { APP_SETTINGS } from "@app/app.settings";
import { OrganizationService } from "@services/organization.service";

import { ConfirmComponent } from "@confirm/confirm.component";

import { EditUserComponent } from "@app/edit-user/edit-user.component";
import { NewLookupRequestComponent } from "@app/new-lookup-request/new-lookup-request.component";
import { JsonPipe } from "@angular/common";
import { BulkUploadComponent } from "@app/bulk-upload/bulk-upload.component";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  contactsDataSource: MatTableDataSource<Contact>;
  contactsLoading = false;

  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  editUserDialogRef: MatDialogRef<EditUserComponent>;
  newLookupRequestDialogRef: MatDialogRef<NewLookupRequestComponent>;
  bulkUploadDialogRef: MatDialogRef<BulkUploadComponent>;

  errorMessage;
  events;
  contacts;
  organizations = [];

  selection;
  currentUser;

  selectedTab: number;

  contactDisplayedColumns = [
    "select",
    "last_name",
    "first_name",
    "phone_number",
    "email",
    "organization",
    "permission_source",
  ];

  @ViewChild("eventPaginator") paginator: MatPaginator;
  @ViewChild("eventSort") sort: MatSort;

  @ViewChild(MatPaginator) contactPaginator: MatPaginator;
  @ViewChild(MatSort) contactSort: MatSort;

  constructor(
    private _eventService: EventService,
    private _contactService: ContactService,
    private organizationService: OrganizationService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    currentUserService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { tab: number };
    if (state !== undefined) {
      this.selectedTab = state.tab;
    }
  }

  ngOnInit() {
    // const events: EventSummary[] = this._eventService.getTestData();
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Contact>(
      allowMultiSelect,
      initialSelection
    );

    this.contactsLoading = true;

    this._contactService.getContacts().subscribe(
      (usercontacts) => {
        this.contacts = usercontacts;
        this.contactsDataSource = new MatTableDataSource(this.contacts);
        this.contactsDataSource.paginator = this.contactPaginator;
        this.contactsDataSource.sort = this.contactSort;
        this.contactsLoading = false;
      },
      (error) => {
        this.errorMessage = <any>error;
        this.contactsLoading = false;
      }
    );

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations().subscribe(
      (organizations) => {
        this.organizations = organizations;
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );

    // this.contactsDataSource = new MatTableDataSource(this.contacts);
    // set selected tab
    // this.selectedTab = 0;
  }

  // this function used to force the contacts table to be sortable once the contacts tab is activated.
  _setDataSource(indexNumber) {
    switch (indexNumber) {
      // if it is the contacts tab
      case 2:
        //!this.contactsDataSource.paginator ? this.contactsDataSource.paginator = this.contactPaginator : null;
        this.contactsDataSource = new MatTableDataSource(this.contacts);
        this.contactsDataSource.paginator = this.contactPaginator;
        this.contactsDataSource.sort = this.contactSort;
        this.contactsLoading = false;
        break;
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      minWidth: "75%",
      disableClose: true,
      data: {
        contact_action: "create",
      },
    });

    this.createContactDialogRef.afterClosed().subscribe(
      () => {
        this._contactService.getContacts().subscribe(
          (usercontacts) => {
            this.selection.clear();

            this.contacts = usercontacts;
            this.contactsDataSource = new MatTableDataSource(this.contacts);
            this.contactsDataSource.paginator = this.contactPaginator;
            this.contactsDataSource.sort = this.contactSort;
          },
          (error) => {
            this.errorMessage = <any>error;
          }
        );
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  openEditContactDialog() {
    // Add code to determine how many are selected

    if (this.selection.selected.length > 1) {
      alert("you have too many contacts selected for edit. select only one.");
    } else if (this.selection.selected.length === 1) {
      this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
        minWidth: "60%",
        data: {
          contact_action: "edit",
          contact: this.selection.selected[0],
        },
        // height: '75%'
      });

      // Add listener here that updates contacts when dialog is closed
      this.createContactDialogRef.afterClosed().subscribe(
        () => {
          this._contactService.getContacts().subscribe(
            (usercontacts) => {
              this.selection.clear();

              this.contacts = usercontacts;
              this.contactsDataSource = new MatTableDataSource(this.contacts);
              this.contactsDataSource.paginator = this.contactPaginator;
              this.contactsDataSource.sort = this.contactSort;
            },
            (error) => {
              this.errorMessage = <any>error;
            }
          );
        },
        (error) => {
          this.errorMessage = <any>error;
        }
      );
    }
  }

  openContactRemoveConfirm() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Delete Contact",
        message: "Are you sure you want to delete the contact?",
        confirmButtonText: "Yes, Delete",
        showCancelButton: true,
      },
    });

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.removeContact();
      }
    });
  }

  openEditUserDialog() {
    // Open dialog for adding event diagnosis
    this.editUserDialogRef = this.dialog.open(EditUserComponent, {
      data: {},
    });

    this.editUserDialogRef.afterClosed().subscribe(
      () => {
        // do something after close
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  openNewLookupRequestDialog() {
    // Open dialog for requesting new lookup value
    this.newLookupRequestDialogRef = this.dialog.open(
      NewLookupRequestComponent,
      {
        data: {
          title: "Request New Item",
          titleIcon: "add_circle",
          showCancelButton: true,
          action_button_text: "Submit request",
          actionButtonIcon: "send",
        },
      }
    );

    this.newLookupRequestDialogRef.afterClosed().subscribe(
      () => {},
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  openBulkUploadDialog() {
    // open dialog for bulk upload
    this.bulkUploadDialogRef = this.dialog.open(BulkUploadComponent, {
      // minWidth: '50%',
      data: {
        title: "Bulk Data Upload",
        titleIcon: "cloud_upload",
        showCancelButton: true,
      },
    });

    this.bulkUploadDialogRef.afterClosed().subscribe(
      () => {
        // do something after close
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  removeContact() {
    if (this.selection.selected.length > 1) {
      alert(
        "you have too many contacts selected for removal. select only one."
      );
    } else if (this.selection.selected.length === 1) {
      this._contactService.remove(this.selection.selected[0]).subscribe(
        () => {
          this._contactService.getContacts().subscribe(
            (usercontacts) => {
              this.selection.clear();

              this.contacts = usercontacts;
              this.contactsDataSource = new MatTableDataSource(this.contacts);
              this.contactsDataSource.paginator = this.contactPaginator;
              this.contactsDataSource.sort = this.contactSort;

              this.openSnackBar("Contact Removed", "OK", 5000);
            },
            (error) => {
              this.errorMessage = <any>error;
            }
          );
        },
        (error) => {
          this.errorMessage = <any>error;
        }
      );
    }
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contactsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.contactsDataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }

  formatPhone(phone) {
    let formatted_phone = "";

    if (phone != null && phone.length == 10) {
      let temp_phone = phone.split("");
      formatted_phone =
        "(" +
        temp_phone.slice(0, 3).join("") +
        ") " +
        temp_phone.slice(3, 6).join("") +
        "-" +
        temp_phone.slice(6, 10).join("");
    } else {
      formatted_phone = phone;
    }

    return formatted_phone;
  }
}
