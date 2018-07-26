import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-species',
  templateUrl: './edit-species.component.html',
  styleUrls: ['./edit-species.component.scss']
})
export class EditSpeciesComponent implements OnInit {

  editSpeciesForm: FormGroup;

  species;

  buildEditSpeciesForm() {
    this.editSpeciesForm = this.formBuilder.group({
      //species: ['']
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public editSpeciesDialogRef: MatDialogRef<EditSpeciesComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.buildEditSpeciesForm();
  }

  ngOnInit() {
    this.species = this.data.species.species_string;
  }

  updateEvent(formValue) {
    console.log(formValue);
  }

}
