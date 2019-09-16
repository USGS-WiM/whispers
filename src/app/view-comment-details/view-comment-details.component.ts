import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-view-comment-details',
  templateUrl: './view-comment-details.component.html',
  styleUrls: ['./view-comment-details.component.scss']
})
export class ViewCommentDetailsComponent implements OnInit {

  commentDetails;

  constructor(
    public viewCommentDetailsDialogRef: MatDialogRef<ViewCommentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

  }

}
