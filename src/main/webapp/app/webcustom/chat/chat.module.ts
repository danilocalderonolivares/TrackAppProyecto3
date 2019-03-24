import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppSharedModule } from 'app/shared';
import { ChatComponent } from 'app/webcustom/chat/chat.component';
import { GpsAppChatRouting } from 'app/webcustom/chat/chat.route';

@NgModule({
    imports: [GpsAppSharedModule, GpsAppChatRouting],
    declarations: [ChatComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppChatModule {}
