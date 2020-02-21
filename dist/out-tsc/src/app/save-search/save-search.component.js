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
var search_service_1 = require("@app/services/search.service");
var SaveSearchComponent = /** @class */ (function () {
    function SaveSearchComponent(formBuilder, dialog, saveSearchDialogRef, searchService, dataUpdatedService, snackBar, data) {
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.saveSearchDialogRef = saveSearchDialogRef;
        this.searchService = searchService;
        this.dataUpdatedService = dataUpdatedService;
        this.snackBar = snackBar;
        this.data = data;
        this.errorMessage = '';
        this.submitLoading = false;
        this.buildSaveSearchForm();
    }
    SaveSearchComponent.prototype.buildSaveSearchForm = function () {
        this.saveSearchForm = this.formBuilder.group({
            name: '',
            data: ''
        });
    };
    SaveSearchComponent.prototype.ngOnInit = function () {
        this.saveSearchForm.get('data').setValue(this.data.currentSearchQuery);
    };
    SaveSearchComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    SaveSearchComponent.prototype.onSubmit = function (formValue) {
        // formValue.data = this.data.currentSearchQuery;
        var _this = this;
        // remove all blank variables from the submission
        if (formValue.data.affected_count === null || formValue.data.affected_count === '' || formValue.data.affected_count !== undefined) {
            delete formValue.data.affected_count;
        }
        if (formValue.data.start_date === null || formValue.data.start_date === '' || formValue.data.start_date === undefined) {
            delete formValue.data.start_date;
        }
        if (formValue.data.end_date === null || formValue.data.end_date === '' || formValue.data.end_date === undefined) {
            delete formValue.data.end_date;
        }
        if (formValue.data.event_type !== undefined && formValue.data.event_type !== null) {
            if (formValue.data.event_type.length === 0) {
                delete formValue.data.event_type;
            }
        }
        if (formValue.data.diagnosis !== undefined && formValue.data.diagnosis !== null) {
            if (formValue.data.diagnosis.length === 0) {
                delete formValue.data.diagnosis;
            }
        }
        if (formValue.data.diagnosis_type !== undefined && formValue.data.diagnosis_type !== null) {
            if (formValue.data.diagnosis_type.length === 0) {
                delete formValue.data.diagnosis_type;
            }
        }
        if (formValue.data.species !== undefined && formValue.data.species !== null) {
            if (formValue.data.species.length === 0) {
                delete formValue.data.species;
            }
        }
        if (formValue.data.administrative_level_one !== undefined && formValue.data.administrative_level_one !== null) {
            if (formValue.data.administrative_level_one.length === 0) {
                delete formValue.data.administrative_level_one;
            }
        }
        if (formValue.data.administrative_level_two !== undefined && formValue.data.administrative_level_two !== null) {
            if (formValue.data.administrative_level_two.length === 0) {
                delete formValue.data.administrative_level_two;
            }
        }
        if (formValue.data.and_params) {
            if (formValue.data.and_params.length === 0) {
                delete formValue.data.and_params;
            }
        }
        this.submitLoading = true;
        this.searchService.create(formValue)
            .subscribe(function (createdSearch) {
            _this.submitLoading = false;
            _this.openSnackBar('Search successfully saved', 'OK', 5000);
            _this.dataUpdatedService.triggerRefresh();
            _this.saveSearchDialogRef.close();
            gtag('event', 'click', { 'event_category': 'Search', 'event_label': 'User Search Saved' });
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Search not saved. Error message: ' + error, 'OK', 8000);
        });
    };
    SaveSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-save-search',
            templateUrl: './save-search.component.html',
            styleUrls: ['./save-search.component.scss']
        }),
        __param(6, core_2.Inject(material_3.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            material_1.MatDialog,
            material_1.MatDialogRef,
            search_service_1.SearchService,
            data_updated_service_1.DataUpdatedService,
            material_2.MatSnackBar, Object])
    ], SaveSearchComponent);
    return SaveSearchComponent;
}());
exports.SaveSearchComponent = SaveSearchComponent;
//# sourceMappingURL=save-search.component.js.map