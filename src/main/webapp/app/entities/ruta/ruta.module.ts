import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    RutaComponent,
    RutaDetailComponent,
    RutaUpdateComponent,
    RutaDeletePopupComponent,
    RutaDeleteDialogComponent,
    rutaRoute,
    rutaPopupRoute
} from './';

const ENTITY_STATES = [...rutaRoute, ...rutaPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RutaComponent, RutaDetailComponent, RutaUpdateComponent, RutaDeleteDialogComponent, RutaDeletePopupComponent],
    entryComponents: [RutaComponent, RutaUpdateComponent, RutaDeleteDialogComponent, RutaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppRutaModule {}
