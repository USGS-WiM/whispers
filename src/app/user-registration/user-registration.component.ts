import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { User } from '@interfaces/user';
import { UserService } from '@app/services/user.service';
import { CurrentUserService } from '@services/current-user.service';
import { OrganizationService } from '@services/organization.service';

import { Organization } from '@interfaces/organization';


import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
import { ConfirmComponent } from '@confirm/confirm.component';
import { RecaptchaComponent } from 'ng-recaptcha';
declare let gtag: Function;

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  currentUser;

  organizations: Organization[];

  userRegistrationForm: FormGroup;

  public filteredOrganizations: ReplaySubject<Organization[]> = new ReplaySubject<Organization[]>(1);
  organizationFilterCtrl: FormControl = new FormControl();

  @ViewChild(RecaptchaComponent) recaptcha: RecaptchaComponent;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  matchEmail(AC: AbstractControl) {
    const email = AC.get('email').value; // to get value in input tag
    const confirmEmail = AC.get('confirmEmail').value; // to get value in input tag
    if (email !== confirmEmail) {
      AC.get('confirmEmail').setErrors({ matchEmail: true });
    } else {
      return null;
    }
  }

  getErrorMessage(formControlName) {
    return this.userRegistrationForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.userRegistrationForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        this.userRegistrationForm.get(formControlName).hasError('matchEmail') ? 'Emails do not match' :
          '';
  }

  buildUserRegistrationForm() {
    this.userRegistrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: '',
      last_name: '',
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: this.formBuilder.group({
        password: [""],
        confirmPassword: [""]
      }),
      organization: null,
      comment: '',
      terms: [false, Validators.requiredTrue],
      recaptcha: null
    }, {
      validator: [this.matchEmail]
    });

  }

  constructor(
    private formBuilder: FormBuilder,
    public userRegistrationDialogRef: MatDialogRef<UserRegistrationComponent>,
    public snackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private organizationService: OrganizationService,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.buildUserRegistrationForm();

  }

  ngOnInit() {

    console.log('Registration Type: ' + this.data.registration_type);

    // if reg type is General User, set the terms to true to meet validation, since the terms checkbox not appear for General User reg.
    if (this.data.registration_type === 'public') {
      this.userRegistrationForm.get('terms').setValue(true);
    }

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

  regUsernameTooltip() { const string = FIELD_HELP_TEXT.regUsernameTooltip; return string; }
  regFirstNameTooltip() { const string = FIELD_HELP_TEXT.regFirstNameTooltip; return string; }
  regLastNameTooltip() { const string = FIELD_HELP_TEXT.regLastNameTooltip; return string; }
  regemailAddressTooltip() { const string = FIELD_HELP_TEXT.regemailAddressTooltip; return string; }
  regTermsOfUseTooltip() { const string = FIELD_HELP_TEXT.regTermsOfUseTooltip; return string; }
  regOrganizationTooltip() { const string = FIELD_HELP_TEXT.regOrganizationTooltip; return string; }
  regCommentTooltip() { const string = FIELD_HELP_TEXT.regCommentTooltip; return string; }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    // delete the confirm fields for the actual submission
    delete formValue.confirmEmail;
    delete formValue.terms;
    // Copy password to top level
    const password = formValue.password.password;
    delete formValue.password;
    formValue.password = password;

    if (this.data.registration_type === 'public') {
      formValue.role = 7;
      formValue.organization = 1;
    }

    if (this.data.registration_type === 'partner' || this.data.registration_type === 'affiliate') {
      let roleRequested;
      if (this.data.registration_type === 'partner') {
        roleRequested = 5;
      } else if (this.data.registration_type === 'affiliate') {
        roleRequested = 6;
      }
      formValue.new_user_change_request = {
        'role_requested': roleRequested,
        'organization_requested': formValue.organization,
        'comment': formValue.comment
      };
      delete formValue.role;
      delete formValue.organization;
      delete formValue.comment;
    }

    this.userService.createNew(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.userRegistrationDialogRef.close();
          this.dialog.open(ConfirmComponent, {
            data: {
              title: "User Registration Request Successful",
              titleIcon: "check",
              message:
              `Thank you for registering. We've sent an email to
              ${this.userRegistrationForm.get('email').value}. Please click the
              link in that email to confirm your email address and complete the
              registration process. If you don't see the email in your inbox,
              please also check your "Junk" or "Spam" folder.`,
              confirmButtonText: "OK",
              showCancelButton: false,
            },
          });
          // this.currentUserService.updateCurrentUser(event);
          // sessionStorage.first_name = event.first_name;
          // sessionStorage.last_name = event.last_name;
          // sessionStorage.password = sessionStorage.new_password;
          gtag('event', 'click', { 'event_category': 'Users', 'event_label': 'New User Created' });
        },
        error => {

          let parsedError = null;
          try {
            parsedError = JSON.parse(error);
          } catch (error) {
            // Ignore JSON parsing error
          }
          if (parsedError && parsedError.recaptcha) {
            // If the reCAPTCHA failed to validate, reset the reCAPTCHA checkbox
            // so that the user needs to regenerate a reCAPTCHA code
            this.recaptcha.reset();
          }
          this.submitLoading = false;
          this.openSnackBar('Error. User registration failed. Error message: ' + error, 'OK', 8000);
        }
      );
  }

}
