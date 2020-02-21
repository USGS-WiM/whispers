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
var ViewCommentDetailsComponent = /** @class */ (function () {
    function ViewCommentDetailsComponent(viewCommentDetailsDialogRef, data) {
        this.viewCommentDetailsDialogRef = viewCommentDetailsDialogRef;
        this.data = data;
        this.locationIdArray = [];
    }
    ViewCommentDetailsComponent.prototype.ngOnInit = function () {
        this.locationIdArray = this.data.event_locations;
        this.data.location = this.eventLocationName(this.data.location);
        console.log(this.data.location);
    };
    ViewCommentDetailsComponent.prototype.eventLocationName = function (id) {
        var _this = this;
        var locationName = '';
        var count;
        if (this.data.location === 'servicerequest') {
            locationName = 'Service Request';
        }
        else if (this.data.location === 'event') {
            locationName = 'Event';
        }
        else if (this.data.location === 'eventlocation') {
            if (this.data.object_name !== '') {
                // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
                // comments (same as on event details tab).
                // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === _this.data.object_id; })) + 1;
                locationName = 'Location ' + count + ' - ' + this.data.object_name;
            }
            else {
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === _this.data.object_id; })) + 1;
                locationName = 'Location ' + count;
            }
        }
        return locationName;
    };
    ViewCommentDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-comment-details',
            templateUrl: './view-comment-details.component.html',
            styleUrls: ['./view-comment-details.component.scss']
        }),
        __param(1, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], ViewCommentDetailsComponent);
    return ViewCommentDetailsComponent;
}());
exports.ViewCommentDetailsComponent = ViewCommentDetailsComponent;
//# sourceMappingURL=view-comment-details.component.js.map