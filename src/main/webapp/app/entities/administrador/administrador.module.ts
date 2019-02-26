import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    AdministradorComponent,
    AdministradorDetailComponent,
    AdministradorUpdateComponent,
    AdministradorDeletePopupComponent,
    AdministradorDeleteDialogComponent,
    administradorRoute,
    administradorPopupRoute
} from './';

const ENTITY_STATES = [...administradorRoute, ...administradorPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AdministradorComponent,
        AdministradorDetailComponent,
        AdministradorUpdateComponent,
        AdministradorDeleteDialogComponent,
        AdministradorDeletePopupComponent
    ],
    entryComponents: [
        AdministradorComponent,
        AdministradorUpdateComponent,
        AdministradorDeleteDialogComponent,
        AdministradorDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppAdministradorModule {}
