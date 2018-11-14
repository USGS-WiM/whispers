import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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

  public filteredContacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);

  contactFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

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

    // populate the search select options for the contact control
    this.filteredContacts.next(this.data.userContacts);

    // listen for search field value changes
    this.contactFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterContact();
      });

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

  }

  displayFnContact(contactId?: Contact): string | undefined {
    let contact_id_match;
    for (let i = 0; i < this["options"]._results.length; i++) {
      if (this["options"]._results[i].value === contactId) {
        contact_id_match = this["options"]._results[i].viewValue;
      }
    }
    return contact_id_match;
  }

  private filterContact() {
    if (!this.data.userContacts) {
      return;
    }
    // get the search keyword
    let search = this.contactFilterCtrl.value;
    if (!search) {
      this.filteredContacts.next(this.data.userContacts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredContacts.next(
      // tslint:disable-next-line:max-line-length
      this.data.userContacts.filter(contact => contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1)
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
