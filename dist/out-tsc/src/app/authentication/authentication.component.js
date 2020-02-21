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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var authentication_service_1 = require("@services/authentication.service");
var current_user_service_1 = require("@services/current-user.service");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var AuthenticationComponent = /** @class */ (function () {
    function AuthenticationComponent(formBuilder, authenticationService, authenticationDialogRef, currentUserService, router, route, snackBar) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.authenticationDialogRef = authenticationDialogRef;
        this.currentUserService = currentUserService;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.authenticationErrorFlag = false;
        this.hide = true;
        this.submitLoading = false;
        this.loginForm = formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    AuthenticationComponent.prototype.ngOnInit = function () {
    };
    AuthenticationComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AuthenticationComponent.prototype.getErrorMessage = function (formControlName) {
        return this.loginForm.get(formControlName).hasError('required') ? 'Please enter a value' :
            this.loginForm.get(formControlName).hasError('email') ? 'Not a valid email' :
                '';
    };
    AuthenticationComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        if (sessionStorage.getItem('username')) {
            this.authenticationService.logout();
        }
        this.authenticationService.login(formValue.username, formValue.password)
            .subscribe(function (user) {
            _this.submitLoading = false;
            _this.authenticationDialogRef.close();
            _this.openSnackBar('Successfully logged in!', 'OK', 5000);
            location.reload();
        }, function (error) {
            _this.submitLoading = false;
            _this.authenticationErrorFlag = true;
            if (error.status === 403) {
                _this.openSnackBar('Invalid username and/or password. Please try again.', 'OK', 8000);
            }
            else {
                _this.openSnackBar('Error. Failed to login. Error message: ' + error, 'OK', 8000);
            }
        });
    };
    AuthenticationComponent.prototype.onLogout = function () {
        this.authenticationService.logout();
        if (this.router.url === '/home') {
            location.reload();
        }
        else {
            this.router.navigate(["../home/"], { relativeTo: this.route });
        }
    };
    AuthenticationComponent = __decorate([
        core_1.Component({
            selector: 'app-authentication',
            templateUrl: './authentication.component.html',
            styleUrls: ['./authentication.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            authentication_service_1.AuthenticationService,
            material_1.MatDialogRef,
            current_user_service_1.CurrentUserService,
            router_1.Router,
            router_1.ActivatedRoute,
            material_2.MatSnackBar])
    ], AuthenticationComponent);
    return AuthenticationComponent;
}());
exports.AuthenticationComponent = AuthenticationComponent;
//# sourceMappingURL=authentication.component.js.map