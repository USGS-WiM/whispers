import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { DataUpdatedService } from '@app/services/data-updated.service';
import { SearchService } from '@app/services/search.service';
declare let gtag: Function;

@Component({
  selector: 'app-save-search',
  templateUrl: './save-search.component.html',
  styleUrls: ['./save-search.component.scss']
})
export class SaveSearchComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;

  saveSearchForm: FormGroup;

  buildSaveSearchForm() {
    this.saveSearchForm = this.formBuilder.group({
      name: '',
      data: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public saveSearchDialogRef: MatDialogRef<SaveSearchComponent>,
    private searchService: SearchService,
    private dataUpdatedService: DataUpdatedService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildSaveSearchForm();
  }

  ngOnInit() {
    this.saveSearchForm.get('data').setValue(this.data.currentSearchQuery);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


  onSubmit(formValue) {

    // formValue.data = this.data.currentSearchQuery;

    // remove all blank variables from the submission
    if (formValue.data.affected_count === null || formValue.data.affected_count === '' || formValue.data.affected_count !== undefined) {
      delete formValue.data.affected_count;
    }
    if (formValue.data.start_date === null || formValue.data.start_date === '' || formValue.data.start_date === undefined) {
      delete formValue.data.start_date;
    }
    if (formValue.data.end_date === null || formValue.data.end_date === '' || formValue.data.end_date === undefined) {
      delete formValue.data.end_date;
    }
    if (formValue.data.event_type !== undefined && formValue.data.event_type !== null) {
      if (formValue.data.event_type.length === 0) {
        delete formValue.data.event_type;
      }
    }
    if (formValue.data.diagnosis !== undefined && formValue.data.diagnosis !== null) {
      if (formValue.data.diagnosis.length === 0) {
        delete formValue.data.diagnosis;
      }
    }
    if (formValue.data.diagnosis_type !== undefined && formValue.data.diagnosis_type !== null) {
      if (formValue.data.diagnosis_type.length === 0) {
        delete formValue.data.diagnosis_type;
      }
    }
    if (formValue.data.species !== undefined && formValue.data.species !== null) {
      if (formValue.data.species.length === 0) {
        delete formValue.data.species;
      }
    }
    if (formValue.data.administrative_level_one !== undefined && formValue.data.administrative_level_one !== null) {
      if (formValue.data.administrative_level_one.length === 0) {
        delete formValue.data.administrative_level_one;
      }
    }
    if (formValue.data.administrative_level_two !== undefined && formValue.data.administrative_level_two !== null) {
      if (formValue.data.administrative_level_two.length === 0) {
        delete formValue.data.administrative_level_two;
      }
    }

    if (formValue.data.and_params) {
      if (formValue.data.and_params.length === 0) {
        delete formValue.data.and_params;
      }
    }

    this.submitLoading = true;
    this.searchService.create(formValue)
      .subscribe(
        (createdSearch) => {
          this.submitLoading = false;
          this.openSnackBar('Search successfully saved', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.saveSearchDialogRef.close();
          gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'User Search Saved' });
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Search not saved. Error message: ' + error, 'OK', 8000);
        }
      );
  }

}
