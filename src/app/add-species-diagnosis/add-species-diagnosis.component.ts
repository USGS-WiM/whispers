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
import { LocationSpeciesDiagnosisService } from '@app/services/location-species-diagnosis.service';

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

  action_text;
  action_button_text;

  buildAddSpeciesDiagnosisForm() {
    this.addSpeciesDiagnosisForm = this.formBuilder.group({
      location_species: null,
      diagnosis: [null, Validators.required],
      diagnosis_cause: null,
      diagnosis_basis: null,
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
    private locationSpeciesDiagnosisService: LocationSpeciesDiagnosisService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddSpeciesDiagnosisForm();
  }

  ngOnInit() {

    

    if (this.data.species_diagnosis_action == 'add') {
      this.action_text = 'Add';
      this.action_button_text = 'Submit';
    } else if (this.data.species_diagnosis_action == 'edit') {
      this.action_text = 'Edit';
      this.action_button_text = 'Update';

      // Access the form here and set the value to the objects property/value
      this.addSpeciesDiagnosisForm.get('tested_count').setValue(this.data.species.species_diagnosis[0].tested_count);
      this.addSpeciesDiagnosisForm.get('diagnosis_count').setValue(this.data.species.species_diagnosis[0].diagnosis_count);
      this.addSpeciesDiagnosisForm.get('positive_count').setValue(this.data.species.species_diagnosis[0].positive_count);
      this.addSpeciesDiagnosisForm.get('suspect_count').setValue(this.data.species.species_diagnosis[0].suspect_count);
      //this.addSpeciesDiagnosisForm.get('organizations').setValue(this.data.contact.affiliation);
      this.addSpeciesDiagnosisForm.get('confirmed').setValue(this.data.species.species_diagnosis[0].confirmed);
      this.addSpeciesDiagnosisForm.get('pooled').setValue(this.data.species.species_diagnosis[0].pooled);
    }

    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          if (this.data.species.species_diagnosis[0].diagnosis !== undefined) {
            this.addSpeciesDiagnosisForm.get('diagnosis').setValue(this.data.species.species_diagnosis[0].diagnosis.toString());
          }
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
          if (this.data.species.species_diagnosis[0].diagnosis_basis !== undefined) {
            this.addSpeciesDiagnosisForm.get('diagnosis_basis').setValue(this.data.species.species_diagnosis[0].diagnosis_basis.toString());
          }
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
          if (this.data.species.species_diagnosis[0].diagnosis_cause !== undefined) {
            this.addSpeciesDiagnosisForm.get('diagnosis_cause').setValue(this.data.species.species_diagnosis[0].diagnosis_cause.toString());
          }
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

    this.submitLoading = true;

    if (this.data.species_diagnosis_action == 'add') {
      formValue.location_species = this.data.species.id;
      this.locationSpeciesDiagnosisService.create(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.openSnackBar('Event Diagnosis Added', 'OK', 5000);
            this.addSpeciesDiagnosisDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species Diagnosis not created. Error message: ' + error, 'OK', 8000);
          }
        );
    } else if (this.data.species_diagnosis_action == 'edit') {
      formValue.location_species = this.data.species.id;
      formValue.id = this.data.species.species_diagnosis[0].id;
      this.locationSpeciesDiagnosisService.update(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.openSnackBar('Event Diagnosis Updated', 'OK', 5000);
            this.addSpeciesDiagnosisDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
          }
        );

    }
    
  }

}

