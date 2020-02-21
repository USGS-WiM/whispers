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
var contact_type_service_1 = require("@services/contact-type.service");
var contact_service_1 = require("@services/contact.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var data_updated_service_1 = require("@app/services/data-updated.service");
var event_location_contact_service_1 = require("@app/services/event-location-contact.service");
var AddEventLocationContactComponent = /** @class */ (function () {
    function AddEventLocationContactComponent(formBuilder, dialog, addEventLocationContactDialogRef, contactTypeService, contactService, eventLocationContactService, dataUpdatedService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.addEventLocationContactDialogRef = addEventLocationContactDialogRef;
        this.contactTypeService = contactTypeService;
        this.contactService = contactService;
        this.eventLocationContactService = eventLocationContactService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.filteredContacts = new rxjs_1.ReplaySubject(1);
        this.contactFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildEventLocationContactForm();
    }
    AddEventLocationContactComponent.prototype.buildEventLocationContactForm = function () {
        this.eventLocationContactForm = this.formBuilder.group({
            event_location: null,
            contact: null,
            contact_type: null,
        });
    };
    AddEventLocationContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventLocationContactForm.get('event_location').setValue(this.data.event_location_id);
        this.userContacts = this.data.userContacts;
        // populate the search select options for the contact control
        this.filteredContacts.next(this.data.userContacts);
        // listen for search field value changes
        this.contactFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterContact();
        });
        // get contact types from the ContactTypeService
        this.contactTypeService.getContactTypes()
            .subscribe(function (contactTypes) {
            _this.contactTypes = contactTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    AddEventLocationContactComponent.prototype.filterContact = function () {
        if (!this.data.userContacts) {
            return;
        }
        // get the search keyword
        var search = this.contactFilterCtrl.value;
        if (!search) {
            this.filteredContacts.next(this.data.userContacts.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredContacts.next(
        // tslint:disable-next-line:max-line-length
        this.data.userContacts.filter(function (contact) { return contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1; }));
    };
    AddEventLocationContactComponent.prototype.contactPersonTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactPersonTooltip; return string; };
    AddEventLocationContactComponent.prototype.contactTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactTypeTooltip; return string; };
    AddEventLocationContactComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AddEventLocationContactComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        this.eventLocationContactService.create(formValue)
            .subscribe(function (comment) {
            _this.submitLoading = false;
            _this.openSnackBar('Contact association successfully saved', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
            _this.addEventLocationContactDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Event Location Details', 'event_label': 'Contact Association Added' });
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Contact association not saved. Error message: ' + error, 'OK', 8000);
        });
    };
    AddEventLocationContactComponent = __decorate([
        core_1.Component({
            selector: 'app-add-event-location-contact',
            templateUrl: './add-event-location-contact.component.html',
            styleUrls: ['./add-event-location-contact.component.scss']
        }),
        __param(8, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            material_1.MatDialogRef,
            contact_type_service_1.ContactTypeService,
            contact_service_1.ContactService,
            event_location_contact_service_1.EventLocationContactService,
            data_updated_service_1.DataUpdatedService,
            material_2.MatSnackBar, Object])
    ], AddEventLocationContactComponent);
    return AddEventLocationContactComponent;
}());
exports.AddEventLocationContactComponent = AddEventLocationContactComponent;
//# sourceMappingURL=add-event-location-contact.component.js.map