import { Component, OnInit } from '@angular/core';

import * as search_api from 'usgs-search-api';


@Component({
  selector: 'app-gnis-lookup',
  templateUrl: './gnis-lookup.component.html',
  styleUrls: ['./gnis-lookup.component.scss']
})
export class GnisLookupComponent implements OnInit {



  constructor() { }

  ngOnInit() {

    const widgetObj = search_api.create('search-api-div', {
      'on_result': function (o) {
        // do something with the result
        // o.result is a geojson point feature object with location information set as properties 
        console.warn(o.result);
      }
    });
  }

}
