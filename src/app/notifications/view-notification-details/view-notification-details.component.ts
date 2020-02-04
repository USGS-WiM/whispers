import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-notification-details',
  templateUrl: './view-notification-details.component.html',
  styleUrls: ['./view-notification-details.component.scss']
})
export class ViewNotificationDetailsComponent implements OnInit {

  constructor(
    public viewNotificationDetailsDialogRef: MatDialogRef<ViewNotificationDetailsComponent>,
    private domSanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

  // neccesary to sanitize the HTML for some Angular HTML injection security protections
  sanitizeHTML(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

}
