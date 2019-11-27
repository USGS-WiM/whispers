import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs';



import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CommentType } from '@interfaces/comment-type';
import { DiagnosticInfoComponent } from '@app/diagnostic-info/diagnostic-info.component';

import { DataUpdatedService } from '@app/services/data-updated.service';
import { ServiceRequestService } from '@services/service-request.service';
import { ServiceRequestResponse } from '@app/interfaces/service-request-response';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
declare let gtag: Function;

@Component({
  selector: 'app-add-service-request',
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.scss']
})
export class AddServiceRequestComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  event_id;

  action;

  serviceRequestForm: FormGroup;

  commentTypes: CommentType[];
  serviceRequestResponses: ServiceRequestResponse[];
  diagnosticInfoDialogRef: MatDialogRef<DiagnosticInfoComponent>;

  buildServiceRequestForm() {
    this.serviceRequestForm = this.formBuilder.group({
      id: null,
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

    for (const type of APP_SETTINGS.SPECIAL_COMMENT_TYPES) {
      for (const commentType of this.commentTypes) {
        if (commentType.id === type.id) {
          this.commentTypes = this.commentTypes.filter(commenttype => commenttype.id !== type.id);
        }
      }
    }

    this.serviceRequestForm.get('event').setValue(this.data.event_id);

    if (this.data.action === 'respond') {

      this.serviceRequestForm.patchValue({
        id: this.data.servicerequest.id,
        event: this.data.event_id,
        request_response: this.data.servicerequest.request_response,
      });

      this.serviceRequestService.getServiceRequestResponses()
        .subscribe(
          serviceRequestResponses => {
            this.serviceRequestResponses = serviceRequestResponses;
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  openDiagnosticInfoDialog() {
    this.diagnosticInfoDialogRef = this.dialog.open(DiagnosticInfoComponent, {});
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

  // hover text
  serviceRequestFullTooltip() { const string = FIELD_HELP_TEXT.serviceRequestFullTooltip; return string; }
  serviceRequestCommentTooltip() { const string = FIELD_HELP_TEXT.serviceRequestCommentTooltip; return string; }
  nwhcCarcassSubApprovalTooltip() { const string = FIELD_HELP_TEXT.nwhcCarcassSubApprovalTooltip; return string; }

  onSubmit(formValue) {

    this.submitLoading = true;

    if (this.data.action === 'add') {

      // remove the request_response field entirely if this is a new request ('add') so that value gets assigned default Pending
      delete formValue.request_response;
      // remove the id field entirely if this is a new request ('add')
      delete formValue.id;
      this.serviceRequestService.create(formValue)
        .subscribe(
          (serviceRequest) => {
            this.submitLoading = false;
            this.openSnackBar('Service request successfully submitted', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.addServiceRequestDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Service Request Submitted' });
          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Service request not submitted. Error message: ' + error, 'OK', 8000);

          }
        );
    } else if (this.data.action === 'respond') {

      delete formValue.request_type;
      delete formValue.new_comments;

      this.serviceRequestService.update(formValue)
        .subscribe(
          (serviceRequest) => {
            this.submitLoading = false;
            this.openSnackBar('Service request response successfully saved', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.addServiceRequestDialogRef.close();
          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Service request response not submitted. Error message: ' + error, 'OK', 8000);
          }
        );
    }




  }


}
