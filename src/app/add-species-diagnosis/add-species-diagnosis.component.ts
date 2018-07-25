import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-species-diagnosis',
  templateUrl: './add-species-diagnosis.component.html',
  styleUrls: ['./add-species-diagnosis.component.scss']
})
export class AddSpeciesDiagnosisComponent implements OnInit {
  errorMessage = '';

  submitLoading = false;

  addSpeciesDiagnosisForm: FormGroup;

  buildAddSpeciesDiagnosisForm() {
    this.addSpeciesDiagnosisForm = this.formBuilder.group({
      location_species: null,
      diagnosis: [null, Validators.required],
      cause: [null, Validators.required],
      basis: [null, Validators.required],
      confirmed: false,
      priority: null,
      tested_count: null,
      diagnosis_count: null,
      positive_count: null,
      suspect_count: null,
      pooled: false
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>,
  ) { }

  ngOnInit() {
  }

}
