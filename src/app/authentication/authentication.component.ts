import { Component, OnInit, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { CurrentUserService } from '@services/current-user.service';

import { Observable } from 'rxjs';



import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { User } from '@interfaces/user';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;
  authenticationErrorFlag = false;

  hide = true;

  currentUser;

  submitLoading = false;

  constructor(
    formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public authenticationDialogRef: MatDialogRef<AuthenticationComponent>,
    public currentUserService: CurrentUserService,
    public router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  getErrorMessage(formControlName) {
    return this.loginForm.get(formControlName).hasError('required') ? 'Please enter a value' :
      this.loginForm.get(formControlName).hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit(formValue: any) {
    this.submitLoading = true;
    if (sessionStorage.getItem('username')) {
      this.authenticationService.logout();
    }

    this.authenticationService.login(formValue.username, formValue.password)
      .subscribe(
        (user: any) => {
          this.submitLoading = false;
          this.authenticationDialogRef.close();
          this.openSnackBar('Successfully logged in!', 'OK', 5000);
          location.reload();
        },
        (error) => {
          this.submitLoading = false;
          this.authenticationErrorFlag = true;
          if (error.status === 403) {
            this.openSnackBar('Invalid username and/or password. Please try again.', 'OK', 8000);
          } else {
            this.openSnackBar('Error. Failed to login. Error message: ' + error, 'OK', 8000);
          }
        }
      );
  }

  onLogout() {
    this.authenticationService.logout();
    if (this.router.url === '/home') {
      location.reload();
    } else {
      this.router.navigate([`../home/`], { relativeTo: this.route });
    }
  }

}
