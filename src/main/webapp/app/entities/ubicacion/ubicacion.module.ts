import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    UbicacionComponent,
    UbicacionDetailComponent,
    UbicacionUpdateComponent,
    UbicacionDeletePopupComponent,
    UbicacionDeleteDialogComponent,
    ubicacionRoute,
    ubicacionPopupRoute
} from './';

const ENTITY_STATES = [...ubicacionRoute, ...ubicacionPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UbicacionComponent,
        UbicacionDetailComponent,
        UbicacionUpdateComponent,
        UbicacionDeleteDialogComponent,
        UbicacionDeletePopupComponent
    ],
    entryComponents: [UbicacionComponent, UbicacionUpdateComponent, UbicacionDeleteDialogComponent, UbicacionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppUbicacionModule {}
