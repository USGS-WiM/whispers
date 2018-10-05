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

  // these variables are for use when direct adding a species diagnosis
  species;
  administrative_level_one;
  administrative_level_two;

  // these varaiables are for use when adding a species diagnosis to the event submit form
  eventLocationIndex;
  locationSpeciesIndex;

  action_text;
  action_button_text;

  buildAddSpeciesDiagnosisForm() {
    this.addSpeciesDiagnosisForm = this.formBuilder.group({
      location_species: null,
      diagnosis: [null, Validators.required],
      diagnosis_cause: null,
      diagnosis_basis: null,
      suspect: false,
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

    if (this.data.species) {
      this.species = this.data.species.species_string;
      this.administrative_level_one = this.data.species.administrative_level_one_string;
      this.administrative_level_two = this.data.species.administrative_level_two_string;
    }

    if (this.data.species_diagnosis_action === 'add') {
      this.action_text = 'Add';
      this.action_button_text = 'Submit';
    } else if (this.data.species_diagnosis_action === 'addToFormArray') {
      this.action_text = 'Add';
      this.action_button_text = 'Add';
    } else if (this.data.species_diagnosis_action === 'edit') {
      this.action_text = 'Edit';
      this.action_button_text = 'Update';

      // Access the form here and set the value to the objects property/value
      this.addSpeciesDiagnosisForm.get('tested_count').setValue(this.data.species.species_diagnosis[0].tested_count);
      this.addSpeciesDiagnosisForm.get('diagnosis_count').setValue(this.data.species.species_diagnosis[0].diagnosis_count);
      this.addSpeciesDiagnosisForm.get('positive_count').setValue(this.data.species.species_diagnosis[0].positive_count);
      this.addSpeciesDiagnosisForm.get('suspect_count').setValue(this.data.species.species_diagnosis[0].suspect_count);
      // this.addSpeciesDiagnosisForm.get('organizations').setValue(this.data.contact.affiliation);
      this.addSpeciesDiagnosisForm.get('suspect').setValue(this.data.species.species_diagnosis[0].suspect);
      this.addSpeciesDiagnosisForm.get('pooled').setValue(this.data.species.species_diagnosis[0].pooled);
    }

    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          if (this.data.species) {
            if (this.data.species.species_diagnosis[0] !== undefined && this.data.species.species_diagnosis[0].diagnosis !== undefined) {
              this.addSpeciesDiagnosisForm.get('diagnosis').setValue(this.data.species.species_diagnosis[0].diagnosis.toString());
            }
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
          // tslint:disable-next-line:max-line-length
          if (this.data.species) {
            if (this.data.species.species_diagnosis[0] !== undefined && this.data.species.species_diagnosis[0].diagnosis_basis !== undefined) {
              // tslint:disable-next-line:max-line-length
              this.addSpeciesDiagnosisForm.get('diagnosis_basis').setValue(this.data.species.species_diagnosis[0].diagnosis_basis.toString());
            }
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
          // tslint:disable-next-line:max-line-length
          if (this.data.species) {
            if (this.data.species.species_diagnosis[0] !== undefined && this.data.species.species_diagnosis[0].diagnosis_cause !== undefined) {
              // tslint:disable-next-line:max-line-length
              this.addSpeciesDiagnosisForm.get('diagnosis_cause').setValue(this.data.species.species_diagnosis[0].diagnosis_cause.toString());
            }
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

    if (this.data.species_diagnosis_action === 'add') {
      formValue.location_species = this.data.species.id;
      this.locationSpeciesDiagnosisService.create(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.openSnackBar('Species Diagnosis Added', 'OK', 5000);
            this.addSpeciesDiagnosisDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species Diagnosis not created. Error message: ' + error, 'OK', 8000);
          }
        );
    } else if (this.data.species_diagnosis_action === 'addToFormArray') {

      const speciesDiagnosisObj = {
        eventLocationIndex: this.data.eventLocationIndex,
        locationSpeciesIndex: this.data.locationSpeciesIndex,
        formValue: formValue
      };

      this.addSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);

    } else if (this.data.species_diagnosis_action === 'edit') {
      formValue.location_species = this.data.species.id;
      formValue.id = this.data.species.species_diagnosis[0].id;
      this.locationSpeciesDiagnosisService.update(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.openSnackBar('Species Diagnosis Updated', 'OK', 5000);
            this.addSpeciesDiagnosisDialogRef.close();
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species diagnosis not created. Error message: ' + error, 'OK', 8000);
          }
        );
    }

  }

}

