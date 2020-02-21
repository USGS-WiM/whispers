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
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var app_settings_1 = require("@app/app.settings");
var CommentService = /** @class */ (function () {
    function CommentService(http) {
        this.http = http;
    }
    CommentService.prototype.create = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.AUTH_JSON_HEADERS
        });
        return this.http.post(app_settings_1.APP_SETTINGS.COMMENTS_URL, formValue, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    CommentService.prototype.delete = function (id) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
        return this.http.delete(app_settings_1.APP_SETTINGS.COMMENTS_URL + id + '/', options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    CommentService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.throwError(JSON.stringify(error.json()) || 'Server error');
    };
    CommentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map