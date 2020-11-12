import { Component, OnInit, Input } from "@angular/core";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";
import { FormGroup, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-new-password-form",
  templateUrl: "./new-password-form.component.html",
  styleUrls: ["./new-password-form.component.scss"],
})
export class NewPasswordFormComponent implements OnInit {
  passwordPattern: RegExp = /^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])).{12,}$/;
  constructor() {}

  ngOnInit() {
    this.formGroup
      .get("password")
      .setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ])
      );
    this.formGroup.get("password").updateValueAndValidity();
    this.formGroup
      .get("confirmPassword")
      .setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ])
      );
    this.formGroup.get("confirmPassword").updateValueAndValidity();
    this.formGroup.setValidators(this.matchPassword);
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
  passwordTooltip() {
    return FIELD_HELP_TEXT.regPasswordTooltip;
  }

  // The nested form group for the password fields
  @Input() formGroup: FormGroup;
}
