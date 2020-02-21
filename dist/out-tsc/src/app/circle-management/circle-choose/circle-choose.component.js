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
var forms_1 = require("@angular/forms/");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var CircleChooseComponent = /** @class */ (function () {
    function CircleChooseComponent(circleChooseDialogRef, data) {
        this.circleChooseDialogRef = circleChooseDialogRef;
        this.data = data;
        this.circleControl = new forms_1.FormControl();
    }
    CircleChooseComponent.prototype.ngOnInit = function () {
        this.userCircles = this.data.userCircles;
        this.title = 'Choose Circle';
        this.titleIcon = 'group';
        this.actionButtonText = 'Done';
        this.actionButtonIcon = 'check';
    };
    CircleChooseComponent.prototype.onSubmit = function (selectedCircle) {
        var result = selectedCircle;
        this.circleChooseDialogRef.close(result);
    };
    CircleChooseComponent = __decorate([
        core_1.Component({
            selector: 'app-circle-choose',
            templateUrl: './circle-choose.component.html',
            styleUrls: ['./circle-choose.component.scss']
        }),
        __param(1, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], CircleChooseComponent);
    return CircleChooseComponent;
}());
exports.CircleChooseComponent = CircleChooseComponent;
//# sourceMappingURL=circle-choose.component.js.map