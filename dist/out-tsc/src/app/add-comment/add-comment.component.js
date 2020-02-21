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
var comment_service_1 = require("@services/comment.service");
var comment_type_service_1 = require("@app/services/comment-type.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var app_field_help_text_1 = require("@app/app.field-help-text");
var app_settings_1 = require("@app/app.settings");
var AddCommentComponent = /** @class */ (function () {
    function AddCommentComponent(formBuilder, snackBar, addCommentDialogRef, commentService, commentTypeService, dataUpdatedService, data) {
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.addCommentDialogRef = addCommentDialogRef;
        this.commentService = commentService;
        this.commentTypeService = commentTypeService;
        this.dataUpdatedService = dataUpdatedService;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.buildCommentForm();
    }
    AddCommentComponent.prototype.buildCommentForm = function () {
        this.commentForm = this.formBuilder.group({
            comment: '',
            comment_type: null,
            object_id: null,
            new_content_type: ''
        });
    };
    AddCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commentForm.get('object_id').setValue(this.data.object_id);
        switch (this.data.comment_object) {
            case 'event':
                this.commentObjectString = 'Event';
                this.commentForm.get('new_content_type').setValue('event');
                break;
            case 'eventlocation':
                this.commentObjectString = 'Event Location';
                this.commentForm.get('new_content_type').setValue('eventlocation');
                break;
            case 'servicerequest':
                this.commentObjectString = 'Service Request';
                this.commentForm.get('new_content_type').setValue('servicerequest');
                break;
            case 'eventgroup':
                this.commentObjectString = 'Event Group';
                this.commentForm.get('new_content_type').setValue('eventgroup');
                break;
        }
        // get comment types from the commentTypes service
        this.commentTypeService.getCommentTypes()
            .subscribe(function (commentTypes) {
            _this.commentTypes = commentTypes;
            // if the comment context is  event comment or service request comment, remove the 'special' comment types
            if (_this.data.comment_object === 'event' || _this.data.comment_object === 'servicerequest') {
                var _loop_1 = function (type) {
                    for (var _i = 0, _a = _this.commentTypes; _i < _a.length; _i++) {
                        var commentType = _a[_i];
                        if (commentType.id === type.id) {
                            _this.commentTypes = _this.commentTypes.filter(function (commenttype) { return commenttype.id !== type.id; });
                        }
                    }
                };
                for (var _i = 0, _a = app_settings_1.APP_SETTINGS.SPECIAL_COMMENT_TYPES; _i < _a.length; _i++) {
                    var type = _a[_i];
                    _loop_1(type);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    AddCommentComponent.prototype.commentTooltip = function () {
        var string;
        if (this.data.comment_object === 'eventlocation') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationCommentTooltip;
        }
        else if (this.data.comment_object === 'event') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTooltip;
        }
        else if (this.data.comment_object === 'servicerequest') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestCommentTooltip;
        }
        else if (this.data.comment_object === 'eventgroup') {
            string = 'Comments on Event Group';
        }
        return string;
    };
    AddCommentComponent.prototype.commentTypeTooltip = function () {
        var string;
        if (this.data.comment_object === 'eventlocation') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTypeTooltip;
        }
        else if (this.data.comment_object === 'event') {
            string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTypeTooltip;
        }
        else if (this.data.comment_object === 'servicerequest') {
            string = 'Flags comment as belonging to a certain category.';
        }
        else if (this.data.comment_object === 'eventgroup') {
            string = 'Flags comment as belonging to a certain category.';
        }
        return string;
    };
    AddCommentComponent.prototype.eventCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTooltip; return string; };
    AddCommentComponent.prototype.eventCommentTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.eventCommentTypeTooltip; return string; };
    AddCommentComponent.prototype.locationCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTooltip; return string; };
    AddCommentComponent.prototype.editLocationCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.editLocationCommentTooltip; return string; };
    AddCommentComponent.prototype.locationCommentTypeTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.locationCommentTypeTooltip; return string; };
    AddCommentComponent.prototype.serviceRequestCommentTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.serviceRequestCommentTooltip; return string; };
    AddCommentComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    AddCommentComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.submitLoading = true;
        this.commentService.create(formValue)
            .subscribe(function (comment) {
            _this.submitLoading = false;
            _this.openSnackBar('Comment Successfully Saved', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
            _this.addCommentDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Comments', 'event_label': 'Comment submitted, type: ' + comment.comment_type });
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Comment not saved. Error message: ' + error, 'OK', 8000);
        });
    };
    AddCommentComponent = __decorate([
        core_1.Component({
            selector: 'app-add-comment',
            templateUrl: './add-comment.component.html',
            styleUrls: ['./add-comment.component.scss']
        }),
        __param(6, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_2.MatSnackBar,
            material_1.MatDialogRef,
            comment_service_1.CommentService,
            comment_type_service_1.CommentTypeService,
            data_updated_service_1.DataUpdatedService, Object])
    ], AddCommentComponent);
    return AddCommentComponent;
}());
exports.AddCommentComponent = AddCommentComponent;
//# sourceMappingURL=add-comment.component.js.map