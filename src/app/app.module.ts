import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatStepperModule,
  MatBadgeModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HomeComponent } from '@home/home.component';
import { EventDetailsComponent } from '@event-details/event-details.component';
import { EventSubmissionComponent } from '@event-submission/event-submission.component';
import { DiagnosticServicesComponent } from '@diagnostic-services/diagnostic-services.component';
import { UserDashboardComponent } from '@user-dashboard/user-dashboard.component';
import { EventService } from '@services/event.service';
import { SearchDialogComponent } from '@search-dialog/search-dialog.component';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';
import { DisplayValuePipe } from '@pipes/display-value.pipe';
import { EventTypeService } from '@services/event-type.service';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';
import { DiagnosisService } from '@services/diagnosis.service';
import { SpeciesService } from '@services/species.service';
import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';
import { LegalStatusService } from '@services/legal-status.service';
import { CountryService } from '@services/country.service';
import { LandOwnershipService } from '@services/land-ownership.service';
import { AgeBiasService } from '@services/age-bias.service';
import { SexBiasService } from '@services/sex-bias.service';
import { CreateContactComponent } from '@create-contact/create-contact.component';
import { ContactTypeService } from '@services/contact-type.service';
import { CommentTypeService } from '@services/comment-type.service';
import { OrganizationService } from '@services/organization.service';
import { ContactService } from '@services/contact.service';
import { AboutComponent } from '@about/about.component';
import { ConfirmComponent } from '@confirm/confirm.component';
import { CreateContactService } from '@app/create-contact/create-contact.service';
import { SearchService } from '@services/search.service';
import { SavedSearchesComponent } from '@saved-searches/saved-searches.component';
import { DatePipe } from '@angular/common';
import { EventSubmissionConfirmComponent } from '@event-submission/event-submission-confirm/event-submission-confirm.component';
import { EditEventComponent } from '@edit-event/edit-event.component';
import { AuthenticationComponent } from '@authentication/authentication.component';
import { AuthenticationService } from '@services/authentication.service';
import { AuthenticationGuard } from '@authentication/authentication.guard';
import { CanDeactivateGuard } from '@event-submission/pending-changes.guard';
import { CurrentUserService } from '@services/current-user.service';
import { RoleService } from '@services/role.service';
import { AddEventDiagnosisComponent } from '@add-event-diagnosis/add-event-diagnosis.component';
import { EditLocationSpeciesComponent } from '@edit-location-species/edit-location-species.component';
import { EditSpeciesDiagnosisComponent } from '@edit-species-diagnosis/edit-species-diagnosis.component';
import { DiagnosisBasisService } from '@services/diagnosis-basis.service';
import { DiagnosisCauseService } from '@services/diagnosis-cause.service';
import { LocationSpeciesDiagnosisService } from '@services/location-species-diagnosis.service';
import { EditEventLocationComponent } from '@edit-event-location/edit-event-location.component';
import { AddEventLocationComponent } from '@add-event-location/add-event-location.component';
import { GnisLookupComponent } from '@gnis-lookup/gnis-lookup.component';
import { EventDetailsShareComponent } from '@event-details/event-details-share/event-details-share.component';
import { UserService } from '@services/user.service';
import { EditUserComponent } from '@edit-user/edit-user.component';
import { ServiceRequestService } from '@services/service-request.service';
import { LocationSpeciesTableComponent } from '@location-species-table/location-species-table.component';
import { SpeciesDiagnosisService } from '@services/species-diagnosis.service';
import { DataUpdatedService } from '@services/data-updated.service';
import { AddCommentComponent } from '@add-comment/add-comment.component';
import { EventLocationContactService } from '@services/event-location-contact.service';
import { AddEventLocationContactComponent } from '@add-event-location-contact/add-event-location-contact.component';
import { AddServiceRequestComponent } from '@add-service-request/add-service-request.component';
import { NewLookupRequestComponent } from '@new-lookup-request/new-lookup-request.component';
import { SaveSearchComponent } from '@save-search/save-search.component';
import { UserRegistrationComponent } from '@user-registration/user-registration.component';
import { ViewContactDetailsComponent } from '@view-contact-details/view-contact-details.component';
import { AddEventOrganizationComponent } from '@add-event-organization/add-event-organization.component';
import { UserEventsComponent } from '@user-events/user-events.component';
import { ResultsCountService } from '@services/results-count.service';
import { EventsComponent } from '@events/events.component';
import { EventGroupComponent } from '@event-group/event-group.component';
import { EventGroupManagementComponent } from '@event-group-management/event-group-management.component';
import { CircleManagementComponent } from '@circle-management/circle-management.component';
import { CirclesComponent } from '@circles/circles.component';
import { CircleChooseComponent } from '@circle-management/circle-choose/circle-choose.component';
import { DiagnosticInfoComponent } from '@diagnostic-info/diagnostic-info.component';
import { CommentsTableComponent } from '@comments-table/comments-table.component';
import { ViewCommentDetailsComponent } from '@view-comment-details/view-comment-details.component';
import { AlertCollaboratorsComponent } from '@alert-collaborators/alert-collaborators.component';
import { NotificationsComponent } from '@notifications/notifications.component';
import { CustomNotificationComponent } from '@custom-notification/custom-notification.component';
import { BrowserWarningComponent } from '@browser-warning/browser-warning.component';
import { CollaborationRequestComponent } from '@collaboration-request/collaboration-request.component';
import { BulkUploadComponent } from '@bulk-upload/bulk-upload.component';
import { PapaParseModule } from 'ngx-papaparse';
import { EventPublicReportComponent } from '@event-public-report/event-public-report.component';
import { SearchResultsSummaryReportComponent } from '@search-results-summary-report/search-results-summary-report.component';
import { ViewNotificationDetailsComponent } from '@notifications/view-notification-details/view-notification-details.component';
import { RequestPasswordResetComponent } from '@request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from '@reset-password/reset-password.component';
import { NewPasswordFormComponent } from '@new-password-form/new-password-form.component';
import { UserRegistrationRoleSelectionComponent } from '@user-registration-role-selection/user-registration-role-selection.component';
import { SearchFormComponent } from '@search-form/search-form.component';
import { SearchFormService } from '@search-form/search-form.service';
import { ChiplistComponent } from '@chiplist/chiplist.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailsComponent,
    EventSubmissionComponent,
    DiagnosticServicesComponent,
    UserDashboardComponent,
    SearchDialogComponent,
    DisplayValuePipe,
    CreateContactComponent,
    AboutComponent,
    ConfirmComponent,
    SavedSearchesComponent,
    EventSubmissionConfirmComponent,
    AuthenticationComponent,
    EditEventComponent,
    AddEventDiagnosisComponent,
    EditLocationSpeciesComponent,
    EditSpeciesDiagnosisComponent,
    EditEventLocationComponent,
    AddEventLocationComponent,
    GnisLookupComponent,
    EventDetailsShareComponent,
    EditUserComponent,
    LocationSpeciesTableComponent,
    AddCommentComponent,
    AddEventLocationContactComponent,
    AddServiceRequestComponent,
    NewLookupRequestComponent,
    SaveSearchComponent,
    UserRegistrationComponent,
    ViewContactDetailsComponent,
    AddEventOrganizationComponent,
    UserEventsComponent,
    EventsComponent,
    EventGroupComponent,
    EventGroupManagementComponent,
    CircleManagementComponent,
    CirclesComponent,
    CircleChooseComponent,
    DiagnosticInfoComponent,
    CommentsTableComponent,
    ViewCommentDetailsComponent,
    AlertCollaboratorsComponent,
    NotificationsComponent,
    CustomNotificationComponent,
    BrowserWarningComponent,
    CollaborationRequestComponent,
    BulkUploadComponent,
    EventPublicReportComponent,
    SearchResultsSummaryReportComponent,
    ViewNotificationDetailsComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    NewPasswordFormComponent,
    UserRegistrationRoleSelectionComponent,
    SearchFormComponent,
    ChiplistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ROUTING,
    FlexLayoutModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatBadgeModule,
    NgxMatSelectSearchModule,
    NgxMatSelectSearchModule,
    PapaParseModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    CurrentUserService,
    DataUpdatedService,
    EventService,
    EventTypeService,
    LegalStatusService,
    LandOwnershipService,
    CountryService,
    AdministrativeLevelOneService,
    AdministrativeLevelTwoService,
    DiagnosisTypeService,
    DiagnosisService,
    DiagnosisBasisService,
    DiagnosisCauseService,
    SpeciesService,
    AgeBiasService,
    SexBiasService,
    ContactService,
    CreateContactService,
    ContactTypeService,
    CommentTypeService,
    OrganizationService,
    RoleService,
    SearchService,
    SearchFormService,
    UserService,
    LocationSpeciesDiagnosisService,
    SpeciesDiagnosisService,
    EventLocationContactService,
    ServiceRequestService,
    DisplayValuePipe,
    DatePipe,
    ResultsCountService,
    EventGroupComponent,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SearchDialogComponent,
    CreateContactComponent,
    ConfirmComponent,
    EventSubmissionConfirmComponent,
    AboutComponent,
    AuthenticationComponent,
    EditEventComponent,
    AddEventDiagnosisComponent,
    AddEventOrganizationComponent,
    EditLocationSpeciesComponent,
    EditSpeciesDiagnosisComponent,
    EditEventLocationComponent,
    AddEventLocationComponent,
    GnisLookupComponent,
    EventDetailsShareComponent,
    EditUserComponent,
    AddCommentComponent,
    AddEventLocationContactComponent,
    AddServiceRequestComponent,
    NewLookupRequestComponent,
    SaveSearchComponent,
    UserRegistrationComponent,
    ViewContactDetailsComponent,
    EventGroupManagementComponent,
    EventPublicReportComponent,
    SearchResultsSummaryReportComponent,
    CircleManagementComponent,
    CircleChooseComponent,
    DiagnosticInfoComponent,
    ViewCommentDetailsComponent,
    CustomNotificationComponent,
    BrowserWarningComponent,
    CustomNotificationComponent,
    CollaborationRequestComponent,
    BrowserWarningComponent,
    BulkUploadComponent,
    ViewNotificationDetailsComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    UserRegistrationRoleSelectionComponent,
  ]
})
export class AppModule { }


