import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
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

import { CommentType } from '@interfaces/comment-type';
import { EventDetail } from '@interfaces/event-detail';

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
export class CommentsTableComponent implements OnInit {

  errorMessage: string;
  currentUser;
  eventID: string;
  resultsLoading = false;
  fullCommentOn = false;
  eventData: EventDetail;
  commentsDataSource;
  combinedComments = [];
  commentTypes: CommentType[];
  orderParams = '';
  commentsLoading = false;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Number>(this.allowMultiSelect, this.initialSelection);
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;
  locationIdArray = [];
  reOrderedLocationComments=[];
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  viewCommentDetailRef: MatDialogRef<ViewCommentDetailsComponent>;

  commentDisplayedColumns = [
    'comment',
    'comment_type',
    'created_date',
    'created_by_first_name',
    'created_by_last_name',
    'created_by_organization_string',
    'content_type_string'
  ];

  @ViewChild(MatPaginator) commentsPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private commentTypeService: CommentTypeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.commentsLoading = true;
    this.route.paramMap.subscribe(params => {
      this.eventID = params.get('id');

      // Actual request to event details service, using id
      this.eventService.getEventDetails(this.eventID)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;
            this.combinedComments = this.eventData.combined_comments;
            this.getlocations();
            this.commentsDataSource = new MatTableDataSource(this.combinedComments);
            this.commentsDataSource.paginator = this.commentsPaginator;
            this.commentsDataSource.sort = this.sort;
            this.commentsLoading = false;
          },
          error => {
            this.commentsLoading = false;
          }
        );
    });

    // get comment types from the commentTypes service
    this.commentTypeService.getCommentTypes()
      .subscribe(
        commentTypes => {
          this.commentTypes = commentTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.commentsDataSource.paginator ? this.commentsDataSource.paginator = this.commentsDataSource : null;
          break;
      }
    });
  }

  loadEventsPage() {

    this.orderParams = this.sort.active;
    if (this.sort.direction === 'desc') {
      this.orderParams = '-' + this.sort.active;
    }
    this.commentsDataSource.queryEvents(
      this.orderParams,
      this.commentsPaginator.pageIndex + 1,
      this.commentsPaginator.pageSize);
  }

  eventLocationName(id) {
    let locationName = '';
    let count;
    if (id.content_type_string === 'event') {
      locationName = 'Event-wide';
    } else if (id.content_type_string === 'eventlocation') {
        if (id.object_name !== '') {

          // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location comments.
          // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.

          count = (this.locationIdArray.findIndex(c => c.object_id === id.object_id)) + 1;
          locationName = 'Location ' + count + ' - ' + id.object_name;
        } else {
          count = (this.locationIdArray.findIndex(c => c.object_id === id.object_id)) + 1;
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

  selectEvent(comment) {
    this.viewCommentDetailRef = this.dialog.open(ViewCommentDetailsComponent,
      {
        data: {
          creator_firstname: comment.created_by_first_name,
          creator_lastname: comment.created_by_last_name,
          comment: comment.comment,
          created_date: comment.created_date,
          location: comment.content_type_string,
          id: comment.id
        }
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.commentsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.commentsDataSource.data.forEach(row => this.selection.select(row));
  }

}
