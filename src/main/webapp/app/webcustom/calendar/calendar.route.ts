import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar-layout/calendar-layout.component';
import { UserRouteAccessService } from 'app/core';

const EMPLEADOS_ROUTE: Routes = [
    {
        path: 'calendario',
        component: CalendarComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Calendario'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(EMPLEADOS_ROUTE)],
    exports: [RouterModule]
})
export class GpsAppRoutingCalendario {}
