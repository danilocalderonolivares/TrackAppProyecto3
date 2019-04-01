import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GpsAppSharedModule } from 'app/shared';
import {
    SubTareaComponent,
    SubTareaDetailComponent,
    SubTareaUpdateComponent,
    SubTareaDeletePopupComponent,
    SubTareaDeleteDialogComponent,
    subTareaRoute,
    subTareaPopupRoute
} from './';

const ENTITY_STATES = [...subTareaRoute, ...subTareaPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubTareaComponent,
        SubTareaDetailComponent,
        SubTareaUpdateComponent,
        SubTareaDeleteDialogComponent,
        SubTareaDeletePopupComponent
    ],
    entryComponents: [SubTareaComponent, SubTareaUpdateComponent, SubTareaDeleteDialogComponent, SubTareaDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppSubTareaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
