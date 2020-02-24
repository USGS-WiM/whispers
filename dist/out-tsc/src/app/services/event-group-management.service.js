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
var EventGroupManagementService = /** @class */ (function () {
    function EventGroupManagementService() {
        this.eventGroupReload = new rxjs_1.Subject();
        this.selectedEventGroup = new rxjs_1.Subject();
    }
    EventGroupManagementService.prototype.setEventGroupReload = function () {
        this.eventGroupReload.next();
    };
    EventGroupManagementService.prototype.getEventGroupReload = function () {
        return this.eventGroupReload.asObservable();
    };
    EventGroupManagementService.prototype.setSelectedEventGroup = function (eventGroupID) {
        this.selectedEventGroup.next(eventGroupID);
    };
    EventGroupManagementService.prototype.getSelectedEventGroup = function () {
        return this.selectedEventGroup.asObservable();
    };
    EventGroupManagementService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], EventGroupManagementService);
    return EventGroupManagementService;
}());
exports.EventGroupManagementService = EventGroupManagementService;
//# sourceMappingURL=event-group-management.service.js.map