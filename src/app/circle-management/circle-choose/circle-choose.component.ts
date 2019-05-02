import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CirclesDataSource } from '@app/circles/circles.datasource';
import { CircleService } from '@services/circle.service';
import { CircleManagementService } from '@services/circle-management.service';
import { Circle } from '@interfaces/circle';


@Component({
  selector: 'app-circle-choose',
  templateUrl: './circle-choose.component.html',
  styleUrls: ['./circle-choose.component.scss']
})
export class CircleChooseComponent implements OnInit {

  title;
  titleIcon;
  actionButtonText;
  actionButtonIcon;
  circleControl: FormControl;

  userCircles;

  constructor(
    public circleChooseDialogRef: MatDialogRef<CircleChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.circleControl = new FormControl();
  }

  ngOnInit() {
    this.userCircles = this.data.userCircles;

    this.title = 'Choose Circle';
    this.titleIcon = 'group';
    this.actionButtonText = 'Done';
    this.actionButtonIcon = 'check';
  }

  onSubmit(selectedCircle) {

    const result = selectedCircle;

    this.circleChooseDialogRef.close(result);

  }

}
