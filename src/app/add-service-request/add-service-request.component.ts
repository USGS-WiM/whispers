import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CommentType } from '@interfaces/comment-type';

import { DataUpdatedService } from '@app/services/data-updated.service';
import { ServiceRequestService } from '@services/service-request.service';

@Component({
  selector: 'app-add-service-request',
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.scss']
})
export class AddServiceRequestComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  event_id;

  serviceRequestForm: FormGroup;

  commentTypes: CommentType[];

  buildServiceRequestForm() {
    this.serviceRequestForm = this.formBuilder.group({
      event: null,
      request_type: null,
      request_response: null,
      new_comments: this.formBuilder.array([])
    });
  }


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public addServiceRequestDialogRef: MatDialogRef<AddServiceRequestComponent>,
    private serviceRequestService: ServiceRequestService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildServiceRequestForm();
  }

  ngOnInit() {

    this.commentTypes = this.data.comment_types;

    this.serviceRequestForm.get('event').setValue(this.data.event_id);
  }

  addComment() {
    const control = <FormArray>this.serviceRequestForm.get('new_comments');
    control.push(this.initComment());
  }

  initComment() {
    return this.formBuilder.group({
      comment: '',
      comment_type: 10
    });
  }

  getComments(form) {
    return form.controls.new_comments.controls;
  }

  removeComment(commentIndex) {
    const control = <FormArray>this.serviceRequestForm.get('new_comments');
    control.removeAt(commentIndex);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    this.submitLoading = true;

    this.serviceRequestService.create(formValue)
      .subscribe(
        (serviceRequest) => {
          this.submitLoading = false;
          this.openSnackBar('Service request successfully submitted', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.addServiceRequestDialogRef.close();

        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Service request not submitted. Error message: ' + error, 'OK', 8000);

        }
      );
  }


}
