import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { APP_SETTINGS } from "@app/app.settings";

@Component({
  selector: "app-diagnostic-info",
  templateUrl: "./diagnostic-info.component.html",
  styleUrls: ["./diagnostic-info.component.scss"],
})
export class DiagnosticInfoComponent implements OnInit {
  constructor(
    public diagnosticInfoDialogRef: MatDialogRef<DiagnosticInfoComponent>
  ) {}

  ngOnInit() {}

  openDiagnosticSubmissionGuideLink() {
    window.open(
      APP_SETTINGS.WHISPERS_DIAGNOSTIC_SUBMISSION_GUIDELINES_URL,
      "_blank"
    );
  }
}
