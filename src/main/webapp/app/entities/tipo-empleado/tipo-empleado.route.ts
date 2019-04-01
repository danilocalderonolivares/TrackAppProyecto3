import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { TipoEmpleadoService } from './tipo-empleado.service';
import { TipoEmpleadoComponent } from './tipo-empleado.component';
import { TipoEmpleadoDetailComponent } from './tipo-empleado-detail.component';
import { TipoEmpleadoUpdateComponent } from './tipo-empleado-update.component';
import { TipoEmpleadoDeletePopupComponent } from './tipo-empleado-delete-dialog.component';
import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';

@Injectable({ providedIn: 'root' })
export class TipoEmpleadoResolve implements Resolve<ITipoEmpleado> {
    constructor(private service: TipoEmpleadoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoEmpleado> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoEmpleado>) => response.ok),
                map((tipoEmpleado: HttpResponse<TipoEmpleado>) => tipoEmpleado.body)
            );
        }
        return of(new TipoEmpleado());
    }
}

export const tipoEmpleadoRoute: Routes = [
    {
        path: '',
        component: TipoEmpleadoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TipoEmpleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoEmpleadoDetailComponent,
        resolve: {
            tipoEmpleado: TipoEmpleadoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TipoEmpleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoEmpleadoUpdateComponent,
        resolve: {
            tipoEmpleado: TipoEmpleadoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TipoEmpleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoEmpleadoUpdateComponent,
        resolve: {
            tipoEmpleado: TipoEmpleadoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TipoEmpleados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoEmpleadoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoEmpleadoDeletePopupComponent,
        resolve: {
            tipoEmpleado: TipoEmpleadoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TipoEmpleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
