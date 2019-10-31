import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { APP_SETTINGS } from '@app/app.settings';
declare let gtag: Function;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  apiRoot;

  constructor(
    public aboutDialogRef: MatDialogRef<AboutComponent>,
  ) {
    this.apiRoot = APP_SETTINGS.API_ROOT;
  }

  ngOnInit() {
    gtag('event', 'click', { 'event_category': 'About', 'event_label': 'About Modal Opened' });
  }

  openMetadataLink() {
    window.open(APP_SETTINGS.WHISPERS_METADATA_URL, '_blank');
  }

}
