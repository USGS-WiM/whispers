import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSubmissionComponent } from './event-submission/event-submission.component';
import { DiagnosticServicesComponent } from './diagnostic-services/diagnostic-services.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EventService } from '@app/services/event.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { DisplayValuePipe } from './pipes/display-value.pipe';
import { EventTypeService } from '@services/event-type.service';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';
import { DiagnosisService } from '@services/diagnosis.service';
import { SpeciesService } from '@services/species.service';
import { AdministrativeLevelTwoService } from '@services/administrative-level-two.service';
import { LegalStatusService } from '@app/services/legal-status.service';
import { CountryService } from '@app/services/country.service';
import { LandOwnershipService } from '@app/services/land-ownership.service';
import { AgeBiasService } from '@app/services/age-bias.service';
import { SexBiasService } from '@app/services/sex-bias.service';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactTypeService } from '@services/contact-type.service';
import { CommentTypeService } from '@app/services/comment-type.service';
import { OrganizationService } from '@app/services/organization.service';
import { ContactService } from '@app/services/contact.service';
import { AboutComponent } from './about/about.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CreateContactService } from '@app/create-contact/create-contact.service';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';
import { SearchService } from '@app/services/search.service';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { DatePipe } from '@angular/common';
import { EventSubmissionConfirmComponent } from './event-submission/event-submission-confirm/event-submission-confirm.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from '@app/services/authentication.service';
import { AuthenticationGuard } from '@authentication/authentication.guard';
import { CanDeactivateGuard } from './event-submission/pending-changes.guard';
import { CurrentUserService } from '@app/services/current-user.service';
import { RoleService } from '@app/services/role.service';
import { AddEventDiagnosisComponent } from './add-event-diagnosis/add-event-diagnosis.component';
import { EditLocationSpeciesComponent } from './edit-location-species/edit-location-species.component';
import { EditSpeciesDiagnosisComponent } from './edit-species-diagnosis/edit-species-diagnosis.component';
import { DiagnosisBasisService } from '@app/services/diagnosis-basis.service';
import { DiagnosisCauseService } from '@app/services/diagnosis-cause.service';
import { LocationSpeciesDiagnosisService } from '@app/services/location-species-diagnosis.service';
import { EditEventLocationComponent } from './edit-event-location/edit-event-location.component';
import { AddEventLocationComponent } from './add-event-location/add-event-location.component';
import { GnisLookupComponent } from './gnis-lookup/gnis-lookup.component';
import { EventDetailsShareComponent } from './event-details/event-details-share/event-details-share.component';
import { UserService } from '@services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ServiceRequestService } from '@app/services/service-request.service';
import { LocationSpeciesTableComponent } from './location-species-table/location-species-table.component';
import { SpeciesDiagnosisService } from '@app/services/species-diagnosis.service';
import { DataUpdatedService } from '@app/services/data-updated.service';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { EventLocationContactService } from '@app/services/event-location-contact.service';
import { AddEventLocationContactComponent } from './add-event-location-contact/add-event-location-contact.component';
import { AddServiceRequestComponent } from './add-service-request/add-service-request.component';
import { NewLookupRequestComponent } from './new-lookup-request/new-lookup-request.component';
import { SaveSearchComponent } from './save-search/save-search.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ViewContactDetailsComponent } from './view-contact-details/view-contact-details.component';
import { AddEventOrganizationComponent } from './add-event-organization/add-event-organization.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { ResultsCountService } from '@services/results-count.service';
import { EventsComponent } from '@events/events.component';
import { EventGroupComponent } from './event-group/event-group.component';
import { EventGroupManagementComponent } from './event-group-management/event-group-management.component';
import { CircleManagementComponent } from './circle-management/circle-management.component';
import { CirclesComponent } from './circles/circles.component';
import { CircleChooseComponent } from './circle-management/circle-choose/circle-choose.component';
import { DiagnosticInfoComponent } from './diagnostic-info/diagnostic-info.component';
import { CommentsTableComponent } from './comments-table/comments-table.component';
import { ViewCommentDetailsComponent } from './view-comment-details/view-comment-details.component';
import { AlertCollaboratorsComponent } from './alert-collaborators/alert-collaborators.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CustomNotificationComponent } from './custom-notification/custom-notification.component';
import { BrowserWarningComponent } from './browser-warning/browser-warning.component';




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
    NgxDatatableModule,
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
    NgxMatSelectSearchModule
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
    SearchDialogService,
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
    CircleManagementComponent,
    CircleChooseComponent,
    DiagnosticInfoComponent,
    ViewCommentDetailsComponent,
    CustomNotificationComponent,
    BrowserWarningComponent
  ]
})
export class AppModule { }


