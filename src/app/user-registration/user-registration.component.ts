import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';

import { User } from '@interfaces/user';
import { UserService } from '@app/services/user.service';
import { RoleService } from '@app/services/role.service';
import { CurrentUserService } from '@services/current-user.service';
import { OrganizationService } from '@services/organization.service';

import { Organization } from '@interfaces/organization';
import { Role } from '@interfaces/role';


import { APP_SETTINGS } from '@app/app.settings';
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
  roles: Role[];

  userRegistrationForm: FormGroup;

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
      password: ['', Validators.required],
      confirmPassword: '',
      organization: null,
      role: null,
      request_comment: '',
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

    if (this.data.registration_type === 'partner') {
      formValue.message = 'Requested role: ' + formValue.role + '. Comment: ' + formValue.request_comment;
    }

    formValue.role = 7;
    delete formValue.request_comment;

    this.userService.createNew(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('User Registration Successful', 'OK', 5000);
          this.userRegistrationDialogRef.close();
          // this.currentUserService.updateCurrentUser(event);
          // sessionStorage.first_name = event.first_name;
          // sessionStorage.last_name = event.last_name;
          // sessionStorage.password = sessionStorage.new_password;
          gtag('event', 'click', {'event_category': 'Users','event_label': 'New User Created'});
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. User registration failed. Error message: ' + error, 'OK', 8000);
        }
      );
  }

}
