import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppEmpleadosModule } from './empleados/empleados.module';
import { CalendarCompModule } from './calendar/calendar-layout/calendar-layout.module';
import { GpsAppChatModule } from 'app/webcustom/chat/chat.module';

@NgModule({
    imports: [GpsAppEmpleadosModule, CalendarCompModule, GpsAppChatModule],
    exports: [GpsAppEmpleadosModule, CalendarCompModule, GpsAppChatModule],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppWebCustomModule {}
