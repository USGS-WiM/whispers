import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CommentService } from '@services/comment.service';
import { CommentTypeService } from '@app/services/comment-type.service';
import { CommentType } from '@interfaces/comment-type';

import { DataUpdatedService } from '@app/services/data-updated.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  object_id;

  commentTypes: CommentType[];

  commentObjectString;

  commentForm: FormGroup;

  buildCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: '',
      comment_type: null,
      object_id: null,
      new_content_type: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public addCommentDialogRef: MatDialogRef<AddCommentComponent>,
    private commentService: CommentService,
    private commentTypeService: CommentTypeService,
    private dataUpdatedService: DataUpdatedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildCommentForm();
  }

  ngOnInit() {

    this.commentForm.get('object_id').setValue(this.data.object_id);

    switch (this.data.comment_object) {
      case 'event':
        this.commentObjectString = 'Event';
        this.commentForm.get('new_content_type').setValue('event');
        break;
      case 'eventlocation':
        this.commentObjectString = 'Event Location';
        this.commentForm.get('new_content_type').setValue('eventlocation');
        break;
      case 'servicerequest':
        this.commentObjectString = 'Service Request';
        this.commentForm.get('new_content_type').setValue('servicerequest');
        break;
      case 'superevent':
        this.commentObjectString = 'Super Event';
        this.commentForm.get('new_content_type').setValue('superevent');
        break;
    }

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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    this.submitLoading = true;

      this.commentService.create(formValue)
        .subscribe(
          (comment) => {
            this.submitLoading = false;
            this.openSnackBar('Comment Successfully Saved', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.addCommentDialogRef.close();

          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Comment not saved. Error message: ' + error, 'OK', 8000);

          }
        );
    }

  }
