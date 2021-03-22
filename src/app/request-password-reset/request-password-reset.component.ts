import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/services/user.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmComponent } from '@confirm/confirm.component';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {

  requestPasswordResetForm: FormGroup;
  submitLoading = false;

  constructor(

    private formBuilder: FormBuilder,
    private userService: UserService,
    public requestPasswordResetDialogRef: MatDialogRef<RequestPasswordResetComponent>,
    private dialog: MatDialog,
  ) {
    this.requestPasswordResetForm = formBuilder.group({
      username: ['', Validators.required],

    });
  }

  ngOnInit() {
  }

  getErrorMessage(formControlName) {
    return this.requestPasswordResetForm.get(formControlName).hasError('required') ? 'Please enter a value' :
        '';
  }

  onSubmit(formValue: any) {
    this.submitLoading = true;

    this.userService.requestPasswordReset(formValue.username)
      .subscribe(
        (user: any) => {
          this.submitLoading = false;
          this.requestPasswordResetDialogRef.close();

          this.dialog.open(ConfirmComponent, {
            data: {
              title: "Password Reset Requested",
              titleIcon: "check",
              message:
              `We've sent an email to the email address we have for user
              ${this.requestPasswordResetForm.get('username').value}. Please
              click the link in that email to complete the password reset
              process. If you don't see the email in your inbox, please also
              check your "Junk" or "Spam" folder.`,
              confirmButtonText: "OK",
              showCancelButton: false,
            },
          });
        },
        (error) => {
          this.submitLoading = false;
        }
      );
  }
}
