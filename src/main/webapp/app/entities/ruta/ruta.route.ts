import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ruta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';
import { RutaComponent } from './ruta.component';
import { RutaDetailComponent } from './ruta-detail.component';
import { RutaUpdateComponent } from './ruta-update.component';
import { RutaDeletePopupComponent } from './ruta-delete-dialog.component';
import { IRuta } from 'app/shared/model/ruta.model';

@Injectable({ providedIn: 'root' })
export class RutaResolve implements Resolve<IRuta> {
    constructor(private service: RutaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRuta> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ruta>) => response.ok),
                map((ruta: HttpResponse<Ruta>) => ruta.body)
            );
        }
        return of(new Ruta());
    }
}

export const rutaRoute: Routes = [
    {
        path: '',
        component: RutaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RutaDetailComponent,
        resolve: {
            ruta: RutaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RutaUpdateComponent,
        resolve: {
            ruta: RutaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RutaUpdateComponent,
        resolve: {
            ruta: RutaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rutaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RutaDeletePopupComponent,
        resolve: {
            ruta: RutaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rutas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
