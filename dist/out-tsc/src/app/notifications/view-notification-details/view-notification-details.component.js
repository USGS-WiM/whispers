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
var platform_browser_1 = require("@angular/platform-browser");
var ViewNotificationDetailsComponent = /** @class */ (function () {
    function ViewNotificationDetailsComponent(viewNotificationDetailsDialogRef, domSanitizer, data) {
        this.viewNotificationDetailsDialogRef = viewNotificationDetailsDialogRef;
        this.domSanitizer = domSanitizer;
        this.data = data;
    }
    ViewNotificationDetailsComponent.prototype.ngOnInit = function () { };
    // neccesary to sanitize the HTML for some Angular HTML injection security protections
    ViewNotificationDetailsComponent.prototype.sanitizeHTML = function (html) {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    };
    ViewNotificationDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-notification-details',
            templateUrl: './view-notification-details.component.html',
            styleUrls: ['./view-notification-details.component.scss']
        }),
        __param(2, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            platform_browser_1.DomSanitizer, Object])
    ], ViewNotificationDetailsComponent);
    return ViewNotificationDetailsComponent;
}());
exports.ViewNotificationDetailsComponent = ViewNotificationDetailsComponent;
//# sourceMappingURL=view-notification-details.component.js.map