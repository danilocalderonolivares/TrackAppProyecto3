import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppSubTareaModule {}
