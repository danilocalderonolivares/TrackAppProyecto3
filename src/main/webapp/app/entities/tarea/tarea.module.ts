import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import { GpsAppSharedModule } from 'app/shared';
import {
    TareaComponent,
    TareaDetailComponent,
    TareaUpdateComponent,
    TareaDeletePopupComponent,
    TareaDeleteDialogComponent,
    tareaRoute,
    tareaPopupRoute
} from './';
import { SelectDropDownModule } from 'ngx-select-dropdown';

const ENTITY_STATES = [...tareaRoute, ...tareaPopupRoute];

@NgModule({
    imports: [GpsAppSharedModule, RouterModule.forChild(ENTITY_STATES), OwlDateTimeModule, OwlNativeDateTimeModule, SelectDropDownModule],
    declarations: [TareaComponent, TareaDetailComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
    entryComponents: [TareaComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: 'es' }]
})
export class GpsAppTareaModule {}
