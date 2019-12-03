import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { animate, state, style, transition, trigger } from '@angular/animations';
//declare let L: any;

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import * as esrilegend from 'esri-leaflet-legend';

import { MatSnackBar } from '@angular/material';
import { TooltipPosition } from '@angular/material';



import { EventService } from '@services/event.service';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { CurrentUserService } from '@services/current-user.service';

import { EventDetail } from '@interfaces/event-detail';
import { EventLocation } from '@interfaces/event-location';
import { LocationSpecies } from '@interfaces/location-species';
import { EditEventComponent } from '@app/edit-event/edit-event.component';
import { AddEventDiagnosisComponent } from '@app/add-event-diagnosis/add-event-diagnosis.component';
import { AddEventOrganizationComponent } from '@app/add-event-organization/add-event-organization.component';
import { EditEventLocationComponent } from '@app/edit-event-location/edit-event-location.component';
import { EditLocationSpeciesComponent } from '@app/edit-location-species/edit-location-species.component';
import { LandOwnershipService } from '@services/land-ownership.service';
import { ConfirmComponent } from '@app/confirm/confirm.component';
import { marker } from 'leaflet';
import { EventLocationService } from '@app/services/event-location.service';
import { EventOrganizationService } from '@app/services/event-organization.service';
import { EventDetailsShareComponent } from '@app/event-details/event-details-share/event-details-share.component';
import { AddEventLocationComponent } from '@app/add-event-location/add-event-location.component';
import { UserService } from '@app/services/user.service';
import { User } from '@interfaces/user';
import { SpeciesService } from '@services/species.service';
import { Species } from '@interfaces/species';
import { SexBiasService } from '@app/services/sex-bias.service';
import { SexBias } from '@interfaces/sex-bias';
import { AgeBiasService } from '@app/services/age-bias.service';
import { AgeBias } from '@interfaces/age-bias';
import { DataUpdatedService } from '@app/services/data-updated.service';
import { EventDiagnosisService } from '@app/services/event-diagnosis.service';
import { CommentTypeService } from '@services/comment-type.service';
import { CommentService } from '@app/services/comment.service';
import { CommentType } from '@interfaces/comment-type';
import { AddCommentComponent } from '@app/add-comment/add-comment.component';
import { AddEventLocationContactComponent } from '@app/add-event-location-contact/add-event-location-contact.component';
import { AddServiceRequestComponent } from '@app/add-service-request/add-service-request.component';
import { EventPublicReportComponent } from '@app/event-public-report/event-public-report.component';

import { EventLocationContactService } from '@services/event-location-contact.service';

import { ContactService } from '@services/contact.service';

import { CreateContactComponent } from '@create-contact/create-contact.component';
import { CreateContactService } from '@create-contact/create-contact.service';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { OrganizationService } from '@app/services/organization.service';
import { Organization } from '@interfaces/organization';

import { CircleManagementComponent } from '@app/circle-management/circle-management.component';
import { CircleChooseComponent } from '@app/circle-management/circle-choose/circle-choose.component';
import { CircleService } from '@services/circle.service';
import { Circle } from '@interfaces/circle';
declare let html2canvas: any;
declare let gtag: Function;

export interface AssociatedEvents {
  id: any;
  link: string;
}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventDetailsComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  // @ViewChild('speciesTable') table: any;
  eventID: string;
  map;
  icon;
  administrative_level_one = [];
  landownerships;
  species: Species[] = [];
  speciesLoading = false;
  associatedEvents: Array<AssociatedEvents> = [];
  eventCommentsPanelOpen = false;
  serviceRequestPanelOpen = false;
  collaboratorsPanelOpen = false;
  locationCommentsPanelOpen = false;
  locationContactsPanelOpen = false;
  eventOwner;

  eventNotFound = false;

  showAddEventLocation = false;

  editEventDialogRef: MatDialogRef<EditEventComponent>;
  addEventDiagnosisDialogRef: MatDialogRef<AddEventDiagnosisComponent>;
  addEventOrganizationDialogRef: MatDialogRef<AddEventOrganizationComponent>;
  editEventLocationDialogRef: MatDialogRef<EditEventLocationComponent>;
  editLocationSpeciesDialogRef: MatDialogRef<EditLocationSpeciesComponent>;
  addEventLocationContactDialogRef: MatDialogRef<AddEventLocationContactComponent>;
  addServiceRequestDialogRef: MatDialogRef<AddServiceRequestComponent>;
  createContactDialogRef: MatDialogRef<CreateContactComponent>;
  circleChooseDialogRef: MatDialogRef<CircleChooseComponent>;
  circleManagementDialogRef: MatDialogRef<CircleManagementComponent>;

  addCommentDialogRef: MatDialogRef<AddCommentComponent>;

  eventDetailsShareDialogRef: MatDialogRef<EventDetailsShareComponent>;

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  selection = [];

  possibleEventDiagnoses = [];

  laboratories: Organization[] = [];
  organizations: Organization[] = [];
  userCircles: Circle[] = [];

  eventDataLoading = true;

  viewPanelStates: Object;

  currentUser;

  sexBiases: SexBias[];
  ageBiases: AgeBias[];

  commentTypes: CommentType[];

  locationMarkers;
  unMappables = [];
  eventPolys;
  userContacts;
  userContactsLoading = false;

  errorMessage;
  flywaysVisible = false;
  watershedsVisible = false;

  canvas = document.createElement('canvas');
  capturedImage;
  commentTableImage: any;

  locationSpeciesDisplayedColumns = [
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

  readCollaboratorArray: User[] = [];
  writeCollaboratorArray: User[] = [];

  @ViewChild(MatPaginator) locationSpeciesPaginator: MatPaginator;
  @ViewChild(MatSort) locationSpeciesSort: MatSort;
  @ViewChild(EventPublicReportComponent) eventReportComponent: EventPublicReportComponent;
  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

  constructor(private route: ActivatedRoute,
    private _eventService: EventService,
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private dataUpdatedService: DataUpdatedService,
    private createContactSevice: CreateContactService,
    private dialog: MatDialog,
    private speciesService: SpeciesService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private landownershipService: LandOwnershipService,
    private eventLocationService: EventLocationService,
    private eventDiagnosisService: EventDiagnosisService,
    private eventLocationContactService: EventLocationContactService,
    private eventOrganizationService: EventOrganizationService,
    private ageBiasService: AgeBiasService,
    private sexBiasService: SexBiasService,
    private commentTypeService: CommentTypeService,
    private organizationService: OrganizationService,
    private commentService: CommentService,
    private contactService: ContactService,
    private circleService: CircleService,

    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.eventLocationSpecies = [];

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    dataUpdatedService.trigger.subscribe((action) => {
      if (action === 'refresh') {
        this.refreshEvent();
      }
    });

    createContactSevice.getCreatedContact().subscribe(
      createdContact => {
        this.userContacts.push(createdContact);
        this.userContacts.sort(function (a, b) {
          if (a.last_name < b.last_name) { return -1; }
          if (a.last_name > b.last_name) { return 1; }
          return 0;
        });
      });
  }

  ngOnInit() {

    // converting whipsers logo png to a dataURL for use in pdfMake
    const whispersLogo = 'src/app/event-public-report/logo.png'; // TODO: move photo to more appropriate location
    const context = this.canvas.getContext('2d');
      const base_image = new Image();
      base_image.src = whispersLogo;
      base_image.onload = function () {
        context.drawImage(base_image, 5, 5, 300, 80);
      };

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

                this.readCollaboratorArray = eventdetails.read_collaborators;
                this.writeCollaboratorArray = eventdetails.write_collaborators;

                // for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                //   if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                //     this.possibleEventDiagnoses.push(speciesdiagnosis);
                //   }
                // }

                for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                  if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                    this.possibleEventDiagnoses.push(speciesdiagnosis);
                  } else {
                    // it is in there already:
                    // check if this one's suspect field is false
                    if (speciesdiagnosis.suspect === false) {
                      // if it is, then we need to remove the previously added one and add this one which is suspect = false
                      // loop thru possibleEventDiagnoses, if match, remove
                      for (let i = 0; i < this.possibleEventDiagnoses.length; i++) {
                        if (this.possibleEventDiagnoses[i].diagnosis === speciesdiagnosis.diagnosis) {
                          this.possibleEventDiagnoses.splice(i, 1);
                        }
                      }
                      // then add the non suspect one
                      this.possibleEventDiagnoses.push(speciesdiagnosis);

                    }
                  }
                }

              }
            }

            // add the "Undetermined" diagnosis to possibleDiagnoses, only if not already in the list
            if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis)) {
              this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN);
            }
            // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
            // else if (eventdetails.complete === false) {
            //   this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN);
            // }

            this.eventDataLoading = false;
          },
          error => {
            this.errorMessage = <any>error;
            this.eventDataLoading = false;
            if (error.status !== 200) {
              this.eventNotFound = true;
            }
            // if (JSON.parse(error).detail === 'Not found.') {

            // }
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

    // get 'laboratories' from the organizations service
    // aliases the subset of organization records where laboratory = true to an array called 'laboratories'
    this.organizationService.getLaboratories()
      .subscribe(
        (laboratories) => {
          this.laboratories = laboratories;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get organizations from the OrganizationService
    this.organizationService.getOrganizations()
      .subscribe(
        organizations => {
          this.organizations = organizations;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );


    // get comment types from the commentTypes service
    this.commentTypeService.getCommentTypes()
      .subscribe(
        commentTypes => {
          this.commentTypes = commentTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.speciesLoading = true;
    // get species from the species service
    this.speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.species = species;
          // alphabetize the species options list
          this.species.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          this.speciesLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.speciesLoading = false;
        }
      );

    // TEMPORARY- will need to use user creds to query user contact list
    this.userContactsLoading = true;
    this.contactService.getContacts()
      .subscribe(
        contacts => {
          this.userContacts = contacts;
          this.userContacts.sort(function (a, b) {
            if (a.last_name < b.last_name) { return -1; }
            if (a.last_name > b.last_name) { return 1; }
            return 0;
          });
          this.userContactsLoading = false;

        },
        error => {
          this.errorMessage = <any>error;
          this.userContactsLoading = false;
        }
      );

    this.circleService.getAllUserCircles()
      .subscribe(
        circles => {
          this.userCircles = circles;
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
        layers: [streets]
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
            return { color: '#28995b', weight: 2 };
          } else if (feature.properties.NAME === 'Pacific Flyway') {
            return { color: '#ffbd4f', weight: 2 };
          } else if (feature.properties.NAME === 'Mississippi Flyway') {
            return { color: '#eb5834', weight: 2 };
          } else if (feature.properties.NAME === 'Central Flyway') {
            return { color: '#b43cc7', weight: 2 };
          }
        }
      });

      // Watersheds hosted by The National Map (USGS)
      const watersheds = esri.dynamicMapLayer({
        url: 'https://hydro.nationalmap.gov/arcgis/rest/services/wbd/MapServer',
        opacity: 0.7
      });

      // Land use hosted by USGS
      const landUse = esri.dynamicMapLayer({
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

    }, 3000);
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
    let countyPolys = [];
    this.unMappables = [];
    for (const eventlocation of eventData.eventlocations) {
      markers.push(eventlocation);
      if (eventlocation.administrative_level_two_points !== null) {
        countyPolys.push(JSON.parse(eventlocation.administrative_level_two_points.replace('Y', '')));
      }
    }
    console.log('mapevents ' + this.locationMarkers);
    // let eventPolys;
    if (countyPolys.length > 0) {
      if (this.eventPolys) {
        this.map.removeLayer(this.eventPolys);
      }
      this.eventPolys = L.polygon(countyPolys, { color: 'blue' }).addTo(this.map);
    }
    for (const marker of markers) {
      if (marker.latitude === null || marker.longitude === null || marker.latitude === undefined || marker.longitude === undefined) {
        this.unMappables.push(marker);
      } else if (marker.latitude !== null || marker.longitude !== null || marker.latitude !== undefined || marker.longitude !== undefined) {

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

    let bounds = L.latLngBounds([]);

    if (markers.length > this.unMappables.length) {
      var markerBounds = this.locationMarkers.getBounds();
      bounds.extend(markerBounds);
    }

    if (countyPolys.length > 0) {
      var countyBounds = this.eventPolys.getBounds();
      bounds.extend(countyBounds);
    }

    if (markers.length || countyPolys.length) {
      this.map.fitBounds(bounds);
    }

  }

  reloadMap() {
    setTimeout(() => {
      this.locationMarkers.clearLayers();
      this.mapEvent(this.eventData);
    }, 2500);
  }

  navigateToHome() {
    this.router.navigate([`../../home`], { relativeTo: this.route });
  }

  navigateToEventDetails(eventID) {
    this.eventLocationSpecies = [];
    this.router.navigate([`../${eventID}`], { relativeTo: this.route });
    this.reloadMap();
    // location.reload();
    // this.refreshEvent();
  }

  // panels are closed when tabs are switched, but the panel boolean isn't actually changed. This is setting them all to false.
  resetExpansionPanels() {
    this.eventCommentsPanelOpen = false;
    this.serviceRequestPanelOpen = false;
    this.collaboratorsPanelOpen = false;
    this.locationCommentsPanelOpen = false;
    this.locationContactsPanelOpen = false;

  }

  editEvent(id: string) {
    // Open dialog for editing event
    this.editEventDialogRef = this.dialog.open(EditEventComponent, {
      disableClose: true,
      data: {
        eventData: this.eventData,
        organizations: this.organizations
      },
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

                // console.log('eventLocationSpecies:', this.eventLocationSpecies);
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
      minWidth: '75%',
      data: {
        event_id: id,
        diagnosis_options: this.possibleEventDiagnoses,
        event_data: this.eventData
      }
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

  addEventOrganization(id: string) {
    // Open dialog for adding event diagnosis
    this.addEventOrganizationDialogRef = this.dialog.open(AddEventOrganizationComponent, {
      minWidth: '75%',
      data: {
        event_id: id,
        organizations: this.organizations,
        existing_event_orgs: this.eventData.eventorganizations
      }
    });

    this.addEventOrganizationDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }


  addEventComment(id: string) {
    // Open dialog for adding event diagnosis
    this.addCommentDialogRef = this.dialog.open(AddCommentComponent, {
      data: {
        object_id: id,
        title: 'Add Comment',
        titleIcon: 'add_comment',
        // confirmButtonText: 'Add comment',
        showCancelButton: true,
        action_button_text: 'Add Comment',
        actionButtonIcon: 'add_comment',
        comment_object: 'event'
      }
    });

    this.addCommentDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }


  addEventLocationComment(id: string) {
    // Open dialog for adding event location comment
    this.addCommentDialogRef = this.dialog.open(AddCommentComponent, {
      data: {
        object_id: id,
        title: 'Add Comment',
        titleIcon: 'add_comment',
        // confirmButtonText: 'Add comment',
        showCancelButton: true,
        action_button_text: 'Add Comment',
        actionButtonIcon: 'add_comment',
        comment_object: 'eventlocation'
      }
    });

    this.addCommentDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  addServiceRequestComment(id: string) {
    // Open dialog for adding service request comment
    this.addCommentDialogRef = this.dialog.open(AddCommentComponent, {
      data: {
        object_id: id,
        title: 'Add Comment',
        titleIcon: 'add_comment',
        // confirmButtonText: 'Add comment',
        showCancelButton: true,
        action_button_text: 'Add Comment',
        actionButtonIcon: 'add_comment',
        comment_object: 'servicerequest'
      }
    });

    this.addCommentDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  addServiceRequestResponse(servicerequest) {
    // Open add service request dialog for response field update
    this.addServiceRequestDialogRef = this.dialog.open(AddServiceRequestComponent, {
      disableClose: true,
      // minWidth: '60%',
      data: {
        event_id: this.eventData.id,
        servicerequest: servicerequest,
        comment_types: this.commentTypes,
        title: 'Respond to service request',
        titleIcon: 'question_answer',
        showCancelButton: true,
        action_button_text: 'Save Response',
        actionButtonIcon: 'question_answer',
        action: 'respond'
      }
    });

    this.addServiceRequestDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }


  addEventLocationContact(id: string) {
    // Open dialog for adding event location contact
    this.addEventLocationContactDialogRef = this.dialog.open(AddEventLocationContactComponent, {
      disableClose: true,
      data: {
        event_location_id: id,
        userContacts: this.userContacts,
        title: 'Add Contact to event location',
        titleIcon: 'add_circle',
        // confirmButtonText: 'Add comment',
        showCancelButton: true,
        action_button_text: 'Add Contact',
        actionButtonIcon: 'add_circle'
      }
    });

    this.addEventLocationContactDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }


  addServiceRequest(id: string) {
    // Open dialog for adding event location contact
    this.addServiceRequestDialogRef = this.dialog.open(AddServiceRequestComponent, {
      disableClose: true,
      minWidth: '75%',
      data: {
        event_id: id,
        comment_types: this.commentTypes,
        title: 'Add a service request',
        titleIcon: 'add_circle',
        showCancelButton: true,
        action_button_text: 'Submit request',
        actionButtonIcon: 'question_answer',
        action: 'add'
      }
    });

    this.addServiceRequestDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  // Tooltip text
  editLocationNameTooltip() { const string = FIELD_HELP_TEXT.editLocationNameTooltip; return string; }
  editStandardizedLocationNameTooltip() { const string = FIELD_HELP_TEXT.editStandardizedLocationNameTooltip; return string; }
  flywayTooltip() { const string = FIELD_HELP_TEXT.flywayTooltip; return string; }
  editLandOwnershipTooltip() { const string = FIELD_HELP_TEXT.editLandOwnershipTooltip; return string; }
  longitudeTooltip() { const string = FIELD_HELP_TEXT.longitudeTooltip; return string; }
  latitudeTooltip() { const string = FIELD_HELP_TEXT.latitudeTooltip; return string; }
  editEventTypeTooltip() { const string = FIELD_HELP_TEXT.editEventTypeTooltip; return string; }
  editSpeciesTooltip() { const string = FIELD_HELP_TEXT.editSpeciesTooltip; return string; }
  editKnownDeadTooltip() { const string = FIELD_HELP_TEXT.editKnownDeadTooltip; return string; }
  editEstimatedDeadTooltip() { const string = FIELD_HELP_TEXT.editEstimatedDeadTooltip; return string; }
  editKnownSickTooltip() { const string = FIELD_HELP_TEXT.editKnownSickTooltip; return string; }
  editEstimatedSickTooltip() { const string = FIELD_HELP_TEXT.editEstimatedSickTooltip; return string; }
  populationTooltip() { const string = FIELD_HELP_TEXT.populationTooltip; return string; }
  editAgeBiasTooltip() { const string = FIELD_HELP_TEXT.editAgeBiasTooltip; return string; }
  editSexBiasTooltip() { const string = FIELD_HELP_TEXT.editSexBiasTooltip; return string; }
  editCaptiveTooltip() { const string = FIELD_HELP_TEXT.editCaptiveTooltip; return string; }
  editSpeciesDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editSpeciesDiagnosisTooltip; return string; }
  locationNameTooltip() { const string = FIELD_HELP_TEXT.locationNameTooltip; return string; }
  numberAffectedTooltip() { const string = FIELD_HELP_TEXT.numberAffectedTooltip; return string; }
  editRecordStatusTooltip() { const string = FIELD_HELP_TEXT.editRecordStatusTooltip; return string; }
  collaboratorsAddIndividualTooltip() { const string = FIELD_HELP_TEXT.collaboratorsAddIndividualTooltip; return string; }
  collaboratorsAddCircleTooltip() { const string = FIELD_HELP_TEXT.collaboratorsAddCircleTooltip; return string; }
  editContactOrganizationTooltip() { const string = FIELD_HELP_TEXT.editContactOrganizationTooltip; return string; }
  eventIDTooltip() { const string = FIELD_HELP_TEXT.eventIDTooltip; return string; }
  eventStartDateTooltip() { const string = FIELD_HELP_TEXT.eventStartDateTooltip; return string; }
  eventEndDateTooltip() { const string = FIELD_HELP_TEXT.eventEndDateTooltip; return string; }
  nwhcCarcassSubApprovalTooltip() { const string = FIELD_HELP_TEXT.nwhcCarcassSubApprovalTooltip; return string; }
  editEventDiagnosisTooltip() { const string = FIELD_HELP_TEXT.editEventDiagnosisTooltip; return string; }
  locationsTooltip() { const string = FIELD_HELP_TEXT.locationsTooltip; return string; }
  contactPersonTooltip() { const string = FIELD_HELP_TEXT.contactPersonTooltip; return string; }

  deleteComment(id: number) {
    this.commentService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Comment successfully deleted', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Comment not deleted. Error message: ' + error, 'OK', 8000);
        }
      );

  }

  openCommentDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Comment Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this comment?\nThis action cannot be undone.',
          confirmButtonText: 'Yes, Delete comment',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteComment(id);
      }
    });
  }

  deleteEventLocationComment(id: number) {
    this.commentService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Comment successfully deleted', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Comment not deleted. Error message: ' + error, 'OK', 8000);
        }
      );
  }


  openEventLocationCommentDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Location Comment Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this comment? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete comment',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventLocationComment(id);
      }
    });
  }

  deleteEventLocationContact(id: number) {
    this.eventLocationContactService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Contact successfully disassociated', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Contact not disassociated. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  openLocationContactRemoveConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Disassociate contact',
          titleIcon: 'remove_circle',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you wish to disassociate this contact with this event location? This does not delete the contact record.',
          confirmButtonText: 'Yes, remove this contact',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventLocationContact(id);
      }
    });
  }

  openCreateContactDialog() {
    this.createContactDialogRef = this.dialog.open(CreateContactComponent, {
      minWidth: '75%',
      disableClose: true,
      data: {
        contact_action: 'create'
      }
    });
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
    });
  }

  deleteEventLocation(id: number) {
    this.eventLocationService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Event location successfully deleted', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Event location not deleted. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  openEventLocationDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Location Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          messageIcon: 'warning',
          message: 'Are you sure you want to delete this event location, and all its associated species, contacts, and comments? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete location and all associated data',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventLocation(id);
      }
    });
  }

  openEventDiagnosisDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Diagnosis Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this event diagnosis? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete Event Diagnosis',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventDiagnosis(id);
      }
    });
  }

  deleteEventDiagnosis(id: number) {
    this.eventDiagnosisService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Event diagnosis successfully deleted', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Event diagnosis not deleted. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  openEventOrganizationDeleteConfirm(id) {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        data: {
          title: 'Delete Event Organization Confirm',
          titleIcon: 'delete_forever',
          // tslint:disable-next-line:max-line-length
          message: 'Are you sure you want to delete this event organization? This action cannot be undone.',
          confirmButtonText: 'Yes, Delete Event Organization',
          messageIcon: '',
          showCancelButton: true
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEventOrganization(id);
      }
    });
  }

  deleteEventOrganization(id: number) {
    this.eventOrganizationService.delete(id)
      .subscribe(
        () => {
          this.refreshEvent();
          this.openSnackBar('Event organization successfully deleted', 'OK', 5000);
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Event organization not deleted. Error message: ' + error, 'OK', 8000);
        }
      );
  }

  addToEventGroup() {

  }

  refreshEvent() {
    this.viewPanelStates = new Object();
    this.getViewPanelState(this.viewPanels);

    console.log('Event Location Species list at start of refresh: ', this.eventLocationSpecies);

    this.eventLocationSpecies = [];
    console.log('Event Location Species list after set to blank array: ', this.eventLocationSpecies);

    this.possibleEventDiagnoses = [];

    this._eventService.getEventDetails(this.eventID)
      .subscribe(
        (eventdetails) => {
          this.eventData = eventdetails;

          this.eventLocationSpecies = [];

          // this.possibleEventDiagnoses = [];
          for (const event_location of this.eventData.eventlocations) {
            for (const locationspecies of event_location.locationspecies) {
              locationspecies.administrative_level_two_string = event_location.administrative_level_two_string;
              locationspecies.administrative_level_one_string = event_location.administrative_level_one_string;
              locationspecies.country_string = event_location.country_string;
              this.eventLocationSpecies.push(locationspecies);

              for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {
                if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', speciesdiagnosis.diagnosis)) {
                  this.possibleEventDiagnoses.push(speciesdiagnosis);
                } else {
                  // it is in there already:
                  // check if this one's suspect field is false
                  if (speciesdiagnosis.suspect === false) {
                    // if it is, then we need to remove the previously added one and add this one which is suspect = false
                    // loop thru possibleEventDiagnoses, if match, remove
                    for (let i = 0; i < this.possibleEventDiagnoses.length; i++) {
                      if (this.possibleEventDiagnoses[i].diagnosis === speciesdiagnosis.diagnosis) {
                        this.possibleEventDiagnoses.splice(i, 1);
                      }
                    }
                    // then add the non suspect one
                    this.possibleEventDiagnoses.push(speciesdiagnosis);

                  }
                }
              }

            }
          }

          console.log('Event Location Species list after populated: ', this.eventLocationSpecies);

          // add the "Undetermined" diagnosis to possibleDiagnoses, only if not already in the list
          if (!this.searchInArray(this.possibleEventDiagnoses, 'diagnosis', APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN.diagnosis)) {
            this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_COMPLETE_DIAGNOSIS_UNKNOWN);
          }
          // removed on 5/28/19 per instruction from NWHC to disallow direct user selection of "Pending".
          // else if (eventdetails.complete === false) {
          //   this.possibleEventDiagnoses.push(APP_SETTINGS.EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN);
          // }

          this.readCollaboratorArray = eventdetails.read_collaborators;
          this.writeCollaboratorArray = eventdetails.write_collaborators;

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

  addLocationSpecies(eventlocation) {
    // Open dialog for adding location species
    this.editLocationSpeciesDialogRef = this.dialog.open(EditLocationSpeciesComponent, {
      data: {
        eventData: this.eventData,
        species: this.species,
        ageBiases: this.ageBiases,
        sexBiases: this.sexBiases,
        location_species_action: 'add',
        action_text: 'add',
        action_button_text: 'Submit',
        eventlocation: eventlocation,
        title: 'Add species to this location',
        titleIcon: 'add'
      }
    });

    this.editLocationSpeciesDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }


  determineLocationName(name, i) {
    let locationName;

    if (name === '' || name === undefined) {
      locationName = 'Location ' + i;
    } else {
      locationName = 'Location ' + i + ' - ' + name;
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

  removeCollaborator(userID, list) {

    // WIP below. seems to be good. test a few more times.
    if (list === 'read') {
      const readIndex = this.readCollaboratorArray.findIndex(function (o) {
        return o.id === userID;
      });
      if (readIndex !== -1) { this.readCollaboratorArray.splice(readIndex, 1); }
    } else if (list === 'write') {
      const writeIndex = this.writeCollaboratorArray.findIndex(function (o) {
        return o.id === userID;
      });
      if (writeIndex !== -1) { this.writeCollaboratorArray.splice(writeIndex, 1); }

    }

    const readCollaboratorIDArray = [];
    for (const user of this.readCollaboratorArray) {
      readCollaboratorIDArray.push(user.id);
    }

    const writeCollaboratorIDArray = [];
    for (const user of this.writeCollaboratorArray) {
      writeCollaboratorIDArray.push(user.id);
    }

    this.updateCollaboratorList(readCollaboratorIDArray, writeCollaboratorIDArray);

  }

  addCollaborator(accessType) {
    this.circleManagementDialogRef = this.dialog.open(CircleManagementComponent, {
      disableClose: true,
      data: {
        action: 'selectUser',
      }
    });

    this.circleManagementDialogRef.afterClosed()
      .subscribe(
        (selectedUser) => {

          if (selectedUser !== 'cancel') {

            if (accessType === 'read') {
              this.readCollaboratorArray.push(selectedUser);
            } else if (accessType === 'write') {
              this.writeCollaboratorArray.push(selectedUser);
            }

            const readCollaboratorIDArray = [];
            for (const user of this.readCollaboratorArray) {
              readCollaboratorIDArray.push(user.id);
            }

            const writeCollaboratorIDArray = [];
            for (const user of this.writeCollaboratorArray) {
              writeCollaboratorIDArray.push(user.id);
            }

            this.updateCollaboratorList(readCollaboratorIDArray, writeCollaboratorIDArray);
          }

        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  openCircleChooseDialog(accessType) {
    this.circleChooseDialogRef = this.dialog.open(CircleChooseComponent, {
      minWidth: '60em',
      data: {
        userCircles: this.userCircles
      }
    });

    this.circleChooseDialogRef.afterClosed().subscribe(result => {

      if (result !== 'cancel') {

        if (accessType === 'read') {
          // add the users array to the new_read_collaborators array
          this.readCollaboratorArray = this.readCollaboratorArray.concat(result.users);
          const readCollaboratorIDArray = [];
          for (const user of this.readCollaboratorArray) {
            readCollaboratorIDArray.push(user.id);
          }
          this.updateCollaboratorList('read', readCollaboratorIDArray);

        } else if (accessType === 'write') {
          this.writeCollaboratorArray = this.writeCollaboratorArray.concat(result.users);
          const writeCollaboratorIDArray = [];
          for (const user of this.writeCollaboratorArray) {
            writeCollaboratorIDArray.push(user.id);
          }
          this.updateCollaboratorList('write', writeCollaboratorIDArray);

        }

      }
    });

  }

  updateCollaboratorList(readCollaboratorArray, writeCollaboratorArray) {

    // tslint:disable-next-line:max-line-length
    const update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_read_collaborators': readCollaboratorArray, 'new_write_collaborators': writeCollaboratorArray };
    // if (accessType === 'read') {
    //   update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_read_collaborators': userArray };
    // } else if (accessType === 'write') {
    //   update = { 'id': this.eventData.id, 'event_type': this.eventData.event_type, 'new_write_collaborators': userArray };
    // }

    this._eventService.update(update)
      .subscribe(
        (event) => {
          // this.submitLoading = false;
          this.openSnackBar('Collaborator list updated.', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
        },
        error => {
          // this.submitLoading = false;
          this.openSnackBar('Error. Collaborator list not updated. Error message: ' + error, 'OK', 15000);
        }
      );
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected(i: number) {
  //   const numSelected = this.selection[i].selected.length;
  //   const numRows = this.locationSpeciesDataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle(i: number) {
  //   this.isAllSelected(i) ?
  //     this.selection[i].clear() :
  //     this.locationSpeciesDataSource.data.forEach(row => this.selection[i].select(row));
  // }

  exportEventDetails() {
    this._eventService.getEventDetailsCSV(this.eventID);
    gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Exported Event Details' });
  }

  /* downloadEventReport = function() {

    this.eventReportComponent.print();
  }; */

  // TODO: MOVE OUTSIDE OF EVENT-DETAILS
  downloadEventReport() {
    // google analytics event
    gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Downloaded Event Report' });
    const whispersLogo = 'src/app/event-public-report/logo.png'; // TODO: move photo to more appropriate location

    html2canvas(document.querySelector('#speciesList')).then(canvas => {


      /// document.body.appendChild(canvas);
      this.capturedImage = canvas.toDataURL();
      console.log('canvas.toDataURL() -->' + this.capturedImage);
      // this will contain something like (note the ellipses for brevity), console.log cuts it off
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."

      canvas.toBlob(function (blob) {

        //  just pass blob to something expecting a blob
        // somfunc(blob);

        // Same as canvas.toDataURL(), just longer way to do it.
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
         const base64data = reader.result;
          console.log('Base64--> ' + base64data);
        };

      });


    });
    const leafletImage = this.capturedImage;
    // Getting date/time for timestamp
    const date = APP_UTILITIES.getDateTime;

    // event details
    const data = this.eventData;

    // looping thru all organizations incase there are multiple
    const organizations = [];
    for (const organization of data.eventorganizations) {
      organizations.push(organization.organization.name);
    }

    // getting number of locations associated with event
    let locationCount;
    locationCount = data.eventlocations.length;

    // looping thru all counties of all locations
    const counties = [];
    for (const eventlocation of data.eventlocations) {
      let formattedString = '';
      formattedString = eventlocation.administrative_level_two_string + ', ' + eventlocation.administrative_level_one_string + ', ' + eventlocation.country_string;
      counties.push(formattedString);
    }

    // looping thru all event diagsoses incase there are multiple
    const eventDiagnosises = [];
    for (const diagnosis of data.eventdiagnoses) {
      eventDiagnosises.push(diagnosis.diagnosis_string);
    }

    // looping thru all counties of all locations
    const labs = [];
    data.eventlocations.forEach(el => {
      el.locationspecies.forEach(ls => {
        ls.speciesdiagnoses.forEach(sd => {
          labs.push(sd.organizations_string);
        });
      });
    });

    // getting species affected count
    let speciesAffectedCount = 0;
    data.eventlocations.forEach(el => {
      el.locationspecies.forEach(ls => {
        speciesAffectedCount = speciesAffectedCount + 1;
      });
    });

    const startDate = data.start_date;
    const endDate = data.end_date;
    const formattedDate = data.start_date + ' - ' + data.end_date;


    // Checking to see if there are event groups
    const associatedEvents = [];
    const eventsAndLinks = [];
    const eventIds = [];
    const eventLinks = [];

    data.eventgroups.forEach(eg => {
      eg.events.forEach(element => {
        associatedEvents.push(element);
      });
    });

    // converting to string and adding 'link' field
    for (let i = 0; i < associatedEvents.length; i ++) {

      // formatting string so that there is not a ',' at the end of last associated event
      const addComma = associatedEvents.length - 1;
      if ( i !== addComma) {
      eventsAndLinks.push({id: associatedEvents[i].toString() + ', ', link: window.location.origin + '/' + associatedEvents[i].toString()});
      } else {
        eventsAndLinks.push({id: associatedEvents[i].toString(), link: window.location.origin + '/' + associatedEvents[i].toString()});
      }
    }

    eventsAndLinks.forEach(el => {
      eventIds.push(el.id);
    });
    eventsAndLinks.forEach(el => {
      eventLinks.push(el.link);
    });
    console.log(eventIds);
    console.log(eventLinks);

    // Event Visibility
    let eventVisibility;
    if (data.public) {
      eventVisibility = 'VISIBLE TO THE PUBLIC';
    } else {
      eventVisibility = 'NOT VISIBLE TO THE PUBLIC';
    }

    // whispers logo
    const pngURL = this.canvas.toDataURL();
    console.log(pngURL);

    // printing user's info
    const nameOrgString = this.currentUser.first_name + ' ' + this.currentUser.last_name + ' (' + this.currentUser.organizations_string + ')';

    // formatting full URL for footer
    const url = window.location.href;

    // print template
    console.log('print');

    const combinedComments = data.combined_comments;

    const eventLocation = data.eventlocations[0].locationspecies;
    console.log(eventLocation);

    function buildTableBody(tableData, columns) {
      const body = [];

      body.push(columns);

      tableData.forEach(function(row) {
        const dataRow = [];

          columns.forEach(function(column) {
              dataRow.push(row[column]); // to out .toString() because null values were causing the function to fail
          });

          body.push(dataRow);
      });

      return body;
  }

  function table(tableData, columns) {
      return {
          table: {
              headerRows: 1,
              body: buildTableBody(tableData, columns)
          }
      };
  }


    // Below code is exploring dynamically generated tables and making hyperlinks. I haven't found a solution for how to create a link out of data in a dynamically generated table
    /* const eventGroups = data.eventgroups;

    function buildTableBody(data, columns) {
      data = eventsAndLinks;
      const body = [];

      body.push(columns);

      data.forEach(function(row) {
        const dataRow = [];

          columns.forEach(function(column) {
              dataRow.push({text: row[column].toString(), link : row.link,  color : '#0000EE'} );
          });

          body.push(dataRow);
      });

      return body;
  }

  function table(data, columns) {
      return {
          table: {
            style: 'smaller',
              headerRows: 0,
              body: buildTableBody(data, columns),

          },
          layout: { defaultBorder: false,
            paddingLeft: function(i, node) { return 15; },
            paddingRight: function(i, node) { return 10; },
            border: [false, false, true, false],
            widths: [150, 250],
           }
      };
  } */

    const docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 35],
      footer: function (currentPage, pageCount) {
        return {
          margin: [20, 0, 20, 0],
          style: 'smallest',
          columns: [
            {
              width: 700,
              text: ['Report generated by +' + nameOrgString + ' from ', {text: url, link: url, color: '#0000EE'}, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at https://whispers.usgs.gov.'
            ]
          },
            {
              width: 50,
              alignment: 'right',
              text: 'Page ' + currentPage.toString() + ' of ' + pageCount
            }
          ]
        };
      },
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [ 0, 15, 0, 0 ]
            },
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Contact Organziation(s)', bold: true, alignment: 'right' }, '' + organizations],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, data.event_status_string],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          text: 'Summary Information',
          style: 'bigger',
          margin: [30, 10]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Locations', bold: true, alignment: 'right' }, locationCount],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'County (or Equivalent)', bold: true, alignment: 'right' }, counties],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Diagnosis', bold: true, alignment: 'right' }, eventDiagnosises],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Diagnostic Laboratory', bold: true, alignment: 'right' }, labs],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, data.affected_count],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, speciesAffectedCount],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, 'Need to ask how they want this determined'],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Start Date - End Date', bold: true, alignment: 'right' }, formattedDate], // TODO: format according to wireframe & Create function to get count of total days event lasted
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        /* {
          alignment: 'justify',
          columns: [
            { text: 'Associated Events' }, // fixes link issue with dynamic table generation but style is messed up
            table(
              eventsAndLinks, ['id'])
          ]
        }, */
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Associated Events', bold: true, alignment: 'right' }, {text: eventIds, link: 'http://localhost:4200/event/' + associatedEvents, color: '#0000EE'}], // TODO: Figure out what to do regarding links & Display none if there are none
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, eventVisibility],
                ]
              },
              layout: { defaultBorder: false,
                paddingLeft: function(i, node) { return 15; },
                paddingRight: function(i, node) { return 10; },
               }
            }
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Details of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [ 0, 15, 0, 0 ]
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            /* { text: 'Associated Events' }, */
            table(
              eventLocation, ['species_string', 'population_count', 'sick_count', 'dead_count', 'sick_count_estimated', 'dead_count_estimated', 'captive']) // eventLocation[0].speciesdiagnoses[0].diagnosis_string] , eventLocation[0].speciesdiagnoses[0].tested_count, eventLocation[0].speciesdiagnoses[0].positive_count
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            /* { text: 'Associated Events' }, */
            table(
              combinedComments, ['comment', 'comment_type', 'created_date', 'created_by_string', 'created_by_organization_string', 'content_type_string'])
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Explanation of Terms',
              margin: [ 0, 15, 0, 0 ]
            }
          ]
        },
        {
          alignment: 'justify',
          text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n', {text: 'Disclaimer', fontSize: 11, bold: true}, '\n\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
          style: 'smaller',
        },
        {
          style: 'definitionsTable',
          table: {
            body: [
              [{text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.', border: [false, false, false, false]}],
              [{text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'System-generated unique identifier for an event.', border: [false, false, false, false]}],
              [{text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Organization(s) to contact regarding general inquiries about the event.', border: [false, false, false, false]}],
              [{text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true}, {text: '"Complete" if 1.) the event has ended, 2.) diagnostic tests are finalized, and 3.) all information is updated in WHISPers. Otherwise, "Incomplete".', border: [false, false, false, false]}],
              [{text: '# of Locations', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Number of locations (e.g., town or lake) that each represents a distinct spatial cluster of animal observations within a county.', border: [false, false, false, false]}],
              [{text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'County of location (or equivalent, such as parish or borough in the United States).', border: [false, false, false, false]}],
              [{text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness.', border: [false, false, false, false]}],
              [{text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Laboratory(ies) providing the diagnoses for this species at this location.', border: [false, false, false, false]}],
              [{text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.', border: [false, false, false, false]}],
              [{text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.', border: [false, false, false, false]}],
              [{text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Total number of species affected', border: [false, false, false, false]}],
              [{text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Beginning date of the event (considering all locations). Ending date of the event (considering all locations).', border: [false, false, false, false]}],
              [{text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Events that are biologically equivalent and were grouped together by wildlife disease specialists at the USGS National Wildlife Health Center.', border: [false, false, false, false]}],
              [{text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Indicates whether event is visible to the public or not.', border: [false, false, false, false]}],
            ]
          },
          layout: { defaultBorder: false,
            paddingLeft: function(i, node) { return 15; },
            paddingRight: function(i, node) { return 10; },
            // paddingTop: function(i, node) { return 10; }
           }
        },
        {
          alignment: 'justify',
          text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE'}, '.'],
          style: 'smallest',
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Explanation of Terms cont...',
              margin: [ 0, 15, 0, 0 ]
            }
          ]
        },
        {
          style: 'definitionsTable',
          table: {
            body: [
              [{text: 'State (or Equivalent)', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'State of location (or equivalent, such as provinces or territories in Canada).', border: [false, false, false, false]}],
              [{text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Country of location', border: [false, false, false, false]}],
              [{text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Estimated beginning date of the event at this location.', border: [false, false, false, false]}],
              [{text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Estimated ending date of the event at this location.', border: [false, false, false, false]}],
              [{text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Species affected at this location.', border: [false, false, false, false]}],
              [{text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Estimate of the maximum number of this species at this location, including live, sick, and dead.', border: [false, false, false, false]}],
              [{text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.', border: [false, false, false, false]}],
              [{text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event.', border: [false, false, false, false]}],
              [{text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.', border: [false, false, false, false]}],
              [{text: 'Estimate Dead', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event. ', border: [false, false, false, false]}],
              [{text: 'Captive', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Describes if species affected at this location are captive or not.', border: [false, false, false, false]}],
              [{text: 'Species Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true}, {text: '1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  or  3.) those diagnoses deemed significant by the user or organization.', border: [false, false, false, false]}],
              [{text: 'Number Assessed', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Number of individual specimens laboratory tested or examined for a specific etiology. For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. Across diagnoses, numbers are nonadditive.', border: [false, false, false, false]}],
              [{text: 'Number with this Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Number of individual specimens with the selected diagnosis (can be a suspect diagnosis). For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. Across diagnoses, numbers are nonadditive.', border: [false, false, false, false]}],
              [{text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Laboratory(ies) providing the diagnoses for this species at this location.', border: [false, false, false, false]}],
              [{text: 'Comment Type', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Flags comment as belonging to a certain category. See metadata for details on options.', border: [false, false, false, false]}],
              [{text: 'Comment Source', border: [false, false, true, false], alignment: 'right', bold: true}, {text: 'Comment timeline is a compilation of comments entered in various sections of the event record; the source identifies from where the comment originated.', border: [false, false, false, false]}],
            ]
          },
          layout: { defaultBorder: false,
            paddingLeft: function(i, node) { return 15; },
            paddingRight: function(i, node) { return 10; },
            // paddingTop: function(i, node) { return 10; }
           }
        },
        {
          alignment: 'justify',
          text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE'}, '.'],
          style: 'smallest'
        },
      ],
      images: {
        logo: pngURL,
        leafletMap: leafletImage
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        bigger: {
          fontSize: 18,
          bold: true
        },
        smaller: {
          fontSize: 10
        },
        smallest: {
          fontSize: 8
        },
        definitionsTable: {
          fontSize: 9
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }


}
