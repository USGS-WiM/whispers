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
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var about_component_1 = require("@about/about.component");
var authentication_component_1 = require("@authentication/authentication.component");
var browser_warning_component_1 = require("@browser-warning/browser-warning.component");
var current_user_service_1 = require("@services/current-user.service");
var app_settings_1 = require("@app/app.settings");
var authentication_service_1 = require("@app/services/authentication.service");
var app_utilities_1 = require("@app/app.utilities");
var notification_service_1 = require("@services/notification.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, route, dialog, currentUserService, authenticationService, notificationService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.dialog = dialog;
        this.currentUserService = currentUserService;
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
        this.title = 'app';
        this.whispersVersion = '';
        this.bannerWarning = '';
        this.bannerTextColor = '';
        this.firstTenNotifications = [];
        this.dummyNotifications = app_utilities_1.APP_UTILITIES.dummyData;
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.whispersVersion = app_settings_1.APP_SETTINGS.VERSION;
        // this.bannerWarning = APP_SETTINGS.BANNER_WARNING;
        // this.bannerTextColor = APP_SETTINGS.BANNER_TEXT_COLOR;
        // this.isLoggedIn = APP_SETTINGS.IS_LOGGEDIN;
        // if (sessionStorage.getItem('username') === '' || sessionStorage.getItem('username') === undefined) {
        //   this.currentUserService.updateCurrentUser({
        //     'username': ''
        //   });
        // }
        if (sessionStorage.getItem('currentUser')) {
            var currentUserObj = JSON.parse(sessionStorage.getItem('currentUser'));
            this.currentUserService.updateCurrentUser(currentUserObj);
        }
        else {
            this.currentUserService.updateCurrentUser({
                'first_name': '',
                'last_name': '',
                'username': ''
            });
        }
        if (/msie\s|trident\/\//i.test(window.navigator.userAgent)) {
            // if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
            this.openBrowserWarningDialog();
        }
        // if ((!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password'))) {
        //   this.currentUserService.updateCurrentUser({
        //     'first_name': sessionStorage.getItem('first_name'),
        //     'last_name': sessionStorage.getItem('last_name')
        //   });
        // } else {
        //   this.currentUserService.updateCurrentUser({
        //     'first_name': '',
        //     'last_name': '',
        //     'username': ''
        //   });
        // }
        this.notificationService.getUserNotifications()
            .subscribe(function (notifications) {
            _this.userNotifications = notifications;
            _this.notificationCount = _this.userNotifications.length;
            _this.previewNotifications = _this.userNotifications.slice(0, 10);
            // if (this.userNotifications.length > 10) {
            //   this.previewNotifications = this.userNotifications.slice(0, 10);
            // } else {
            //   this.previewNotifications = this.userNotifications;
            // }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    AppComponent.prototype.openUserDashboard = function () {
        this.router.navigate(["../userdashboard/"], { relativeTo: this.route });
    };
    AppComponent.prototype.openAboutDialog = function () {
        this.aboutDialogRef = this.dialog.open(about_component_1.AboutComponent, {});
    };
    AppComponent.prototype.openBrowserWarningDialog = function () {
        this.browserWarningDialogRef = this.dialog.open(browser_warning_component_1.BrowserWarningComponent, {});
    };
    AppComponent.prototype.logout = function () {
        if (this.router.url === '/home') {
            location.reload();
        }
        else {
            this.router.navigate(["../home/"], { relativeTo: this.route });
        }
        this.authenticationService.logout();
    };
    AppComponent.prototype.openAuthenticationDialog = function () {
        this.authenticationDialogRef = this.dialog.open(authentication_component_1.AuthenticationComponent, {
        // minWidth: '60%'
        // disableClose: true, data: {
        //   query: this.currentDisplayQuery
        // }
        // height: '75%'
        });
    };
    AppComponent.prototype.navigateToHome = function () {
        this.router.navigate(["../home/"], { relativeTo: this.route });
    };
    AppComponent.prototype.navigateToEventSubmit = function () {
        this.router.navigate(["../eventsubmission/"], { relativeTo: this.route });
    };
    AppComponent.prototype.navigateNotificationSelect = function (event) {
        if (!event) {
            // Some notifications need to take the user to the user dashboard
            // for now, to the notifications tab (to be later developed to higher sophistication)
            // 6 is the index number  for the notifications tab
            var tabSpecification = { state: { tab: 6 } };
            this.router.navigate(["../userdashboard/"], tabSpecification);
            // the old way, sans tab specification
            // this.router.navigate([`../userdashboard/`], { relativeTo: this.route });
        }
        else {
            this.router.navigate(["../event/" + event], { relativeTo: this.route });
        }
    };
    // Scroll to top on each route change
    AppComponent.prototype.onActivate = function (event) {
        var scrollToTop = window.setInterval(function () {
            var pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 50); // how far to scroll on each step
            }
            else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog,
            current_user_service_1.CurrentUserService,
            authentication_service_1.AuthenticationService,
            notification_service_1.NotificationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map