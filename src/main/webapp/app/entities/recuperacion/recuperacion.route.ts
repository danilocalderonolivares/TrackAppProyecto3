import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recuperacion } from 'app/shared/model/recuperacion.model';
import { RecuperacionService } from './recuperacion.service';
import { RecuperacionComponent } from './recuperacion.component';
import { RecuperacionDetailComponent } from './recuperacion-detail.component';
import { RecuperacionUpdateComponent } from './recuperacion-update.component';
import { RecuperacionDeletePopupComponent } from './recuperacion-delete-dialog.component';
import { IRecuperacion } from 'app/shared/model/recuperacion.model';

@Injectable({ providedIn: 'root' })
export class RecuperacionResolve implements Resolve<IRecuperacion> {
    constructor(private service: RecuperacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecuperacion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Recuperacion>) => response.ok),
                map((recuperacion: HttpResponse<Recuperacion>) => recuperacion.body)
            );
        }
        return of(new Recuperacion());
    }
}

export const recuperacionRoute: Routes = [
    {
        path: '',
        component: RecuperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recuperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RecuperacionDetailComponent,
        resolve: {
            recuperacion: RecuperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recuperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RecuperacionUpdateComponent,
        resolve: {
            recuperacion: RecuperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recuperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RecuperacionUpdateComponent,
        resolve: {
            recuperacion: RecuperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recuperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recuperacionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RecuperacionDeletePopupComponent,
        resolve: {
            recuperacion: RecuperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recuperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
