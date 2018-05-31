import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';

import { Contact } from '@interfaces/contact';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  errorMessage = '';
  organizations = [];
  contactTypes = [];

  createContactForm: FormGroup;

  buildCreateContactForm() {
    this.createContactForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      phone_number: '',
      email_address: '',
      title: '',
      position: '',
      type: null,
      org_id: null,
      owner_org_id: null,
      affiliation: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public createContactDialogRef: MatDialogRef<CreateContactComponent>
  ) {
    this.buildCreateContactForm();
  }

  ngOnInit() {
  }

}
