import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Diagnosis } from '@interfaces/diagnosis';
import { DiagnosisService } from '@services/diagnosis.service';
import { DiagnosisBasisService } from '@app/services/diagnosis-basis.service';
import { DiagnosisCauseService } from '@app/services/diagnosis-cause.service';

import { DiagnosisBasis } from '@interfaces/diagnosis-basis';
import { DiagnosisCause } from '@interfaces/diagnosis-cause';

@Component({
  selector: 'app-add-species-diagnosis',
  templateUrl: './add-species-diagnosis.component.html',
  styleUrls: ['./add-species-diagnosis.component.scss']
})
export class AddSpeciesDiagnosisComponent implements OnInit {
  errorMessage = '';

  submitLoading = false;

  diagnoses: Diagnosis[];
  diagnosisBases: DiagnosisBasis[];
  diagnosisCauses: DiagnosisCause[];

  addSpeciesDiagnosisForm: FormGroup;

  buildAddSpeciesDiagnosisForm() {
    this.addSpeciesDiagnosisForm = this.formBuilder.group({
      location_species: null,
      diagnosis: [null, Validators.required],
      cause: null,
      basis: null,
      confirmed: false,
      // priority: null,
      tested_count: null,
      diagnosis_count: null,
      positive_count: null,
      suspect_count: null,
      pooled: false,
      organizations: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private diagnosisService: DiagnosisService,
    public addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>,
    private diagnosisBasisService: DiagnosisBasisService,
    private diagnosisCauseService: DiagnosisCauseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddSpeciesDiagnosisForm();
  }

  ngOnInit() {

    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosisBases from the diagnosisBasis service
    this.diagnosisBasisService.getDiagnosisBases()
      .subscribe(
        (diagnosisBases) => {
          this.diagnosisBases = diagnosisBases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosisCauses from the diagnosisCause service
    this.diagnosisCauseService.getDiagnosisCauses()
      .subscribe(
        (diagnosisCauses) => {
          this.diagnosisCauses = diagnosisCauses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

  }

}
