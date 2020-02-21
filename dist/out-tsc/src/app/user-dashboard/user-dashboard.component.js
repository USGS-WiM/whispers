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
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var router_1 = require("@angular/router");
var material_3 = require("@angular/material");
var contact_service_1 = require("@app/services/contact.service");
var create_contact_component_1 = require("@create-contact/create-contact.component");
var current_user_service_1 = require("@services/current-user.service");
var event_service_1 = require("@services/event.service");
var app_settings_1 = require("@app/app.settings");
var organization_service_1 = require("@services/organization.service");
var role_service_1 = require("@services/role.service");
var confirm_component_1 = require("@confirm/confirm.component");
var edit_user_component_1 = require("@app/edit-user/edit-user.component");
var new_lookup_request_component_1 = require("@app/new-lookup-request/new-lookup-request.component");
var bulk_upload_component_1 = require("@app/bulk-upload/bulk-upload.component");
var UserDashboardComponent = /** @class */ (function () {
    function UserDashboardComponent(_eventService, _contactService, organizationService, currentUserService, roleService, dialog, router, route, snackBar) {
        var _this = this;
        this._eventService = _eventService;
        this._contactService = _contactService;
        this.organizationService = organizationService;
        this.currentUserService = currentUserService;
        this.roleService = roleService;
        this.dialog = dialog;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.contactsLoading = false;
        this.organizations = [];
        this.roles = [];
        this.username = app_settings_1.APP_SETTINGS.API_USERNAME;
        this.contactDisplayedColumns = [
            'select',
            'last_name',
            'first_name',
            'phone_number',
            'email_address',
            'organization',
            'permission_source'
        ];
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        var navigation = this.router.getCurrentNavigation();
        var state = navigation.extras.state;
        if (state !== undefined) {
            this.selectedTab = state.tab;
        }
    }
    UserDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // const events: EventSummary[] = this._eventService.getTestData();
        var initialSelection = [];
        var allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(allowMultiSelect, initialSelection);
        this.contactsLoading = true;
        this._contactService.getContacts()
            .subscribe(function (usercontacts) {
            _this.contacts = usercontacts;
            _this.contactsDataSource = new material_2.MatTableDataSource(_this.contacts);
            _this.contactsDataSource.paginator = _this.contactPaginator;
            _this.contactsDataSource.sort = _this.contactSort;
            _this.contactsLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.contactsLoading = false;
        });
        // get organizations from the OrganizationService
        this.organizationService.getOrganizations()
            .subscribe(function (organizations) {
            _this.organizations = organizations;
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
        this.contactsDataSource = new material_2.MatTableDataSource(this.contacts);
        // set selected tab
        // this.selectedTab = 0;
    };
    UserDashboardComponent.prototype._setDataSource = function (indexNumber) {
        var _this = this;
        setTimeout(function () {
            switch (indexNumber) {
                case 0:
                    !_this.contactsDataSource.paginator ? _this.contactsDataSource.paginator = _this.contactPaginator : null;
                    break;
            }
        });
    };
    UserDashboardComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    UserDashboardComponent.prototype.openCreateContactDialog = function () {
        var _this = this;
        this.createContactDialogRef = this.dialog.open(create_contact_component_1.CreateContactComponent, {
            minWidth: '75%',
            disableClose: true,
            data: {
                contact_action: 'create'
            }
        });
        this.createContactDialogRef.afterClosed()
            .subscribe(function () {
            _this._contactService.getContacts()
                .subscribe(function (usercontacts) {
                _this.selection.clear();
                _this.contacts = usercontacts;
                _this.contactsDataSource = new material_2.MatTableDataSource(_this.contacts);
                _this.contactsDataSource.paginator = _this.contactPaginator;
                _this.contactsDataSource.sort = _this.contactSort;
            }, function (error) {
                _this.errorMessage = error;
            });
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserDashboardComponent.prototype.openEditContactDialog = function () {
        // Add code to determine how many are selected
        var _this = this;
        if (this.selection.selected.length > 1) {
            alert('you have too many contacts selected for edit. select only one.');
        }
        else if (this.selection.selected.length === 1) {
            this.createContactDialogRef = this.dialog.open(create_contact_component_1.CreateContactComponent, {
                minWidth: '60%',
                data: {
                    contact_action: 'edit',
                    contact: this.selection.selected[0]
                }
                // height: '75%'
            });
            // Add listener here that updates contacts when dialog is closed
            this.createContactDialogRef.afterClosed()
                .subscribe(function () {
                _this._contactService.getContacts()
                    .subscribe(function (usercontacts) {
                    _this.selection.clear();
                    _this.contacts = usercontacts;
                    _this.contactsDataSource = new material_2.MatTableDataSource(_this.contacts);
                    _this.contactsDataSource.paginator = _this.contactPaginator;
                    _this.contactsDataSource.sort = _this.contactSort;
                }, function (error) {
                    _this.errorMessage = error;
                });
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    UserDashboardComponent.prototype.openContactRemoveConfirm = function () {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Contact',
                message: 'Are you sure you want to delete the contact?',
                confirmButtonText: 'Yes, Delete',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.removeContact();
            }
        });
    };
    UserDashboardComponent.prototype.openEditUserDialog = function () {
        var _this = this;
        // Open dialog for adding event diagnosis
        this.editUserDialogRef = this.dialog.open(edit_user_component_1.EditUserComponent, {
            data: {}
        });
        this.editUserDialogRef.afterClosed()
            .subscribe(function () {
            // do something after close
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserDashboardComponent.prototype.openNewLookupRequestDialog = function () {
        var _this = this;
        // Open dialog for requesting new lookup value
        this.newLookupRequestDialogRef = this.dialog.open(new_lookup_request_component_1.NewLookupRequestComponent, {
            data: {
                title: 'Request New Item',
                titleIcon: 'add_circle',
                showCancelButton: true,
                action_button_text: 'Submit request',
                actionButtonIcon: 'send'
            }
        });
        this.newLookupRequestDialogRef.afterClosed()
            .subscribe(function () {
            // do something after close
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserDashboardComponent.prototype.openBulkUploadDialog = function () {
        var _this = this;
        // open dialog for bulk upload
        this.bulkUploadDialogRef = this.dialog.open(bulk_upload_component_1.BulkUploadComponent, {
            // minWidth: '50%',
            data: {
                title: 'Bulk Data Upload',
                titleIcon: 'cloud_upload',
                showCancelButton: true
            }
        });
        this.bulkUploadDialogRef.afterClosed()
            .subscribe(function () {
            // do something after close
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    UserDashboardComponent.prototype.removeContact = function () {
        var _this = this;
        if (this.selection.selected.length > 1) {
            alert('you have too many contacts selected for removal. select only one.');
        }
        else if (this.selection.selected.length === 1) {
            this._contactService.remove(this.selection.selected[0])
                .subscribe(function () {
                _this._contactService.getContacts()
                    .subscribe(function (usercontacts) {
                    _this.selection.clear();
                    _this.contacts = usercontacts;
                    _this.contactsDataSource = new material_2.MatTableDataSource(_this.contacts);
                    _this.contactsDataSource.paginator = _this.contactPaginator;
                    _this.contactsDataSource.sort = _this.contactSort;
                    _this.openSnackBar('Contact Removed', 'OK', 5000);
                }, function (error) {
                    _this.errorMessage = error;
                });
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    // From angular material table sample on material api reference site
    /** Whether the number of selected elements matches the total number of rows. */
    UserDashboardComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.contactsDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    UserDashboardComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.contactsDataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    UserDashboardComponent.prototype.formatPhone = function (phone) {
        var formatted_phone = '';
        if (phone != null && phone.length == 10) {
            var temp_phone = phone.split('');
            formatted_phone = '(' + temp_phone.slice(0, 3).join('') + ') ' + temp_phone.slice(3, 6).join('') + '-' + temp_phone.slice(6, 10).join('');
        }
        else {
            formatted_phone = phone;
        }
        return formatted_phone;
    };
    __decorate([
        core_1.ViewChild('eventPaginator'),
        __metadata("design:type", material_2.MatPaginator)
    ], UserDashboardComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild('eventSort'),
        __metadata("design:type", material_2.MatSort)
    ], UserDashboardComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatPaginator),
        __metadata("design:type", material_2.MatPaginator)
    ], UserDashboardComponent.prototype, "contactPaginator", void 0);
    __decorate([
        core_1.ViewChild(material_2.MatSort),
        __metadata("design:type", material_2.MatSort)
    ], UserDashboardComponent.prototype, "contactSort", void 0);
    UserDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-user-dashboard',
            templateUrl: './user-dashboard.component.html',
            styleUrls: ['./user-dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [event_service_1.EventService,
            contact_service_1.ContactService,
            organization_service_1.OrganizationService,
            current_user_service_1.CurrentUserService,
            role_service_1.RoleService,
            material_1.MatDialog,
            router_1.Router,
            router_1.ActivatedRoute,
            material_3.MatSnackBar])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}());
exports.UserDashboardComponent = UserDashboardComponent;
//# sourceMappingURL=user-dashboard.component.js.map