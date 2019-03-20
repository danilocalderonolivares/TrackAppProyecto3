import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import { GpsAppRoutingEmpleados } from './empleados.route';
import { EmpleadosComponent } from './empleados.component';
import { MapaComponent } from './mapa/mapa.component';
import { EmpleadoDetailComponent } from './empleadoDetail/empleado-detail.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        GpsAppSharedModule,
        GpsAppRoutingEmpleados,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBCVH3775FynPc2DjxfhnlpjmloJbHrSqA'
        })
    ],
    declarations: [EmpleadosComponent, MapaComponent, EmpleadoDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppEmpleadosModule {}
