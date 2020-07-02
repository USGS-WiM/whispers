import { Component, OnInit } from '@angular/core';
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
import { RoleService } from '@app/services/role.service';
import { CurrentUserService } from '@services/current-user.service';
import { OrganizationService } from '@services/organization.service';

import { Organization } from '@interfaces/organization';
import { Role } from '@interfaces/role';


import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
declare let gtag: Function;

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;
  userRegistrationSuccessful = false;

  currentUser;

  organizations: Organization[];
  roles: Role[];

  passwordPattern: RegExp = (/^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])).{12,}$/);

  userRegistrationForm: FormGroup;

  public filteredOrganizations: ReplaySubject<Organization[]> = new ReplaySubject<Organization[]>(1);
  organizationFilterCtrl: FormControl = new FormControl();

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

  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ matchPassword: true });
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
      password: ['', Validators.compose([
        Validators.required, Validators.pattern(this.passwordPattern)
      ])
      ],
      confirmPassword: ['', Validators.compose([
        Validators.required, Validators.pattern(this.passwordPattern)
      ])
      ],
      organization: null,
      role: null,
      comment: '',
      terms: [false, Validators.requiredTrue],
    }, {
      validator: [this.matchPassword, this.matchEmail]
    });

  }

  constructor(
    private formBuilder: FormBuilder,
    public userRegistrationDialogRef: MatDialogRef<UserRegistrationComponent>,
    public snackBar: MatSnackBar,
    private currentUserService: CurrentUserService,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private userService: UserService,
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


    // get roles from the RoleService
    this.roleService.getRoles()
      .subscribe(
        roles => {
          this.roles = roles;
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
  regPasswordTooltip() { const string = FIELD_HELP_TEXT.regPasswordTooltip; return string; }
  regTermsOfUseTooltip() { const string = FIELD_HELP_TEXT.regTermsOfUseTooltip; return string; }
  regOrganizationTooltip() { const string = FIELD_HELP_TEXT.regOrganizationTooltip; return string; }
  regRoleTooltip() { const string = FIELD_HELP_TEXT.regRoleTooltip; return string; }
  regCommentTooltip() { const string = FIELD_HELP_TEXT.regCommentTooltip; return string; }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    // delete the confirm fields for the actual submission
    delete formValue.confirmEmail;
    delete formValue.confirmPassword;
    delete formValue.terms;

    if (this.data.registration_type === 'public') {
      formValue.role = 7;
      formValue.organization = 1;
    }

    if (this.data.registration_type === 'partner') {
      formValue.new_user_change_request = {
        'role_requested': formValue.role,
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
          this.userRegistrationSuccessful = true;
          // this.currentUserService.updateCurrentUser(event);
          // sessionStorage.first_name = event.first_name;
          // sessionStorage.last_name = event.last_name;
          // sessionStorage.password = sessionStorage.new_password;
          gtag('event', 'click', { 'event_category': 'Users', 'event_label': 'New User Created' });
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. User registration failed. Error message: ' + error, 'OK', 8000);
        }
      );
  }

}
