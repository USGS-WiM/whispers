import { Component, OnInit } from '@angular/core';

import { APP_SETTINGS } from '@app/app.settings';

import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { UrlShorteningService } from '@services/url-shortening.service';

@Component({
  selector: 'app-event-details-share',
  templateUrl: './event-details-share.component.html',
  styleUrls: ['./event-details-share.component.scss']
})
export class EventDetailsShareComponent implements OnInit {

  appURL = APP_SETTINGS.APP_URL;
  eventID = this.data.eventID;
  shortURL = '';

  submitLoading = false;

  errorMessage;

  constructor(
    public eventDetailsShareDialogRef: MatDialogRef<EventDetailsShareComponent>,
    private urlShorteningService: UrlShorteningService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  generateShortURL() {

    this.shortURL = '';

    this.submitLoading = true;

    this.urlShorteningService.generateShortURL()
      .subscribe(
        response => {
          console.log(response);
          console.log('Shortened URL is: ' + response.response.data.entry[0].short_url);
          this.shortURL = response.response.data.entry[0].short_url;
          this.submitLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.submitLoading = false;
        }
      );

  }

}
