import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { EventGroupService } from '@services/event-group.service';

@Component({
  selector: 'app-event-group-management',
  templateUrl: './event-group-management.component.html',
  styleUrls: ['./event-group-management.component.scss']
})
export class EventGroupManagementComponent implements OnInit {

  errorMessage = '';

  title;
  titleIcon;
  actionButtonText;
  actionButtonIcon;

  // modes of this component:
  // 1. User has already selected a list of Events and wants to create a new Event Group with the list - 'create'
  // 2. User has already selected a list of Events and wants to add them to an existing Event Group and/or edit the Event Group details - 'edit'
  // 3. User has selected an Event Group and wants to add a list of Events to it - 'addEvents'

  constructor(
    private formBuilder: FormBuilder,
    public eventGroupManagementDialogRef: MatDialogRef<EventGroupManagementComponent>,
    private eventGroupService: EventGroupService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    switch (this.data.action) {
      case 'create':
        this.title = 'Create New Event Group';
        this.titleIcon = 'fiber_new';
        this.actionButtonText = 'Save';
        this.actionButtonIcon = 'save';

        break;
      case 'edit':
        this.title = 'Update Event Group';
        this.titleIcon = 'playlist_add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        break;
      case 'addEvents':
        this.title = 'Add Events to Event Group';
        this.titleIcon = 'add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        break;

    }


  }

}
