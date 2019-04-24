import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatRadioModule } from '@angular/material';

import { User } from '@interfaces/user';
import { UserService } from '@services/user.service';
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

  showChangePassword = false;

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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  updateUser(formValue) {

    const userUpdates = {
      id: formValue.id,
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      password: formValue.password
    };

    // if no value present in password, delete that from the object for patching
    if (formValue.password === '' || this.showChangePassword === false) {
      //delete userUpdates.password;
      userUpdates.password = sessionStorage.password;
      sessionStorage.new_password = sessionStorage.password;
    } else {
      sessionStorage.new_password = formValue.password;
    }

    this.userService.updateUser(userUpdates)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Your user details were updated', 'OK', 5000);
          this.editUserDialogRef.close();
          this.currentUserService.updateCurrentUser(event);
          sessionStorage.first_name = event.first_name;
          sessionStorage.last_name = event.last_name;
          sessionStorage.password = sessionStorage.new_password;
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Update not completed. Error message: ' + error, 'OK', 8000);
        }
      );

  }

  checkChangePassword(event) {
    if (event.target.checked === true) {
      this.showChangePassword = true;
    } else {
      this.showChangePassword = false;
    }
  }


}
