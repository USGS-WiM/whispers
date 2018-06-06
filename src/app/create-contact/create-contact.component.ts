import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';

import { Organization } from '@interfaces/organization';
import { OrganizationService } from '@services/organization.service';

import { Contact } from '@interfaces/contact';
import { ContactService } from '@services/contact.service';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  errorMessage = '';
  organizations: Organization[];

  createContactForm: FormGroup;

  submitLoading = false;

  buildCreateContactForm() {
    this.createContactForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: [''],
      email_address: ['', [Validators.required, Validators.email]],
      title: '',
      position: '',
      organization: null,
      owner_organization: null,
      affiliation: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public createContactDialogRef: MatDialogRef<CreateContactComponent>,
    private organizationService: OrganizationService,
    private contactService: ContactService,
    public snackBar: MatSnackBar
  ) {
    this.buildCreateContactForm();
  }

  ngOnInit() {

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  getErrorMessage(formControlName) {
    return this.createContactForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.createContactForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        '';
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  onSubmit(formValue) {

    this.submitLoading = true;

    this.contactService.create(formValue)
      .subscribe(
        (contact) => {
          this.submitLoading = false;
          this.openSnackBar('Contact Created', 'OK', 5000);
          this.createContactDialogRef.close();
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
        }
      );

  }

}
