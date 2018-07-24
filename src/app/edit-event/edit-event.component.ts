import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';

import { EventStatus } from '@interfaces/event-status';
import { EventType } from '@interfaces/event-type';
import { Organization } from '@interfaces/organization';

import { EventService } from '@services/event.service';
import { OrganizationService } from '@services/organization.service';
import { EventTypeService } from '@app/services/event-type.service';
import { EventStatusService } from '@app/services/event-status.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  errorMessage = '';
  organizations: Organization[];
  event_types: EventType[];
  event_statuses: EventStatus[];
  
  editEventForm: FormGroup;

  submitLoading = false;
  
  buildEditEventForm() {
    this.editEventForm = this.formBuilder.group({
      event_reference: [''],
      event_type: null,
      event_status: null,
      public: null,
      complete: null
      //event_organization: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public editEventDialogRef: MatDialogRef<EditEventComponent>,
    private eventService: EventService,
    private organizationService: OrganizationService,
    private eventStatusService: EventStatusService,
    private eventTypeService: EventTypeService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildEditEventForm();
  }

  ngOnInit() {
    console.log(this.data.eventData);
    this.editEventForm.get('event_reference').setValue(this.data.eventData.event_reference);
    this.editEventForm.get('public').setValue(this.data.eventData.public.toString());
    this.editEventForm.get('complete').setValue(this.data.eventData.complete.toString());
    
    // Enable this once there are orgs returned as part of the event details
    // get organizations from the OrganizationService
    /*this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
          this.editEventForm.get('event_organization').setValue(this.data.eventData.event_organization.toString());
        },
        error => {
          this.errorMessage = <any>error;
        }
      );*/

      this.eventTypeService.getEventTypes()
        .subscribe(
          event_types => {
            this.event_types = event_types;
            this.editEventForm.get('event_type').setValue(this.data.eventData.event_type.toString());
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

      this.eventStatusService.getEventStatuses()
        .subscribe(
          event_statuses => {
            this.event_statuses = event_statuses;
            this.editEventForm.get('event_status').setValue(this.data.eventData.event_status.toString());
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

  updateEvent(formValue) {
    formValue.id = this.data.eventData.id;
    this.eventService.update(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Event Updated', 'OK', 5000);
          this.editEventDialogRef.close();
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not updated. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  getErrorMessage(formControlName) {
    return this.editEventForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.editEventForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        '';
  }

}
