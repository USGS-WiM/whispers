import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ContactType } from '@interfaces/contact-type';
import { ContactTypeService } from '@services/contact-type.service';

import { Contact } from '@interfaces/contact';
import { ContactService } from '@services/contact.service';


import { DataUpdatedService } from '@app/services/data-updated.service';
import { EventLocationContactService } from '@app/services/event-location-contact.service';

@Component({
  selector: 'app-add-event-location-contact',
  templateUrl: './add-event-location-contact.component.html',
  styleUrls: ['./add-event-location-contact.component.scss']
})
export class AddEventLocationContactComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  event_location_id;

  contactTypes: ContactType[];
  userContacts: Contact[];

  // filteredContacts = [];

  eventLocationContactForm: FormGroup;

  buildEventLocationContactForm() {
    this.eventLocationContactForm = this.formBuilder.group({
      event_location: null,
      contact: null,
      contact_type: null,
    });
  }


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public addEventLocationContactDialogRef: MatDialogRef<AddEventLocationContactComponent>,
    private contactTypeService: ContactTypeService,
    private contactService: ContactService,
    private eventLocationContactService: EventLocationContactService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildEventLocationContactForm();
  }

  ngOnInit() {

    this.eventLocationContactForm.get('event_location').setValue(this.data.event_location_id);

    // get contact types from the ContactTypeService
    this.contactTypeService.getContactTypes()
      .subscribe(
        contactTypes => {
          this.contactTypes = contactTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // TEMPORARY- will need to use user creds to query user contact list
    // get contact types from the ContactTypeService
    this.contactService.getContacts()
      .subscribe(
        contacts => {
          this.userContacts = contacts;
          this.userContacts.sort(function (a, b) {
            if (a.last_name < b.last_name) { return -1; }
            if (a.last_name > b.last_name) { return 1; }
            return 0;
          });

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

  onSubmit(formValue) {

    this.submitLoading = true;

    this.eventLocationContactService.create(formValue)
      .subscribe(
        (comment) => {
          this.submitLoading = false;
          this.openSnackBar('Contact association successfully saved', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.addEventLocationContactDialogRef.close();

        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Contact association not saved. Error message: ' + error, 'OK', 8000);

        }
      );
  }

}
