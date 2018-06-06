import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import { AboutComponent } from '@about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  aboutDialogRef: MatDialogRef<AboutComponent>;
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  openAboutDialog() {
    this.aboutDialogRef = this.dialog.open(AboutComponent, {
      minWidth: '60%',
      // height: '75%'
    });
  }


  navigateToEventSubmit() {
    this.router.navigate([`../eventsubmission/`], { relativeTo: this.route });
  }
}
