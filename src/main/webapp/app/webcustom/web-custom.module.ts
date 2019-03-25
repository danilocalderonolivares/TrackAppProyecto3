import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppEmpleadosModule } from './empleados/empleados.module';
import { CalendarCompModule } from './calendar/calendar-layout/calendar-layout.module';

@NgModule({
    imports: [GpsAppEmpleadosModule, CalendarCompModule],
    exports: [GpsAppEmpleadosModule, CalendarCompModule],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppWebCustomModule {}
