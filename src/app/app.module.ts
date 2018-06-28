import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatBottomSheetModule
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    MatStepperModule,
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
    MatBottomSheetModule
  ],
  providers: [
    EventService,
    EventTypeService,
    LegalStatusService,
    LandOwnershipService,
    CountryService,
    AdministrativeLevelOneService,
    AdministrativeLevelTwoService,
    DiagnosisTypeService,
    DiagnosisService,
    SpeciesService,
    AgeBiasService,
    SexBiasService,
    ContactService,
    CreateContactService,
    ContactTypeService,
    CommentTypeService,
    OrganizationService,
    SearchService,
    SearchDialogService,
    DisplayValuePipe,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SearchDialogComponent,
    CreateContactComponent,
    ConfirmComponent,
    EventSubmissionConfirmComponent,
    AboutComponent
  ]
})
export class AppModule { }


