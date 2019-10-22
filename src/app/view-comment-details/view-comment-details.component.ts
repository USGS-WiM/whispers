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
  locationIdArray = [];

  constructor(
    public viewCommentDetailsDialogRef: MatDialogRef<ViewCommentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.locationIdArray = this.data.event_locations;
    this.data.location = this.eventLocationName(this.data.location);
    console.log(this.data.location);
  }

  eventLocationName(id) {
    let locationName = '';
    let count;
    if (this.data.location === 'event') {
      locationName = 'Event';
    } else if (this.data.location === 'eventlocation') {
        if (this.data.object_name !== '') {

          // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
          // comments (same as on event details tab).
          // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.

          count = (this.locationIdArray.findIndex(c => c.object_id === this.data.object_id)) + 1;
          locationName = 'Location ' + count + ' - ' + this.data.object_name;
        } else {
          count = (this.locationIdArray.findIndex(c => c.object_id === this.data.object_id)) + 1;
          locationName = 'Location ' + count;
        }
    }
    return locationName;
  }
}
