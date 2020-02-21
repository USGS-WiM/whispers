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
var rxjs_1 = require("rxjs");
var material_1 = require("@angular/material");
var confirm_component_1 = require("@confirm/confirm.component");
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard(publicDialog) {
        this.publicDialog = publicDialog;
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state) {
        var _this = this;
        // Get the current URL
        console.log(state.url);
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!component.eventSubmissionForm.touched) {
            return true;
        }
        // observable which resolves to true or false when the user decides
        // below commented out return is alternate method using a dialog service to create a window notification
        // return component.dialogService.confirm('Discard changes?');
        return rxjs_1.Observable.create(function (observer) {
            _this.confirmDialogRef = _this.publicDialog.open(confirm_component_1.ConfirmComponent, {
                data: {
                    title: 'Are you sure you want to leave?',
                    message: 'Any data entered into the form will be lost.',
                    showCancelButton: true,
                    confirmButtonText: 'Leave this page',
                }
            });
            // resets the boolean observable for the dialog after closing
            _this.confirmDialogRef.afterClosed().subscribe(function (result) {
                observer.next(result);
                observer.complete();
            }, function (error) {
                observer.next(false);
                observer.complete();
            });
        });
    };
    CanDeactivateGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());
exports.CanDeactivateGuard = CanDeactivateGuard;
//# sourceMappingURL=pending-changes.guard.js.map