import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppEmpleadosModule } from './empleados/empleados.module';
import { CalendarCompModule } from './calendar/calendar-layout/calendar-layout.module';
import { GPSAppTestwsModule } from 'app/webcustom/testws/testws.module';

@NgModule({
    imports: [GpsAppEmpleadosModule, CalendarCompModule, GPSAppTestwsModule],
    exports: [GpsAppEmpleadosModule, CalendarCompModule, GPSAppTestwsModule],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppWebCustomModule {}
