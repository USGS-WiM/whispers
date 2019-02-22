import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { ContactService } from '@app/services/contact.service';

import { Contact } from '@interfaces/contact';
import { EventSummary } from '@interfaces/event-summary';

import { CreateContactComponent } from '@create-contact/create-contact.component';
import { CurrentUserService } from '@services/current-user.service';

import { EventService } from '@services/event.service';

import { APP_SETTINGS } from '@app/app.settings';
import { OrganizationService } from '@services/organization.service';
import { RoleService } from '@services/role.service';

import { ConfirmComponent } from '@confirm/confirm.component';

import { EditUserComponent } from '@app/edit-user/edit-user.component';
import { NewLookupRequestComponent } from '@app/new-lookup-request/new-lookup-request.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  dataSource: MatTableDataSource<EventSummary>;
  contactsDataSource: MatTableDataSource<Contact>;

  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  editUserDialogRef: MatDialogRef<EditUserComponent>;
  newLookupRequestDialogRef: MatDialogRef<NewLookupRequestComponent>;

  errorMessage;
  events;
  contacts;
  organizations = [];
  roles = [];

  selection;
  currentUser;

  username = APP_SETTINGS.API_USERNAME;

  displayedColumns = [
    'id',
    'event_type_string',
    'affected_count',
    'start_date',
    'end_date',
    // 'administrativelevelones',
    // 'administrativeleveltwos',
    'locations',
    'species',
    'eventdiagnoses',
    'permission_source'
  ];

  contactDisplayedColumns = [
    'select',
    'last_name',
    'first_name',
    'phone_number',
    'email_address',
    'organization',
    'permission_source'
  ];

  @ViewChild('eventPaginator') paginator: MatPaginator;
  @ViewChild('eventSort') sort: MatSort;

  @ViewChild(MatPaginator) contactPaginator: MatPaginator;
  @ViewChild(MatSort) contactSort: MatSort;

  constructor(
    private _eventService: EventService,
    private _contactService: ContactService,
    private organizationService: OrganizationService,
    private currentUserService: CurrentUserService,
    private roleService: RoleService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {

    // const events: EventSummary[] = this._eventService.getTestData();
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Contact>(allowMultiSelect, initialSelection);

    this._contactService.getContacts()
      .subscribe(
        (usercontacts) => {
          this.contacts = usercontacts;
          this.contactsDataSource = new MatTableDataSource(this.contacts);
          this.contactsDataSource.paginator = this.contactPaginator;
          this.contactsDataSource.sort = this.contactSort;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get roles from the RoleService
    this.roleService.getRoles()
      .subscribe(
        roles => {
          this.roles = roles;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.contactsDataSource = new MatTableDataSource(this.contacts);

    this._eventService.getUserDashboardEventSummaries()
      .subscribe(
        (eventsummaries) => {
          this.events = eventsummaries;
          this.dataSource = new MatTableDataSource(this.events);
          console.log(this.dataSource.data);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // this.dataSource = new MatTableDataSource(this.events);
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.contactsDataSource.paginator ? this.contactsDataSource.paginator = this.contactPaginator : null;
          break;
        case 1:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          !this.dataSource.sort ? this.dataSource.sort = this.sort : null;
      }
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      disableClose: true,
      data: {
        contact_action: 'create'
      }
      // height: '75%'
    });

    this.createContactDialogRef.afterClosed()
      .subscribe(
        () => {
          this._contactService.getContacts()
            .subscribe(
              (usercontacts) => {
                this.selection.clear();

                this.contacts = usercontacts;
                this.contactsDataSource = new MatTableDataSource(this.contacts);
                this.contactsDataSource.paginator = this.contactPaginator;
                this.contactsDataSource.sort = this.contactSort;
              },
              error => {
                this.errorMessage = <any>error;
              }
            );
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  openEditContactDialog() {

    // Add code to determine how many are selected

    console.log(this.selection.selected);

    if (this.selection.selected.length > 1) {
      alert('you have too many contacts selected for edit. select only one.');
    } else if (this.selection.selected.length === 1) {
      this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
        minWidth: '60%',
        data: {
          contact_action: 'edit',
          contact: this.selection.selected[0]
        }
        // height: '75%'
      });

      // Add listener here that updates contacts when dialog is closed
      this.createContactDialogRef.afterClosed()
        .subscribe(
          () => {
            this._contactService.getContacts()
              .subscribe(
                (usercontacts) => {
                  this.selection.clear();

                  this.contacts = usercontacts;
                  this.contactsDataSource = new MatTableDataSource(this.contacts);
                  this.contactsDataSource.paginator = this.contactPaginator;
                  this.contactsDataSource.sort = this.contactSort;
                },
                error => {
                  this.errorMessage = <any>error;
                }
              );
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
      ////////////////////////////////////////////////////////////////////
    }
  }

  openContactRemoveConfirm() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Contact',
          message: 'Are you sure you want to delete the contact?',
          confirmButtonText: 'Yes, Delete'
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.removeContact();
      }
    });
  }

  openEditUserDialog() {

    // Open dialog for adding event diagnosis
    this.editUserDialogRef = this.dialog.open(EditUserComponent, {
      data: {}
    });

    this.editUserDialogRef.afterClosed()
      .subscribe(
        () => {
          // do something after close
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  openNewLookupRequestDialog() {

    // Open dialog for adding event diagnosis
    this.newLookupRequestDialogRef = this.dialog.open(NewLookupRequestComponent, {
      data: {
        title: 'Request New Item',
        titleIcon: 'add_circle',
        showCancelButton: true,
        action_button_text: 'Submit request',
        actionButtonIcon: 'send'
      }
    });

    this.newLookupRequestDialogRef.afterClosed()
      .subscribe(
        () => {
          // do something after close
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  removeContact() {

    if (this.selection.selected.length > 1) {
      alert('you have too many contacts selected for removal. select only one.');
    } else if (this.selection.selected.length === 1) {
      this._contactService.remove(this.selection.selected[0])
        .subscribe(
          () => {
            this._contactService.getContacts()
              .subscribe(
                (usercontacts) => {
                  this.selection.clear();

                  this.contacts = usercontacts;
                  this.contactsDataSource = new MatTableDataSource(this.contacts);
                  this.contactsDataSource.paginator = this.contactPaginator;
                  this.contactsDataSource.sort = this.contactSort;

                  this.openSnackBar('Contact Removed', 'OK', 5000);
                },
                error => {
                  this.errorMessage = <any>error;
                }
              );
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.contactsDataSource.data.forEach(row => this.selection.select(row));
  }

  formatPhone(phone) {
    let formatted_phone = '';

    if (phone != null && phone.length == 10) {
      let temp_phone = phone.split('');
      formatted_phone = '(' + temp_phone.slice(0, 3).join('') + ') ' + temp_phone.slice(3, 6).join('') + '-' + temp_phone.slice(6, 10).join('');
    } else {
      formatted_phone = phone;
    }

    return formatted_phone;
  }


}
