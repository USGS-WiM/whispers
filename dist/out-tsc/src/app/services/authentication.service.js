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
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_settings_1 = require("../app.settings");
var current_user_service_1 = require("@services/current-user.service");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(_http, router, currentUserService) {
        this._http = _http;
        this.router = router;
        this.currentUserService = currentUserService;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            })
        });
        var self = this;
        return this._http.post(app_settings_1.APP_SETTINGS.AUTH_URL, null, options).pipe(operators_1.map(function (res) {
            self.user = res.json();
            // if (self.user.is_staff || self.user.username == 'testuser') {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('first_name', self.user.first_name);
            sessionStorage.setItem('last_name', self.user.last_name);
            sessionStorage.setItem('email', self.user.email);
            sessionStorage.setItem('is_staff', self.user.is_staff.toString());
            sessionStorage.setItem('is_superuser', self.user.is_superuser.toString());
            sessionStorage.setItem('is_active', self.user.is_active.toString());
            sessionStorage.setItem('role', self.user.role.toString());
            sessionStorage.setItem('organization', self.user.organization.toString());
            sessionStorage.setItem('last_login', self.user.last_login);
            sessionStorage.setItem('active_key', self.user.active_key);
            sessionStorage.setItem('user_status', self.user.user_status);
            sessionStorage.setItem('currentUser', JSON.stringify(self.user));
            // self.userLoggedIn$.emit(res);
            // this.currentUser.emit(res);
            _this.currentUserService.updateCurrentUser(self.user);
            // } else {
            //   alert('This user is not authorized!');
            // }
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // this.router.navigate(['/login']);
        // this.router.navigateByUrl('login');
        this.user = undefined;
        this.currentUserService.updateCurrentUser({ 'username': '' });
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('is_staff');
        sessionStorage.removeItem('is_superuser');
        sessionStorage.removeItem('is_active');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('organization');
        sessionStorage.removeItem('last_login');
        sessionStorage.removeItem('active_key');
        sessionStorage.removeItem('user_status');
        sessionStorage.removeItem('currentUser');
        return rxjs_1.of(true);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            current_user_service_1.CurrentUserService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map