import { Component, OnInit, Input } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatDialog, MatDialogRef, MatExpansionPanel } from "@angular/material";

import { EditLocationSpeciesComponent } from "@app/edit-location-species/edit-location-species.component";

import { EditSpeciesDiagnosisComponent } from "@app/edit-species-diagnosis/edit-species-diagnosis.component";

import { MatTableDataSource } from "@angular/material";
import { MatSnackBar } from "@angular/material";

import { LocationSpecies } from "@interfaces/location-species";

import { ConfirmComponent } from "@confirm/confirm.component";
import { LocationSpeciesService } from "@services/location-species.service";
import { SpeciesDiagnosisService } from "@services/species-diagnosis.service";

import { DataUpdatedService } from "@app/services/data-updated.service";

import { AgeBias } from "@interfaces/age-bias";
import { SexBias } from "@interfaces/sex-bias";
import { Organization } from "@interfaces/organization";
import { FIELD_HELP_TEXT } from "@app/app.field-help-text";

@Component({
  selector: "app-location-species-table",
  templateUrl: "./location-species-table.component.html",
  styleUrls: ["./location-species-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class LocationSpeciesTableComponent implements OnInit {
  @Input("eventData") eventData: Object;
  @Input("locationspecies") locationspecies: LocationSpecies[];
  @Input("permissions") permissions: Object;
  @Input("ageBiases") ageBiases: AgeBias[];
  @Input("sexBiases") sexBiases: SexBias[];
  @Input("laboratories") laboratories: Organization[];

  editSpeciesDiagnosisDialogRef: MatDialogRef<EditSpeciesDiagnosisComponent>;
  editLocationSpeciesDialogRef: MatDialogRef<EditLocationSpeciesComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  locationSpeciesCount: number = null;

  errorMessage = "";

  displayedColumns = [
    "species",
    "location",
    "population",
    "sick",
    "dead",
    "sick_estimated",
    "dead_estimated",
    "captive",
    "age_bias",
    "sex_bias",
    "diagnosis",
  ];
  // dataSource = new ExampleDataSource();
  expandedElement: any;

  dataSource;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");

  constructor(
    private dialog: MatDialog,
    private locationSpeciesService: LocationSpeciesService,
    public snackBar: MatSnackBar,
    private speciesDiagnosisService: SpeciesDiagnosisService,
    private dataUpdatedService: DataUpdatedService
  ) {}

  ngOnInit() {
    // if (this.permissions) {
    //   console.log('location-species-table.component has this permissions object: ' + this.permissions);
    // }

    const data = this.locationspecies;
    this.locationSpeciesCount = this.locationspecies.length;
    // console.log("Location Species count:" + this.locationSpeciesCount);

    const rows = [];
    data.forEach((element) => rows.push(element, { detailRow: true, element }));
    this.dataSource = new MatTableDataSource(rows);
  }

  editLocationSpecies(locationspecies) {
    // Open dialog for editing location species
    this.editLocationSpeciesDialogRef = this.dialog.open(
      EditLocationSpeciesComponent,
      {
        disableClose: true,
        data: {
          eventData: this.eventData,
          locationspecies: locationspecies,
          ageBiases: this.ageBiases,
          sexBiases: this.sexBiases,
          location_species_action: "edit",
          action_text: "edit",
          action_button_text: "Save Changes",
          title: "Edit species",
          titleIcon: "edit",
        },
      }
    );

    this.editLocationSpeciesDialogRef.afterClosed().subscribe(
      () => {
        // this.refreshEvent();
        // for (let i = 0; i < this.selection.length; i++) {
        //   this.selection[i].clear();
        // }
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  removeLocationSpecies(locationspecies) {
    if (this.locationSpeciesCount <= 1) {
      this.confirmDialogRef = this.dialog.open(ConfirmComponent, {
        disableClose: true,
        data: {
          title: "Species Required",
          titleIcon: "warning",
          message:
            "At least one species is required for all locations. You are attempting to delete the only associated species. Please add an additional species before deleting " +
            locationspecies.species_string +
            ".",
          confirmButtonText: "OK",
          showCancelButton: false,
        },
      });
    } else {
      this.openDeleteLocationSpeciesConfirm(locationspecies);
    }
  }

  openDeleteLocationSpeciesConfirm(locationspecies) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: {
        title: "Delete species from this location",
        titleIcon: "delete_forever",
        message:
          "Are you sure you want to delete this species, " +
          locationspecies.species_string +
          "?",
        messageIcon: "",
        confirmButtonText: "Delete",
        showCancelButton: true,
      },
    });

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteLocationSpecies(locationspecies);
      }
    });
  }

  deleteLocationSpecies(locationspecies) {
    this.locationSpeciesService.delete(locationspecies.id).subscribe(
      () => {
        this.openSnackBar("Species Deleted", "OK", 5000);
        this.dataUpdatedService.triggerRefresh();
      },
      (error) => {
        this.errorMessage = <any>error;
        this.openSnackBar(
          "Error. Species not deleted. Error message: " + error,
          "OK",
          8000
        );
      }
    );
  }

  editSpeciesDiagnosis(speciesdiagnosis, locationspecies) {
    // form the exisiting diagnosis id array
    const existingDiagnoses = [];
    for (const item of locationspecies.speciesdiagnoses) {
      existingDiagnoses.push(item.diagnosis);
    }

    this.editSpeciesDiagnosisDialogRef = this.dialog.open(
      EditSpeciesDiagnosisComponent,
      {
        minWidth: "75%",
        disableClose: true,
        data: {
          locationspecies: locationspecies,
          speciesdiagnosis: speciesdiagnosis,
          laboratories: this.laboratories,
          existing_diagnoses: existingDiagnoses,
          species_diagnosis_action: "edit",
          title: "Edit Species Diagnosis",
          titleIcon: "edit",
          actionButtonIcon: "save",
          action_button_text: "Save",
        },
      }
    );

    this.editSpeciesDiagnosisDialogRef.afterClosed().subscribe(
      () => {
        this.dataUpdatedService.triggerRefresh();
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  addSpeciesDiagnosis(locationspecies) {
    // form the exisiting diagnosis id array
    const existingDiagnoses = [];
    for (const item of locationspecies.speciesdiagnoses) {
      existingDiagnoses.push(item.diagnosis);
    }

    this.editSpeciesDiagnosisDialogRef = this.dialog.open(
      EditSpeciesDiagnosisComponent,
      {
        minWidth: "75%",
        disableClose: true,
        data: {
          locationspecies: locationspecies,
          laboratories: this.laboratories,
          existing_diagnoses: existingDiagnoses,
          species_diagnosis_action: "add",
          title: "Add diagnosis for this species",
          titleIcon: "add",
          actionButtonIcon: "save",
          action_button_text: "Save",
        },
      }
    );

    this.editSpeciesDiagnosisDialogRef.afterClosed().subscribe(
      () => {
        this.dataUpdatedService.triggerRefresh();
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  openDeleteSpeciesDiagnosisConfirm(speciesdiagnosis) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: {
        title: "Delete diagnosis from this species",
        titleIcon: "delete_forever",
        message: "Are you sure you want to delete this diagnosis?",
        messageIcon: "",
        confirmButtonText: "Delete",
        showCancelButton: true,
      },
    });

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteSpeciesDiagnosis(speciesdiagnosis);
        this.dataUpdatedService.triggerRefresh();
      }
    });
  }

  deleteSpeciesDiagnosis(speciesdiagnosis) {
    this.speciesDiagnosisService.delete(speciesdiagnosis.id).subscribe(
      () => {
        this.openSnackBar("Species diagnosis deleted", "OK", 5000);
        this.dataUpdatedService.triggerRefresh();
      },
      (error) => {
        this.errorMessage = <any>error;
        this.openSnackBar(
          "Error. Species diagnosis not deleted. Error message: " + error,
          "OK",
          8000
        );
      }
    );
  }

  editSpeciesTooltip() {
    const string = FIELD_HELP_TEXT.editSpeciesTooltip;
    return string;
  }
  editKnownDeadTooltip() {
    const string = FIELD_HELP_TEXT.editKnownDeadTooltip;
    return string;
  }
  editEstimatedDeadTooltip() {
    const string = FIELD_HELP_TEXT.editEstimatedDeadTooltip;
    return string;
  }
  editKnownSickTooltip() {
    const string = FIELD_HELP_TEXT.editKnownSickTooltip;
    return string;
  }
  editEstimatedSickTooltip() {
    const string = FIELD_HELP_TEXT.editEstimatedSickTooltip;
    return string;
  }
  populationTooltip() {
    const string = FIELD_HELP_TEXT.populationTooltip;
    return string;
  }
  editAgeBiasTooltip() {
    const string = FIELD_HELP_TEXT.editAgeBiasTooltip;
    return string;
  }
  editSexBiasTooltip() {
    const string = FIELD_HELP_TEXT.editSexBiasTooltip;
    return string;
  }
  editCaptiveTooltip() {
    const string = FIELD_HELP_TEXT.editCaptiveTooltip;
    return string;
  }
  editSpeciesDiagnosisTooltip() {
    const string = FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip;
    return string;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
