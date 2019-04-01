import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppUbicacionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
