import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
declare let L: any;

import { MatSnackBar } from '@angular/material';
import {TooltipPosition} from '@angular/material';


import 'rxjs/add/operator/switchMap';
import { EventService } from '@services/event.service';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { CurrentUserService } from '@services/current-user.service';

import { EventDetail } from '@interfaces/event-detail';
import { EventLocation } from '@interfaces/event-location';
import { LocationSpecies } from '@interfaces/location-species';
import { EditEventComponent } from '@app/edit-event/edit-event.component';
import { AddEventDiagnosisComponent } from '@app/add-event-diagnosis/add-event-diagnosis.component';
import { EditSpeciesComponent } from '@app/edit-species/edit-species.component';
import { AddSpeciesDiagnosisComponent } from '@app/add-species-diagnosis/add-species-diagnosis.component';
import { LandOwnershipService } from '@services/land-ownership.service';
import { marker } from 'leaflet';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  //@ViewChild('speciesTable') table: any;
  id: string;
  map;
  icon;
  states = [];
  landownerships;

  locationSpeciesDataSource: MatTableDataSource<LocationSpecies>;

  editEventDialogRef: MatDialogRef<EditEventComponent>;
  addEventDiagnosisDialogRef: MatDialogRef<AddEventDiagnosisComponent>;
  editSpeciesDialogRef: MatDialogRef<EditSpeciesComponent>;
  addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>;

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  selection = [];

  eventDataLoading = true;

  viewPanelStates: Object;

  currentUser;

  locationMarkers;

  unMappables = [];

  // speciesTableRows = [];
  // expanded: any = {};
  // timeout: any;
  // speciesTableColumns = [
  //   { prop: 'Species' },
  //   { name: 'Population' },
  //   { name: 'Sick' },
  //   { name: 'Dead' },
  //   { name: 'Estimated Sick' },
  //   { name: 'Estimated Dead' }
  // ];

  errorMessage;

  locationSpeciesDisplayedColumns = [
    'select',
    'species',
    'location',
    'population',
    'sick',
    'dead',
    'sick_estimated',
    'dead_estimated',
    'diagnosis'
  ];

  @ViewChild(MatPaginator) locationSpeciesPaginator: MatPaginator;
  @ViewChild(MatSort) locationSpeciesSort: MatSort;

  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

  constructor(private route: ActivatedRoute,
    private _eventService: EventService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private adminLevelOneService: AdministrativeLevelOneService,
    private landownershipService: LandOwnershipService,
    public snackBar: MatSnackBar
  ) {
    this.eventLocationSpecies = [];

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {

    const initialSelection = [];
    const allowMultiSelect = true;

    this.eventLocationSpecies = [];

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      // Actual request to event details service, using id
      this._eventService.getEventDetails(this.id)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;

            for (const event_location of this.eventData.event_locations) {
              for (const location_species of event_location.location_species) {
                location_species.administrative_level_two_string = event_location.administrative_level_two_string;
                location_species.administrative_level_one_string = event_location.administrative_level_one_string;
                location_species.country_string = event_location.country_string;
                this.eventLocationSpecies.push(location_species);
              }
            }

            for (let i = 0; i < this.eventData.event_locations.length; i++) {
              this.selection[i] = new SelectionModel<LocationSpecies>(allowMultiSelect, initialSelection);
            }

            this.locationSpeciesDataSource = new MatTableDataSource(this.eventLocationSpecies);
            // this.speciesTableRows = this.eventLocationSpecies;
            this.eventDataLoading = false;
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

    });

    // get states from the state service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (states) => {
          this.states = states;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get landownerships from the landownership servce
    this.landownershipService.getLandOwnerships()
      .subscribe(
        (landownerships) => {
          this.landownerships = landownerships;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    setTimeout(() => {
      // this.map = new L.Map('map', {
      //   center: new L.LatLng(39.8283, -98.5795),
      //   zoom: 4,
      // });

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(this.map);


      const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        // tslint:disable-next-line:max-line-length
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
      const streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

      this.map = new L.Map('map', {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
        layers: [osm]
      });

      this.locationMarkers = L.featureGroup().addTo(this.map);

      const baseMaps = {
        'Open Street Map': osm,
        'Grayscale': grayscale,
        'Streets': streets
      };

      L.control.layers(baseMaps).addTo(this.map);

      this.mapEvent(this.eventData);

    }, 1000);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  mapEvent(eventData) {

    const markers = [];
    this.unMappables = [];
    for (const eventlocation of eventData.event_locations) {
      markers.push(eventlocation);
    }

    for (const marker of markers) {

      if (marker.latitude === null || marker.longitude === null) {
        this.unMappables.push(marker);
      } else if (marker.latitude !== null || marker.longitude !== null) {

        this.icon = L.divIcon({
          className: 'wmm-pin wmm-white wmm-icon-circle wmm-icon-black wmm-size-25'
        });

        L.marker([Number(marker.latitude), Number(marker.longitude)],
          { icon: this.icon })
          .addTo(this.locationMarkers);
      }

    }

    if (this.unMappables.length > 0) {

    }

    if (markers.length > this.unMappables.length) {
      this.map.fitBounds(this.locationMarkers.getBounds(), { padding: [500, 500] });
    }



  }

  editEvent(id: string) {
    // Open dialog for editing event
    this.editEventDialogRef = this.dialog.open(EditEventComponent, {
      data: {
        eventData: this.eventData
      }
      // minWidth: 200
      // height: '75%'
    });

    this.editEventDialogRef.afterClosed()
      .subscribe(
        () => {
          this._eventService.getEventDetails(this.id)
            .subscribe(
              (eventdetails) => {
                this.eventData = eventdetails;

                this.eventLocationSpecies = [];
                for (const event_location of this.eventData.event_locations) {
                  for (const location_species of event_location.location_species) {
                    location_species.administrative_level_two_string = event_location.administrative_level_two_string;
                    location_species.administrative_level_one_string = event_location.administrative_level_one_string;
                    location_species.country_string = event_location.country_string;
                    this.eventLocationSpecies.push(location_species);
                  }
                }

                console.log('eventLocationSpecies:', this.eventLocationSpecies);
                //this.speciesTableRows = this.eventLocationSpecies;
                this.eventDataLoading = false;
              },
              error => {
                this.errorMessage = <any>error;
              }
            );
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  addEventDiagnosis(id: string) {
    // Open dialog for adding event diagnosis
    this.addEventDiagnosisDialogRef = this.dialog.open(AddEventDiagnosisComponent, {
      data: {
        event_id: id
      }
      // minWidth: 200
      // height: '75%'
    });

    this.addEventDiagnosisDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  editSpecies(id: string, index: number) {
    if (this.selection[index].selected.length > 1 || this.selection[index].selected.length == 0) {
      this.openSnackBar('Please select a species (only one) to edit', 'OK', 5000);
    } else if (this.selection[index].selected.length === 1) {
      // Open dialog for adding event diagnosis
      this.editSpeciesDialogRef = this.dialog.open(EditSpeciesComponent, {
        data: {
          species: this.selection[index].selected[0]
        }
        // minWidth: 200
        // height: '75%'
      });

      this.editSpeciesDialogRef.afterClosed()
        .subscribe(
          () => {
            this.refreshEvent();
            for (let i = 0; i < this.selection.length; i++) {
              this.selection[i].clear();
            }
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  refreshEvent() {
    this.viewPanelStates = new Object();
    this.getViewPanelState(this.viewPanels);
    this._eventService.getEventDetails(this.id)
      .subscribe(
        (eventdetails) => {
          this.eventData = eventdetails;

          this.eventLocationSpecies = [];
          for (const event_location of this.eventData.event_locations) {
            for (const location_species of event_location.location_species) {
              location_species.administrative_level_two_string = event_location.administrative_level_two_string;
              location_species.administrative_level_one_string = event_location.administrative_level_one_string;
              location_species.country_string = event_location.country_string;
              this.eventLocationSpecies.push(location_species);
            }

          }
          // console.log('eventLocationSpecies:', this.eventLocationSpecies);
          // this.speciesTableRows = this.eventLocationSpecies;
          this.eventDataLoading = false;

          setTimeout(() => {
            this.setViewPanelState(this.viewPanels);
          });
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  getViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
    viewPanels.forEach((element, index) => {
      this.viewPanelStates[index] = element.expanded;
    });
  }

  setViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
    viewPanels.forEach((element, index) => {
      if (this.viewPanelStates[index]) {
        element.open();
      }
    });
  }

  addSpeciesDiagnosis(id: string, index: number) {
    if (this.selection[index].selected.length > 1 || this.selection[index].selected.length == 0) {
      this.openSnackBar('Please select a species (only one) to edit', 'OK', 5000);
    } else if (this.selection[index].selected.length === 1) {
      // Open dialog for adding event diagnosis
      this.addSpeciesDiagnosisDialogRef = this.dialog.open(AddSpeciesDiagnosisComponent, {
        data: {
          species: this.selection[index].selected[0],
          species_diagnosis_action: 'add'
        }
        // minWidth: 200
        // height: '75%'
      });

      this.addSpeciesDiagnosisDialogRef.afterClosed()
        .subscribe(
          () => {
            this.refreshEvent();
            for (let i = 0; i < this.selection.length; i++) {
              this.selection[i].clear();
            }
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  editSpeciesDiagnosis(id: string, index: number) {
    if (this.selection[index].selected.length > 1 || this.selection[index].selected.length == 0) {
      this.openSnackBar('Please select a species (only one) to edit', 'OK', 5000);
    } else if (this.selection[index].selected.length === 1) {
      // Open dialog for adding event diagnosis
      if (this.selection[index].selected[0].species_diagnosis[0] !== undefined) {
        this.addSpeciesDiagnosisDialogRef = this.dialog.open(AddSpeciesDiagnosisComponent, {
          data: {
            species: this.selection[index].selected[0],
            species_diagnosis_action: 'edit'
          }
          // minWidth: 200
          // height: '75%'
        });

        this.addSpeciesDiagnosisDialogRef.afterClosed()
          .subscribe(
            () => {
              this.refreshEvent();
              for (let i = 0; i < this.selection.length; i++) {
                this.selection[i].clear();
              }
            },
            error => {
              this.errorMessage = <any>error;
            }
          );
      } else {
        this.openSnackBar('This species has no existing diagnosis', 'OK', 5000);
      }
    }
  }

  determineLocationName(name, i) {
    let locationName;

    if (name == "" || name == undefined) {
      locationName = "Location " + i;
    } else {
      locationName = name;
    }

    return locationName;
  }

  // Determine comment type based on id, return for display in app along side comment
  getCommentType(comment_id) {
    let comment_type;
    switch (comment_id) {
      case 1:
        comment_type = "Site description";
        break;
      case 2:
        comment_type = "History";
        break;
      case 3:
        comment_type = "Environmental factors";
        break;
      case 4:
        comment_type = "Clinical signs";
        break;
      case 5:
        comment_type = "General";
        break;
    }
    return comment_type;
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(i: number) {
    const numSelected = this.selection[i].selected.length;
    const numRows = this.locationSpeciesDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(i: number) {
    this.isAllSelected(i) ?
      this.selection[i].clear() :
      this.locationSpeciesDataSource.data.forEach(row => this.selection[i].select(row));
  }

  exportEventDetails() {
    this._eventService.getEventDetailsCSV(this.id);
  }


  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log('Detail Toggled', event);
  // }

}
