"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*
 * Retrieve display value for a field
 * Accepts the field name and the field id
 * returns the appropriate display value for UI display
 * Usage:
 *  value | displayValue:sourceArray
 * Example:
 *  {{sample.sample_type | displayValue:'name':this.sampleTypes}}
 * formats to: "Performance Evaluation"
 */
var DisplayValuePipe = /** @class */ (function () {
    function DisplayValuePipe() {
    }
    DisplayValuePipe.prototype.transform = function (value, displayProperty, sourceArray) {
        var displayValue;
        if (value === null || sourceArray === undefined) {
            displayValue = '';
        }
        else {
            for (var i = 0; i < sourceArray.length; i++) {
                if (sourceArray[i].id === parseInt(value, 10)) {
                    displayValue = sourceArray[i][displayProperty];
                }
            }
        }
        return displayValue;
    };
    DisplayValuePipe = __decorate([
        core_1.Pipe({
            name: 'displayValue'
        })
    ], DisplayValuePipe);
    return DisplayValuePipe;
}());
exports.DisplayValuePipe = DisplayValuePipe;
//# sourceMappingURL=display-value.pipe.js.map