import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator, AbstractControl } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
import { ConfirmComponent } from '@confirm/confirm.component';

import { DataUpdatedService } from '@app/services/data-updated.service';

import { APP_SETTINGS } from '@app/app.settings';
declare let gtag: Function;

@Component({
  selector: 'app-edit-species-diagnosis',
  templateUrl: './edit-species-diagnosis.component.html',
  styleUrls: ['./edit-species-diagnosis.component.scss']
})
export class EditSpeciesDiagnosisComponent implements OnInit {
  @Input('selectedSpeciesDiagnosis') selectedSpeciesDiagnosis: SpeciesDiagnosis;
  errorMessage = '';

  submitLoading = false;

  locationspeciesString;

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  labSuspectViolation = false;
  diagnosisSuspectViolation = false;
  labViolation = false;

  diagnoses: Diagnosis[];
  diagnosisBases: DiagnosisBasis[];
  diagnosisCauses: DiagnosisCause[];
  laboratories: Organization[] = [];

  speciesDiagnosisForm: FormGroup;

  filteredLaboratories = [];
  laboratoryFilterCtrl: FormControl = new FormControl();

  public filteredDiagnoses: ReplaySubject<Diagnosis[]> = new ReplaySubject<Diagnosis[]>(1);
  diagnosisFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  // these variables are for use when direct adding a species diagnosis
  locationspecies;
  speciesdiagnosis;
  administrative_level_one;
  administrative_level_two;

  // these varaiables are for use when adding a species diagnosis to the event submit form
  eventlocationIndex;
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
      suspect: true,
      // priority: null,
      tested_count: [null, Validators.min(0)],
      diagnosis_count: [null, Validators.min(0)],
      // diagnosis_count: null,
      positive_count: null,
      suspect_count: null,
      pooled: false,
      new_species_diagnosis_organizations: this.formBuilder.array([
        // this.initDiagnosisOrganization()
      ])
    },
      {
        validator: [this.integerTestedCount, this.integerDiagnosisCount, this.diagnosisCount]
      });

    this.filteredLaboratories = new Array<ReplaySubject<Organization[]>>();
    this.filteredLaboratories.push(new ReplaySubject<Organization[]>());
    this.ManageLaboratoryControl(0);
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private diagnosisService: DiagnosisService,
    public editSpeciesDiagnosisDialogRef: MatDialogRef<EditSpeciesDiagnosisComponent>,
    private diagnosisBasisService: DiagnosisBasisService,
    private diagnosisCauseService: DiagnosisCauseService,
    private locationSpeciesDiagnosisService: LocationSpeciesDiagnosisService,
    private organizationService: OrganizationService,
    private dataUpdatedService: DataUpdatedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildspeciesDiagnosisForm();

  }

  ngOnInit() {

    if (this.data.laboratories) {
      this.laboratories = this.data.laboratories;

      this.filteredLaboratories[0].next(this.laboratories);
    }

    if (this.data.speciesdiagnosis) {
      this.speciesdiagnosis = this.data.speciesdiagnosis;
    }

    if (this.data.locationspecies) {
      this.locationspeciesString = this.data.locationspecies.species_string;
      this.administrative_level_one = this.data.locationspecies.administrative_level_one_string;
      this.administrative_level_two = this.data.locationspecies.administrative_level_two_string;
    }

    // add mode
    if (this.data.species_diagnosis_action === 'add') {
      this.action_text = 'Add';
      this.action_button_text = 'Submit';
      this.speciesDiagnosisForm.get('location_species').setValue(this.data.locationspecies.id);
      // add to event submission formArray mode
    } else if (this.data.species_diagnosis_action === 'addToFormArray') {
      this.action_text = 'Add';
      this.action_button_text = 'Add';
      // edit mode
    } else if (this.data.species_diagnosis_action === 'editInFormArray') {
      this.action_text = 'Edit';
      this.action_button_text = 'Save Changes';

      // this.diagnosisBases = this.data.diagnosisBases;
      // this.diagnosisCauses = this.data.diagnosisCauses;
      // this.diagnoses = this.data.diagnoses;

      // Access the form here and set the value to the objects property/value
      this.speciesDiagnosisForm.patchValue({
        id: this.data.speciesdiagnosis.id,
        // location_species: this.data.speciesdiagnosis.location_species,
        diagnosis: [this.data.speciesdiagnosis.diagnosis, Validators.required],
        cause: this.data.speciesdiagnosis.cause,
        basis: this.data.speciesdiagnosis.basis,
        suspect: this.data.speciesdiagnosis.suspect,
        tested_count: this.data.speciesdiagnosis.tested_count,
        diagnosis_count: this.data.speciesdiagnosis.diagnosis_count,
        positive_count: this.data.speciesdiagnosis.positive_count,
        // suspect_count: this.data.speciesdiagnosis.suspect_count,
        // pooled: this.data.speciesdiagnosis.pooled,
        // new_species_diagnosis_organizations: this.data.speciesdiagnosis.organizations
      });

      if (this.data.speciesdiagnosis.new_species_diagnosis_organizations.length > 0) {
        this.removeDiagnosisOrganization(0);
        // remove filteredLaboratories array for first index
        this.filteredLaboratories.pop();

        for (let i = 0, j = this.data.speciesdiagnosis.new_species_diagnosis_organizations.length; i < j; i++) {
          this.addDiagnosisOrganization();
          // tslint:disable-next-line:max-line-length
          this.speciesDiagnosisForm.get('new_species_diagnosis_organizations')['controls'][i].get('org').setValue(this.data.speciesdiagnosis.new_species_diagnosis_organizations[i]);
        }
      }

    } else if (this.data.species_diagnosis_action === 'edit') {
      this.action_text = 'Edit';
      this.action_button_text = 'Save Changes';

      // Access the form here and set the value to the objects property/value
      this.speciesDiagnosisForm.patchValue({
        id: this.data.speciesdiagnosis.id,
        location_species: this.data.speciesdiagnosis.location_species,
        diagnosis: [this.data.speciesdiagnosis.diagnosis, Validators.required],
        cause: this.data.speciesdiagnosis.cause,
        basis: this.data.speciesdiagnosis.basis,
        suspect: this.data.speciesdiagnosis.suspect,
        tested_count: this.data.speciesdiagnosis.tested_count,
        diagnosis_count: this.data.speciesdiagnosis.diagnosis_count,
        positive_count: this.data.speciesdiagnosis.positive_count,
        // suspect_count: this.data.speciesdiagnosis.suspect_count,
        // pooled: this.data.speciesdiagnosis.pooled,
        // new_species_diagnosis_organizations: this.data.speciesdiagnosis.organizations
      });

      if (this.data.speciesdiagnosis.organizations.length > 0) {
        this.removeDiagnosisOrganization(0);
        // remove filteredLaboratories array for first index
        this.filteredLaboratories.pop();

        for (let i = 0, j = this.data.speciesdiagnosis.organizations.length; i < j; i++) {
          this.addDiagnosisOrganization();
          // tslint:disable-next-line:max-line-length
          this.speciesDiagnosisForm.get('new_species_diagnosis_organizations')['controls'][i].get('org').setValue(this.data.speciesdiagnosis.organizations[i]);
        }
      }

    }

    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
          if (this.data.locationspecies) {
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.diagnosis !== null) {
              this.speciesDiagnosisForm.get('diagnosis').setValue(this.data.speciesdiagnosis.diagnosis.toString());
            }
          }
          this.diagnoses.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          // populate the search select options for the species control
          this.filteredDiagnoses.next(diagnoses);

          // listen for search field value changes
          this.diagnosisFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterDiagnosis();
            });

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
          if (this.data.locationspecies) {
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.basis !== null) {
              // tslint:disable-next-line:max-line-length
              // the 'toString()' version of the below line used in past, may need to use conditionally
              //this.speciesDiagnosisForm.get('basis').setValue(this.data.speciesdiagnosis.basis.toString());
              this.speciesDiagnosisForm.get('basis').setValue(this.data.speciesdiagnosis.basis);
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
          if (this.data.locationspecies) {
            if (this.data.speciesdiagnosis !== undefined && this.data.speciesdiagnosis.cause !== null) {
              // tslint:disable-next-line:max-line-length
              // the 'toString()' version of the below line used in past, may need to use conditionally
              // this.speciesDiagnosisForm.get('cause').setValue(this.data.speciesdiagnosis.cause.toString());
              this.speciesDiagnosisForm.get('cause').setValue(this.data.speciesdiagnosis.cause);
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get 'laboratories' from the organizations service
    // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
    // this.organizationService.getLaboratories()
    //   .subscribe(
    //     (laboratories) => {
    //       this.laboratories = laboratories;

    //       this.filteredLaboratories[0].next(laboratories);
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //     }
    //   );

    this.checkSuspectCompliance();
    this.checkLabCompliance();
  }

  diagnosisCount(AC: AbstractControl) {
    //AC.get('diagnosis_count').setErrors(null);
    const tested_count = AC.get('tested_count').value;
    const diagnosis_count = AC.get('diagnosis_count').value;
    if (diagnosis_count !== null && tested_count !== null) {
      if (diagnosis_count > tested_count) {
        AC.get('diagnosis_count').setErrors({ diagnosisCount: true });
      }
    }
  }

  integer(AC: AbstractControl) {
    const tested_count = AC.get('tested_count').value;
    const diagnosis_count = AC.get('diagnosis_count').value;
    if (!Number.isInteger(diagnosis_count) && diagnosis_count !== null) {
      AC.get('diagnosis_count').setErrors({ integer: true });
    }
    if (!Number.isInteger(tested_count) && tested_count !== null) {
      AC.get('tested_count').setErrors({ integer: true });
    }
    return null;
  }

  integerTestedCount(AC: AbstractControl) {
    AC.get('tested_count').setErrors(null);
    const tested_count = AC.get('tested_count').value;
    if (!Number.isInteger(tested_count) && tested_count !== null) {
      AC.get('tested_count').setErrors({ integerTestedCount: true });
    }
  }

  integerDiagnosisCount(AC: AbstractControl) {
    AC.get('diagnosis_count').setErrors(null);
    const diagnosis_count = AC.get('diagnosis_count').value;
    if (!Number.isInteger(diagnosis_count) && diagnosis_count !== null) {
      AC.get('diagnosis_count').setErrors({ integerDiagnosisCount: true });
    }
  }

  // begin diagnosis organizations array functions
  initDiagnosisOrganization() {
    return this.formBuilder.group({
      org: [null, Validators.required],
    });
  }

  addDiagnosisOrganization() {
    const control = <FormArray>this.speciesDiagnosisForm.get('new_species_diagnosis_organizations');
    control.push(this.initDiagnosisOrganization());
    const laboratoryIndex = control.length - 1;

    this.filteredLaboratories.push(new ReplaySubject<Organization[]>());
    this.ManageLaboratoryControl(laboratoryIndex);

    this.checkSuspectCompliance();
    this.checkLabCompliance();
  }

  removeDiagnosisOrganization(diagnosisOrgIndex) {
    const control = <FormArray>this.speciesDiagnosisForm.get('new_species_diagnosis_organizations');
    control.removeAt(diagnosisOrgIndex);
    this.checkSuspectCompliance();
    this.checkLabCompliance();
  }

  getDiagnosisOrganizations(form) {
    return form.controls.new_species_diagnosis_organizations.controls;
  }
  // end diagnosis organizations array functions

  ManageLaboratoryControl(laboratoryIndex: number) {

    // populate the laboratories options list for the specific control
    this.filteredLaboratories[laboratoryIndex].next(this.laboratories);

    // listen for search field value changes
    this.laboratoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterLaboratories(laboratoryIndex);
      });
  }

  private filterLaboratories(laboratoryIndex) {
    if (!this.laboratories) {
      return;
    }
    // get the search keyword
    let search = this.laboratoryFilterCtrl.value;
    if (!search) {
      this.filteredLaboratories[laboratoryIndex].next(this.laboratories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the laboratories
    this.filteredLaboratories[laboratoryIndex].next(
      this.laboratories.filter(laboratory => laboratory.name.toLowerCase().indexOf(search) > -1)
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  private filterDiagnosis() {
    if (!this.diagnoses) {
      return;
    }
    // get the search keyword
    let search = this.diagnosisFilterCtrl.value;
    if (!search) {
      this.filteredDiagnoses.next(this.diagnoses.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDiagnoses.next(
      this.diagnoses.filter(diagnosis => diagnosis.name.toLowerCase().indexOf(search) > -1)
    );
  }

  onCancel() {
    const speciesDiagnosisObj = {
      action: 'cancel',
      eventlocationIndex: this.data.eventlocationIndex,
      locationspeciesIndex: this.data.locationspeciesIndex,
    };
    this.editSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);
  }

  checkSuspectCompliance() {
    this.labSuspectViolation = false;
    this.diagnosisSuspectViolation = false;
    // tslint:disable-next-line:max-line-length
    if (this.speciesDiagnosisForm['controls'].new_species_diagnosis_organizations['controls'].length === 0 && !this.speciesDiagnosisForm.get('suspect').value) {
      this.labSuspectViolation = true;
    }
    // tslint:disable-next-line:max-line-length
    if ((this.speciesDiagnosisForm.get('diagnosis').value === APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis || this.speciesDiagnosisForm.get('diagnosis').value === APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN.diagnosis) && this.speciesDiagnosisForm.get('suspect').value) {
      this.diagnosisSuspectViolation = true;
    }
  }

  checkLabCompliance() {
    this.labViolation = false;
    // tslint:disable-next-line:max-line-length
    if (this.speciesDiagnosisForm['controls'].new_species_diagnosis_organizations['controls'].length === 0 && this.speciesDiagnosisForm.get('basis').value === 3) {
      this.labViolation = true;
    }
  }

  onSubmit(formValue) {

    this.submitLoading = true;

    const new_species_diagnosis_orgs_array = [];
    // loop through and convert new_organizations
    for (const org of formValue.new_species_diagnosis_organizations) {
      if (org !== null) {
        new_species_diagnosis_orgs_array.push(org.org);
      }
    }
    formValue.new_species_diagnosis_organizations = new_species_diagnosis_orgs_array;

    // if new_species_diagnosis_organizations is null, set to empty array for submission
    if (formValue.new_species_diagnosis_organizations === null) { formValue.new_species_diagnosis_organizations = []; }

    if (this.data.species_diagnosis_action === 'add') {
      //formValue.location_species = this.data.locationspecies.id;
      this.locationSpeciesDiagnosisService.create(formValue)
        .subscribe(
          (speciesdiagnosis) => {
            this.submitLoading = false;
            this.openSnackBar('Species Diagnosis Added', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.editSpeciesDiagnosisDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Species Diagnosis', 'event_label': 'Species Diagnosis Added, Diagnosis: ' + speciesdiagnosis.diagnosis });
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species Diagnosis not created. Error message: ' + error, 'OK', 8000);
          }
        );
    } else if (this.data.species_diagnosis_action === 'addToFormArray') {

      const speciesDiagnosisObj = {
        action: 'add',
        eventlocationIndex: this.data.eventlocationIndex,
        locationspeciesIndex: this.data.locationspeciesIndex,
        formValue: formValue
      };

      this.editSpeciesDiagnosisDialogRef.close(speciesDiagnosisObj);

    } else if (this.data.species_diagnosis_action === 'edit') {
      // formValue.new_location_species = this.data.locationspecies.id;
      formValue.id = this.data.speciesdiagnosis.id;
      this.locationSpeciesDiagnosisService.update(formValue)
        .subscribe(
          (contact) => {
            this.submitLoading = false;
            this.openSnackBar('Species Diagnosis Updated', 'OK', 5000);
            this.dataUpdatedService.triggerRefresh();
            this.editSpeciesDiagnosisDialogRef.close('add');
            gtag('event', 'click', { 'event_category': 'Species Diagnosis', 'event_label': 'Species Diagnosis Edited, Diagnosis: ' + contact.diagnosis });
          },
          error => {
            this.submitLoading = false;
            this.openSnackBar('Error. Species diagnosis not created. Error message: ' + error, 'OK', 8000);
          }
        );
    }

  }

}

