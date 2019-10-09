import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CustomNotificationComponent } from '@app/custom-notification/custom-notification.component';
// remove this interface once actual data is being loaded
export interface Triggers {
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
export class NotificationsComponent implements OnInit {

  /* Toggle hints for 'Owned and Collaborating Events Notifications' */
  toggle1;
  toggle2;
  toggle3;

  customNotificationRef: MatDialogRef<CustomNotificationComponent>;

  // test data
  test_data: Triggers[] = [
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

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  newCustomNotification() {
    this.customNotificationRef = this.dialog.open(CustomNotificationComponent);
  }
}
