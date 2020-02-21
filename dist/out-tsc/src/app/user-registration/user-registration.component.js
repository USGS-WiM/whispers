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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var user_service_1 = require("@app/services/user.service");
var role_service_1 = require("@app/services/role.service");
var current_user_service_1 = require("@services/current-user.service");
var organization_service_1 = require("@services/organization.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var UserRegistrationComponent = /** @class */ (function () {
    function UserRegistrationComponent(formBuilder, userRegistrationDialogRef, snackBar, currentUserService, organizationService, roleService, userService, data) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.userRegistrationDialogRef = userRegistrationDialogRef;
        this.snackBar = snackBar;
        this.currentUserService = currentUserService;
        this.organizationService = organizationService;
        this.roleService = roleService;
        this.userService = userService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.passwordPattern = (/^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?\d)(?=.*?[^a-zA-Z0-9])).{12,}$/);
        this.filteredOrganizations = new rxjs_1.ReplaySubject(1);
        this.organizationFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.buildUserRegistrationForm();
    }
    UserRegistrationComponent.prototype.matchEmail = function (AC) {
        var email = AC.get('email').value; // to get value in input tag
        var confirmEmail = AC.get('confirmEmail').value; // to get value in input tag
        if (email !== confirmEmail) {
            AC.get('confirmEmail').setErrors({ matchEmail: true });
        }
        else {
            return null;
        }
    };
    UserRegistrationComponent.prototype.matchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ matchPassword: true });
        }
        else {
            return null;
        }
    };
    UserRegistrationComponent.prototype.getErrorMessage = function (formControlName) {
        return this.userRegistrationForm.get(formControlName).hasError('required') ? 'Please enter a value' :
            this.userRegistrationForm.get(formControlName).hasError('email') ? 'Not a valid email' :
                this.userRegistrationForm.get(formControlName).hasError('matchEmail') ? 'Emails do not match' :
                    '';
    };
    UserRegistrationComponent.prototype.buildUserRegistrationForm = function () {
        this.userRegistrationForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            first_name: '',
            last_name: '',
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            confirmEmail: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required, forms_1.Validators.pattern(this.passwordPattern)
                ])
            ],
            confirmPassword: ['', forms_1.Validators.compose([
                    forms_1.Validators.required, forms_1.Validators.pattern(this.passwordPattern)
                ])
            ],
            organization: null,
            role: null,
            message: '',
            terms: [false, forms_1.Validators.requiredTrue],
        }, {
            validator: [this.matchPassword, this.matchEmail]
        });
    };
    UserRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Registration Type: ' + this.data.registration_type);
        // if reg type is General User, set the terms to true to meet validation, since the terms checkbox not appear for General User reg.
        if (this.data.registration_type === 'public') {
            this.userRegistrationForm.get('terms').setValue(true);
        }
        // get organizations from the OrganizationService
        this.organizationService.getOrganizations()
            .subscribe(function (organizations) {
            _this.organizations = organizations;
            _this.organizations.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the species control
            _this.filteredOrganizations.next(organizations);
            // listen for search field value changes
            _this.organizationFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterOrganization();
            });
        }, function (error) {
            _this.errorMessage = error;
        });
        // get roles from the RoleService
        this.roleService.getRoles()
            .subscribe(function (roles) {
            _this.roles = roles;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserRegistrationComponent.prototype.filterOrganization = function () {
        if (!this.organizations) {
            return;
        }
        // get the search keyword
        var search = this.organizationFilterCtrl.value;
        if (!search) {
            this.filteredOrganizations.next(this.organizations.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredOrganizations.next(this.organizations.filter(function (organization) { return organization.name.toLowerCase().indexOf(search) > -1; }));
    };
    UserRegistrationComponent.prototype.regUsernameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regUsernameTooltip; return string; };
    UserRegistrationComponent.prototype.regFirstNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regFirstNameTooltip; return string; };
    UserRegistrationComponent.prototype.regLastNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regLastNameTooltip; return string; };
    UserRegistrationComponent.prototype.regemailAddressTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regemailAddressTooltip; return string; };
    UserRegistrationComponent.prototype.regPasswordTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regPasswordTooltip; return string; };
    UserRegistrationComponent.prototype.regTermsOfUseTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regTermsOfUseTooltip; return string; };
    UserRegistrationComponent.prototype.regOrganizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regOrganizationTooltip; return string; };
    UserRegistrationComponent.prototype.regRoleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regRoleTooltip; return string; };
    UserRegistrationComponent.prototype.regCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.regCommentTooltip; return string; };
    UserRegistrationComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    UserRegistrationComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        // delete the confirm fields for the actual submission
        delete formValue.confirmEmail;
        delete formValue.confirmPassword;
        delete formValue.terms;
        if (this.data.registration_type === 'public') {
            formValue.role = 7;
            formValue.organization = 1;
        }
        this.userService.createNew(formValue)
            .subscribe(function (event) {
            _this.submitLoading = false;
            _this.openSnackBar('User Registration Successful', 'OK', 5000);
            _this.userRegistrationDialogRef.close();
            // this.currentUserService.updateCurrentUser(event);
            // sessionStorage.first_name = event.first_name;
            // sessionStorage.last_name = event.last_name;
            // sessionStorage.password = sessionStorage.new_password;
            gtag('event', 'click', { 'event_category': 'Users', 'event_label': 'New User Created' });
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. User registration failed. Error message: ' + error, 'OK', 8000);
        });
    };
    UserRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-user-registration',
            templateUrl: './user-registration.component.html',
            styleUrls: ['./user-registration.component.scss']
        }),
        __param(7, core_2.Inject(material_2.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            material_3.MatSnackBar,
            current_user_service_1.CurrentUserService,
            organization_service_1.OrganizationService,
            role_service_1.RoleService,
            user_service_1.UserService, Object])
    ], UserRegistrationComponent);
    return UserRegistrationComponent;
}());
exports.UserRegistrationComponent = UserRegistrationComponent;
//# sourceMappingURL=user-registration.component.js.map