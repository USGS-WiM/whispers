import { Component, OnInit } from '@angular/core';
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
  id: string;
  map;
  states = [];

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  eventDataLoading = true;


  errorMessage;

  constructor(private route: ActivatedRoute, private eventService: EventService, private stateService: StateService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.eventData = this.eventService.getSampleEventDetail();

      for (const event_location of this.eventData.event_locations) {
        this.eventLocationSpecies.push(event_location.location_species);
      }
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

}
