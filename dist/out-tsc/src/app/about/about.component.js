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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var app_settings_1 = require("@app/app.settings");
var AboutComponent = /** @class */ (function () {
    function AboutComponent(aboutDialogRef) {
        this.aboutDialogRef = aboutDialogRef;
        this.apiRoot = app_settings_1.APP_SETTINGS.API_ROOT;
    }
    AboutComponent.prototype.ngOnInit = function () {
        gtag('event', 'click', { 'event_category': 'About', 'event_label': 'About Modal Opened' });
    };
    AboutComponent.prototype.openMetadataLink = function () {
        window.open(app_settings_1.APP_SETTINGS.WHISPERS_METADATA_URL, '_blank');
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: './about.component.html',
            styleUrls: ['./about.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map