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
var material_3 = require("@angular/material");
var user_service_1 = require("@services/user.service");
var current_user_service_1 = require("@services/current-user.service");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(formBuilder, editUserDialogRef, userService, currentUserService, snackBar, data) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.editUserDialogRef = editUserDialogRef;
        this.userService = userService;
        this.currentUserService = currentUserService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.showChangePassword = false;
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.buildEditUserForm();
    }
    EditUserComponent.prototype.matchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ matchPassword: true });
        }
        else {
            return null;
        }
    };
    EditUserComponent.prototype.buildEditUserForm = function () {
        this.editUserForm = this.formBuilder.group({
            id: this.currentUser.id,
            first_name: this.currentUser.first_name,
            last_name: this.currentUser.last_name,
            password: '',
            confirmPassword: '',
        }, {
            validator: this.matchPassword
        });
    };
    EditUserComponent.prototype.ngOnInit = function () {
    };
    EditUserComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EditUserComponent.prototype.updateUser = function (formValue) {
        var _this = this;
        var userUpdates = {
            id: formValue.id,
            first_name: formValue.first_name,
            last_name: formValue.last_name,
            password: formValue.password
        };
        // if no value present in password, delete that from the object for patching
        if (formValue.password === '' || this.showChangePassword === false) {
            //delete userUpdates.password;
            userUpdates.password = sessionStorage.password;
            sessionStorage.new_password = sessionStorage.password;
        }
        else {
            sessionStorage.new_password = formValue.password;
        }
        this.userService.updateUser(userUpdates)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.openSnackBar('Your user details were updated', 'OK', 5000);
            _this.editUserDialogRef.close();
            _this.currentUserService.updateCurrentUser(event);
            sessionStorage.first_name = event.first_name;
            sessionStorage.last_name = event.last_name;
            sessionStorage.password = sessionStorage.new_password;
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Update not completed. Error message: ' + error, 'OK', 8000);
        });
    };
    EditUserComponent.prototype.checkChangePassword = function (event) {
        if (event.target.checked === true) {
            this.showChangePassword = true;
        }
        else {
            this.showChangePassword = false;
        }
    };
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.scss']
        }),
        __param(5, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            user_service_1.UserService,
            current_user_service_1.CurrentUserService,
            material_3.MatSnackBar, Object])
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map