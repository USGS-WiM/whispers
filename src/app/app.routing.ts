import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSubmissionComponent } from './event-submission/event-submission.component';
import { DiagnosticServicesComponent } from './diagnostic-services/diagnostic-services.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateContactComponent } from '@app/create-contact/create-contact.component';
import { AuthenticationGuard } from '@authentication/authentication.guard';
import { CurrentUserService } from '@services/current-user.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'event/:id', component: EventDetailsComponent },
    { path: 'eventsubmission', component: EventSubmissionComponent, canActivate: [AuthenticationGuard] },
    { path: 'diagnostic', component: DiagnosticServicesComponent, canActivate: [AuthenticationGuard] },
    { path: 'userdashboard', component: UserDashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'createcontact', component: CreateContactComponent, canActivate: [AuthenticationGuard] }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
