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
  passwordPattern: RegExp = /^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])).{12,}$/;

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
    // TODO: factor out the password form into separate component
    this.resetPasswordForm = this.formBuilder.group(
      {
        id: [userId],
        token: [passwordResetToken],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(this.passwordPattern),
          ]),
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(this.passwordPattern),
          ]),
        ],
      },
      {
        validator: [this.matchPassword],
      }
    );
  }

  matchPassword(AC: AbstractControl) {
    const password = AC.get("password").value; // to get value in input tag
    const confirmPassword = AC.get("confirmPassword").value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get("confirmPassword").setErrors({ matchPassword: true });
    } else {
      AC.get("confirmPassword").setErrors({ matchPassword: false });
      AC.get("confirmPassword").updateValueAndValidity({onlySelf: true});
      return null;
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    // delete the confirm fields for the actual submission
    delete formValue.confirmPassword;

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
