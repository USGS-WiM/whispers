import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';

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

  buildEditUserForm() {
    this.editUserForm = this.formBuilder.group({
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name,
      password: '',
      confirmPassword: ''
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

    this.buildEditUserForm();

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }


}
