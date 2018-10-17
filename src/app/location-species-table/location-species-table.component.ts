import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';

import { EditLocationSpeciesComponent } from '@app/edit-location-species/edit-location-species.component';

import { EditSpeciesDiagnosisComponent } from '@app/edit-species-diagnosis/edit-species-diagnosis.component';

import { MatTableDataSource } from '@angular/material';

import { LocationSpecies } from '@interfaces/location-species';


@Component({
  selector: 'app-location-species-table',
  templateUrl: './location-species-table.component.html',
  styleUrls: ['./location-species-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LocationSpeciesTableComponent implements OnInit {
  @Input('locationspecies') locationspecies: LocationSpecies[];
  @Input('permissions') permissions: Object;

  editSpeciesDiagnosisDialogRef: MatDialogRef<EditSpeciesDiagnosisComponent>;
  editLocationSpeciesDialogRef: MatDialogRef<EditLocationSpeciesComponent>;

  errorMessage = '';

  displayedColumns = [
    'species',
    'location',
    'population',
    'sick',
    'dead',
    'sick_estimated',
    'dead_estimated',
    'captive',
    'age_bias',
    'sex_bias',
    'diagnosis'
  ];
  //dataSource = new ExampleDataSource();
  expandedElement: any;

  dataSource;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    if (this.permissions) {
      console.log('Hey,table has permissions object: ' + this.permissions);
    }


    const data = this.locationspecies;

    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);

    this.dataSource = new MatTableDataSource(rows);
  }


  editLocationSpecies(locationspecies) {

    // Open dialog for editing location species
    this.editLocationSpeciesDialogRef = this.dialog.open(EditLocationSpeciesComponent, {
      data: {
        locationspecies: locationspecies,
        location_species_action: 'edit',
        action_text: 'edit',
        action_button_text: 'Save Changes',
        title: 'Edit species',
        titleIcon: 'edit'
        // eventlocation: eventlocation
      }
    });

    this.editLocationSpeciesDialogRef.afterClosed()
      .subscribe(
        () => {
          // this.refreshEvent();
          // for (let i = 0; i < this.selection.length; i++) {
          //   this.selection[i].clear();
          // }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  editSpeciesDiagnosis(speciesdiagnosis, locationspecies) {

    this.editSpeciesDiagnosisDialogRef = this.dialog.open(EditSpeciesDiagnosisComponent, {
      data: {
        locationspecies: locationspecies,
        speciesdiagnosis: speciesdiagnosis,
        species_diagnosis_action: 'edit',
        title: 'Edit Species Diagnosis',
        titleIcon: 'edit'
      }
    });

    this.editSpeciesDiagnosisDialogRef.afterClosed()
      .subscribe(
        () => {
          //this.refreshEvent();
          // for (let i = 0; i < this.selection.length; i++) {
          //   this.selection[i].clear();
          // }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  addSpeciesDiagnosis(locationspecies) {

    this.editSpeciesDiagnosisDialogRef = this.dialog.open(EditSpeciesDiagnosisComponent, {
      data: {
        locationspecies: locationspecies,
        species_diagnosis_action: 'add',
        title: 'Add diagnosis for this species',
        titleIcon: 'add'
      }
    });

    this.editSpeciesDiagnosisDialogRef.afterClosed()
      .subscribe(
        () => {
          //this.refreshEvent();
          // for (let i = 0; i < this.selection.length; i++) {
          //   this.selection[i].clear();
          // }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  deleteSpeciesDiagnosis(speciesdiagnosis) {

  }



}


