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
var BrowserWarningComponent = /** @class */ (function () {
    function BrowserWarningComponent(browserWarningDialogRef) {
        this.browserWarningDialogRef = browserWarningDialogRef;
    }
    BrowserWarningComponent.prototype.ngOnInit = function () { };
    BrowserWarningComponent = __decorate([
        core_1.Component({
            selector: 'app-browser-warning',
            templateUrl: './browser-warning.component.html',
            styleUrls: ['./browser-warning.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef])
    ], BrowserWarningComponent);
    return BrowserWarningComponent;
}());
exports.BrowserWarningComponent = BrowserWarningComponent;
//# sourceMappingURL=browser-warning.component.js.map