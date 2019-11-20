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
import { DiagnosticInfoComponent } from '@app/diagnostic-info/diagnostic-info.component';

import { DataUpdatedService } from '@app/services/data-updated.service';
import { ServiceRequestService } from '@services/service-request.service';
import { ServiceRequestResponse } from '@app/interfaces/service-request-response';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

@Component({
  selector: 'app-collaboration-request',
  templateUrl: './collaboration-request.component.html',
  styleUrls: ['./collaboration-request.component.scss']
})
export class CollaborationRequestComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  event_id;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public collaborationRequestDialogRef: MatDialogRef<CollaborationRequestComponent>,
    private serviceRequestService: ServiceRequestService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
