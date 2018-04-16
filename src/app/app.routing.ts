import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSubmissionComponent } from './event-submission/event-submission.component';
import { DiagnosticServicesComponent } from './diagnostic-services/diagnostic-services.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'event/:id', component: EventDetailsComponent },
    { path: 'eventsubmission', component: EventSubmissionComponent },
    { path: 'diagnostic', component: DiagnosticServicesComponent },
    { path: 'userdashboard', component: UserDashboardComponent }
    // {
    //     path: 'admin', 
    //     component: AdminComponent,
    //     resolve: {
    //         concentrationTypes: ConcentrationResolve,
    //         units: UnitResolve,
    //         extractionMethods: ExtractionResolve,
    //         filterTypes: FilterResolve,
    //         matrixTypes: MatrixResolve,
    //         sampleTypes: SampleTypeResolve,
    //         targets: TargetResolve,
    //         users: UserResolve
    //     }
    // }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
