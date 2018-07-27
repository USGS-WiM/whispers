import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

//import { LocationSpeciesService } from '@services/location-species';

@Component({
  selector: 'app-edit-species',
  templateUrl: './edit-species.component.html',
  styleUrls: ['./edit-species.component.scss']
})
export class EditSpeciesComponent implements OnInit {

  editSpeciesForm: FormGroup;

  species;

  submitLoading = false;

  buildEditSpeciesForm() {
    this.editSpeciesForm = this.formBuilder.group({
      dead_count: null,
      sick_count: null,
      dead_count_estimated: null,
      sick_count_estimated: null
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
    this.editSpeciesForm.get('dead_count').setValue(this.data.species.dead_count);
    this.editSpeciesForm.get('sick_count').setValue(this.data.species.sick_count);
    this.editSpeciesForm.get('dead_count_estimated').setValue(this.data.species.dead_count_estimated);
    this.editSpeciesForm.get('sick_count_estimated').setValue(this.data.species.sick_count_estimated);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  updateSpecies(formValue) {
    console.log(formValue);

    formValue.id = this.data.species.id;
    /*this.locationSpeciesService.update(formValue)
      .subscribe(
        (event) => {
          this.submitLoading = false;
          this.openSnackBar('Species Updated', 'OK', 5000);
          this.editSpeciesDialogRef.close();
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event not updated. Error message: ' + error, 'OK', 8000);
        }
      );*/
  }

}
