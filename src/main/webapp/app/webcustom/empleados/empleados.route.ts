import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadoDetailComponent } from './empleadoDetail/empleado-detail.component';
import { UserRouteAccessService } from 'app/core';

const EMPLEADOS_ROUTE: Routes = [
    {
        path: 'empleados',
        component: EmpleadosComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'empleados/:id',
        component: EmpleadoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Detalle del empleado'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(EMPLEADOS_ROUTE)],
    exports: [RouterModule]
})
export class GpsAppRoutingEmpleados {}
