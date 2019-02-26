import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Horario } from 'app/shared/model/horario.model';
import { HorarioService } from './horario.service';
import { HorarioComponent } from './horario.component';
import { HorarioDetailComponent } from './horario-detail.component';
import { HorarioUpdateComponent } from './horario-update.component';
import { HorarioDeletePopupComponent } from './horario-delete-dialog.component';
import { IHorario } from 'app/shared/model/horario.model';

@Injectable({ providedIn: 'root' })
export class HorarioResolve implements Resolve<IHorario> {
    constructor(private service: HorarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHorario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Horario>) => response.ok),
                map((horario: HttpResponse<Horario>) => horario.body)
            );
        }
        return of(new Horario());
    }
}

export const horarioRoute: Routes = [
    {
        path: '',
        component: HorarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HorarioDetailComponent,
        resolve: {
            horario: HorarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HorarioUpdateComponent,
        resolve: {
            horario: HorarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HorarioUpdateComponent,
        resolve: {
            horario: HorarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horarioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HorarioDeletePopupComponent,
        resolve: {
            horario: HorarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
