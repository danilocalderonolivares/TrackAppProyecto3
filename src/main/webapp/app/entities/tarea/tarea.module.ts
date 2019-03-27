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
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';

const ENTITY_STATES = [...tareaRoute, ...tareaPopupRoute];

@NgModule({
    imports: [
        GpsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        GooglePlaceModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA6qPYcS3xkzoGTXEeljg5g_CE3m0wBTlI',
            libraries: ['places']
        })
    ],
    declarations: [TareaComponent, TareaDetailComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
    entryComponents: [TareaComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: 'es' }]
})
export class GpsAppTareaModule {}
