import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubTarea } from 'app/shared/model/sub-tarea.model';
import { SubTareaService } from './sub-tarea.service';
import { SubTareaComponent } from './sub-tarea.component';
import { SubTareaDetailComponent } from './sub-tarea-detail.component';
import { SubTareaUpdateComponent } from './sub-tarea-update.component';
import { SubTareaDeletePopupComponent } from './sub-tarea-delete-dialog.component';
import { ISubTarea } from 'app/shared/model/sub-tarea.model';

@Injectable({ providedIn: 'root' })
export class SubTareaResolve implements Resolve<ISubTarea> {
    constructor(private service: SubTareaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubTarea> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SubTarea>) => response.ok),
                map((subTarea: HttpResponse<SubTarea>) => subTarea.body)
            );
        }
        return of(new SubTarea());
    }
}

export const subTareaRoute: Routes = [
    {
        path: '',
        component: SubTareaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gpsApp.subTarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SubTareaDetailComponent,
        resolve: {
            subTarea: SubTareaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gpsApp.subTarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SubTareaUpdateComponent,
        resolve: {
            subTarea: SubTareaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gpsApp.subTarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SubTareaUpdateComponent,
        resolve: {
            subTarea: SubTareaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gpsApp.subTarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subTareaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SubTareaDeletePopupComponent,
        resolve: {
            subTarea: SubTareaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gpsApp.subTarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
