import { Component, OnInit, Input } from '@angular/core';
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
import { OrganizationService } from '@app/services/organization.service';
import { Organization } from '@interfaces/organization';

import { SpeciesDiagnosis } from '@interfaces/species-diagnosis';

@Component({
  selector: 'app-add-species-diagnosis',
  templateUrl: './add-species-diagnosis.component.html',
  styleUrls: ['./add-species-diagnosis.component.scss']
})
export class AddSpeciesDiagnosisComponent implements OnInit {
  @Input('selectedSpeciesDiagnosis') selectedSpeciesDiagnosis: SpeciesDiagnosis;
  errorMessage = '';

  submitLoading = false;

  diagnoses: Diagnosis[];
  diagnosisBases: DiagnosisBasis[];
  diagnosisCauses: DiagnosisCause[];
  laboratories: Organization[];

  speciesDiagnosisForm: FormGroup;
  // editSpeciesDiagnosisForm: FormGroup;

  // these variables are for use when direct adding a species diagnosis
  species;
  speciesdiagnosis;
  administrative_level_one;
  administrative_level_two;

  // these varaiables are for use when adding a species diagnosis to the event submit form
  eventLocationIndex;
  locationSpeciesIndex;

  action_text;
  action_button_text;

  buildspeciesDiagnosisForm() {
    this.speciesDiagnosisForm = this.formBuilder.group({
      id: null,
      location_species: null,
      diagnosis: [null, Validators.required],
      cause: null,
      basis: null,
      suspect: false,
      // priority: null,
      tested_count: null,
      diagnosis_count: null,
      //positive_count: null,
      //suspect_count: null,
      //pooled: false,
      species_diagnosis_organizations: null
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
    private organizationService: OrganizationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildspeciesDiagnosisForm();
  }

  ngOnInit() {

    this.speciesdiagnosis = this.data.speciesdiagnosis;

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
      this.action_button_text = 'Save Changes';

      // Access the form here and set the value to the objects property/value
      this.speciesDiagnosisForm.get('id').setValue(this.data.speciesdiagnosis.id);
      this.speciesDiagnosisForm.get('cause').setValue(this.data.speciesdiagnosis.cause);
      this.speciesDiagnosisForm.get('basis').setValue(this.data.speciesdiagnosis.basis);
      this.speciesDiagnosisForm.get('tested_count').setValue(this.data.speciesdiagnosis.tested_count);
      this.speciesDiagnosisForm.get('diagnosis_count').setValue(this.data.speciesdiagnosis.diagnosis_count);
      this.speciesDiagnosisForm.get('suspect').setValue(this.data.speciesdiagnosis.suspect);
      // this.speciesDiagnosisForm.get('positive_count').setValue(this.data.speciesdiagnosis.positive_count);
      //this.speciesDiagnosisForm.get('suspect_count').setValue(this.data.speciesdiagnosis.suspect_count);
      // this.speciesDiagnosisForm.get('new_species_diagnosis_organizations').setValue(this.data.contact.affiliation);
      
      //this.speciesDiagnosisForm.get('pooled').setValue(this.data.speciesdiagnosis.pooled);
    }


    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          if (this.data.species) {
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.diagnosis !== undefined) {
              this.speciesDiagnosisForm.get('diagnosis').setValue(this.data.speciesdiagnosis.diagnosis.toString());
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
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.basis !== undefined) {
              // tslint:disable-next-line:max-line-length
              this.speciesDiagnosisForm.get('basis').setValue(this.data.speciesdiagnosis.basis.toString());
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
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.cause !== undefined) {
              // tslint:disable-next-line:max-line-length
              this.speciesDiagnosisForm.get('cause').setValue(this.data.speciesdiagnosis.cause.toString());
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get 'laboratories' from the organizations service
    // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
    this.organizationService.getLaboratories()
      .subscribe(
        (laboratories) => {
          this.laboratories = laboratories;
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
      formValue.new_location_species = this.data.species.id;
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
      formValue.new_location_species = this.data.species.id;
      formValue.id = this.data.speciesdiagnosis.id;
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

