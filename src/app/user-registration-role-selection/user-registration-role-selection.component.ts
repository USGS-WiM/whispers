import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-user-registration-role-selection",
  templateUrl: "./user-registration-role-selection.component.html",
  styleUrls: ["./user-registration-role-selection.component.scss"],
})
export class UserRegistrationRoleSelectionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserRegistrationRoleSelectionComponent>
  ) {}

  ngOnInit() {}
}
