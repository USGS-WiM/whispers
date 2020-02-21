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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var organization_service_1 = require("@services/organization.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var contact_service_1 = require("@services/contact.service");
var create_contact_service_1 = require("@create-contact/create-contact.service");
var CreateContactComponent = /** @class */ (function () {
    function CreateContactComponent(formBuilder, createContactDialogRef, organizationService, contactService, createContactService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.createContactDialogRef = createContactDialogRef;
        this.organizationService = organizationService;
        this.contactService = contactService;
        this.createContactService = createContactService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.filteredOrganizations = new rxjs_1.ReplaySubject(1);
        this.organizationFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildCreateContactForm();
    }
    CreateContactComponent.prototype.buildCreateContactForm = function () {
        this.createContactForm = this.formBuilder.group({
            first_name: ['', forms_1.Validators.required],
            last_name: ['', forms_1.Validators.required],
            phone: [''],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            title: '',
            position: '',
            organization: null,
            owner_organization: null,
            affiliation: ''
        });
    };
    CreateContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.contact_action === 'create') {
            this.dialogTitle = 'Create New';
            this.action_button_text = 'Submit';
        }
        else if (this.data.contact_action === 'edit') {
            this.dialogTitle = 'Edit';
            this.action_button_text = 'Update';
            // Access the form here and set the value to the objects property/value
            this.createContactForm.get('first_name').setValue(this.data.contact.first_name);
            this.createContactForm.get('last_name').setValue(this.data.contact.last_name);
            this.createContactForm.get('email').setValue(this.data.contact.email);
            this.createContactForm.get('phone').setValue(this.data.contact.phone);
            this.createContactForm.get('title').setValue(this.data.contact.title);
            this.createContactForm.get('position').setValue(this.data.contact.position);
            this.createContactForm.get('affiliation').setValue(this.data.contact.affiliation);
        }
        var contactForm = this.createContactForm;
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
            if (_this.data.contact_action === 'edit') {
                contactForm.get('organization').setValue(_this.data.contact.organization.toString());
            }
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
    };
    CreateContactComponent.prototype.filterOrganization = function () {
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
    CreateContactComponent.prototype.firstNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.firstNameTooltip; return string; };
    CreateContactComponent.prototype.lastNameTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.lastNameTooltip; return string; };
    CreateContactComponent.prototype.emailAddressTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.emailAddressTooltip; return string; };
    CreateContactComponent.prototype.phoneNumberTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.phoneNumberTooltip; return string; };
    CreateContactComponent.prototype.titleTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.titleTooltip; return string; };
    CreateContactComponent.prototype.positionTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.positionTooltip; return string; };
    CreateContactComponent.prototype.organizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.organizationTooltip; return string; };
    CreateContactComponent.prototype.affiliationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.affiliationTooltip; return string; };
    CreateContactComponent.prototype.getErrorMessage = function (formControlName) {
        return this.createContactForm.get(formControlName).hasError('required') ? 'Please enter a value' :
            this.createContactForm.get(formControlName).hasError('email') ? 'Not a valid email' :
                '';
    };
    CreateContactComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    CreateContactComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        if (this.data.contact_action === 'create') {
            this.contactService.create(formValue)
                .subscribe(function (contact) {
                _this.submitLoading = false;
                _this.createContactService.setCreatedContact(contact);
                _this.openSnackBar('Contact Created', 'OK', 5000);
                _this.createContactDialogRef.close();
                gtag('event', 'click', { 'event_category': 'Contacts', 'event_label': 'New Contact Created' });
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.contact_action === 'edit') {
            formValue.id = this.data.contact.id;
            this.contactService.update(formValue)
                .subscribe(function (contact) {
                _this.submitLoading = false;
                _this.createContactService.setCreatedContact(contact);
                _this.openSnackBar('Contact Updated', 'OK', 5000);
                _this.createContactDialogRef.close();
            }, function (error) {
                _this.submitLoading = false;
                _this.openSnackBar('Error. Contact not Created. Error message: ' + error, 'OK', 8000);
            });
        }
    };
    CreateContactComponent = __decorate([
        core_1.Component({
            selector: 'app-create-contact',
            templateUrl: './create-contact.component.html',
            styleUrls: ['./create-contact.component.scss']
        }),
        __param(6, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            organization_service_1.OrganizationService,
            contact_service_1.ContactService,
            create_contact_service_1.CreateContactService,
            material_2.MatSnackBar, Object])
    ], CreateContactComponent);
    return CreateContactComponent;
}());
exports.CreateContactComponent = CreateContactComponent;
//# sourceMappingURL=create-contact.component.js.map