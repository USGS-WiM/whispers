import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { animate, state, style, transition, trigger } from '@angular/animations';

//declare let L: any;

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
//import * as esrilegend from 'esri-leaflet-legend';

import { MatSnackBar } from '@angular/material';
import { TooltipPosition } from '@angular/material';


import 'rxjs/add/operator/switchMap';
import { EventService } from '@services/event.service';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { CurrentUserService } from '@services/current-user.service';

import { EventDetail } from '@interfaces/event-detail';
import { EventLocation } from '@interfaces/event-location';
import { LocationSpecies } from '@interfaces/location-species';
import { EditEventComponent } from '@app/edit-event/edit-event.component';
import { AddEventDiagnosisComponent } from '@app/add-event-diagnosis/add-event-diagnosis.component';
import { EditEventLocationComponent } from '@app/edit-event-location/edit-event-location.component';
import { EditSpeciesComponent } from '@app/edit-species/edit-species.component';
import { AddSpeciesDiagnosisComponent } from '@app/add-species-diagnosis/add-species-diagnosis.component';
import { LandOwnershipService } from '@services/land-ownership.service';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { marker } from 'leaflet';
import { EventLocationService } from '@app/services/event-location.service';
import { EventDetailsShareComponent } from '@app/event-details/event-details-share/event-details-share.component';
import { AddEventLocationComponent } from '@app/add-event-location/add-event-location.component';
import { UserService } from '@app/services/user.service';
import { User } from '@interfaces/user';
import { SexBiasService } from '@app/services/sex-bias.service';
import { SexBias } from '@interfaces/sex-bias';
import { AgeBiasService } from '@app/services/age-bias.service';
import { AgeBias } from '@interfaces/age-bias';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventDetailsComponent implements OnInit {
 
  // @ViewChild('speciesTable') table: any;
  eventID: string;
  map;
  icon;
  administrative_level_one = [];
  landownerships;

  eventOwner;

  showAddEventLocation = false;

  locationSpeciesDataSource: MatTableDataSource<LocationSpecies>;

  editEventDialogRef: MatDialogRef<EditEventComponent>;
  addEventDiagnosisDialogRef: MatDialogRef<AddEventDiagnosisComponent>;
  editEventLocationDialogRef: MatDialogRef<EditEventLocationComponent>;
  // addEventLocationDialogRef: MatDialogRef<AddEventLocationComponent>;
  editSpeciesDialogRef: MatDialogRef<EditSpeciesComponent>;
  addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>;

  eventDetailsShareDialogRef: MatDialogRef<EventDetailsShareComponent>;

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  selection = [];

  possibleEventDiagnoses = [];

  eventDataLoading = true;

  viewPanelStates: Object;

  currentUser;

  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  locationMarkers;

  unMappables = [];

  errorMessage;
  flywaysVisible = false;
  watershedsVisible = false;


  locationSpeciesDisplayedColumns = [
    //'select',
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

  @ViewChild(MatPaginator) locationSpeciesPaginator: MatPaginator;
  @ViewChild(MatSort) locationSpeciesSort: MatSort;

  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

  constructor(private route: ActivatedRoute,
    private _eventService: EventService,
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private adminLevelOneService: AdministrativeLevelOneService,
    private landownershipService: LandOwnershipService,
    private eventLocationService: EventLocationService,
    private ageBiasService: AgeBiasService,
    private sexBiasService: SexBiasService,
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
      this.eventID = params.get('id');

      // Actual request to event details service, using id
      this._eventService.getEventDetails(this.eventID)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;

            for (const event_location of this.eventData.eventlocations) {
              for (const locationspecies of event_location.locationspecies) {
                locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
                locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
                locationspecies.country_string = event_location.country_string;
                this.eventLocationSpecies.push(locationspecies);

                for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                  if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                    this.possibleEventDiagnoses.push(speciesdiagnosis);
                  }
                }
              }
            }

            for (let i = 0; i < this.eventData.eventlocations.length; i++) {
              this.selection[i] = new SelectionModel<LocationSpecies>(allowMultiSelect, initialSelection);
            }

            this.locationSpeciesDataSource = new MatTableDataSource(this.eventLocationSpecies);
            // this.speciesTableRows = this.eventLocationSpecies;

            // TODO: lookup user for created_by
            // this.userService.getUserDetail(eventdetails.created_by)
            //   .subscribe(
            //     (userDetail) => {
            //       this.eventOwner = userDetail;
            //     },
            //     error => {
            //       this.errorMessage = <any>error;
            //     }
            //   );

            this.eventDataLoading = false;
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

    });

    // get administrative_level_one  from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (administrative_level_one) => {
          this.administrative_level_one = administrative_level_one;
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

    // get sexBiases from the sexBias service
    this.sexBiasService.getSexBiases()
      .subscribe(
        sexBiases => {
          this.sexBiases = sexBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get ageBiases from the ageBias service
    this.ageBiasService.getAgeBiases()
      .subscribe(
        ageBiases => {
          this.ageBiases = ageBiases;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    setTimeout(() => {

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

      // Flyways hosted by Fish and Wildlife Service
      const flyways = esri.featureLayer({
        url: 'https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/FWS_HQ_MB_Waterfowl_Flyway_Boundaries/FeatureServer/0',
        style: function (feature) {
          if (feature.properties.NAME === 'Atlantic Flyway') {
            return { color: 'blue', weight: 2 };
          } else if (feature.properties.NAME === 'Pacific Flyway') {
            return { color: 'red', weight: 2 };
          } else if (feature.properties.NAME === 'Mississippi Flyway') {
            return { color: 'green', weight: 2 };
          } else if (feature.properties.NAME === 'Central Flyway') {
            return { color: 'yellow', weight: 2 };
          }
        }
      });

      // Watersheds hosted by The National Map (USGS)
      const watersheds = esri.dynamicMapLayer({
        url: 'https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer',
        opacity: 0.7
      });

      // Land use hosted by USGS
      var landUse = esri.dynamicMapLayer({
        url: 'https://gis1.usgs.gov/arcgis/rest/services/gap/GAP_Land_Cover_NVC_Class_Landuse/MapServer',
        opacity: 0.7
      });

      const overlays = {
        'Flyways': flyways,
        'Watersheds (HUC 2)': watersheds,
        'Land Use': landUse
      }

      //const x = { position: 'topleft'};

      L.control.layers(baseMaps, overlays, { position: 'topleft' }).addTo(this.map);
      L.control.scale({ position: 'bottomright' }).addTo(this.map);

      //L.control.layers(baseMaps).addTo(this.map);

      this.mapEvent(this.eventData);

      this.map.on('overlayadd', (e) => {
        console.log('overlayadd');
        if (e.name === 'Flyways') {
          this.flywaysVisible = true;
        } else if (e.name === 'Watersheds (HUC 2)') {
          this.watershedsVisible = true;
        }
      });

      this.map.on('overlayremove', (e) => {
        console.log('overlayremove');
        if (e.name === 'Flyways') {
          this.flywaysVisible = false;
        } else if (e.name === 'Watersheds (HUC 2)') {
          this.watershedsVisible = false;
        }
      });

    }, 2000);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  searchInArray(array, field: string, value) {
    for (const item of array) {
      if (item[field] === value) {
        // console.log('Duplicate detected. Already existing ID: ' + value);
        return true;
      }
    }
  }

  mapEvent(eventData) {

    const markers = [];
    this.unMappables = [];
    for (const eventlocation of eventData.eventlocations) {
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
          this._eventService.getEventDetails(this.eventID)
            .subscribe(
              (eventdetails) => {
                this.eventData = eventdetails;

                this.eventLocationSpecies = [];
                for (const event_location of this.eventData.eventlocations) {
                  for (const locationspecies of event_location.locationspecies) {
                    locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
                    locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
                    locationspecies.country_string = event_location.country_string;
                    this.eventLocationSpecies.push(locationspecies);
                  }
                }

                console.log('eventLocationSpecies:', this.eventLocationSpecies);
                //  this.speciesTableRows = this.eventLocationSpecies;
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
        event_id: id,
        diagnosis_options: this.possibleEventDiagnoses
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

  addEventLocation() {
    this.showAddEventLocation = true;
  }

  openEventDetailsShare() {

    this.eventDetailsShareDialogRef = this.dialog.open(EventDetailsShareComponent, {
      data: {
        eventID: this.eventID,
      }
    });

  }

  editEventLocation(eventLocationData: Object) {
    // Open dialog for editing event location
    this.editEventLocationDialogRef = this.dialog.open(EditEventLocationComponent, {
      data: {
        eventLocationData: eventLocationData
      }
      // minWidth: 200
      // height: '75%'
    });
  }

  deleteEventLocation(id: number) {
    this.eventLocationService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  openEventLocationDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Location Confirm',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this event location, and all its associated species, contacts, and comments? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete location and all associated data'
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventLocation(id);
      }
    });
  }


  refreshEvent() {
    this.viewPanelStates = new Object();
    this.getViewPanelState(this.viewPanels);
    this._eventService.getEventDetails(this.eventID)
      .subscribe(
        (eventdetails) => {
          this.eventData = eventdetails;

          this.eventLocationSpecies = [];
          for (const event_location of this.eventData.eventlocations) {
            for (const locationspecies of event_location.locationspecies) {
              locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
              locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
              locationspecies.country_string = event_location.country_string;
              this.eventLocationSpecies.push(locationspecies);
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
    if (this.selection[index].selected.length > 1 || this.selection[index].selected.length === 0) {
      this.openSnackBar('Please select a species (only one) to edit', 'OK', 5000);
    } else if (this.selection[index].selected.length === 1) {
      // Open dialog for adding species diagnosis
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


  determineLocationName(name, i) {
    let locationName;

    if (name === '' || name === undefined) {
      locationName = 'Location ' + i;
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
        comment_type = 'Site description';
        break;
      case 2:
        comment_type = 'History';
        break;
      case 3:
        comment_type = 'Environmental factors';
        break;
      case 4:
        comment_type = 'Clinical signs';
        break;
      case 5:
        comment_type = 'General';
        break;
    }
    return comment_type;
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(i: number) {
    const numSelected = this.selection[i].selected.length;
    const numRows = this.locationSpeciesDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(i: number) {
    this.isAllSelected(i) ?
      this.selection[i].clear() :
      this.locationSpeciesDataSource.data.forEach(row => this.selection[i].select(row));
  }

  exportEventDetails() {
    this._eventService.getEventDetailsCSV(this.eventID);
  }


}
