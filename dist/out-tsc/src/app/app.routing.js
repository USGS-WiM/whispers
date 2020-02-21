"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var event_details_component_1 = require("./event-details/event-details.component");
var event_submission_component_1 = require("./event-submission/event-submission.component");
var diagnostic_services_component_1 = require("./diagnostic-services/diagnostic-services.component");
var user_dashboard_component_1 = require("./user-dashboard/user-dashboard.component");
var create_contact_component_1 = require("@app/create-contact/create-contact.component");
var authentication_guard_1 = require("@authentication/authentication.guard");
var pending_changes_guard_1 = require("./event-submission/pending-changes.guard");
exports.ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'event/:id', component: event_details_component_1.EventDetailsComponent },
    { path: 'eventsubmission', component: event_submission_component_1.EventSubmissionComponent, canActivate: [authentication_guard_1.AuthenticationGuard], canDeactivate: [pending_changes_guard_1.CanDeactivateGuard] },
    { path: 'diagnostic', component: diagnostic_services_component_1.DiagnosticServicesComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'userdashboard', component: user_dashboard_component_1.UserDashboardComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'createcontact', component: create_contact_component_1.CreateContactComponent, canActivate: [authentication_guard_1.AuthenticationGuard] }
];
exports.ROUTING = router_1.RouterModule.forRoot(exports.ROUTES);
//# sourceMappingURL=app.routing.js.map