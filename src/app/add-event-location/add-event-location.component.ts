import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventLocationService } from '@app/services/event-location.service';

@Component({
  selector: 'app-add-event-location',
  templateUrl: './add-event-location.component.html',
  styleUrls: ['./add-event-location.component.scss']
})
export class AddEventLocationComponent implements OnInit {

  errorMessage = '';
  addEventLocationForm: FormGroup;

  eventID;

  submitLoading = false;

  buildAddEventLocationForm() {
    this.addEventLocationForm = this.formBuilder.group({
      event: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public addEventLocationDialogRef: MatDialogRef<AddEventLocationComponent>,
    private eventLocationService: EventLocationService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddEventLocationForm();
  }

  ngOnInit() {

    this.eventID = this.data.eventData.id;
  }

  onSubmit(formValue) {

  }

}
