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
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var event_group_service_1 = require("@services/event-group.service");
var event_groups_datasource_1 = require("@app/event-group/event-groups.datasource");
var event_group_management_service_1 = require("@services/event-group-management.service");
var EventGroupManagementComponent = /** @class */ (function () {
    function EventGroupManagementComponent(formBuilder, eventGroupManagementDialogRef, eventGroupService, eventGroupManagementService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.eventGroupManagementDialogRef = eventGroupManagementDialogRef;
        this.eventGroupService = eventGroupService;
        this.eventGroupManagementService = eventGroupManagementService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.events = [];
        this.repeats = [];
        this.duplicateEventsViolation = false;
        this.minimumCountViolation = false;
        this.buildEventGroupForm();
    }
    // modes of this component:
    // 1. User has already selected a list of Events and wants to create a new Event Group with the list - 'create'
    // 2. User has already selected a list of Events and wants to add them to an existing Event Group and/or edit the Event Group details - 'edit'
    // 3. User has selected an Event Group and wants to add a list of Events to it - 'addEvents'
    EventGroupManagementComponent.prototype.buildEventGroupForm = function () {
        this.eventGroupForm = this.formBuilder.group({
            id: null,
            category: [null, forms_1.Validators.required],
            new_comment: ['', forms_1.Validators.required],
            new_events: this.formBuilder.array([])
        });
    };
    EventGroupManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new event_groups_datasource_1.EventGroupsDataSource(this.eventGroupService);
        switch (this.data.action) {
            case 'create':
                this.title = 'Create New Event Group';
                this.titleIcon = 'fiber_new';
                this.actionButtonText = 'Save';
                this.actionButtonIcon = 'save';
                this.selectedEvents = this.data.selectedEvents;
                break;
            case 'edit':
                this.title = 'Update Event Group';
                this.titleIcon = 'playlist_add';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
                // populate the eventGroupForm
                this.eventGroupForm.patchValue({
                    id: this.data.eventGroup.id,
                    category: this.data.eventGroup.category,
                    new_comment: this.data.eventGroup.comments[0].comment,
                });
                if (this.data.eventGroup.events.length > 0) {
                    for (var i = 0, j = this.data.eventGroup.events.length; i < j; i++) {
                        this.addEvent();
                        this.eventGroupForm.get('new_events')['controls'][i].get('id').setValue(this.data.eventGroup.events[i]);
                        this.events.push(this.data.eventGroup.events[i]);
                    }
                }
                this.selectedEvents = this.data.selectedEvents;
                if (this.data.selectedEvents) {
                    this.checkForRepeatEvents();
                }
                break;
            case 'addEvents':
                this.title = 'Add Events to Event Group';
                this.titleIcon = 'add';
                this.actionButtonText = 'Save Changes';
                this.actionButtonIcon = 'save';
                break;
        }
        this.eventGroupService.getEventGroupCategories()
            .subscribe(function (eventGroupCategories) {
            _this.eventGroupCategories = eventGroupCategories;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EventGroupManagementComponent.prototype.initEvent = function () {
        return this.formBuilder.group({
            id: '',
        });
    };
    EventGroupManagementComponent.prototype.refreshEventGroupsTable = function () {
        this.dataSource.loadEventGroups('', 1, 20);
    };
    EventGroupManagementComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    EventGroupManagementComponent.prototype.addEvent = function () {
        var control = this.eventGroupForm.get('new_events');
        control.push(this.initEvent());
    };
    EventGroupManagementComponent.prototype.getEvents = function (form) {
        return form.controls.new_events.controls;
    };
    EventGroupManagementComponent.prototype.remove = function (event) {
        var index = this.events.indexOf(event);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
    };
    EventGroupManagementComponent.prototype.removeFromSelected = function (event) {
        var index = this.selectedEvents.indexOf(event);
        if (index >= 0) {
            this.selectedEvents.splice(index, 1);
        }
        this.checkForRepeatEvents();
        this.checkMinimumCount();
    };
    EventGroupManagementComponent.prototype.checkForRepeatEvents = function () {
        // compare events to selectedEvents
        var self = this;
        this.repeats = this.events.filter(function (val) {
            return self.selectedEvents.indexOf(val) !== -1;
        });
        if (this.repeats.length > 0) {
            this.duplicateEventsViolation = true;
        }
        else {
            this.duplicateEventsViolation = false;
        }
    };
    EventGroupManagementComponent.prototype.checkMinimumCount = function () {
        if (this.selectedEvents.length + this.events.length < 2) {
            this.minimumCountViolation = true;
        }
        else {
            this.minimumCountViolation = false;
        }
    };
    EventGroupManagementComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        if (this.data.action === 'create') {
            formValue.new_events = formValue.new_events.concat(this.selectedEvents);
            this.eventGroupService.create(formValue)
                .subscribe(function (eventGroup) {
                _this.submitLoading = false;
                _this.openSnackBar('Event Group successfully created.', 'OK', 5000);
                _this.eventGroupManagementService.setEventGroupReload();
                _this.eventGroupManagementDialogRef.close();
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Event Group not created. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.action === 'edit') {
            formValue.new_events = this.events;
            if (this.selectedEvents) {
                formValue.new_events = formValue.new_events.concat(this.selectedEvents);
            }
            this.eventGroupService.update(formValue)
                .subscribe(function (eventGroup) {
                _this.submitLoading = false;
                _this.openSnackBar('Event Group successfully updated.', 'OK', 5000);
                _this.eventGroupManagementService.setEventGroupReload();
                _this.eventGroupManagementDialogRef.close();
            }, function (error) {
                _this.errorMessage = error;
                _this.openSnackBar('Error. Event Group not updated. Error message: ' + error, 'OK', 8000);
            });
        }
        else if (this.data.action === 'addEvents') {
        }
    };
    EventGroupManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-event-group-management',
            templateUrl: './event-group-management.component.html',
            styleUrls: ['./event-group-management.component.scss']
        }),
        __param(5, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialogRef,
            event_group_service_1.EventGroupService,
            event_group_management_service_1.EventGroupManagementService,
            material_2.MatSnackBar, Object])
    ], EventGroupManagementComponent);
    return EventGroupManagementComponent;
}());
exports.EventGroupManagementComponent = EventGroupManagementComponent;
//# sourceMappingURL=event-group-management.component.js.map