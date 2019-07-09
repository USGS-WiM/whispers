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
import { SpeciesService } from '@services/species.service';
import { OrganizationService } from '@services/organization.service';
import { DiagnosisService } from '@services/diagnosis.service';

import { APP_SETTINGS } from '@app/app.settings';
declare let gtag: Function;


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
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public newLookupRequestDialogRef: MatDialogRef<NewLookupRequestComponent>,
    public snackBar: MatSnackBar,
    private speciesService: SpeciesService,
    private organizationService: OrganizationService,
    private diagnosisService: DiagnosisService,
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

  onSubmit(formValue) {
    // let request_url;
    switch (formValue.item_type) {
      case 'species':

        this.speciesService.requestNew(formValue.request_comment)
          .subscribe(
            (response) => {
              this.openSnackBar('Species addition request sent', 'OK', 5000);
              gtag('event', 'click', {'event_category': 'User Dashboard', 'event_label': 'Species Addition Request Submitted'});
            },
            error => {
              this.openSnackBar('Error. Species addition request not sent. Error message: ' + error, 'OK', 8000);
              this.errorMessage = <any>error;
            }
          );
        // request_url = APP_SETTINGS.SPECIES_URL + 'request_new';
        break;
      case 'organization':

        this.organizationService.requestNew(formValue.request_comment)
          .subscribe(
            (response) => {
              this.openSnackBar('Organization addition request sent', 'OK', 5000);
              gtag('event', 'click', {'event_category': 'User Dashboard','event_label': 'Organization Addition Request Submitted'});
            },
            error => {
              this.openSnackBar('Error. Organization addition request not sent. Error message: ' + error, 'OK', 8000);
              this.errorMessage = <any>error;
            }
          );
        // request_url = APP_SETTINGS.ORGANIZATIONS_URL + 'request_new';
        break;
      case 'diagnosis':

        this.diagnosisService.requestNew(formValue.request_comment)
          .subscribe(
            (response) => {
              this.openSnackBar('Diagnosis addition request sent', 'OK', 5000);
              gtag('event', 'click', {'event_category': 'User Dashboard','event_label': 'Diagnosis Addition Request Submitted'});
            },
            error => {
              this.openSnackBar('Error. Diagnosis addition request not sent. Error message: ' + error, 'OK', 8000);
              this.errorMessage = <any>error;
            }
          );
        // request_url = APP_SETTINGS.DIAGNOSES_URL + 'request_new';
        break;
    }

  }
}