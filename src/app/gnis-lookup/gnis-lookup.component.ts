import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import * as search_api from 'usgs-search-api';
declare const search_api: search_api;

@Component({
  selector: 'app-gnis-lookup',
  templateUrl: './gnis-lookup.component.html',
  styleUrls: ['./gnis-lookup.component.scss']
})
export class GnisLookupComponent implements OnInit, AfterViewInit, AfterViewChecked {

  usgsSearch;
  name: string;
  id: string;

  constructor(
    public gnisLookupDialogRef: MatDialogRef<GnisLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

  updateSelectedFeature(id, name) {
    this.id = id;
    this.name = name;
  }

  ngAfterViewInit() {

    const self = this;

    const selectedFeature = {
      name: '',
      id: ''
    };
    this.usgsSearch = search_api.create('search-api-div', {
      'verbose': true,
      'placeholder': 'Search for GNIS place name',
      'tooltip': 'Type to search GNIS database',
      'on_result': function (event) {
        // do something with the result
        // o.result is a geojson point feature object with location information set as properties 
        console.warn(event.result);
        // selectedFeature.id = event.result.properties.GnisId;
        // selectedFeature.name = event.result.properties.Name;

        this.id = event.result.properties.GnisId;
        this.name = event.result.properties.Name;
        console.log('GNIS Feature selected. ' + this.name + ' (' + this.id + ')');

        self.updateSelectedFeature(event.result.properties.GnisId, event.result.properties.Name);
      }
    });
  }



  submitGNISSelection() {

    const result = {
      event_location_index: this.data.event_location_index,
      id: this.id,
      name: this.name
    };

    this.gnisLookupDialogRef.close(result);
  }

}
