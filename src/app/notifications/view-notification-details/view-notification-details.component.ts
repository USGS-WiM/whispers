import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-notification-details',
  templateUrl: './view-notification-details.component.html',
  styleUrls: ['./view-notification-details.component.scss']
})
export class ViewNotificationDetailsComponent implements OnInit {

  constructor(
    public viewNotificationDetailsDialogRef: MatDialogRef<ViewNotificationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  // TODO: figure out the DOM sanitization or whatever needs doing for the HTML injection.
  // also figure out why the dialog is rendering wrong.

}
