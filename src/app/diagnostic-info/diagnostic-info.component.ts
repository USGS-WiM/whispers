import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-diagnostic-info',
  templateUrl: './diagnostic-info.component.html',
  styleUrls: ['./diagnostic-info.component.scss']
})
export class DiagnosticInfoComponent implements OnInit {

  constructor(public diagnosticInfoDialogRef: MatDialogRef<DiagnosticInfoComponent>) { }

  ngOnInit() {
  }

}
