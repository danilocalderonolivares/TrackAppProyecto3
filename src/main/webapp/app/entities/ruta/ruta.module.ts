import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    RutaComponent,
    RutaDetailComponent,
    RutaUpdateComponent,
    RutaDeletePopupComponent,
    RutaDeleteDialogComponent,
    rutaRoute,
    rutaPopupRoute
} from './';
import { UbicacionFormComponent } from './ubicacion/ubicacion-form.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { MapaRutaComponent } from './mapaRutas/mapa-ruta.component';

const ENTITY_STATES = [...rutaRoute, ...rutaPopupRoute];

@NgModule({
    imports: [
        GpsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GooglePlaceModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA6qPYcS3xkzoGTXEeljg5g_CE3m0wBTlI',
            libraries: ['places']
        })
    ],
    declarations: [
        RutaComponent,
        RutaDetailComponent,
        RutaUpdateComponent,
        RutaDeleteDialogComponent,
        RutaDeletePopupComponent,
        UbicacionFormComponent,
        MapaRutaComponent
    ],
    entryComponents: [RutaComponent, RutaUpdateComponent, RutaDeleteDialogComponent, RutaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppRutaModule {}
