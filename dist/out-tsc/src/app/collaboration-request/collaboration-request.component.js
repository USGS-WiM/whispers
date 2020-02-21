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
var data_updated_service_1 = require("@app/services/data-updated.service");
var service_request_service_1 = require("@services/service-request.service");
var current_user_service_1 = require("@app/services/current-user.service");
var event_service_1 = require("@services/event.service");
var CollaborationRequestComponent = /** @class */ (function () {
    function CollaborationRequestComponent(formBuilder, dialog, currentUserService, collaborationRequestDialogRef, serviceRequestService, dataUpdatedService, snackBar, eventService, data) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.currentUserService = currentUserService;
        this.collaborationRequestDialogRef = collaborationRequestDialogRef;
        this.serviceRequestService = serviceRequestService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.eventService = eventService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        currentUserService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.buildCollaborationRequestForm();
    }
    CollaborationRequestComponent.prototype.buildCollaborationRequestForm = function () {
        this.collaborationRequestForm = this.formBuilder.group({
            user: this.currentUser.id,
            event: null,
            comment: ''
        });
    };
    CollaborationRequestComponent.prototype.ngOnInit = function () {
        this.collaborationRequestForm.get('event').setValue(this.data.event_id);
        this.event_id = this.data.event_id;
    };
    CollaborationRequestComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    CollaborationRequestComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        this.eventService.requestCollaboration(formValue)
            .subscribe(function (response) {
            _this.submitLoading = false;
            _this.collaborationRequestDialogRef.close();
            _this.openSnackBar('Collaboration Request successfully sent to event owner.', 'OK', 5000);
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Collaboration request response not submitted. Error message: ' + error, 'OK', 8000);
        });
    };
    CollaborationRequestComponent = __decorate([
        core_1.Component({
            selector: 'app-collaboration-request',
            templateUrl: './collaboration-request.component.html',
            styleUrls: ['./collaboration-request.component.scss']
        }),
        __param(8, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            current_user_service_1.CurrentUserService,
            material_1.MatDialogRef,
            service_request_service_1.ServiceRequestService,
            data_updated_service_1.DataUpdatedService,
            material_2.MatSnackBar,
            event_service_1.EventService, Object])
    ], CollaborationRequestComponent);
    return CollaborationRequestComponent;
}());
exports.CollaborationRequestComponent = CollaborationRequestComponent;
//# sourceMappingURL=collaboration-request.component.js.map