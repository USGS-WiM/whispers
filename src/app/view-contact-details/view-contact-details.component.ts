import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-view-contact-details',
  templateUrl: './view-contact-details.component.html',
  styleUrls: ['./view-contact-details.component.scss']
})
export class ViewContactDetailsComponent implements OnInit {

  contactDetails;

  constructor(
    public viewContactDetailsDialogRef: MatDialogRef<ViewContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    console.log(this.data);

    this.contactDetails = this.data.contact;

  }

}
