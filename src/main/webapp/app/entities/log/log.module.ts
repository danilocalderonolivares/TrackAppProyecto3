import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GpsAppSharedModule } from 'app/shared';
import {
    LogComponent,
    LogDetailComponent,
    LogUpdateComponent,
    LogDeletePopupComponent,
    LogDeleteDialogComponent,
    logRoute,
    logPopupRoute
} from './';

const ENTITY_STATES = [...logRoute, ...logPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LogComponent, LogDetailComponent, LogUpdateComponent, LogDeleteDialogComponent, LogDeletePopupComponent],
    entryComponents: [LogComponent, LogUpdateComponent, LogDeleteDialogComponent, LogDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppLogModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
