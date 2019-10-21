import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge } from 'rxjs/observable/merge';
import { tap } from 'rxjs/operators';
import { APP_UTILITIES } from '@app/app.utilities';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { EventService } from '@services/event.service';
import { CurrentUserService } from '@services/current-user.service';
import { CommentTypeService } from '@services/comment-type.service';
import { CommentService } from '@app/services/comment.service';

import { Comment } from '@interfaces/comment';
import { CommentType } from '@interfaces/comment-type';
import { EventDetail } from '@interfaces/event-detail';

import { DisplayValuePipe } from '../pipes/display-value.pipe';

import { EventDetailsComponent } from '@app/event-details/event-details.component';
import { ConfirmComponent } from '@confirm/confirm.component';
import { ViewCommentDetailsComponent } from '@app/view-comment-details/view-comment-details.component';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.scss']
})
export class CommentsTableComponent implements OnInit, AfterViewInit {
  @Input('eventData') eventData: EventDetail;
  @Input('commentTypes') commentTypes: CommentType[];

  errorMessage: string;
  currentUser;
  eventID: string;
  resultsLoading = false;
  fullCommentOn = true;
  // eventData: EventDetail;

  commentsDataSource: MatTableDataSource<Comment>;

  combinedComments = [];
  orderParams = '';
  commentsLoading = false;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Number>(this.allowMultiSelect, this.initialSelection);
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;
  locationIdArray = [];
  reOrderedLocationComments = [];
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  viewCommentDetailRef: MatDialogRef<ViewCommentDetailsComponent>;

  commentDisplayedColumns = [
    'comment',
    'comment_type_string',
    // 'created_date',
    // 'comment_type',
    'date_sort',
    'created_by_first_name',
    // 'created_by_last_name',
    'created_by_organization_string',
    'source'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private displayValuePipe: DisplayValuePipe,
  ) { }

  ngOnInit() {

    this.combinedComments = this.eventData.combined_comments;
    this.getlocations();
    for (const comment of this.combinedComments) {
      // set the comment type string for each comment
      comment.comment_type_string = this.displayValuePipe.transform(comment.comment_type, 'name', this.commentTypes);
      // set the source string for each comment
      comment.source = this.eventLocationName(comment);
    }
    this.commentsDataSource = new MatTableDataSource(this.combinedComments);
    this.commentsDataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.commentsDataSource.sort = this.sort;
    }, 3000);
  }

  eventLocationName(comment) {
    let locationName = '';
    let count;
    if (comment.content_type_string === 'event') {
      locationName = 'Event';
    } else if (comment.content_type_string === 'eventlocation') {
      if (comment.object_name !== '') {

        // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
        // comments (same as on event details tab).
        // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.

        count = (this.locationIdArray.findIndex(c => c.object_id === comment.object_id)) + 1;
        locationName = 'Location ' + count + ' - ' + comment.object_name;
      } else {
        count = (this.locationIdArray.findIndex(c => c.object_id === comment.object_id)) + 1;
        locationName = 'Location ' + count;
      }
    }
    return locationName;
  }

  getlocations() {
    // getting the locations that eventlocations
    this.eventData.eventlocations.forEach(e => {
      e.comments.forEach(s => {
        this.locationIdArray.push(s);
      });
    });

    // stripping the objects that have duplicate object_ids so that the count is i++.
    this.locationIdArray = this.locationIdArray.filter((v, i, a) => a.findIndex(t => (t.object_id === v.object_id)) === i);
  }

  fullCommentMode() {
    this.fullCommentOn = !this.fullCommentOn;
  }

  selectComment(comment) {
    this.viewCommentDetailRef = this.dialog.open(ViewCommentDetailsComponent,
      {
        data: {
          creator_firstname: comment.created_by_first_name,
          creator_lastname: comment.created_by_last_name,
          comment: comment.comment,
          created_date: comment.created_date,
          location: comment.content_type_string,
          id: comment.id,
          created_by_organization_string: comment.created_by_organization_string,
          object_name: comment.object_name,
          comment_type: comment.comment_type,
          modified_date: comment.modified_date,
          event_locations: this.locationIdArray,
          object_id: comment.object_id
        }
      }
    );
  }

}
