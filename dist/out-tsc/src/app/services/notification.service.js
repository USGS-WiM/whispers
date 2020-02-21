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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var app_settings_1 = require("@app/app.settings");
var NotificationService = /** @class */ (function () {
    function NotificationService(http) {
        this.http = http;
    }
    // uses the newer HttpClient method
    NotificationService.prototype.getUserNotifications = function () {
        return this.http.get(app_settings_1.APP_SETTINGS.NOTIFICATIONS_URL, {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
        }).pipe(operators_1.map(function (res) {
            return res.results;
        }));
    };
    NotificationService.prototype.updateNotification = function (body) {
        return this.http.patch(app_settings_1.APP_SETTINGS.NOTIFICATIONS_URL + body.id + '/', body, {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
        }).pipe(operators_1.map(function (res) {
            return res.results;
        }));
    };
    NotificationService.prototype.updateUserStandardNotificationSettings = function (body) {
        return this.http.patch(app_settings_1.APP_SETTINGS.USERS_URL + body.id + '/', body, {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
        }).pipe(operators_1.map(function (res) {
            return res.results;
        }));
    };
    NotificationService.prototype.deleteNotification = function (id) {
        return this.http.delete(app_settings_1.APP_SETTINGS.NOTIFICATIONS_URL + id + '/', {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
        }).pipe(operators_1.map(function (res) {
            return res.results;
        }));
    };
    NotificationService.prototype.bulkUpdateNotifications = function (updateObject) {
        return this.http.post(app_settings_1.APP_SETTINGS.NOTIFICATIONS_URL + 'bulk_update/', updateObject, {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS
        }).pipe(operators_1.map(function (res) {
            return res.results;
        }));
    };
    NotificationService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.throwError(JSON.stringify(error.json()) || 'Server error');
    };
    NotificationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map