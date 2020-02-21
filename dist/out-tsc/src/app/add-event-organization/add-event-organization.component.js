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
var material_1 = require("@angular/material");
var operators_1 = require("rxjs/operators");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var organization_service_1 = require("@services/organization.service");
var event_organization_service_1 = require("@services/event-organization.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var AddEventOrganizationComponent = /** @class */ (function () {
    function AddEventOrganizationComponent(formBuilder, addEventOrganizationDialogRef, organizationService, eventOrganizationService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.addEventOrganizationDialogRef = addEventOrganizationDialogRef;
        this.organizationService = organizationService;
        this.eventOrganizationService = eventOrganizationService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.existingEventOrgs = [];
        this.filteredOrganizations = new rxjs_1.ReplaySubject(1);
        this.organizationFilterCtrl = new forms_1.FormControl();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.submitLoading = false;
        this.buildAddEventOrganizationForm();
    }
    AddEventOrganizationComponent.prototype.buildAddEventOrganizationForm = function () {
        this.addEventOrganizationForm = this.formBuilder.group({
            organization: null
        });
    };
    AddEventOrganizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventID = this.data.event_id;
        this.existingEventOrgs = this.data.existing_event_orgs;
        // populate the search select options for the organization control
        this.filteredOrganizations.next(this.data.organizations);
        // listen for search field value changes
        this.organizationFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterOrganization();
        });
    };
    AddEventOrganizationComponent.prototype.contactOrganizationTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.contactOrganizationTooltip; return string; };
    AddEventOrganizationComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AddEventOrganizationComponent.prototype.filterOrganization = function () {
        if (!this.data.organizations) {
            return;
        }
        // get the search keyword
        var search = this.organizationFilterCtrl.value;
        if (!search) {
            this.filteredOrganizations.next(this.data.organizations.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredOrganizations.next(
        // tslint:disable-next-line:max-line-length
        this.data.organizations.filter(function (organization) { return organization.name.toLowerCase().indexOf(search) > -1; }));
    };
    AddEventOrganizationComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        var orgIDArray = [];
        for (var _i = 0, _a = this.existingEventOrgs; _i < _a.length; _i++) {
            var eventOrg = _a[_i];
            orgIDArray.push(eventOrg.organization.id);
        }
        var eventOrgSet = new Set(orgIDArray);
        if (eventOrgSet.has(formValue.organization)) {
            this.submitLoading = false;
            this.openSnackBar('The selected organization is already associated with this event.', 'OK', 8000);
            return;
        }
        formValue.event = this.data.event_id;
        this.eventOrganizationService.create(formValue)
            .subscribe(function (contact) {
            _this.submitLoading = false;
            _this.openSnackBar('Event Organization Added', 'OK', 5000);
            _this.addEventOrganizationDialogRef.close();
            // place holder for google analytics
            // gtag('event', 'click', {'event_category': 'Event Organization','event_label': 'Event Organization Added, Organization: ' + contact.organization});
        }, function (error) {
            _this.submitLoading = false;
            _this.openSnackBar('Error. Event organization not added. Error message: ' + error, 'OK', 8000);
        });
    };
    AddEventOrganizationComponent = __decorate([
        core_1.Component({
            selector: 'app-add-event-organization',
            templateUrl: './add-event-organization.component.html',
            styleUrls: ['./add-event-organization.component.scss']
        }),
        __param(5, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            organization_service_1.OrganizationService,
            event_organization_service_1.EventOrganizationService,
            material_2.MatSnackBar, Object])
    ], AddEventOrganizationComponent);
    return AddEventOrganizationComponent;
}());
exports.AddEventOrganizationComponent = AddEventOrganizationComponent;
//# sourceMappingURL=add-event-organization.component.js.map