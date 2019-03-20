import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppEmpleadosModule } from './empleados/empleados.module';

@NgModule({
    imports: [GpsAppEmpleadosModule],
    exports: [GpsAppEmpleadosModule],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppWebCustomModule {}
