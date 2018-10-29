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

    formValue.data = this.data.currentSearchQuery;

    this.submitLoading = true;
    this.searchService.create(formValue)
      .subscribe(
        (createdSearch) => {
          this.submitLoading = false;
          this.openSnackBar('Search successfully saved', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.saveSearchDialogRef.close();
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Search not saved. Error message: ' + error, 'OK', 8000);
        }
      );
  }

}
