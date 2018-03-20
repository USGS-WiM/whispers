import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare let L: any;

import { Event } from '@interfaces/event';
import { EventService } from '@services/event.service';

import { APP_UTILITIES } from '@app/app.utilities';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map;

  constructor(private _eventService: EventService) { }

  ngOnInit() {

    setTimeout(() => {
      this.map = new L.Map('map', {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    },
      500);
  }

}

