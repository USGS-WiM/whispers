import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  commentDisplayedColumns = [
    'select',
    'comment',
    'comment_type',
    'created_date',
    'created_by_first_name',
    'created_by_last_name',
    'created_by_organization_string',
    'content_type_string'
  ];

  @ViewChild(MatPaginator) commentsPaginator: MatPaginator;
  @ViewChild(MatSort) set content(commentsSort: MatSort) {
    this.commentsDataSource.sort = commentsSort;
  }
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private commentTypeService: CommentTypeService
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
            this.commentsDataSource = new MatTableDataSource(this.combinedComments);
            this.commentsDataSource.paginator = this.commentsPaginator;
            this.commentsLoading = false;
            console.log(this.combinedComments.length);
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
