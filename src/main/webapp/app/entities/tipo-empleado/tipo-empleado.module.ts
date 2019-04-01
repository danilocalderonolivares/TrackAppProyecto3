import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GpsAppSharedModule } from 'app/shared';
import {
    TipoEmpleadoComponent,
    TipoEmpleadoDetailComponent,
    TipoEmpleadoUpdateComponent,
    TipoEmpleadoDeletePopupComponent,
    TipoEmpleadoDeleteDialogComponent,
    tipoEmpleadoRoute,
    tipoEmpleadoPopupRoute
} from './';

const ENTITY_STATES = [...tipoEmpleadoRoute, ...tipoEmpleadoPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoEmpleadoComponent,
        TipoEmpleadoDetailComponent,
        TipoEmpleadoUpdateComponent,
        TipoEmpleadoDeleteDialogComponent,
        TipoEmpleadoDeletePopupComponent
    ],
    entryComponents: [
        TipoEmpleadoComponent,
        TipoEmpleadoUpdateComponent,
        TipoEmpleadoDeleteDialogComponent,
        TipoEmpleadoDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppTipoEmpleadoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
