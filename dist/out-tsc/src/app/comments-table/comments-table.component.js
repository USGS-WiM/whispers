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
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var app_field_help_text_1 = require("@app/app.field-help-text");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var view_comment_details_component_1 = require("@app/view-comment-details/view-comment-details.component");
var CommentsTableComponent = /** @class */ (function () {
    function CommentsTableComponent(dialog, displayValuePipe) {
        this.dialog = dialog;
        this.displayValuePipe = displayValuePipe;
        this.resultsLoading = false;
        this.fullCommentOn = true;
        this.combinedComments = [];
        this.orderParams = '';
        this.commentsLoading = false;
        this.initialSelection = [];
        this.allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.docsOnThisPage = [];
        this.locationIdArray = [];
        this.reOrderedLocationComments = [];
        this.commentDisplayedColumns = [
            'comment',
            'comment_type_string',
            // 'created_date',
            // 'comment_type',
            'date_sort',
            'created_by_first_name',
            // 'created_by_last_name',
            'created_by_organization_string',
            'source'
        ];
    }
    CommentsTableComponent.prototype.ngOnInit = function () {
        this.combinedComments = this.eventData.combined_comments;
        this.getlocations();
        for (var _i = 0, _a = this.combinedComments; _i < _a.length; _i++) {
            var comment = _a[_i];
            // set the comment type string for each comment
            comment.comment_type_string = this.displayValuePipe.transform(comment.comment_type, 'name', this.commentTypes);
            // set the source string for each comment
            comment.source = this.eventLocationName(comment);
        }
        this.commentsDataSource = new material_1.MatTableDataSource(this.combinedComments);
        this.commentsDataSource.paginator = this.paginator;
    };
    CommentsTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.commentsDataSource.sort = _this.sort;
            _this.commentsDataSource.sortingDataAccessor = function (data, attribute) { return data[attribute]; };
        }, 3000);
    };
    CommentsTableComponent.prototype.commentSourceTooltip = function () { var string = app_field_help_text_1.FIELD_HELP_TEXT.commentSourceTooltip; return string; };
    CommentsTableComponent.prototype.eventLocationName = function (comment) {
        var locationName = '';
        var count;
        if (comment.content_type_string === 'servicerequest') {
            locationName = 'Service Request';
        }
        else if (comment.content_type_string === 'event') {
            locationName = 'Event';
        }
        else if (comment.content_type_string === 'eventlocation') {
            if (comment.object_name !== '') {
                // Finding the index for the comments' object.id and the locationIdArray object.id. The locationIdArray has the correct order of location
                // comments (same as on event details tab).
                // Doing it this way to ensure that the number in the location name is the same on both the event details tab and comments tab.
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === comment.object_id; })) + 1;
                locationName = 'Location ' + count + ' - ' + comment.object_name;
            }
            else {
                count = (this.locationIdArray.findIndex(function (c) { return c.object_id === comment.object_id; })) + 1;
                locationName = 'Location ' + count;
            }
        }
        return locationName;
    };
    CommentsTableComponent.prototype.getlocations = function () {
        var _this = this;
        // getting the locations that eventlocations
        this.eventData.eventlocations.forEach(function (e) {
            e.comments.forEach(function (s) {
                _this.locationIdArray.push(s);
            });
        });
        // stripping the objects that have duplicate object_ids so that the count is i++.
        this.locationIdArray = this.locationIdArray.filter(function (v, i, a) { return a.findIndex(function (t) { return (t.object_id === v.object_id); }) === i; });
    };
    CommentsTableComponent.prototype.fullCommentMode = function () {
        this.fullCommentOn = !this.fullCommentOn;
    };
    CommentsTableComponent.prototype.selectComment = function (comment) {
        this.viewCommentDetailRef = this.dialog.open(view_comment_details_component_1.ViewCommentDetailsComponent, {
            data: {
                creator_firstname: comment.created_by_first_name,
                creator_lastname: comment.created_by_last_name,
                comment: comment.comment,
                created_date: comment.created_date,
                location: comment.content_type_string,
                id: comment.id,
                created_by_organization_string: comment.created_by_organization_string,
                object_name: comment.object_name,
                comment_type: comment.comment_type,
                modified_date: comment.modified_date,
                event_locations: this.locationIdArray,
                object_id: comment.object_id
            }
        });
    };
    __decorate([
        core_1.Input('eventData'),
        __metadata("design:type", Object)
    ], CommentsTableComponent.prototype, "eventData", void 0);
    __decorate([
        core_1.Input('commentTypes'),
        __metadata("design:type", Array)
    ], CommentsTableComponent.prototype, "commentTypes", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], CommentsTableComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], CommentsTableComponent.prototype, "sort", void 0);
    CommentsTableComponent = __decorate([
        core_1.Component({
            selector: 'app-comments-table',
            templateUrl: './comments-table.component.html',
            styleUrls: ['./comments-table.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog,
            display_value_pipe_1.DisplayValuePipe])
    ], CommentsTableComponent);
    return CommentsTableComponent;
}());
exports.CommentsTableComponent = CommentsTableComponent;
//# sourceMappingURL=comments-table.component.js.map