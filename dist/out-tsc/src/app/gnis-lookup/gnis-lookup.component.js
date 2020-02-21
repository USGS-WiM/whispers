"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var GnisLookupComponent = /** @class */ (function () {
    function GnisLookupComponent(gnisLookupDialogRef, data) {
        this.gnisLookupDialogRef = gnisLookupDialogRef;
        this.data = data;
        this.name = '';
        this.id = '';
        this.county = '';
        this.state = '';
    }
    GnisLookupComponent.prototype.ngOnInit = function () {
    };
    GnisLookupComponent.prototype.ngAfterViewChecked = function () {
    };
    GnisLookupComponent.prototype.updateSelectedFeature = function (id, name, county, state) {
        this.id = id;
        this.name = name;
        this.county = county;
        this.state = state;
    };
    GnisLookupComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        var selectedFeature = {
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
                self.updateSelectedFeature(event.result.properties.GnisId, event.result.properties.Name, event.result.properties.County, event.result.properties.State);
            }
        });
    };
    GnisLookupComponent.prototype.submitGNISSelection = function () {
        var result = {
            event_location_index: this.data.event_location_index,
            id: this.id,
            name: this.name,
            county: this.county,
            state: this.state
        };
        gtag('event', 'click', { 'event_category': 'Event', 'event_label': 'Looked Up GNIS' });
        this.gnisLookupDialogRef.close(result);
    };
    GnisLookupComponent = __decorate([
        core_1.Component({
            selector: 'app-gnis-lookup',
            templateUrl: './gnis-lookup.component.html',
            styleUrls: ['./gnis-lookup.component.scss']
        }),
        __param(1, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], GnisLookupComponent);
    return GnisLookupComponent;
}());
exports.GnisLookupComponent = GnisLookupComponent;
//# sourceMappingURL=gnis-lookup.component.js.map