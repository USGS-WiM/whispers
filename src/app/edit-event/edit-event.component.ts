import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { APP_UTILITIES } from '@app/app.utilities';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { EventStatus } from '@interfaces/event-status';
import { EventType } from '@interfaces/event-type';
import { Organization } from '@interfaces/organization';

import { EventService } from '@services/event.service';
import { OrganizationService } from '@services/organization.service';
import { EventTypeService } from '@app/services/event-type.service';
import { EventStatusService } from '@app/services/event-status.service';
import { CurrentUserService } from '@app/services/current-user.service';

import { LegalStatus } from '@interfaces/legal-status';
import { LegalStatusService } from '@app/services/legal-status.service';
import { Staff } from '@interfaces/staff';
import { DatePipe } from '@angular/common';
import { StaffService } from '@app/services/staff.service';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { DataUpdatedService } from '@app/services/data-updated.service';
declare let gtag: Function;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  errorMessage = '';
  organizations: Organization[];
  event_types: EventType[];
  event_statuses: EventStatus[];
  legalStatuses: LegalStatus[];
  staff: Staff[];

  currentUser;

  eventID;

  editEventForm: FormGroup;

  submitLoading = false;
  basisAndCauseViolation = false;
  completeEventLocationSpeciesNumbersViolation = false;

  buildEditEventForm() {
    this.editEventForm = this.formBuilder.group({
      id: null,
      event_reference: [''],
      event_type: null,
      complete: null,
      public: null,
      // NWHC only
      staff: null,
      event_status: null,
      quality_check: null,
      legal_status: null,
      legal_number: '',
      // end NWHC only
      new_read_collaborators: [],
      new_write_collaborators: []
    });

  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public editEventDialogRef: MatDialogRef<EditEventComponent>,
    private currentUserService: CurrentUserService,
    private eventService: EventService,
    private organizationService: OrganizationService,
    private eventStatusService: EventStatusService,
    private eventTypeService: EventTypeService,
    private legalStatusService: LegalStatusService,
    private staffService: StaffService,
    private dataUpdatedService: DataUpdatedService,
    private datePipe: DatePipe,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildEditEventForm();

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.eventID = this.data.eventData.id;

    const readCollaboratorsArray = [];
    if (this.data.eventData.read_collaborators.length > 0) {
      for (const collaborator of this.data.eventData.read_collaborators) {
        readCollaboratorsArray.push(collaborator.id);
      }
    }
    const writeCollaboratorsArray = [];
    if (this.data.eventData.write_collaborators.length > 0) {
      for (const collaborator of this.data.eventData.write_collaborators) {
        writeCollaboratorsArray.push(collaborator.id);
      }
    }

    this.editEventForm.patchValue({
      id: this.data.eventData.id,
      event_reference: this.data.eventData.event_reference,
      event_type: this.data.eventData.event_type,
      complete: this.data.eventData.complete,
      public: this.data.eventData.public,

      // NWHC only
      staff: this.data.eventData.staff,
      event_status: this.data.eventData.event_status,
      quality_check: APP_UTILITIES.timeZoneAdjust(this.data.eventData.quality_check),
      legal_status: this.data.eventData.legal_status,
      legal_number: this.data.eventData.legal_number,
      // end NWHC only
      new_read_collaborators: readCollaboratorsArray,
      new_write_collaborators: writeCollaboratorsArray,
    });

    if (this.data.eventData.complete === false) {
      this.editEventForm.get('quality_check').disable();
    }


    this.eventTypeService.getEventTypes()
      .subscribe(
        event_types => {
          this.event_types = event_types;
          this.editEventForm.get('event_type').setValue(this.data.eventData.event_type);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.eventStatusService.getEventStatuses()
      .subscribe(
        event_statuses => {
          this.event_statuses = event_statuses;
          this.editEventForm.get('event_status').setValue(this.data.eventData.event_status);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get legal statuses from the LegalStatusService
    this.legalStatusService.getLegalStatuses()
      .subscribe(
        legalStatuses => {
          this.legalStatuses = legalStatuses;
          this.editEventForm.get('legal_status').setValue(this.data.eventData.legal_status);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get staff members from the staffService
    this.staffService.getStaff()
      .subscribe(
        staff => {
          this.staff = staff;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.editEventForm.get('complete').valueChanges.subscribe(value => {
      if (value === true) {
        this.editEventForm.get('quality_check').enable();
      } else if (value === false) {
        this.editEventForm.get('quality_check').disable();
        this.editEventForm.get('quality_check').setValue(null);
      }
    });

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  checkLocationSpeciesNumbers() {
    this.completeEventLocationSpeciesNumbersViolation = false;

    let completeEventLocationSpeciesNumbersViolated = false;
    // wrap logic in if block. if not a morbidity/mortality event, do not run this validation.
    if (this.data.eventData.event_type === 1 || this.data.eventData.event_type_string === 'Mortality/Morbidity') {
      for (const eventlocation of this.data.eventData.eventlocations) {
        for (const locationspecies of eventlocation.locationspecies) {

          if (
            (
              locationspecies.sick_count +
              locationspecies.dead_count +
              locationspecies.sick_count_estimated +
              locationspecies.dead_count_estimated
            ) < 1
          ) {
            completeEventLocationSpeciesNumbersViolated = true;
          }
        }
      }
    }
    if (completeEventLocationSpeciesNumbersViolated) {
      this.completeEventLocationSpeciesNumbersViolation = true;
    }
  }


  checkRulesEventComplete() {
    this.basisAndCauseViolation = false;
    // check to see if all event location species diagnoses
    // have a basis and cause of diagnosis (using the common terms, not DB field names)
    // loop through each event location > loop through each species
    // if species has a diagnosis, must have non-null value for cause and basis fields
    // if ANY of the species lack this, show error
    let basisAndCauseRuleViolated = false;
    for (const eventlocation of this.data.eventData.eventlocations) {
      for (const locationspecies of eventlocation.locationspecies) {
        for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
          if (speciesdiagnosis.cause === null || speciesdiagnosis.basis === null) {
            basisAndCauseRuleViolated = true;
          }
        }
      }
    }
    if (basisAndCauseRuleViolated) {
      this.basisAndCauseViolation = true;
    }

  }

  openCompleteWarning() {
    if (this.editEventForm.get('complete').value === true) {
      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Marking event as complete',
            titleIcon: 'warning',
            message: 'Updating an event to complete will lock all editing on the event.',
            messageIcon: '',
            confirmButtonText: 'OK',
            showCancelButton: false
          }
        }
      );
    } else if (this.editEventForm.get('complete').value === false) {
      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Marking event as incomplete',
            titleIcon: 'warning',
            message: 'Updating an event to incomplete will remove any existing Quality Check date and unlock editing of the event.',
            messageIcon: '',
            confirmButtonText: 'OK',
            showCancelButton: false
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.editEventForm.get('quality_check').setValue(null);
        }
      });
    }
  }

  enforceLegalStatusRules(selected_legal_status) {
    if (selected_legal_status === 2 || selected_legal_status === 4) {

      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Legal Status Change',
            titleIcon: 'warning',
            message: 'This change to legal status will set the event record to private (Not Visible to Public).',
            confirmButtonText: 'OK',
            showCancelButton: false
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.editEventForm.get('public').setValue(false);
        }
      });

    }
    if (selected_legal_status === 1 || selected_legal_status === 3) {

      this.confirmDialogRef = this.dialog.open(ConfirmComponent,
        {
          disableClose: true,
          data: {
            title: 'Legal Status Change',
            titleIcon: 'warning',
            message: 'This change to legal status will set the event record to public (Visible to Public). Select "Cancel" to maintain current event visibility. Select "OK" to change to public.',
            confirmButtonText: 'OK',
            showCancelButton: true
          }
        }
      );

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.editEventForm.get('public').setValue(true);
        }
      });
    }
  }

  // Tooltip text
  eventTypeTooltip(): string {
    return 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. \n \n  Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.';
  }

  updateEvent(formValue) {
    formValue.id = this.data.eventData.id;
    formValue.quality_check = this.datePipe.transform(formValue.quality_check, 'yyyy-MM-dd');

    // const new_orgs_array = [];
    // loop through and convert new_organizations
    // for (const org of formValue.new_organizations) {
    //   if (org !== null) {
    //     new_orgs_array.push(org.org);
    //   }
    // }
    // formValue.new_organizations = new_orgs_array;

    this.eventService.update(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Event Updated', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.editEventDialogRef.close();
          gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Event Edited' });
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not updated. Error message: ' + error, 'OK', 15000);
        }
      );
  }

  getErrorMessage(formControlName) {
    return this.editEventForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.editEventForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        '';
  }

}
