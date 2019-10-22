import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { APP_SETTINGS } from '@app/app.settings';

@Component({
  selector: 'app-browser-warning',
  templateUrl: './browser-warning.component.html',
  styleUrls: ['./browser-warning.component.scss']
})
export class BrowserWarningComponent implements OnInit {


  constructor(
    public browserWarningDialogRef: MatDialogRef<BrowserWarningComponent>,
  ) { }

  ngOnInit() { }


}