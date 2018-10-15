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
import { OrganizationService } from '@app/services/organization.service';
import { Organization } from '@interfaces/organization';

@Component({
  selector: 'app-view-species-diagnosis',
  templateUrl: './view-species-diagnosis.component.html',
  styleUrls: ['./view-species-diagnosis.component.scss']
})
export class ViewSpeciesDiagnosisComponent implements OnInit {
  species;
  administrative_level_one;
  administrative_level_two;
  speciesdiagnoses;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private diagnosisService: DiagnosisService,
    public viewSpeciesDiagnosisDialogRef: MatDialogRef<ViewSpeciesDiagnosisComponent>,
    private diagnosisBasisService: DiagnosisBasisService,
    private diagnosisCauseService: DiagnosisCauseService,
    private locationSpeciesDiagnosisService: LocationSpeciesDiagnosisService,
    private organizationService: OrganizationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    if (this.data.species) {
      this.species = this.data.species.species_string;
      this.administrative_level_one = this.data.species.administrative_level_one_string;
      this.administrative_level_two = this.data.species.administrative_level_two_string;
    }

    this.speciesdiagnoses = this.data.speciesdiagnoses;
  }

}
