'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">whispers documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' : 'data-target="#xs-components-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' :
                                            'id="xs-components-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCommentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCommentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddEventDiagnosisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEventDiagnosisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddEventLocationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEventLocationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddEventLocationContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEventLocationContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddEventOrganizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEventOrganizationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddServiceRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddServiceRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertCollaboratorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertCollaboratorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthenticationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthenticationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrowserWarningComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrowserWarningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BulkUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BulkUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CircleChooseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CircleChooseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CircleManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CircleManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CirclesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CirclesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollaborationRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollaborationRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommentsTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentsTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomNotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomNotificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagnosticInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagnosticInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagnosticServicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiagnosticServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEventLocationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditEventLocationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditLocationSpeciesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditLocationSpeciesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditSpeciesDiagnosisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditSpeciesDiagnosisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventDetailsShareComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventDetailsShareComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventGroupManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventGroupManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventPublicReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventPublicReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventSubmissionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventSubmissionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventSubmissionConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventSubmissionConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GnisLookupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GnisLookupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocationSpeciesTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LocationSpeciesTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewLookupRequestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewLookupRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SavedSearchesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SavedSearchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchResultsSummaryReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchResultsSummaryReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRegistrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserRegistrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCommentDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewCommentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewContactDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewContactDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewNotificationDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewNotificationDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' : 'data-target="#xs-injectables-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' :
                                        'id="xs-injectables-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                        <li class="link">
                                            <a href="injectables/AdministrativeLevelOneService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdministrativeLevelOneService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdministrativeLevelTwoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdministrativeLevelTwoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AgeBiasService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AgeBiasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommentTypeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContactService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContactService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContactTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContactTypeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CountryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CountryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateContactService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CreateContactService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrentUserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CurrentUserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataUpdatedService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataUpdatedService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiagnosisBasisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiagnosisBasisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiagnosisCauseService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiagnosisCauseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiagnosisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiagnosisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiagnosisTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiagnosisTypeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventLocationContactService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventLocationContactService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventTypeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventTypeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LandOwnershipService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LandOwnershipService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LegalStatusService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LegalStatusService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocationSpeciesDiagnosisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocationSpeciesDiagnosisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrganizationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrganizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResultsCountService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ResultsCountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchDialogService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SearchDialogService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceRequestService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ServiceRequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SexBiasService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SexBiasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpeciesDiagnosisService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SpeciesDiagnosisService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpeciesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SpeciesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' : 'data-target="#xs-pipes-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' :
                                            'id="xs-pipes-links-module-AppModule-ef285e26195db8a6a22d28478c3fcb3b"' }>
                                            <li class="link">
                                                <a href="pipes/DisplayValuePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisplayValuePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link">AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddCommentComponent.html" data-type="entity-link">AddCommentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddEventDiagnosisComponent.html" data-type="entity-link">AddEventDiagnosisComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddEventLocationComponent.html" data-type="entity-link">AddEventLocationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddEventLocationContactComponent.html" data-type="entity-link">AddEventLocationContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddEventOrganizationComponent.html" data-type="entity-link">AddEventOrganizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddServiceRequestComponent.html" data-type="entity-link">AddServiceRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AlertCollaboratorsComponent.html" data-type="entity-link">AlertCollaboratorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthenticationComponent.html" data-type="entity-link">AuthenticationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrowserWarningComponent.html" data-type="entity-link">BrowserWarningComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BulkUploadComponent.html" data-type="entity-link">BulkUploadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CircleChooseComponent.html" data-type="entity-link">CircleChooseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CircleManagementComponent.html" data-type="entity-link">CircleManagementComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CirclesComponent.html" data-type="entity-link">CirclesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CollaborationRequestComponent.html" data-type="entity-link">CollaborationRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CommentsTableComponent.html" data-type="entity-link">CommentsTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmComponent.html" data-type="entity-link">ConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CreateContactComponent.html" data-type="entity-link">CreateContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomNotificationComponent.html" data-type="entity-link">CustomNotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DiagnosticInfoComponent.html" data-type="entity-link">DiagnosticInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DiagnosticServicesComponent.html" data-type="entity-link">DiagnosticServicesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditEventComponent.html" data-type="entity-link">EditEventComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditEventLocationComponent.html" data-type="entity-link">EditEventLocationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditLocationSpeciesComponent.html" data-type="entity-link">EditLocationSpeciesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditSpeciesDiagnosisComponent.html" data-type="entity-link">EditSpeciesDiagnosisComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditUserComponent.html" data-type="entity-link">EditUserComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventDetailsComponent.html" data-type="entity-link">EventDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventDetailsShareComponent.html" data-type="entity-link">EventDetailsShareComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventGroupComponent.html" data-type="entity-link">EventGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventGroupManagementComponent.html" data-type="entity-link">EventGroupManagementComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventPublicReportComponent.html" data-type="entity-link">EventPublicReportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventsComponent.html" data-type="entity-link">EventsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventSubmissionComponent.html" data-type="entity-link">EventSubmissionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventSubmissionConfirmComponent.html" data-type="entity-link">EventSubmissionConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GnisLookupComponent.html" data-type="entity-link">GnisLookupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link">HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocationSpeciesTableComponent.html" data-type="entity-link">LocationSpeciesTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewLookupRequestComponent.html" data-type="entity-link">NewLookupRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsComponent.html" data-type="entity-link">NotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SavedSearchesComponent.html" data-type="entity-link">SavedSearchesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SaveSearchComponent.html" data-type="entity-link">SaveSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchDialogComponent.html" data-type="entity-link">SearchDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchResultsSummaryReportComponent.html" data-type="entity-link">SearchResultsSummaryReportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserDashboardComponent.html" data-type="entity-link">UserDashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserEventsComponent.html" data-type="entity-link">UserEventsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserRegistrationComponent.html" data-type="entity-link">UserRegistrationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewCommentDetailsComponent.html" data-type="entity-link">ViewCommentDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewContactDetailsComponent.html" data-type="entity-link">ViewContactDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewNotificationDetailsComponent.html" data-type="entity-link">ViewNotificationDetailsComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CirclesDataSource.html" data-type="entity-link">CirclesDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateValidators.html" data-type="entity-link">DateValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventGroupsDataSource.html" data-type="entity-link">EventGroupsDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventsDataSource.html" data-type="entity-link">EventsDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventSearchResultsDataSource.html" data-type="entity-link">EventSearchResultsDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEventsDataSource.html" data-type="entity-link">UserEventsDataSource</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdministrativeLevelOneService.html" data-type="entity-link">AdministrativeLevelOneService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdministrativeLevelTwoService.html" data-type="entity-link">AdministrativeLevelTwoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AgeBiasService.html" data-type="entity-link">AgeBiasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APP_SETTINGS.html" data-type="entity-link">APP_SETTINGS</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APP_UTILITIES.html" data-type="entity-link">APP_UTILITIES</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CircleManagementService.html" data-type="entity-link">CircleManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CircleService.html" data-type="entity-link">CircleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link">CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentTypeService.html" data-type="entity-link">CommentTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactService.html" data-type="entity-link">ContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactTypeService.html" data-type="entity-link">ContactTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateContactService.html" data-type="entity-link">CreateContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CueService.html" data-type="entity-link">CueService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrentUserService.html" data-type="entity-link">CurrentUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataUpdatedService.html" data-type="entity-link">DataUpdatedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiagnosisBasisService.html" data-type="entity-link">DiagnosisBasisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiagnosisCauseService.html" data-type="entity-link">DiagnosisCauseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiagnosisService.html" data-type="entity-link">DiagnosisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiagnosisTypeService.html" data-type="entity-link">DiagnosisTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventDiagnosisService.html" data-type="entity-link">EventDiagnosisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventGroupManagementService.html" data-type="entity-link">EventGroupManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventGroupService.html" data-type="entity-link">EventGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventLocationContactService.html" data-type="entity-link">EventLocationContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventLocationService.html" data-type="entity-link">EventLocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventOrganizationService.html" data-type="entity-link">EventOrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventStatusService.html" data-type="entity-link">EventStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventTypeService.html" data-type="entity-link">EventTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FIELD_HELP_TEXT.html" data-type="entity-link">FIELD_HELP_TEXT</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LandOwnershipService.html" data-type="entity-link">LandOwnershipService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LegalStatusService.html" data-type="entity-link">LegalStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationSpeciesDiagnosisService.html" data-type="entity-link">LocationSpeciesDiagnosisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationSpeciesService.html" data-type="entity-link">LocationSpeciesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationService.html" data-type="entity-link">OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultsCountService.html" data-type="entity-link">ResultsCountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link">RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchDialogService.html" data-type="entity-link">SearchDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceRequestService.html" data-type="entity-link">ServiceRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SexBiasService.html" data-type="entity-link">SexBiasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpeciesDiagnosisService.html" data-type="entity-link">SpeciesDiagnosisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpeciesService.html" data-type="entity-link">SpeciesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StaffService.html" data-type="entity-link">StaffService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UrlShorteningService.html" data-type="entity-link">UrlShorteningService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEventsComponent.html" data-type="entity-link">UserEventsComponent</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link">AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CanDeactivateGuard.html" data-type="entity-link">CanDeactivateGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdministrativeLevelOne.html" data-type="entity-link">AdministrativeLevelOne</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdministrativeLevelTwo.html" data-type="entity-link">AdministrativeLevelTwo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgeBias.html" data-type="entity-link">AgeBias</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssociatedEvents.html" data-type="entity-link">AssociatedEvents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BulkUploadRecord.html" data-type="entity-link">BulkUploadRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Circle.html" data-type="entity-link">Circle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CombinedComments.html" data-type="entity-link">CombinedComments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentType.html" data-type="entity-link">CommentType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contact.html" data-type="entity-link">Contact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactType.html" data-type="entity-link">ContactType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link">Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomNotificationCue.html" data-type="entity-link">CustomNotificationCue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Diagnosis.html" data-type="entity-link">Diagnosis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagnosisBasis.html" data-type="entity-link">DiagnosisBasis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagnosisCause.html" data-type="entity-link">DiagnosisCause</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagnosisType.html" data-type="entity-link">DiagnosisType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DisplayQuery.html" data-type="entity-link">DisplayQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventDetail.html" data-type="entity-link">EventDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventDiagnosis.html" data-type="entity-link">EventDiagnosis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventDiagnosisSubmission.html" data-type="entity-link">EventDiagnosisSubmission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventGroup.html" data-type="entity-link">EventGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventLocation.html" data-type="entity-link">EventLocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventOrganization.html" data-type="entity-link">EventOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventStatus.html" data-type="entity-link">EventStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventSubmission.html" data-type="entity-link">EventSubmission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventSummary.html" data-type="entity-link">EventSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventType.html" data-type="entity-link">EventType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/History.html" data-type="entity-link">History</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LandOwnership.html" data-type="entity-link">LandOwnership</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LegalStatus.html" data-type="entity-link">LegalStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationContact.html" data-type="entity-link">LocationContact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationSpecies.html" data-type="entity-link">LocationSpecies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationSpeciesDiagnosis.html" data-type="entity-link">LocationSpeciesDiagnosis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewEventLocation.html" data-type="entity-link">NewEventLocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewLocationSpecies.html" data-type="entity-link">NewLocationSpecies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewSpeciesDiagnosis.html" data-type="entity-link">NewSpeciesDiagnosis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification-1.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationCuePreference.html" data-type="entity-link">NotificationCuePreference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organization.html" data-type="entity-link">Organization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationSummary.html" data-type="entity-link">OrganizationSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageData.html" data-type="entity-link">PageData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Role.html" data-type="entity-link">Role</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Search.html" data-type="entity-link">Search</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchQuery.html" data-type="entity-link">SearchQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceRequestResponse.html" data-type="entity-link">ServiceRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SexBias.html" data-type="entity-link">SexBias</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Species.html" data-type="entity-link">Species</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpeciesDiagnosis.html" data-type="entity-link">SpeciesDiagnosis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Staff.html" data-type="entity-link">Staff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/DisplayValuePipe.html" data-type="entity-link">DisplayValuePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});