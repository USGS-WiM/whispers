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
import { DataUpdatedService } from '@services/data-updated.service';
import { ViewNotificationDetailsComponent } from '@app/notifications/view-notification-details/view-notification-details.component';
import { CustomNotificationCue } from '@interfaces/custom-notification-cue'

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
  emailAllStandard: boolean;

  // emailAllOwnedandCollab: boolean;
  emailCustom: boolean;
  emailAllCustom: boolean;

  dummyNotifications = APP_UTILITIES.dummyData;

  customNotificationRef: MatDialogRef<CustomNotificationComponent>;

  standardNotificationSettingsForm: FormGroup;
  customNotificationSettingsForm: FormGroup;

  previousValueStandardNotificationSettingsForm;

  // this.allEventsChecked = false;

  // test data
  dummy_custom_cues: CustomNotificationCue[] = [
    {
      'id': 1000, 'cue_string': 'Event with Species: Alligator',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1001, 'cue_string': 'Event with ID 17044',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1002, 'cue_string': 'Event with State: Wisconsin OR Minnesota',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1003, 'cue_string': 'Event with ID 1337',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1004, 'cue_string': 'Event with ID 7775556',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1005, 'cue_string': 'Event with ID 17055',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1006, 'cue_string': 'Event with Diagnosis: E.Coli and Species: Squirrel and State: Wisconsin',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1007, 'cue_string': 'Event with ID 00977',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1008, 'cue_string': 'Event with ID 4323455',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
    {
      'id': 1009, 'cue_string': 'Event with ID 675465',
      'notification_cue_preference': {
        'id': 400,
        'create_when_new': true,
        'create_when_modified': true,
        'send_email': false
      }
    },
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

  buildCustomNotificationSettingsForm() {
    this.customNotificationSettingsForm = this.formBuilder.group({
      custom_cues: this.formBuilder.array([])
    });
  }


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private currentUserService: CurrentUserService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
  ) {

    this.buildStandardNotificationSettingsForm();
    this.buildCustomNotificationSettingsForm();

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
      // pass the notification_cue_standards to populate the settings form
      // this.populateStandardNotificationSettingsForm(this.currentUser.notification_cue_standards);
    });

  }

  ngOnInit() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Notification>(allowMultiSelect, initialSelection);
    this.notificationsLoading = true;

    this.notificationsDataSource = new MatTableDataSource([]);
    this.notificationsDataSource.paginator = this.notificationPaginator;

    // retrieve user's notifications
    this.notificationService.getUserNotifications()
      .subscribe(
        (notifications) => {
          this.userNotifications = notifications;
          this.notificationsDataSource = new MatTableDataSource(this.userNotifications);
          this.notificationsDataSource.paginator = this.notificationPaginator;
          this.notificationsLoading = false;
          // use dataUpdatedService to refresh notifications in app.component as well

        },
        error => {
          this.errorMessage = <any>error;
          this.notificationsLoading = false;
        }
      );

    this.standardNotificationSettingsForm.get('yourEvents_email').valueChanges.subscribe(value => { if (value === false) { this.emailAllStandard = false; } });
    this.standardNotificationSettingsForm.get('orgEvents_email').valueChanges.subscribe(value => { if (value === false) { this.emailAllStandard = false; } });
    this.standardNotificationSettingsForm.get('collabEvents_email').valueChanges.subscribe(value => { if (value === false) { this.emailAllStandard = false; } });
    this.standardNotificationSettingsForm.get('allEvents_email').valueChanges.subscribe(value => { if (value === false) { this.emailAllStandard = false; } });

    // populate the form with currentUser's settings onInit
    this.populateStandardNotificationSettingsForm(this.currentUser.notification_cue_standards);

    // subscribe to changes to the form and update the server with changes
    this.standardNotificationSettingsForm.valueChanges.subscribe(value => {
      console.log('Standard Notifications updated! New value: ', value);
      const match = (this.previousValueStandardNotificationSettingsForm === this.standardNotificationSettingsForm.value);
      this.updateStandardNotificationSettings(value);
    });

    // set the previous form value to the current to intialize the page
    this.previousValueStandardNotificationSettingsForm = this.standardNotificationSettingsForm.value;

    // retrieve user's custom notifications and populate the formArray
    // note: this will be done via a service call. pulling from test/dummy data object temporarily
    const customCuesFormArray = <FormArray>this.customNotificationSettingsForm.get('custom_cues');
    for (const cue of this.dummy_custom_cues) {
      customCuesFormArray.push(
        this.formBuilder.group({
          id: cue.id,
          cue_string: cue.cue_string,
          new: cue.notification_cue_preference.create_when_new,
          updated: cue.notification_cue_preference.create_when_modified,
          email: cue.notification_cue_preference.send_email
        })
      );
    }

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.notificationsDataSource.sort = this.sort;
    }, 3000);

    // sidenote: I'm setting them here because they weren't working on the first click if I set them in the ngOnInit function ¯\_(ツ)_/¯
    this.emailAllStandard = false;
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

  emailAllToggle(notificationType) {
    if (notificationType === 'standard') {
      this.emailAllStandard = !this.emailAllStandard;
      if (this.emailAllStandard === true) {
        this.standardNotificationSettingsForm.patchValue({
          yourEvents_email: true,
          orgEvents_email: true,
          collabEvents_email: true,
          allEvents_email: true
        });
      } else {
        // do not un-check the boxes if the 'email on for all is unchecked'
        // should only go one way- check on to check them all
        // below block does un-check them all, if that behavior is requested.
        // this.standardNotificationSettingsForm.patchValue({
        //   yourEvents_email: false,
        //   orgEvents_email: false,
        //   collabEvents_email: false,
        //   allEvents_email: false
        // });
      }

    } else if (notificationType === 'custom') {
      // TODO: set all customs to email on
    }

  }

  initCustomCue(cue) {
    return this.formBuilder.group({
      id: cue.id,
      cue_string: cue.cue_string,
      new: cue.new,
      updated: cue.updated,
      email: cue.email
    });
  }

  getCustomCues(form) {
    return form.controls.custom_cues.controls;
  }

  // yourEvents() {
  //   this.yourEventsChecked = !this.yourEventsChecked;
  //   this.checkIfAllStandardTogglesTrue();
  // }

  // yourOrgEvents() {
  //   this.yourOrgEventsChecked = !this.yourOrgEventsChecked;
  //   this.checkIfAllStandardTogglesTrue();
  // }

  // yourCollabEvents() {
  //   this.yourCollabEventsChecked = !this.yourCollabEventsChecked;
  //   this.checkIfAllStandardTogglesTrue();
  // }

  // allEvents() {
  //   this.allEventsChecked = !this.allEventsChecked;
  //   this.checkIfAllStandardTogglesTrue();
  // }

  // checkIfAllStandardTogglesTrue() {
  //   if (this.yourEventsChecked && this.yourOrgEventsChecked && this.yourCollabEventsChecked && this.allEventsChecked) {
  //     // this.emailAllStandardNotificationsToggle = true;
  //     this.emailAllStandard = true;
  //   } else {
  //     this.emailAllStandard = false;
  //   }
  // }

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

  populateStandardNotificationSettingsForm(userSettings) {

    // parse out from userSettings object and fill in here
    this.standardNotificationSettingsForm.patchValue({
      yourEvents_new: userSettings.find(setting => setting.standard_type === 1).notification_cue_preference.create_when_new,
      yourEvents_updated: userSettings.find(setting => setting.standard_type === 1).notification_cue_preference.create_when_modified,
      yourEvents_email: userSettings.find(setting => setting.standard_type === 1).notification_cue_preference.send_email,

      orgEvents_new: userSettings.find(setting => setting.standard_type === 2).notification_cue_preference.create_when_new,
      orgEvents_updated: userSettings.find(setting => setting.standard_type === 2).notification_cue_preference.create_when_modified,
      orgEvents_email: userSettings.find(setting => setting.standard_type === 2).notification_cue_preference.send_email,

      collabEvents_new: userSettings.find(setting => setting.standard_type === 3).notification_cue_preference.create_when_new,
      collabEvents_updated: userSettings.find(setting => setting.standard_type === 3).notification_cue_preference.create_when_modified,
      collabEvents_email: userSettings.find(setting => setting.standard_type === 3).notification_cue_preference.send_email,

      allEvents_new: userSettings.find(setting => setting.standard_type === 4).notification_cue_preference.create_when_new,
      allEvents_updated: userSettings.find(setting => setting.standard_type === 4).notification_cue_preference.create_when_modified,
      allEvents_email: userSettings.find(setting => setting.standard_type === 4).notification_cue_preference.send_email,
    });

  }

  updateStandardNotificationSettings(settingsObject) {
    const updateObject = {
      'new_notification_cue_standard_preferences': [
        {
          'standard_type': 1,
          'new_notification_cue_preference': {
            'create_when_new': settingsObject.yourEvents_new,
            'create_when_modified': settingsObject.yourEvents_updated,
            'send_email': settingsObject.yourEvents_email,
          }
        },
        {
          'standard_type': 2,
          'new_notification_cue_preference': {
            'create_when_new': settingsObject.orgEvents_new,
            'create_when_modified': settingsObject.orgEvents_updated,
            'send_email': settingsObject.orgEvents_email,
          }
        },
        {
          'standard_type': 3,
          'new_notification_cue_preference': {
            'create_when_new': settingsObject.collabEvents_new,
            'create_when_modified': settingsObject.collabEvents_updated,
            'send_email': settingsObject.collabEvents_email,
          }
        },
        {
          'standard_type': 4,
          'new_notification_cue_preference': {
            'create_when_new': settingsObject.allEvents_new,
            'create_when_modified': settingsObject.allEvents_updated,
            'send_email': settingsObject.allEvents_email,
          }
        }
      ]
    };

    this.notificationService.updateUserStandardNotificationSettings(this.currentUser.id, updateObject)
      .subscribe(
        (response) => {
          // update cuurentUser service  with updated user object containing updated settings object
          this.currentUserService.updateCurrentUser(response);
          // update sessionStorage with updated user object containing updated settings object
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          // since the update succeeded, update the previous form value var to be able to compare to next change
          this.previousValueStandardNotificationSettingsForm = this.standardNotificationSettingsForm.value;
          // display success message
          this.openSnackBar('Notification Settings Updated!', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          // since the updated failed, revert the form back to previous value so display is in sync with database values
          this.standardNotificationSettingsForm.setValue(this.previousValueStandardNotificationSettingsForm);
          this.openSnackBar('Notification Settings Updated Failed. Error: ' + this.errorMessage, 'OK', 5000);
        }
      );
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
