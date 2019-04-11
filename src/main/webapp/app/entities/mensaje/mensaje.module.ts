import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';

import { GpsAppSharedModule } from 'app/shared';
import {
    MensajeComponent,
    MensajeDetailComponent,
    MensajeUpdateComponent,
    MensajeDeletePopupComponent,
    MensajeDeleteDialogComponent,
    mensajeRoute,
    mensajePopupRoute
} from './';

const ENTITY_STATES = [...mensajeRoute, ...mensajePopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MensajeComponent,
        MensajeDetailComponent,
        MensajeUpdateComponent,
        MensajeDeleteDialogComponent,
        MensajeDeletePopupComponent
    ],
    entryComponents: [MensajeComponent, MensajeUpdateComponent, MensajeDeleteDialogComponent, MensajeDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppMensajeModule {}
