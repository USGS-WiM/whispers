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
import { CurrentUserService } from '@app/services/current-user.service';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
import { EventService } from '@services/event.service';
import { EventDiagnosisService } from '@app/services/event-diagnosis.service';

@Component({
  selector: 'app-collaboration-request',
  templateUrl: './collaboration-request.component.html',
  styleUrls: ['./collaboration-request.component.scss']
})
export class CollaborationRequestComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  event_id;

  currentUser;

  // need: user id, event id, comment text

  collaborationRequestForm: FormGroup;

  buildCollaborationRequestForm() {
    this.collaborationRequestForm = this.formBuilder.group({
      user: this.currentUser.id,
      event: null,
      comment: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private currentUserService: CurrentUserService,
    public collaborationRequestDialogRef: MatDialogRef<CollaborationRequestComponent>,
    private serviceRequestService: ServiceRequestService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    private eventService: EventService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.buildCollaborationRequestForm();
  }

  ngOnInit() {

    this.collaborationRequestForm.get('event').setValue(this.data.event_id);

    this.event_id = this.data.event_id;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {
    this.submitLoading = true;

    const eventID;
    const message;

    this.eventService.requestCollaboration(eventID, message)
      .subscribe(
        (response) => {
          this.submitLoading = false;

          this.collaborationRequestDialogRef.close();
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Collaboration request response not submitted. Error message: ' + error, 'OK', 8000);
        }
      );

  }

}
