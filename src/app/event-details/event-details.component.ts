import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
declare let L: any;

import 'rxjs/add/operator/switchMap';
import { EventService } from '@services/event.service';
import { StateService } from '@services/state.service';

import { EventDetail } from '@interfaces/event-detail';
import { LocationSpecies } from '@interfaces/location-species';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  //@ViewChild('speciesTable') table: any;
  id: string;
  map;
  states = [];

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  eventDataLoading = true;

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

  constructor(private route: ActivatedRoute, private eventService: EventService, private stateService: StateService) {
    this.eventLocationSpecies = [];
  }

  ngOnInit() {

    this.eventLocationSpecies = [];

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.eventData = this.eventService.getSampleEventDetail(this.id);

      for (let event_location of this.eventData.event_locations) {
        for (let location_species of event_location.location_species) {
          location_species.county_string = event_location.county_string;
          location_species.state_string = event_location.state_string;
          location_species.country_string = event_location.country_string;
          this.eventLocationSpecies.push(location_species);
        }

      }
      console.log('eventLocationSpecies:', this.eventLocationSpecies);
      //this.speciesTableRows = this.eventLocationSpecies;
      this.eventDataLoading = false;

    });

    // get states from the state service
    this.stateService.getStates()
      .subscribe(
        (states) => {
          this.states = states;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    setTimeout(() => {
      this.map = new L.Map('map', {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    }, 500);
  }


  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log('Detail Toggled', event);
  // }

}
