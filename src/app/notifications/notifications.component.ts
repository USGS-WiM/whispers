import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CustomNotificationComponent } from '@app/custom-notification/custom-notification.component';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { APP_UTILITIES } from '@app/app.utilities';
import { Notification } from '@app/interfaces/notification';
// remove this interface once actual data is being loaded
export interface Cue {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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
  /* Toggle hints for 'Owned and Collaborating Events Notifications' */
  toggle1;
  toggle2;
  toggle3;
  dummyNotifications = APP_UTILITIES.dummyData;

  customNotificationRef: MatDialogRef<CustomNotificationComponent>;

  // test data
  test_data: Cue[] = [
    {position: 1, name: 'Event with Species: Alligator', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Event with ID 17044', weight: 4.0026, symbol: 'He'},
    {position: 3, name: '2. Event with State: Wisconsin OR Minnesota', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Event with ID 1337', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Event with ID 7775556', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Event with ID 17055', weight: 12.0107, symbol: 'C'},
    {position: 7, name: '5. Event with Diagnosis: E.Coli and Species: Squirrel and State: Wisconsin', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Event with ID 00977', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Event with ID 4323455', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Event with ID 675465', weight: 20.1797, symbol: 'Ne'},
  ];

  notificationDisplayedColumns = [
    'select',
    'read',
    'created_date',
    'source'
  ];

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Notification>(allowMultiSelect, initialSelection);

    this.notificationsDataSource = new MatTableDataSource(this.dummyNotifications);
    this.notificationsLoading = true;
    this.notificationsDataSource.paginator = this.notificationPaginator;
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.notificationsDataSource.sort = this.sort;
    }, 3000);
  }

  navigateToEvent(event) {
    this.router.navigate([`../event/${event.event}`], { relativeTo: this.route });
  }

  newCustomNotification() {
    this.customNotificationRef = this.dialog.open(CustomNotificationComponent);
  }


  deleteWarning(trigger) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Cue',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete the "' + trigger.name + '" cue?',
          confirmButtonText: 'Delete',
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
