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
var SearchDialogService = /** @class */ (function () {
    function SearchDialogService() {
        this.searchQuery = new rxjs_1.Subject();
        this.displayQuery = new rxjs_1.Subject();
        //this.searchQuery.next(APP_SETTINGS.DEFAULT_SEARCH_QUERY);
        //this.displayQuery.next(APP_SETTINGS.DEFAULT_DISPLAY_QUERY);
    }
    SearchDialogService.prototype.setSearchQuery = function (query) {
        this.searchQuery.next(query);
    };
    SearchDialogService.prototype.getSearchQuery = function () {
        return this.searchQuery.asObservable();
    };
    SearchDialogService.prototype.setDisplayQuery = function (query) {
        this.displayQuery.next(query);
        sessionStorage.setItem('currentDisplayQuery', JSON.stringify(query));
    };
    SearchDialogService.prototype.getDisplayQuery = function () {
        return this.displayQuery.asObservable();
    };
    SearchDialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SearchDialogService);
    return SearchDialogService;
}());
exports.SearchDialogService = SearchDialogService;
//# sourceMappingURL=search-dialog.service.js.map