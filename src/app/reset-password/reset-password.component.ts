import { Component, OnInit, Inject } from "@angular/core";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { UserService } from "@app/services/user.service";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AuthenticationService } from "@app/services/authentication.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private resetPasswordDialogRef: MatDialogRef<ResetPasswordComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.buildResetPasswordForm(this.data.userId, this.data.passwordResetToken);
  }

  ngOnInit() {}

  resetPasswordTooltip() {
    const string = FIELD_HELP_TEXT.regPasswordTooltip;
    return string;
  }

  buildResetPasswordForm(userId:String, passwordResetToken:String) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        id: [userId],
        token: [passwordResetToken],
        password: this.formBuilder.group({
          password: [""],
          confirmPassword: [""]
        })
      },
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    // delete the confirm fields for the actual submission
    const password = formValue.password.password;
    delete formValue.password;
    formValue.password = password;


    this.submitLoading = true;
    this.userService.resetPassword(formValue)
      .subscribe(
        (user) => {
          // If the password reset is successful, just log the user in
          this.authenticationService.login(user.username, formValue.password)
            .subscribe((event) => {

              this.submitLoading = false;
              this.resetPasswordDialogRef.close();
              this.openSnackBar('Password reset. You are now logged in!', 'OK', 5000);
              location.reload();
            })
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Password reset failed. Error message: ' + error, 'OK', 8000);
        }
      );
  }
}
