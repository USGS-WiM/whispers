import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
declare let gtag: Function;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public aboutDialogRef: MatDialogRef<AboutComponent>,
  ) { }

  ngOnInit() {
    gtag('event', 'click', {'event_category': 'About', 'event_label': 'About Modal Opened'});
  }

}
