import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppHorarioModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
