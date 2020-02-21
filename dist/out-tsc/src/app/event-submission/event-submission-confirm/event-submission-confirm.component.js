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
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var EventSubmissionConfirmComponent = /** @class */ (function () {
    function EventSubmissionConfirmComponent(data, eventSubmitConfirm) {
        this.data = data;
        this.eventSubmitConfirm = eventSubmitConfirm;
    }
    EventSubmissionConfirmComponent.prototype.ngOnInit = function () {
    };
    EventSubmissionConfirmComponent.prototype.submitEvent = function () {
        this.eventSubmitConfirm.dismiss();
    };
    EventSubmissionConfirmComponent = __decorate([
        core_1.Component({
            selector: 'app-event-submission-confirm',
            templateUrl: './event-submission-confirm.component.html',
            styleUrls: ['./event-submission-confirm.component.scss']
        }),
        __param(0, core_1.Inject(material_2.MAT_BOTTOM_SHEET_DATA)),
        __metadata("design:paramtypes", [Object, material_1.MatBottomSheetRef])
    ], EventSubmissionConfirmComponent);
    return EventSubmissionConfirmComponent;
}());
exports.EventSubmissionConfirmComponent = EventSubmissionConfirmComponent;
//# sourceMappingURL=event-submission-confirm.component.js.map