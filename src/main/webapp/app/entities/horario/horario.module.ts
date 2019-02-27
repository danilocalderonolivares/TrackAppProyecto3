import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    HorarioComponent,
    HorarioDetailComponent,
    HorarioUpdateComponent,
    HorarioDeletePopupComponent,
    HorarioDeleteDialogComponent,
    horarioRoute,
    horarioPopupRoute
} from './';

const ENTITY_STATES = [...horarioRoute, ...horarioPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HorarioComponent,
        HorarioDetailComponent,
        HorarioUpdateComponent,
        HorarioDeleteDialogComponent,
        HorarioDeletePopupComponent
    ],
    entryComponents: [HorarioComponent, HorarioUpdateComponent, HorarioDeleteDialogComponent, HorarioDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppHorarioModule {}
