import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import { GpsAppRoutingEmpleados } from './empleados.route';
import { EmpleadosComponent } from './empleados.component';
import { MapaComponent } from './mapa/mapa.component';
import { EmpleadoDetailComponent } from './empleadoDetail/empleado-detail.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
    imports: [
        GpsAppSharedModule,
        GpsAppRoutingEmpleados,
        GooglePlaceModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA6qPYcS3xkzoGTXEeljg5g_CE3m0wBTlI',
            libraries: ['places']
        })
    ],
    declarations: [EmpleadosComponent, MapaComponent, EmpleadoDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppEmpleadosModule {}
