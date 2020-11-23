import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MatExpansionPanel, MatTabGroup } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { animate, state, style, transition, trigger } from '@angular/animations';
//declare let L: any;

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
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
import { CollaborationRequestComponent } from '@app/collaboration-request/collaboration-request.component';
import { buildMapFromList } from '@angular/flex-layout/extended/typings/style/style-transforms';
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
  @Input() selectedTab: number;

  // @ViewChild('speciesTable') table: any;
  eventID: string;
  map;
  icon;
  administrative_level_one = [];
  landownerships;
  species: Species[] = [];
  speciesLoading = false;
  associatedEvents: Array<AssociatedEvents> = [];
  currentlyOpenedItemIndex = -1;

  eventCommentsPanelOpen = false;
  serviceRequestPanelOpen = false;
  collaboratorsPanelOpen = false;
  locationCommentsPanelOpen = false;
  locationContactsPanelOpen = false;
  eventOwner;
  natMapPoints;
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
  collaborationRequestDialogRef: MatDialogRef<CollaborationRequestComponent>;
  eventPublicReportDialogRef: MatDialogRef<EventPublicReportComponent>;

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

  // see comment on line 182
  // viewPanelStates: Object;

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

  // selectedTab: number;

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
  @ViewChild(MatTabGroup) eventDetailsTabs: MatTabGroup;

  // this use of the viewPanels variable and associated functions is assumed (but not confirmed) deprecated.
  // the original purpose may have been superceded by later development. it was removed 12/30/19 to fix a bug
  // that involved breaking of location comments and location contacts collapse panels after a new item was added.
  // associated functions(commented out below): getViewPanelState, setViewPanelState
  // all left in for now in case issues are uncovered. - B.Draper 12/31/19
  // @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

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

    // ensures that navigation to an event via notifications click refreshes all event data
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) { this.refreshEvent(); }
    });

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

    // this.selectedTab = 0;

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

    // get event summary for reports
    this._eventService.getEventSummary(this.eventID)
      .subscribe(
        (eventsummary) => {
          this.natMapPoints = eventsummary;
        }
      );
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
    this.waitForMapElementToDisplay('#eventDetailsMap', 500);
  }

  waitForMapElementToDisplay(selector, time) {

    const self = this;
    if (document.querySelector(selector) != null) {
      // alert('The element is displayed, you can put your code instead of this alert.');
      this.buildMap();
      return;
    } else {
      setTimeout(function () {
        self.waitForMapElementToDisplay(selector, time);
      }, time);
    }
  }

  buildMap() {

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

    this.map = new L.Map('eventDetailsMap', {
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
    };

    // const x = { position: 'topleft'};

    L.control.layers(baseMaps, overlays, { position: 'topleft' }).addTo(this.map);
    L.control.scale({ position: 'bottomright' }).addTo(this.map);

    // L.control.layers(baseMaps).addTo(this.map);

    this.mapEvent(this.eventData);

    this.map.on('overlayadd', (e) => {
      if (e.name === 'Flyways') {
        this.flywaysVisible = true;
      } else if (e.name === 'Watersheds (HUC 2)') {
        this.watershedsVisible = true;
      }
    });

    this.map.on('overlayremove', (e) => {
      if (e.name === 'Flyways') {
        this.flywaysVisible = false;
      } else if (e.name === 'Watersheds (HUC 2)') {
        this.watershedsVisible = false;
      }
    });

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
    const countyPolys = [];
    this.unMappables = [];
    for (const eventlocation of eventData.eventlocations) {
      markers.push(eventlocation);
      if (eventlocation.administrative_level_two_points !== null) {
        countyPolys.push(JSON.parse(eventlocation.administrative_level_two_points.replace('Y', '')));
      }
    }
    // console.log('mapevents ' + this.locationMarkers);
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

    const bounds = L.latLngBounds([]);

    if (markers.length > this.unMappables.length) {
      const markerBounds = this.locationMarkers.getBounds();
      bounds.extend(markerBounds);
    }

    if (countyPolys.length > 0) {
      const countyBounds = this.eventPolys.getBounds();
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
    this.eventDetailsTabs.selectedIndex = 0;
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

  setOpened(itemIndex) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
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

  downloadEventReport(id: string) {

    this.selectedTab = 0;

    setTimeout(() => {
      this.eventPublicReportDialogRef = this.dialog.open(EventPublicReportComponent, {
        minWidth: '40%',
        data: {
          event_data: this.eventData,
          user: this.currentUser,
          event_summary: this.natMapPoints
        }
      });

      this.eventPublicReportDialogRef.afterClosed()
        .subscribe(
          () => {
            // this.refreshEvent();
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

      // adding back leaflet layers and controls
      this.locationMarkers = L.featureGroup().addTo(this.map);
      this.mapEvent(this.eventData);
      $('.leaflet-control-zoom').css('visibility', 'visible');
      $('.leaflet-control-layers').css('visibility', 'visible');
      $('.leaflet-control-attribution').css('visibility', 'visible');

    }, 1000);
  }

  addEventOrganization(id: string) {
    // Open dialog for adding event diagnosis
    this.addEventOrganizationDialogRef = this.dialog.open(AddEventOrganizationComponent, {
      minWidth: '75%',
      data: {
        event_id: id,
        organizations: this.organizations,
        existing_event_orgs: this.eventData.organizations
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
  associatedEventsTooltip() { const string = FIELD_HELP_TEXT.associatedEventsTooltip; return string; }

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

  openCollaborationRequestDialog(eventID) {
    // Open dialog for collaboration request
    this.collaborationRequestDialogRef = this.dialog.open(CollaborationRequestComponent, {
      disableClose: true,
      data: {
        event_id: eventID,
        title: 'Request to Collaborate',
        titleIcon: 'group',
        showCancelButton: true,
        action_button_text: 'Submit request',
        actionButtonIcon: 'send'
      }
    });

    this.collaborationRequestDialogRef.afterClosed()
      .subscribe(
        () => {
          this.refreshEvent();
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  refreshEvent() {
    // see comment on line 182
    // this.viewPanelStates = new Object();
    // this.getViewPanelState(this.viewPanels);
    this.selectedTab = 0;

    // console.log('Event Location Species list at start of refresh: ', this.eventLocationSpecies);

    this.eventLocationSpecies = [];
    // console.log('Event Location Species list after set to blank array: ', this.eventLocationSpecies);

    this.possibleEventDiagnoses = [];

    if (this.eventID) {

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

            // console.log('Event Location Species list after populated: ', this.eventLocationSpecies);

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

            // see comment on line 182
            // setTimeout(() => {
            //   this.setViewPanelState(this.viewPanels);
            // });
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  // below deprecated. see comment on line 182
  // getViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
  //   viewPanels.forEach((element, index) => {
  //     this.viewPanelStates[index] = element.expanded;
  //   });
  // }

  // setViewPanelState(viewPanels: QueryList<MatExpansionPanel>) {
  //   viewPanels.forEach((element, index) => {
  //     if (this.viewPanelStates[index]) {
  //       element.open();
  //     }
  //   });
  // }

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
          // adds the newly added users to the readCollaboratorArray
          this.readCollaboratorArray = this.readCollaboratorArray.concat(result.users);
        } else if (accessType === 'write') {
          // adds the newly added users to the writeCollaboratorArray
          this.writeCollaboratorArray = this.writeCollaboratorArray.concat(result.users);
        }
        // establishes an array to hold the user IDs for read collaborators
        const readCollaboratorIDArray = [];
        // populates readCollaboratorIDArray by simple loop on the whole object array
        for (const user of this.readCollaboratorArray) {
          readCollaboratorIDArray.push(user.id);
        }
        // establishes an array to hold the user IDs for write collaborators
        const writeCollaboratorIDArray = [];
        // populates writeCollaboratorIDArray by simple loop on the whole object array
        for (const user of this.writeCollaboratorArray) {
          writeCollaboratorIDArray.push(user.id);
        }
        // push the two arrays to the update function, with newly added and existing for each type included.
        this.updateCollaboratorList(readCollaboratorIDArray, writeCollaboratorIDArray);
      }
    });

  }

  updateCollaboratorList(readCollaboratorArray, writeCollaboratorArray) {

    const update = {
      'id': this.eventData.id,
      'event_type': this.eventData.event_type,
      'new_read_collaborators': readCollaboratorArray,
      'new_write_collaborators': writeCollaboratorArray
    };
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
}
