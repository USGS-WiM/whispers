import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CustomNotificationComponent } from '@app/custom-notification/custom-notification.component';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { APP_UTILITIES } from '@app/app.utilities';
import { Notification } from '@app/interfaces/notification';
import { CurrentUserService } from '@app/services/current-user.service';
import { NotificationService } from '@services/notification.service';
import { ViewNotificationDetailsComponent } from '@app/notifications/view-notification-details/view-notification-details.component';
// remove this interface once actual data is being loaded
export interface Cue {
  name: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  notificationsDataSource: MatTableDataSource<Notification>;
  panelOpenState = false;
  selection;
  notificationsLoading = false;
  errorMessage;

  currentUser;

  userNotifications;

  // toggles
  emailAllStandardChecked: boolean;
  yourEventsChecked: boolean;
  yourOrgEventsChecked: boolean;
  yourCollabEventsChecked: boolean;
  allEventsChecked: boolean;

  // emailAllOwnedandCollab: boolean;
  emailCustom: boolean;
  emailAllCustom: boolean;

  dummyNotifications = APP_UTILITIES.dummyData;

  customNotificationRef: MatDialogRef<CustomNotificationComponent>;

  standardNotificationSettingsForm: FormGroup;

  // this.allEventsChecked = false;

  // test data
  dummy_custom_cues: Cue[] = [
    { name: 'Event with Species: Alligator' },
    { name: 'Event with ID 17044' },
    { name: 'Event with State: Wisconsin OR Minnesota' },
    { name: 'Event with ID 1337' },
    { name: 'Event with ID 7775556' },
    { name: 'Event with ID 17055' },
    { name: 'Event with Diagnosis: E.Coli and Species: Squirrel and State: Wisconsin' },
    { name: 'Event with ID 00977' },
    { name: 'Event with ID 4323455' },
    { name: 'Event with ID 675465' },
  ];

  notificationDisplayedColumns = [
    'select',
    'go',
    'read',
    'created_date',
    'source'
  ];

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  viewNotificationsDetailRef: MatDialogRef<ViewNotificationDetailsComponent>;

  buildStandardNotificationSettingsForm() {
    this.standardNotificationSettingsForm = this.formBuilder.group({
      yourEvents_new: false,
      yourEvents_updated: false,
      yourEvents_email: false,
      orgEvents_new: false,
      orgEvents_updated: false,
      orgEvents_email: false,
      collabEvents_new: false,
      collabEvents_updated: false,
      collabEvents_email: false,
      allEvents_new: false,
      allEvents_updated: false,
      allEvents_email: false
    });
  }


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private currentUserService: CurrentUserService,
    public snackBar: MatSnackBar,
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Notification>(allowMultiSelect, initialSelection);
    this.notificationsLoading = true;

    this.notificationsDataSource = new MatTableDataSource([]);
    this.notificationsDataSource.paginator = this.notificationPaginator;

    this.notificationService.getUserNotifications()
      .subscribe(
        (notifications) => {
          this.userNotifications = notifications;
          this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
          this.notificationsDataSource.paginator = this.notificationPaginator;

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.notificationsDataSource.sort = this.sort;
    }, 3000);

    // TODO - populate with default states or with existing state from service
    // sidenote: I'm setting them here because they weren't working on the first click if I set them in the ngOnInit function ¯\_(ツ)_/¯
    this.emailAllStandardChecked = false;
    this.yourEventsChecked = false;
    this.yourOrgEventsChecked = false;
    this.yourCollabEventsChecked = false;
    this.allEventsChecked = false;
  }

  navigateToEvent(event) {
    this.router.navigate([`../event/${event.event}`], { relativeTo: this.route });
  }

  newCustomNotification() {
    this.customNotificationRef = this.dialog.open(CustomNotificationComponent, {
      minWidth: '60%',
      data: {}
    });
  }

  emailAllStandardNotifications() {
    this.emailAllStandardChecked = !this.emailAllStandardChecked;
    if (this.emailAllStandardChecked === true) {
      this.yourEventsChecked = true;
      this.yourOrgEventsChecked = true;
      this.yourCollabEventsChecked = true;
      this.allEventsChecked = true;
    } else {
      this.yourEventsChecked = false;
      this.yourOrgEventsChecked = false;
      this.yourCollabEventsChecked = false;
      this.allEventsChecked = false;
    }
  }

  yourEvents() {
    this.yourEventsChecked = !this.yourEventsChecked;
    this.checkIfAllStandardTogglesTrue();
  }

  yourOrgEvents() {
    this.yourOrgEventsChecked = !this.yourOrgEventsChecked;
    this.checkIfAllStandardTogglesTrue();
  }

  yourCollabEvents() {
    this.yourCollabEventsChecked = !this.yourCollabEventsChecked;
    this.checkIfAllStandardTogglesTrue();
  }

  allEvents() {
    this.allEventsChecked = !this.allEventsChecked;
    this.checkIfAllStandardTogglesTrue();
  }

  checkIfAllStandardTogglesTrue() {
    if (this.yourEventsChecked && this.yourOrgEventsChecked && this.yourCollabEventsChecked && this.allEventsChecked) {
      // this.emailAllStandardNotificationsToggle = true;
      this.emailAllStandardChecked = true;
    } else {
      this.emailAllStandardChecked = false;
    }
  }

  deleteWarning(cue) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Custom Notification',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete the custom notification " ' + cue.name + ' "?',
          confirmButtonText: 'Delete',
          messageIcon: 'delete_forever',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // add delete function
        this.confirmDialogRef.close();
      }
    });
  }

  openNotification(notification) {

    this.viewNotificationsDetailRef = this.dialog.open(ViewNotificationDetailsComponent,
      {
        data: {
          notification: notification
        }
      }
    );

    this.viewNotificationsDetailRef.afterClosed().subscribe(result => {
      if (result.status === 'unread') {
        // if the notification is marked as read, update to unread
        if (notification.read === true) {
          // update the read boolean to true both locally and on the server
          const body = { id: result.id, read: false };
          this.notificationService.updateNotification(body)
            .subscribe(
              (response) => {
                this.viewNotificationsDetailRef.close();
                this.notificationService.getUserNotifications()
                  .subscribe(
                    (notifications) => {
                      this.userNotifications = notifications;
                      this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
                      this.notificationsDataSource.paginator = this.notificationPaginator;

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
        this.viewNotificationsDetailRef.close();
      } else if (result.status === 'read') {
        // update the read boolean to true both locally and on the server
        // if the notification is marked as unread, mark it as read
        if (notification.read === false) {
          const body = { id: result.id, read: true };
          this.notificationService.updateNotification(body)
            .subscribe(
              (response) => {
                this.viewNotificationsDetailRef.close();
                this.notificationService.getUserNotifications()
                  .subscribe(
                    (notifications) => {
                      this.userNotifications = notifications;
                      this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
                      this.notificationsDataSource.paginator = this.notificationPaginator;

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
      } else if (result.status === 'delete') {
        const id = result.id;
        this.notificationService.deleteNotification(id)
          .subscribe(
            (response) => {
              this.viewNotificationsDetailRef.close();
              this.notificationService.getUserNotifications()
                .subscribe(
                  (notifications) => {
                    this.userNotifications = notifications;
                    this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
                    this.notificationsDataSource.paginator = this.notificationPaginator;

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
    });
  }

  openNotificationDeleteConfirm(selection) {
    // const idArray = [];
    // for (const item of selection) {
    //   idArray.push(item.id);
    // }
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Notifications Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete these notifications? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.updateNotifications(selection, 'delete');
      }
    });
  }

  updateNotifications(selection, action) {

    const idArray = [];
    for (const item of selection) {
      idArray.push(item.id);
    }

    const updateObject = { 'action': action, 'ids': idArray };
    this.notificationService.bulkUpdateNotifications(updateObject)
      .subscribe(
        () => {

          if (action === 'delete') {
            this.openSnackBar('Notifications successfully deleted', 'OK', 5000);
          }

          this.notificationService.getUserNotifications()
            .subscribe(
              (notifications) => {
                this.userNotifications = notifications;
                this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
                this.notificationsDataSource.paginator = this.notificationPaginator;

              },
              error => {
                this.errorMessage = <any>error;
              }
            );

          // clear selection
          // this.selection.deselect(id);
          // this.updateSelectedEventGroup(null);
          // this.refreshTable();
        },
        error => {
          this.errorMessage = <any>error;
          if (action === 'delete') {
            this.openSnackBar('Error. Notifications not deleted. Error message: ' + error, 'OK', 8000);
          }
        }
      );

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  // updateRowData(row_obj) {
  //   this.notificationsDataSource = this.notificationsDataSource.data.filter((value, key) => {
  //     if (value.id == row_obj.id) {
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.notificationsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.notificationsDataSource.data.forEach(row => this.selection.select(row));
  }
}
