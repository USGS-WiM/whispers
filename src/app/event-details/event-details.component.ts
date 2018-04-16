import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
declare let L: any;

import 'rxjs/add/operator/switchMap';
import { EventService } from '@services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  id: string;
  map;

  eventData: Object;

  eventDataLoading = true;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.eventData = this.eventService.getSampleEventDetail();
      this.eventDataLoading = false;

    });

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
