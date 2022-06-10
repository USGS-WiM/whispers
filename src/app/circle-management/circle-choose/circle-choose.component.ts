import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Inject } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  PatternValidator,
} from "@angular/forms/";
import { Observable, Subject, ReplaySubject } from "rxjs";
import { startWith, map, take, takeUntil } from "rxjs/operators";
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
} from "@angular/material";

import { MatDialog, MatDialogRef } from "@angular/material";

import { MatSnackBar } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";

import { CirclesDataSource } from "@app/circles/circles.datasource";
import { CircleService } from "@services/circle.service";
import { CircleManagementService } from "@services/circle-management.service";
import { Circle } from "@interfaces/circle";

@Component({
  selector: "app-circle-choose",
  templateUrl: "./circle-choose.component.html",
  styleUrls: ["./circle-choose.component.scss"],
})
export class CircleChooseComponent implements OnInit {
  title;
  titleIcon;
  actionButtonText;
  actionButtonIcon;
  circleControl: FormControl;

  userCircles;
  filteredCircles: Observable<any[]>;

  constructor(
    public circleChooseDialogRef: MatDialogRef<CircleChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.circleControl = new FormControl();
  }

  ngOnInit() {
    this.userCircles = this.data.userCircles;

    this.filteredCircles = this.circleControl.valueChanges.pipe(
      startWith(null),
      map((val) => this.filter(val, this.userCircles, "name"))
    );

    this.title = "Choose Circle";
    this.titleIcon = "group";
    this.actionButtonText = "Done";
    this.actionButtonIcon = "check";
  }

  onSubmit(selectedCircle) {
    const result = selectedCircle;

    this.circleChooseDialogRef.close(result);
  }

  displayFn(item): string | undefined {
    return item ? item.name : undefined;
  }

  filter(val: any, searchArray: any, searchProperty: string): string[] {
    const realval = val && typeof val === "object" ? val.searchProperty : val;
    const result = [];
    let lastOption = null;
    for (let i = 0; i < searchArray.length; i++) {
      if (
        !realval ||
        searchArray[i][searchProperty]
          .toLowerCase()
          .includes(realval.toLowerCase())
      ) {
        if (searchArray[i][searchProperty] !== lastOption) {
          lastOption = searchArray[i][searchProperty];
          result.push(searchArray[i]);
        }
      }
    }
    return result;
  }
}
