import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';

import { EditSpeciesComponent } from '@app/edit-species/edit-species.component';

import { AddSpeciesDiagnosisComponent } from '@app/add-species-diagnosis/add-species-diagnosis.component';

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

  addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>;
  editSpeciesDialogRef: MatDialogRef<EditSpeciesComponent>;

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

    const data = this.locationspecies;

    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);

    this.dataSource = new MatTableDataSource(rows);
  }


  editSpecies(species) {

    // Open dialog for adding event diagnosis
    this.editSpeciesDialogRef = this.dialog.open(EditSpeciesComponent, {
      data: {
        species: species
      }
      // minWidth: 200
      // height: '75%'
    });

    this.editSpeciesDialogRef.afterClosed()
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

  editSpeciesDiagnosis(speciesdiagnosis, species) {

    this.addSpeciesDiagnosisDialogRef = this.dialog.open(AddSpeciesDiagnosisComponent, {
      data: {
        species: species,
        speciesdiagnosis: speciesdiagnosis,
        species_diagnosis_action: 'edit'
      }
    });

    this.addSpeciesDiagnosisDialogRef.afterClosed()
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


