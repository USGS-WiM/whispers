import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable ,  Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Organization } from '@interfaces/organization';
import { OrganizationService } from '@services/organization.service';

import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { Contact } from '@interfaces/contact';
import { ContactService } from '@services/contact.service';

import { CreateContactService } from '@create-contact/create-contact.service';
declare let gtag: Function;

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  errorMessage = '';
  organizations: Organization[];

  createContactForm: FormGroup;

  dialogTitle: string;
  action_button_text: string;

  submitLoading = false;

  public filteredOrganizations: ReplaySubject<Organization[]> = new ReplaySubject<Organization[]>(1);
  organizationFilterCtrl: FormControl = new FormControl();

   /** Subject that emits when the component has been destroyed. */
   private _onDestroy = new Subject<void>();

  buildCreateContactForm() {
    this.createContactForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
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
    private createContactService: CreateContactService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildCreateContactForm();
  }

  ngOnInit() {

    if (this.data.contact_action === 'create') {
      this.dialogTitle = 'Create New';
      this.action_button_text = 'Submit';
    } else if (this.data.contact_action === 'edit') {
      this.dialogTitle = 'Edit';
      this.action_button_text = 'Update';

      // Access the form here and set the value to the objects property/value
      this.createContactForm.get('first_name').setValue(this.data.contact.first_name);
      this.createContactForm.get('last_name').setValue(this.data.contact.last_name);
      this.createContactForm.get('email').setValue(this.data.contact.email);
      this.createContactForm.get('phone').setValue(this.data.contact.phone);
      this.createContactForm.get('title').setValue(this.data.contact.title);
      this.createContactForm.get('position').setValue(this.data.contact.position);
      this.createContactForm.get('affiliation').setValue(this.data.contact.affiliation);
    }

    const contactForm = this.createContactForm;

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
          this.organizations.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          if (this.data.contact_action === 'edit') {
            contactForm.get('organization').setValue(this.data.contact.organization.toString());
          }

          // populate the search select options for the species control
          this.filteredOrganizations.next(organizations);

          // listen for search field value changes
          this.organizationFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterOrganization();
            });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  private filterOrganization() {
    if (!this.organizations) {
      return;
    }
    // get the search keyword
    let search = this.organizationFilterCtrl.value;
    if (!search) {
      this.filteredOrganizations.next(this.organizations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOrganizations.next(
      this.organizations.filter(organization => organization.name.toLowerCase().indexOf(search) > -1)
    );
  }

  firstNameTooltip() {const string = FIELD_HELP_TEXT.firstNameTooltip; return string; }
  lastNameTooltip() { const string = FIELD_HELP_TEXT.lastNameTooltip; return string; }
  emailAddressTooltip() { const string = FIELD_HELP_TEXT.emailAddressTooltip; return string; }
  phoneNumberTooltip() { const string = FIELD_HELP_TEXT.phoneNumberTooltip; return string; }
  titleTooltip() { const string = FIELD_HELP_TEXT.titleTooltip; return string; }
  positionTooltip() { const string = FIELD_HELP_TEXT.positionTooltip; return string; }
  organizationTooltip() { const string = FIELD_HELP_TEXT.organizationTooltip; return string; }
  affiliationTooltip() { const string = FIELD_HELP_TEXT.affiliationTooltip; return string; }

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

    if (this.data.contact_action === 'create') {
      this.contactService.create(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.createContactService.setCreatedContact(contact);
            this.openSnackBar('Contact Created', 'OK', 5000);
            this.createContactDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Contacts', 'event_label': 'New Contact Created' });
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
          }
        );
    } else if (this.data.contact_action === 'edit') {
      formValue.id = this.data.contact.id;
      this.contactService.update(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.createContactService.setCreatedContact(contact);
            this.openSnackBar('Contact Updated', 'OK', 5000);
            this.createContactDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
          }
        );
    }

  }

}
