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
var rxjs_1 = require("rxjs");
var DataUpdatedService = /** @class */ (function () {
    function DataUpdatedService() {
        // TODO: make this work as a trigger
        this.refreshTrigger = new rxjs_1.BehaviorSubject('None');
        this.trigger = this.refreshTrigger.asObservable();
    }
    DataUpdatedService.prototype.triggerRefresh = function () {
        this.refreshTrigger.next('refresh');
    };
    DataUpdatedService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DataUpdatedService);
    return DataUpdatedService;
}());
exports.DataUpdatedService = DataUpdatedService;
//# sourceMappingURL=data-updated.service.js.map