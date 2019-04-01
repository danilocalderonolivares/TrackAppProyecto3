import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppLogModule {}
