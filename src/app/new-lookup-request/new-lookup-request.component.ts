import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';

import { User } from '@interfaces/user';
import { UserService } from '@app/services/user.service';
import { CurrentUserService } from '@services/current-user.service';
import { APP_SETTINGS } from '@app/app.settings';

@Component({
  selector: 'app-new-lookup-request',
  templateUrl: './new-lookup-request.component.html',
  styleUrls: ['./new-lookup-request.component.scss']
})
export class NewLookupRequestComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  currentUser;

  newLookupRequestForm: FormGroup;

  buildNewLookupRequestForm() {
    this.newLookupRequestForm = this.formBuilder.group({
      item_type: null,
      request_comment: null
    }, {
        
      });

  }

  constructor(
    private formBuilder: FormBuilder,
    public newLookupRequestDialogRef: MatDialogRef<NewLookupRequestComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildNewLookupRequestForm();
  }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  sendRequest(formValue) {
    let request_url;

    switch(formValue.item_type) {
      case "species":
        request_url = APP_SETTINGS.SPECIES_URL + "request_new";
        break;
      case "organization":
        request_url = APP_SETTINGS.ORGANIZATIONS_URL + "request_new";
        break;
      case "diagnosis":
        request_url = APP_SETTINGS.DIAGNOSES_URL + "request_new";
        break;
    }

    //Build POST here using correct request_url and formValue.request_comment as the request data

    console.log(formValue);
    console.log(request_url);

  }

}