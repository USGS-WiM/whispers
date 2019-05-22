import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Diagnosis } from '@app/interfaces/diagnosis';
import { DiagnosisService } from '@services/diagnosis.service';
import { EventDiagnosisService } from '@services/event-diagnosis.service';
declare let gtag: Function;

@Component({
  selector: 'app-add-event-diagnosis',
  templateUrl: './add-event-diagnosis.component.html',
  styleUrls: ['./add-event-diagnosis.component.scss']
})
export class AddEventDiagnosisComponent implements OnInit {

  errorMessage = '';
  diagnoses: Diagnosis[];

  addEventDiagnosisForm: FormGroup;

  eventID;
  eventData;

  submitLoading = false;

  buildAddEventDiagnosisForm() {
    this.addEventDiagnosisForm = this.formBuilder.group({
      diagnosis: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public addEventDiagnosisDialogRef: MatDialogRef<AddEventDiagnosisComponent>,
    private diagnosisService: DiagnosisService,
    private eventDiagnosisService: EventDiagnosisService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddEventDiagnosisForm();
  }

  ngOnInit() {

    this.eventID = this.data.event_id;
    this.eventData = this.data.event_data;
    this.diagnoses = this.data.diagnosis_options;

    // get diagnoses from the DiagnosisService
    // this.diagnosisService.getDiagnoses()
    //   .subscribe(
    //     diagnoses => {
    //       this.diagnoses = diagnoses;
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  checkForDuplicateEventDiagnosis(diagnosisID) {

    for (const eventdiagnosis of this.eventData.eventdiagnoses) {
      if (eventdiagnosis.diagnosis === diagnosisID) {
        return true;
      }
    }
  }

  onSubmit(formValue) {

    this.submitLoading = true;

    formValue.event = this.data.event_id;
    this.eventDiagnosisService.create(formValue)
      .subscribe(
        (contact) => {
          this.submitLoading = false;
          this.openSnackBar('Event Diagnosis Added', 'OK', 5000);
          this.addEventDiagnosisDialogRef.close();
          gtag('event', 'click', { 'event_category': 'Event Diagnosis', 'event_label': 'Event Diagnosis Added, Diagnosis: ' + contact.diagnosis });
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event Diagnosis not added. Error message: ' + error, 'OK', 8000);
        }
      );

  }

}
