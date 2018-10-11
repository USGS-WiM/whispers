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

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  currentUser;

  editUserForm: FormGroup;

  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }

  buildEditUserForm() {
    this.editUserForm = this.formBuilder.group({
      id: this.currentUser.id,
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name,
      password: '',
      confirmPassword: '',
    }, {
        validator: this.matchPassword
      });

  }

  constructor(
    private formBuilder: FormBuilder,
    public editUserDialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    private currentUserService: CurrentUserService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.buildEditUserForm();
  }

  ngOnInit() {
  }

  onSubmit(formValue) {

    this.userService

  }


}
