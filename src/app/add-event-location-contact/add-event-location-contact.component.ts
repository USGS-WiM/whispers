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

  filteredUserContacts: Observable<any>;

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

    this.userContacts = this.data.userContacts;

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

    const arrayControl = this.eventLocationContactForm.get('contact') as FormControl;
    this.filteredUserContacts = arrayControl.valueChanges
      .startWith(null)
      .map(val => this.filter(val, this.userContacts, ['first_name', 'last_name', 'organization_string']));



    // TEMPORARY- will need to use user creds to query user contact list
    // get contact types from the ContactTypeService

    // this.contactService.getContacts()
    //   .subscribe(
    //     contacts => {
    //       this.userContacts = contacts;
    //       this.userContacts.sort(function (a, b) {
    //         if (a.last_name < b.last_name) { return -1; }
    //         if (a.last_name > b.last_name) { return 1; }
    //         return 0;
    //       });
    //       const arrayControl = this.eventLocationContactForm.get('contact') as FormControl;
    //       this.filteredUserContacts = arrayControl.valueChanges
    //         .startWith(null)
    //         .map(val => this.filter(val, this.userContacts, ['first_name', 'last_name', 'organization_string']));

    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );

  }

  displayFnContact(contactId?: Contact): string | undefined {
    let contact_id_match;
    for (let i = 0; i < this["options"]._results.length; i++) {
      if (this["options"]._results[i].value == contactId) {
        contact_id_match = this["options"]._results[i].viewValue;
      }
    }
    return contact_id_match;
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

  filter(val: any, searchArray: any, searchProperties: string[]): string[] {
    let result = [];
    for (let searchProperty of searchProperties) {
      if (isNaN(val)) {
        const realval = val && typeof val === 'object' ? val[searchProperty] : val;
        let lastOption = null;
        if (searchArray !== undefined) {
          for (let i = 0; i < searchArray.length; i++) {
            if (searchArray[i][searchProperty] != null && (!realval || searchArray[i][searchProperty].toLowerCase().includes(realval.toLowerCase()))) {
              if (searchArray[i][searchProperty] !== lastOption) {
                lastOption = searchArray[i][searchProperty];
                result.push(searchArray[i]);
              }
            }
          }
        }
      }
    }
    // this will return all records matching the val string
    return result;
  }

}
