import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    RecuperacionComponent,
    RecuperacionDetailComponent,
    RecuperacionUpdateComponent,
    RecuperacionDeletePopupComponent,
    RecuperacionDeleteDialogComponent,
    recuperacionRoute,
    recuperacionPopupRoute
} from './';

const ENTITY_STATES = [...recuperacionRoute, ...recuperacionPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RecuperacionComponent,
        RecuperacionDetailComponent,
        RecuperacionUpdateComponent,
        RecuperacionDeleteDialogComponent,
        RecuperacionDeletePopupComponent
    ],
    entryComponents: [
        RecuperacionComponent,
        RecuperacionUpdateComponent,
        RecuperacionDeleteDialogComponent,
        RecuperacionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppRecuperacionModule {}
