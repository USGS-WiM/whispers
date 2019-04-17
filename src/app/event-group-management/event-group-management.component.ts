import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
import { EventGroupsDataSource } from '@app/event-group/event-groups.datasource';
import { EventGroupManagementService } from '@services/event-group-management.service';


@Component({
  selector: 'app-event-group-management',
  templateUrl: './event-group-management.component.html',
  styleUrls: ['./event-group-management.component.scss']
})
export class EventGroupManagementComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  dataSource: EventGroupsDataSource;

  title;
  titleIcon;
  actionButtonText;
  actionButtonIcon;
  eventGroupForm: FormGroup;

  eventGroupCategories;

  selectedEvents;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  events = [];
  repeats = [];
  duplicateEventsViolation = false;
  minimumCountViolation = false;

  // modes of this component:
  // 1. User has already selected a list of Events and wants to create a new Event Group with the list - 'create'
  // 2. User has already selected a list of Events and wants to add them to an existing Event Group and/or edit the Event Group details - 'edit'
  // 3. User has selected an Event Group and wants to add a list of Events to it - 'addEvents'

  buildEventGroupForm() {
    this.eventGroupForm = this.formBuilder.group({
      id: null,
      category: [null, Validators.required],
      new_comment: ['', Validators.required],
      new_events: this.formBuilder.array([])
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public eventGroupManagementDialogRef: MatDialogRef<EventGroupManagementComponent>,
    private eventGroupService: EventGroupService,
    private eventGroupManagementService: EventGroupManagementService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildEventGroupForm();
  }

  ngOnInit() {
    this.dataSource = new EventGroupsDataSource(this.eventGroupService);

    switch (this.data.action) {
      case 'create':
        this.title = 'Create New Event Group';
        this.titleIcon = 'fiber_new';
        this.actionButtonText = 'Save';
        this.actionButtonIcon = 'save';

        this.selectedEvents = this.data.selectedEvents;

        break;
      case 'edit':
        this.title = 'Update Event Group';
        this.titleIcon = 'playlist_add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        // populate the eventGroupForm
        this.eventGroupForm.patchValue({
          id: this.data.eventGroup.id,
          category: this.data.eventGroup.category,
          new_comment: this.data.eventGroup.comments[0].comment,
        });

        if (this.data.eventGroup.events.length > 0) {
          for (let i = 0, j = this.data.eventGroup.events.length; i < j; i++) {
            this.addEvent();
            this.eventGroupForm.get('new_events')['controls'][i].get('id').setValue(this.data.eventGroup.events[i]);
            this.events.push(this.data.eventGroup.events[i]);
          }
        }
        this.selectedEvents = this.data.selectedEvents;

        if (this.data.selectedEvents) {
          this.checkForRepeatEvents();
        }

        break;
      case 'addEvents':
        this.title = 'Add Events to Event Group';
        this.titleIcon = 'add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        break;
    }


    this.eventGroupService.getEventGroupCategories()
      .subscribe(
        eventGroupCategories => {
          this.eventGroupCategories = eventGroupCategories;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


  }

  initEvent() {
    return this.formBuilder.group({
      id: '',
    });
  }

  refreshEventGroupsTable() {
    this.dataSource.loadEventGroups('', 1, 20);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  addEvent() {
    const control = <FormArray>this.eventGroupForm.get('new_events');
    control.push(this.initEvent());
  }

  getEvents(form) {
    return form.controls.new_events.controls;
  }

  remove(event: number): void {
    const index = this.events.indexOf(event);

    if (index >= 0) {
      this.events.splice(index, 1);
    }
  }

  removeFromSelected(event: number): void {
    const index = this.selectedEvents.indexOf(event);

    if (index >= 0) {
      this.selectedEvents.splice(index, 1);
    }

    this.checkForRepeatEvents();
    this.checkMinimumCount();
  }


  checkForRepeatEvents() {
    // compare events to selectedEvents
    const self = this;

    this.repeats = this.events.filter(function (val) {
      return self.selectedEvents.indexOf(val) !== -1;
    });

    if (this.repeats.length > 0) {
      this.duplicateEventsViolation = true;
    } else {
      this.duplicateEventsViolation = false;
    }
  }

  checkMinimumCount() {
    if (this.selectedEvents.length + this.events.length < 2) {
      this.minimumCountViolation = true;
    } else {
      this.minimumCountViolation = false;
    }

  }

  onSubmit(formValue) {

    this.submitLoading = true;

    if (this.data.action === 'create') {

      formValue.new_events = formValue.new_events.concat(this.selectedEvents);

      this.eventGroupService.create(formValue)
        .subscribe(
          eventGroup => {
            this.submitLoading = false;
            this.openSnackBar('Event Group successfully created.', 'OK', 5000);
            this.eventGroupManagementService.setEventGroupReload();
            this.eventGroupManagementDialogRef.close();

          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Event Group not created. Error message: ' + error, 'OK', 8000);

          }
        );


    } else if (this.data.action === 'edit') {

      formValue.new_events = this.events;

      if (this.selectedEvents) {
        formValue.new_events = formValue.new_events.concat(this.selectedEvents);
      }

      this.eventGroupService.update(formValue)
        .subscribe(
          eventGroup => {
            this.submitLoading = false;
            this.openSnackBar('Event Group successfully updated.', 'OK', 5000);
            this.eventGroupManagementService.setEventGroupReload();
            this.eventGroupManagementDialogRef.close();

          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Event Group not updated. Error message: ' + error, 'OK', 8000);

          }
        );

    } else if (this.data.action === 'addEvents') {

    }
  }

}
