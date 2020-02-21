"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var flex_layout_1 = require("@angular/flex-layout");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var material_1 = require("@angular/material");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./home/home.component");
var event_details_component_1 = require("./event-details/event-details.component");
var event_submission_component_1 = require("./event-submission/event-submission.component");
var diagnostic_services_component_1 = require("./diagnostic-services/diagnostic-services.component");
var user_dashboard_component_1 = require("./user-dashboard/user-dashboard.component");
var event_service_1 = require("@app/services/event.service");
var search_dialog_component_1 = require("./search-dialog/search-dialog.component");
var administrative_level_one_service_1 = require("@app/services/administrative-level-one.service");
var display_value_pipe_1 = require("./pipes/display-value.pipe");
var event_type_service_1 = require("@services/event-type.service");
var diagnosis_type_service_1 = require("@services/diagnosis-type.service");
var diagnosis_service_1 = require("@services/diagnosis.service");
var species_service_1 = require("@services/species.service");
var administrative_level_two_service_1 = require("@services/administrative-level-two.service");
var legal_status_service_1 = require("@app/services/legal-status.service");
var country_service_1 = require("@app/services/country.service");
var land_ownership_service_1 = require("@app/services/land-ownership.service");
var age_bias_service_1 = require("@app/services/age-bias.service");
var sex_bias_service_1 = require("@app/services/sex-bias.service");
var create_contact_component_1 = require("./create-contact/create-contact.component");
var contact_type_service_1 = require("@services/contact-type.service");
var comment_type_service_1 = require("@app/services/comment-type.service");
var organization_service_1 = require("@app/services/organization.service");
var contact_service_1 = require("@app/services/contact.service");
var about_component_1 = require("./about/about.component");
var confirm_component_1 = require("./confirm/confirm.component");
var create_contact_service_1 = require("@app/create-contact/create-contact.service");
var search_dialog_service_1 = require("@app/search-dialog/search-dialog.service");
var search_service_1 = require("@app/services/search.service");
var saved_searches_component_1 = require("./saved-searches/saved-searches.component");
var common_1 = require("@angular/common");
var event_submission_confirm_component_1 = require("./event-submission/event-submission-confirm/event-submission-confirm.component");
var edit_event_component_1 = require("./edit-event/edit-event.component");
var authentication_component_1 = require("./authentication/authentication.component");
var authentication_service_1 = require("@app/services/authentication.service");
var authentication_guard_1 = require("@authentication/authentication.guard");
var pending_changes_guard_1 = require("./event-submission/pending-changes.guard");
var current_user_service_1 = require("@app/services/current-user.service");
var role_service_1 = require("@app/services/role.service");
var add_event_diagnosis_component_1 = require("./add-event-diagnosis/add-event-diagnosis.component");
var edit_location_species_component_1 = require("./edit-location-species/edit-location-species.component");
var edit_species_diagnosis_component_1 = require("./edit-species-diagnosis/edit-species-diagnosis.component");
var diagnosis_basis_service_1 = require("@app/services/diagnosis-basis.service");
var diagnosis_cause_service_1 = require("@app/services/diagnosis-cause.service");
var location_species_diagnosis_service_1 = require("@app/services/location-species-diagnosis.service");
var edit_event_location_component_1 = require("./edit-event-location/edit-event-location.component");
var add_event_location_component_1 = require("./add-event-location/add-event-location.component");
var gnis_lookup_component_1 = require("./gnis-lookup/gnis-lookup.component");
var event_details_share_component_1 = require("./event-details/event-details-share/event-details-share.component");
var user_service_1 = require("@services/user.service");
var edit_user_component_1 = require("./edit-user/edit-user.component");
var service_request_service_1 = require("@app/services/service-request.service");
var location_species_table_component_1 = require("./location-species-table/location-species-table.component");
var species_diagnosis_service_1 = require("@app/services/species-diagnosis.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var add_comment_component_1 = require("./add-comment/add-comment.component");
var event_location_contact_service_1 = require("@app/services/event-location-contact.service");
var add_event_location_contact_component_1 = require("./add-event-location-contact/add-event-location-contact.component");
var add_service_request_component_1 = require("./add-service-request/add-service-request.component");
var new_lookup_request_component_1 = require("./new-lookup-request/new-lookup-request.component");
var save_search_component_1 = require("./save-search/save-search.component");
var user_registration_component_1 = require("./user-registration/user-registration.component");
var view_contact_details_component_1 = require("./view-contact-details/view-contact-details.component");
var add_event_organization_component_1 = require("./add-event-organization/add-event-organization.component");
var user_events_component_1 = require("./user-events/user-events.component");
var results_count_service_1 = require("@services/results-count.service");
var events_component_1 = require("@events/events.component");
var event_group_component_1 = require("./event-group/event-group.component");
var event_group_management_component_1 = require("./event-group-management/event-group-management.component");
var circle_management_component_1 = require("./circle-management/circle-management.component");
var circles_component_1 = require("./circles/circles.component");
var circle_choose_component_1 = require("./circle-management/circle-choose/circle-choose.component");
var diagnostic_info_component_1 = require("./diagnostic-info/diagnostic-info.component");
var comments_table_component_1 = require("./comments-table/comments-table.component");
var view_comment_details_component_1 = require("./view-comment-details/view-comment-details.component");
var alert_collaborators_component_1 = require("./alert-collaborators/alert-collaborators.component");
var notifications_component_1 = require("./notifications/notifications.component");
var custom_notification_component_1 = require("./custom-notification/custom-notification.component");
var browser_warning_component_1 = require("./browser-warning/browser-warning.component");
var collaboration_request_component_1 = require("./collaboration-request/collaboration-request.component");
var bulk_upload_component_1 = require("./bulk-upload/bulk-upload.component");
var ngx_papaparse_1 = require("ngx-papaparse");
var event_public_report_component_1 = require("./event-public-report/event-public-report.component");
var search_results_summary_report_component_1 = require("./search-results-summary-report/search-results-summary-report.component");
var view_notification_details_component_1 = require("./notifications/view-notification-details/view-notification-details.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                event_details_component_1.EventDetailsComponent,
                event_submission_component_1.EventSubmissionComponent,
                diagnostic_services_component_1.DiagnosticServicesComponent,
                user_dashboard_component_1.UserDashboardComponent,
                search_dialog_component_1.SearchDialogComponent,
                display_value_pipe_1.DisplayValuePipe,
                create_contact_component_1.CreateContactComponent,
                about_component_1.AboutComponent,
                confirm_component_1.ConfirmComponent,
                saved_searches_component_1.SavedSearchesComponent,
                event_submission_confirm_component_1.EventSubmissionConfirmComponent,
                authentication_component_1.AuthenticationComponent,
                edit_event_component_1.EditEventComponent,
                add_event_diagnosis_component_1.AddEventDiagnosisComponent,
                edit_location_species_component_1.EditLocationSpeciesComponent,
                edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent,
                edit_event_location_component_1.EditEventLocationComponent,
                add_event_location_component_1.AddEventLocationComponent,
                gnis_lookup_component_1.GnisLookupComponent,
                event_details_share_component_1.EventDetailsShareComponent,
                edit_user_component_1.EditUserComponent,
                location_species_table_component_1.LocationSpeciesTableComponent,
                add_comment_component_1.AddCommentComponent,
                add_event_location_contact_component_1.AddEventLocationContactComponent,
                add_service_request_component_1.AddServiceRequestComponent,
                new_lookup_request_component_1.NewLookupRequestComponent,
                save_search_component_1.SaveSearchComponent,
                user_registration_component_1.UserRegistrationComponent,
                view_contact_details_component_1.ViewContactDetailsComponent,
                add_event_organization_component_1.AddEventOrganizationComponent,
                user_events_component_1.UserEventsComponent,
                events_component_1.EventsComponent,
                event_group_component_1.EventGroupComponent,
                event_group_management_component_1.EventGroupManagementComponent,
                circle_management_component_1.CircleManagementComponent,
                circles_component_1.CirclesComponent,
                circle_choose_component_1.CircleChooseComponent,
                diagnostic_info_component_1.DiagnosticInfoComponent,
                comments_table_component_1.CommentsTableComponent,
                view_comment_details_component_1.ViewCommentDetailsComponent,
                alert_collaborators_component_1.AlertCollaboratorsComponent,
                notifications_component_1.NotificationsComponent,
                custom_notification_component_1.CustomNotificationComponent,
                browser_warning_component_1.BrowserWarningComponent,
                collaboration_request_component_1.CollaborationRequestComponent,
                bulk_upload_component_1.BulkUploadComponent,
                event_public_report_component_1.EventPublicReportComponent,
                search_results_summary_report_component_1.SearchResultsSummaryReportComponent,
                view_notification_details_component_1.ViewNotificationDetailsComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                app_routing_1.ROUTING,
                flex_layout_1.FlexLayoutModule,
                material_1.MatToolbarModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatDividerModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_1.MatBottomSheetModule,
                material_1.MatStepperModule,
                material_1.MatBadgeModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
                ngx_papaparse_1.PapaParseModule
            ],
            providers: [
                authentication_service_1.AuthenticationService,
                authentication_guard_1.AuthenticationGuard,
                current_user_service_1.CurrentUserService,
                data_updated_service_1.DataUpdatedService,
                event_service_1.EventService,
                event_type_service_1.EventTypeService,
                legal_status_service_1.LegalStatusService,
                land_ownership_service_1.LandOwnershipService,
                country_service_1.CountryService,
                administrative_level_one_service_1.AdministrativeLevelOneService,
                administrative_level_two_service_1.AdministrativeLevelTwoService,
                diagnosis_type_service_1.DiagnosisTypeService,
                diagnosis_service_1.DiagnosisService,
                diagnosis_basis_service_1.DiagnosisBasisService,
                diagnosis_cause_service_1.DiagnosisCauseService,
                species_service_1.SpeciesService,
                age_bias_service_1.AgeBiasService,
                sex_bias_service_1.SexBiasService,
                contact_service_1.ContactService,
                create_contact_service_1.CreateContactService,
                contact_type_service_1.ContactTypeService,
                comment_type_service_1.CommentTypeService,
                organization_service_1.OrganizationService,
                role_service_1.RoleService,
                search_service_1.SearchService,
                search_dialog_service_1.SearchDialogService,
                user_service_1.UserService,
                location_species_diagnosis_service_1.LocationSpeciesDiagnosisService,
                species_diagnosis_service_1.SpeciesDiagnosisService,
                event_location_contact_service_1.EventLocationContactService,
                service_request_service_1.ServiceRequestService,
                display_value_pipe_1.DisplayValuePipe,
                common_1.DatePipe,
                results_count_service_1.ResultsCountService,
                event_group_component_1.EventGroupComponent,
                pending_changes_guard_1.CanDeactivateGuard
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [
                search_dialog_component_1.SearchDialogComponent,
                create_contact_component_1.CreateContactComponent,
                confirm_component_1.ConfirmComponent,
                event_submission_confirm_component_1.EventSubmissionConfirmComponent,
                about_component_1.AboutComponent,
                authentication_component_1.AuthenticationComponent,
                edit_event_component_1.EditEventComponent,
                add_event_diagnosis_component_1.AddEventDiagnosisComponent,
                add_event_organization_component_1.AddEventOrganizationComponent,
                edit_location_species_component_1.EditLocationSpeciesComponent,
                edit_species_diagnosis_component_1.EditSpeciesDiagnosisComponent,
                edit_event_location_component_1.EditEventLocationComponent,
                add_event_location_component_1.AddEventLocationComponent,
                gnis_lookup_component_1.GnisLookupComponent,
                event_details_share_component_1.EventDetailsShareComponent,
                edit_user_component_1.EditUserComponent,
                add_comment_component_1.AddCommentComponent,
                add_event_location_contact_component_1.AddEventLocationContactComponent,
                add_service_request_component_1.AddServiceRequestComponent,
                new_lookup_request_component_1.NewLookupRequestComponent,
                save_search_component_1.SaveSearchComponent,
                user_registration_component_1.UserRegistrationComponent,
                view_contact_details_component_1.ViewContactDetailsComponent,
                event_group_management_component_1.EventGroupManagementComponent,
                event_public_report_component_1.EventPublicReportComponent,
                search_results_summary_report_component_1.SearchResultsSummaryReportComponent,
                circle_management_component_1.CircleManagementComponent,
                circle_choose_component_1.CircleChooseComponent,
                diagnostic_info_component_1.DiagnosticInfoComponent,
                view_comment_details_component_1.ViewCommentDetailsComponent,
                custom_notification_component_1.CustomNotificationComponent,
                browser_warning_component_1.BrowserWarningComponent,
                custom_notification_component_1.CustomNotificationComponent,
                collaboration_request_component_1.CollaborationRequestComponent,
                browser_warning_component_1.BrowserWarningComponent,
                bulk_upload_component_1.BulkUploadComponent,
                view_notification_details_component_1.ViewNotificationDetailsComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map