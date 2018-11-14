import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-view-contact-details',
  templateUrl: './view-contact-details.component.html',
  styleUrls: ['./view-contact-details.component.scss']
})
export class ViewContactDetailsComponent implements OnInit {

  viewContactDetailsDialogRef: MatDialogRef<ViewContactDetailsComponent>;

  constructor() { }

  ngOnInit() {
    
  }

}
