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
var app_settings_1 = require("@app/app.settings");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var url_shortening_service_1 = require("@services/url-shortening.service");
var EventDetailsShareComponent = /** @class */ (function () {
    function EventDetailsShareComponent(eventDetailsShareDialogRef, urlShorteningService, data) {
        this.eventDetailsShareDialogRef = eventDetailsShareDialogRef;
        this.urlShorteningService = urlShorteningService;
        this.data = data;
        this.appURL = app_settings_1.APP_SETTINGS.APP_URL;
        this.eventID = this.data.eventID;
        this.shortURL = '';
        this.submitLoading = false;
    }
    EventDetailsShareComponent.prototype.ngOnInit = function () {
    };
    EventDetailsShareComponent.prototype.generateShortURL = function () {
        var _this = this;
        this.shortURL = '';
        this.submitLoading = true;
        this.urlShorteningService.generateShortURL()
            .subscribe(function (response) {
            console.log(response);
            console.log('Shortened URL is: ' + response.response.data.entry[0].short_url);
            _this.shortURL = response.response.data.entry[0].short_url;
            _this.submitLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.submitLoading = false;
        });
    };
    EventDetailsShareComponent = __decorate([
        core_1.Component({
            selector: 'app-event-details-share',
            templateUrl: './event-details-share.component.html',
            styleUrls: ['./event-details-share.component.scss']
        }),
        __param(2, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            url_shortening_service_1.UrlShorteningService, Object])
    ], EventDetailsShareComponent);
    return EventDetailsShareComponent;
}());
exports.EventDetailsShareComponent = EventDetailsShareComponent;
//# sourceMappingURL=event-details-share.component.js.map