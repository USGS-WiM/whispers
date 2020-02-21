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
var keycodes_1 = require("@angular/cdk/keycodes");
var forms_1 = require("@angular/forms/");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var circles_datasource_1 = require("@app/circles/circles.datasource");
var circle_service_1 = require("@services/circle.service");
var circle_management_service_1 = require("@services/circle-management.service");
var contact_service_1 = require("@services/contact.service");
var user_service_1 = require("@services/user.service");
var CircleManagementComponent = /** @class */ (function () {
    function CircleManagementComponent(formBuilder, circleManagementDialogRef, circleService, circleManagementService, contactService, userService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.circleManagementDialogRef = circleManagementDialogRef;
        this.circleService = circleService;
        this.circleManagementService = circleManagementService;
        this.contactService = contactService;
        this.userService = userService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.filteredContacts = new rxjs_1.ReplaySubject(1);
        this.contactFilterCtrl = new forms_1.FormControl();
        this.contactsLoading = true;
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.matchingUser = null;
        this.nonMatch = null;
        this.userAddSubmitLoading = false;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.buildCircleForm();
        this.userLookupControl = new forms_1.FormControl();
        this.contactsSearchControl = new forms_1.FormControl();
    }
    CircleManagementComponent.prototype.buildCircleForm = function () {
        this.circleForm = this.formBuilder.group({
            id: null,
            name: ['', forms_1.Validators.required],
            description: '',
            //new_users: this.formBuilder.array([])
            new_users: []
        });
    };
    CircleManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new circles_datasource_1.CirclesDataSource(this.circleService);
        this.circleForm.get('new_users').setValue([]);
        if (this.data.circle) {
            this.currentUserList = this.data.circle.users;
        }
        this.userContactsLoading = true;
        this.contactService.getContacts()
            .subscribe(function (contacts) {
            _this.userContacts = contacts;
            _this.userContacts.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
            // populate the search select options for the contact control
            _this.filteredContacts.next(_this.userContacts);
            // listen for search field value changes
            _this.contactFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterContact();
            });
            _this.userContactsLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.userContactsLoading = false;
        });
        switch (this.data.action) {
            case 'create':
                this.title = 'Create New Circle';
                this.titleIcon = 'fiber_new';
                this.actionButtonText = 'Save';
                this.actionButtonIcon = 'save';
                break;
            case 'edit':
                this.title = 'Update Circle';
                this.titleIcon = 'edit';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
                // populate the circleForm
                this.circleForm.patchValue({
                    id: this.data.circle.id,
                    name: this.data.circle.name,
                    description: this.data.circle.description
                });
                for (var _i = 0, _a = this.data.circle.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    this.circleForm.value.new_users.push(user.id);
                }
                break;
            case 'addUser':
                this.title = 'Add User to Circle';
                this.titleIcon = 'person_add';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
                // populate the circleForm
                this.circleForm.patchValue({
                    id: this.data.circle.id,
                    name: this.data.circle.name,
                    description: this.data.circle.description
                });
                for (var _b = 0, _c = this.data.circle.users; _b < _c.length; _b++) {
                    var user = _c[_b];
                    this.circleForm.value.new_users.push(user.id);
                }
                break;
            case 'removeUser':
                this.title = 'Remove User from Circle';
                this.titleIcon = 'remove_circle';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
                break;
            case 'selectUser':
                this.title = 'Select User for Collaborator List';
                this.titleIcon = 'person_add';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
        }
    };
    CircleManagementComponent.prototype.addContactEmail = function (selectedContact) {
        if (selectedContact.email === '') {
            this.openSnackBar('This contact has no email address', 'OK', 5000);
        }
        else {
            this.userLookupControl.setValue(selectedContact.email);
        }
    };
    CircleManagementComponent.prototype.lookupUser = function () {
        var _this = this;
        this.matchingUser = null;
        this.nonMatch = null;
        var emailArray = [];
        emailArray.push(this.userLookupControl.value);
        this.userService.queryUserByEmail(emailArray)
            .subscribe(function (userQueryResponse) {
            console.log(userQueryResponse);
            if (userQueryResponse.matching_users.length > 0) {
                _this.matchingUser = userQueryResponse.matching_users[0];
            }
            if (userQueryResponse.no_matching_users.length > 0) {
                _this.nonMatch = userQueryResponse.no_matching_users[0];
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    CircleManagementComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    CircleManagementComponent.prototype.addUserToCircle = function () {
        var _this = this;
        this.userAddSubmitLoading = true;
        this.circleForm.value.new_users.push(this.matchingUser.id);
        this.circleService.update(this.circleForm.value)
            .subscribe(function (circle) {
            _this.userAddSubmitLoading = false;
            _this.openSnackBar('User successfully added to Circle.', 'OK', 5000);
            _this.circleManagementService.setCircleReload();
        }, function (error) {
            _this.errorMessage = error;
            _this.userAddSubmitLoading = false;
        });
    };
    // this function exists slightly outside the Circles workflow, though related.
    // this is for adding a verified User to an event's collaborator list (read or write)
    CircleManagementComponent.prototype.addUserAsCollaborator = function () {
        this.circleManagementDialogRef.close(this.matchingUser);
    };
    CircleManagementComponent.prototype.removeUser = function (id) {
        var index = this.circleForm.value.new_users.indexOf(id);
        if (index > -1) {
            this.circleForm.value.new_users.splice(index, 1);
        }
        for (var _i = 0, _a = this.data.circle.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.id === id) {
                user.removed = true;
            }
        }
    };
    CircleManagementComponent.prototype.filterContact = function () {
        // get the search keyword
        var search = this.contactFilterCtrl.value;
        if (!search) {
            this.filteredContacts.next(this.userContacts.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredContacts.next(
        // tslint:disable-next-line:max-line-length
        this.userContacts.filter(function (contact) { return contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1; }));
    };
    // add(event: MatChipInputEvent): void {
    //   // Add user only when MatAutocomplete is not open
    //   // To make sure this does not conflict with OptionSelected Event
    //   //if (!this.matAutocomplete.isOpen) {
    //   const input = event.input;
    //   const value = event.value;
    //   // Add our email
    //   if ((value || '').trim()) {
    //     this.newUserList.push(value.trim());
    //   }
    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    //   this.userLookupControl.setValue(null);
    //   //}
    // }
    CircleManagementComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        if (this.data.action === 'create') {
            this.submitLoading = true;
            // if (formValue.new_users.length === 0) {
            //   delete formValue.new_users;
            // }
            this.circleService.create(formValue)
                .subscribe(function (circle) {
                _this.submitLoading = false;
                _this.openSnackBar('Circle successfully created.', 'OK', 5000);
                _this.circleManagementService.setCircleReload();
                _this.circleManagementDialogRef.close();
                gtag('event', 'click', { 'event_category': 'User Dashboard', 'event_label': 'New Circle Created' });
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Circle not created. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.action === 'edit') {
            this.submitLoading = true;
            // formValue.new_users = this.users;
            // if (this.currentUserList) {
            //   formValue.new_users = formValue.new_users.concat(this.currentUserList);
            // }
            this.circleService.update(formValue)
                .subscribe(function (circle) {
                _this.submitLoading = false;
                _this.openSnackBar('Circle successfully updated.', 'OK', 5000);
                _this.circleManagementService.setCircleReload();
                _this.circleManagementDialogRef.close();
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Circle not updated. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.action === 'addUser') {
            this.circleManagementDialogRef.close();
        }
    };
    __decorate([
        core_1.ViewChild('userInput'),
        __metadata("design:type", core_1.ElementRef)
    ], CircleManagementComponent.prototype, "userInput", void 0);
    CircleManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-circle-management',
            templateUrl: './circle-management.component.html',
            styleUrls: ['./circle-management.component.scss']
        }),
        __param(7, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            circle_service_1.CircleService,
            circle_management_service_1.CircleManagementService,
            contact_service_1.ContactService,
            user_service_1.UserService,
            material_2.MatSnackBar, Object])
    ], CircleManagementComponent);
    return CircleManagementComponent;
}());
exports.CircleManagementComponent = CircleManagementComponent;
//# sourceMappingURL=circle-management.component.js.map