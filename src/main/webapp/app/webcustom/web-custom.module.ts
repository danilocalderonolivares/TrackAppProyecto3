import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppEmpleadosModule } from './empleados/empleados.module';
import { CalendarCompModule } from './calendar/calendar-layout/calendar-layout.module';
import { GpsAppChatModule } from 'app/webcustom/chat/chat.module';
import { ChatsListComponent } from './chat/chats-list/chats-list.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';

@NgModule({
    imports: [GpsAppEmpleadosModule, CalendarCompModule, GpsAppChatModule],
    exports: [GpsAppEmpleadosModule, CalendarCompModule, GpsAppChatModule],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ChatsListComponent, ChatWindowComponent]
})
export class GpsAppWebCustomModule {}
