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
var forms_1 = require("@angular/forms/");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var material_3 = require("@angular/material");
var custom_notification_component_1 = require("@app/custom-notification/custom-notification.component");
var confirm_component_1 = require("@app/confirm/confirm.component");
var app_utilities_1 = require("@app/app.utilities");
var current_user_service_1 = require("@app/services/current-user.service");
var notification_service_1 = require("@services/notification.service");
var data_updated_service_1 = require("@services/data-updated.service");
var view_notification_details_component_1 = require("@app/notifications/view-notification-details/view-notification-details.component");
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(formBuilder, dialog, router, route, notificationService, currentUserService, dataUpdatedService, snackBar) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.router = router;
        this.route = route;
        this.notificationService = notificationService;
        this.currentUserService = currentUserService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.panelOpenState = false;
        this.notificationsLoading = false;
        this.dummyNotifications = app_utilities_1.APP_UTILITIES.dummyData;
        // this.allEventsChecked = false;
        // test data
        this.dummy_custom_cues = [
            { name: 'Event with Species: Alligator' },
            { name: 'Event with ID 17044' },
            { name: 'Event with State: Wisconsin OR Minnesota' },
            { name: 'Event with ID 1337' },
            { name: 'Event with ID 7775556' },
            { name: 'Event with ID 17055' },
            { name: 'Event with Diagnosis: E.Coli and Species: Squirrel and State: Wisconsin' },
            { name: 'Event with ID 00977' },
            { name: 'Event with ID 4323455' },
            { name: 'Event with ID 675465' },
        ];
        this.notificationDisplayedColumns = [
            'select',
            'go',
            'read',
            'created_date',
            'source'
        ];
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
            // pass the notification_cue_standards to populate the settings form
            _this.populateStandardNotificationSettingsForm(_this.currentUser.notification_cue_standards);
        });
    }
    NotificationsComponent.prototype.buildStandardNotificationSettingsForm = function () {
        this.standardNotificationSettingsForm = this.formBuilder.group({
            yourEvents_new: false,
            yourEvents_updated: false,
            yourEvents_email: false,
            orgEvents_new: false,
            orgEvents_updated: false,
            orgEvents_email: false,
            collabEvents_new: false,
            collabEvents_updated: false,
            collabEvents_email: false,
            allEvents_new: false,
            allEvents_updated: false,
            allEvents_email: false
        });
    };
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var initialSelection = [];
        var allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(allowMultiSelect, initialSelection);
        this.notificationsLoading = true;
        this.notificationsDataSource = new material_1.MatTableDataSource([]);
        this.notificationsDataSource.paginator = this.notificationPaginator;
        // retrieve user's notifications
        this.notificationService.getUserNotifications()
            .subscribe(function (notifications) {
            _this.userNotifications = notifications;
            _this.notificationsDataSource = new material_1.MatTableDataSource(_this.userNotifications);
            _this.notificationsDataSource.paginator = _this.notificationPaginator;
            _this.notificationsLoading = false;
            // use dataUpdatedService to refresh notifications in app.component as well
        }, function (error) {
            _this.errorMessage = error;
            _this.notificationsLoading = false;
        });
        // retrieve user's saved standard notification settings
    };
    NotificationsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.notificationsDataSource.sort = _this.sort;
        }, 3000);
        // TODO - populate with default states or with existing state from service
        // sidenote: I'm setting them here because they weren't working on the first click if I set them in the ngOnInit function ¯\_(ツ)_/¯
        this.emailAllStandardChecked = false;
        this.yourEventsChecked = false;
        this.yourOrgEventsChecked = false;
        this.yourCollabEventsChecked = false;
        this.allEventsChecked = false;
    };
    NotificationsComponent.prototype.navigateToEvent = function (event) {
        this.router.navigate(["../event/" + event.event], { relativeTo: this.route });
    };
    NotificationsComponent.prototype.newCustomNotification = function () {
        this.customNotificationRef = this.dialog.open(custom_notification_component_1.CustomNotificationComponent, {
            minWidth: '60%',
            data: {}
        });
    };
    NotificationsComponent.prototype.emailAllStandardNotifications = function () {
        this.emailAllStandardChecked = !this.emailAllStandardChecked;
        if (this.emailAllStandardChecked === true) {
            this.yourEventsChecked = true;
            this.yourOrgEventsChecked = true;
            this.yourCollabEventsChecked = true;
            this.allEventsChecked = true;
        }
        else {
            this.yourEventsChecked = false;
            this.yourOrgEventsChecked = false;
            this.yourCollabEventsChecked = false;
            this.allEventsChecked = false;
        }
    };
    NotificationsComponent.prototype.yourEvents = function () {
        this.yourEventsChecked = !this.yourEventsChecked;
        this.checkIfAllStandardTogglesTrue();
    };
    NotificationsComponent.prototype.yourOrgEvents = function () {
        this.yourOrgEventsChecked = !this.yourOrgEventsChecked;
        this.checkIfAllStandardTogglesTrue();
    };
    NotificationsComponent.prototype.yourCollabEvents = function () {
        this.yourCollabEventsChecked = !this.yourCollabEventsChecked;
        this.checkIfAllStandardTogglesTrue();
    };
    NotificationsComponent.prototype.allEvents = function () {
        this.allEventsChecked = !this.allEventsChecked;
        this.checkIfAllStandardTogglesTrue();
    };
    NotificationsComponent.prototype.checkIfAllStandardTogglesTrue = function () {
        if (this.yourEventsChecked && this.yourOrgEventsChecked && this.yourCollabEventsChecked && this.allEventsChecked) {
            // this.emailAllStandardNotificationsToggle = true;
            this.emailAllStandardChecked = true;
        }
        else {
            this.emailAllStandardChecked = false;
        }
    };
    NotificationsComponent.prototype.deleteWarning = function (cue) {
        var _this = this;
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Custom Notification',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete the custom notification " ' + cue.name + ' "?',
                confirmButtonText: 'Delete',
                messageIcon: 'delete_forever',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                // add delete function
                _this.confirmDialogRef.close();
            }
        });
    };
    NotificationsComponent.prototype.openNotification = function (notification) {
        var _this = this;
        this.viewNotificationsDetailRef = this.dialog.open(view_notification_details_component_1.ViewNotificationDetailsComponent, {
            data: {
                notification: notification
            }
        });
        this.viewNotificationsDetailRef.afterClosed().subscribe(function (result) {
            if (result.status === 'unread') {
                // if the notification is marked as read, update to unread
                if (notification.read === true) {
                    // update the read boolean to true both locally and on the server
                    var body = { id: result.id, read: false };
                    _this.notificationService.updateNotification(body)
                        .subscribe(function (response) {
                        _this.viewNotificationsDetailRef.close();
                        _this.notificationService.getUserNotifications()
                            .subscribe(function (notifications) {
                            _this.userNotifications = notifications;
                            _this.notificationsDataSource = new material_1.MatTableDataSource(_this.userNotifications);
                            _this.notificationsDataSource.paginator = _this.notificationPaginator;
                        }, function (error) {
                            _this.errorMessage = error;
                        });
                    }, function (error) {
                        _this.errorMessage = error;
                    });
                }
                _this.viewNotificationsDetailRef.close();
            }
            else if (result.status === 'read') {
                // update the read boolean to true both locally and on the server
                // if the notification is marked as unread, mark it as read
                if (notification.read === false) {
                    var body = { id: result.id, read: true };
                    _this.notificationService.updateNotification(body)
                        .subscribe(function (response) {
                        _this.viewNotificationsDetailRef.close();
                        _this.notificationService.getUserNotifications()
                            .subscribe(function (notifications) {
                            _this.userNotifications = notifications;
                            _this.notificationsDataSource = new material_1.MatTableDataSource(_this.userNotifications);
                            _this.notificationsDataSource.paginator = _this.notificationPaginator;
                        }, function (error) {
                            _this.errorMessage = error;
                        });
                    }, function (error) {
                        _this.errorMessage = error;
                    });
                }
            }
            else if (result.status === 'delete') {
                var id = result.id;
                _this.notificationService.deleteNotification(id)
                    .subscribe(function (response) {
                    _this.viewNotificationsDetailRef.close();
                    _this.notificationService.getUserNotifications()
                        .subscribe(function (notifications) {
                        _this.userNotifications = notifications;
                        _this.notificationsDataSource = new material_1.MatTableDataSource(_this.userNotifications);
                        _this.notificationsDataSource.paginator = _this.notificationPaginator;
                    }, function (error) {
                        _this.errorMessage = error;
                    });
                }, function (error) {
                    _this.errorMessage = error;
                });
            }
        });
    };
    NotificationsComponent.prototype.openNotificationDeleteConfirm = function (selection) {
        var _this = this;
        // const idArray = [];
        // for (const item of selection) {
        //   idArray.push(item.id);
        // }
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            data: {
                title: 'Delete Notifications Confirm',
                titleIcon: 'delete_forever',
                // tslint:disable-next-line:max-line-length
                message: 'Are you sure you want to delete these notifications? This action cannot be undone.',
                confirmButtonText: 'Yes, Delete',
                messageIcon: '',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.updateNotifications(selection, 'delete');
            }
        });
    };
    NotificationsComponent.prototype.updateNotifications = function (selection, action) {
        var _this = this;
        var idArray = [];
        for (var _i = 0, selection_1 = selection; _i < selection_1.length; _i++) {
            var item = selection_1[_i];
            idArray.push(item.id);
        }
        var updateObject = { 'action': action, 'ids': idArray };
        this.notificationService.bulkUpdateNotifications(updateObject)
            .subscribe(function () {
            if (action === 'delete') {
                _this.openSnackBar('Notifications successfully deleted', 'OK', 5000);
            }
            _this.notificationService.getUserNotifications()
                .subscribe(function (notifications) {
                _this.userNotifications = notifications;
                _this.notificationsDataSource = new material_1.MatTableDataSource(_this.userNotifications);
                _this.notificationsDataSource.paginator = _this.notificationPaginator;
            }, function (error) {
                _this.errorMessage = error;
            });
            // clear selection
            // this.selection.deselect(id);
            // this.updateSelectedEventGroup(null);
            // this.refreshTable();
        }, function (error) {
            _this.errorMessage = error;
            if (action === 'delete') {
                _this.openSnackBar('Error. Notifications not deleted. Error message: ' + error, 'OK', 8000);
            }
        });
    };
    NotificationsComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    NotificationsComponent.prototype.populateStandardNotificationSettingsForm = function (userSettings) {
        // parse out from userSettings object and fill in here
        var bloop = userSettings.find(function (setting) { return setting.standard_type === 1; }).notification_cue_preference;
        console.log(bloop);
        this.standardNotificationSettingsForm.setValue({
            yourEvents_new: userSettings.find(function (setting) { return setting.standard_type === 1; }).notification_cue_preference.create_when_new,
            yourEvents_updated: userSettings.find(function (setting) { return setting.standard_type === 1; }).notification_cue_preference.create_when_modified,
            yourEvents_email: userSettings.find(function (setting) { return setting.standard_type === 1; }).notification_cue_preference.send_email,
            orgEvents_new: userSettings.find(function (setting) { return setting.standard_type === 2; }).notification_cue_preference.create_when_new,
            orgEvents_updated: userSettings.find(function (setting) { return setting.standard_type === 2; }).notification_cue_preference.create_when_modified,
            orgEvents_email: false,
            collabEvents_new: userSettings.find(function (setting) { return setting.standard_type === 3; }).notification_cue_preference.create_when_new,
            collabEvents_updated: userSettings.find(function (setting) { return setting.standard_type === 3; }).notification_cue_preference.create_when_modified,
            collabEvents_email: false,
            allEvents_new: userSettings.find(function (setting) { return setting.standard_type === 4; }).notification_cue_preference.create_when_new,
            allEvents_updated: userSettings.find(function (setting) { return setting.standard_type === 4; }).notification_cue_preference.create_when_modified,
            allEvents_email: false
        });
    };
    // updateRowData(row_obj) {
    //   this.notificationsDataSource = this.notificationsDataSource.data.filter((value, key) => {
    //     if (value.id == row_obj.id) {
    //       value.name = row_obj.name;
    //     }
    //     return true;
    //   });
    // }
    // From angular material table sample on material api reference site
    /** Whether the number of selected elements matches the total number of rows. */
    NotificationsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.notificationsDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    NotificationsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.notificationsDataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], NotificationsComponent.prototype, "notificationPaginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], NotificationsComponent.prototype, "sort", void 0);
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_2.MatDialog,
            router_1.Router,
            router_1.ActivatedRoute,
            notification_service_1.NotificationService,
            current_user_service_1.CurrentUserService,
            data_updated_service_1.DataUpdatedService,
            material_3.MatSnackBar])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map