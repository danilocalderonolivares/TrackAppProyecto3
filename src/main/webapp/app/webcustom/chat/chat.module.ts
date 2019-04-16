import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GpsAppSharedModule } from 'app/shared';
import { ChatComponent } from 'app/webcustom/chat/chat.component';
import { GpsAppChatRouting } from 'app/webcustom/chat/chat.route';
import { ChatsListComponent } from 'app/webcustom/chat/chats-list/chats-list.component';
import { ChatWindowComponent } from 'app/webcustom/chat/chat-window/chat-window.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    imports: [GpsAppSharedModule, GpsAppChatRouting, SocketIoModule.forRoot(config)],
    declarations: [ChatComponent, ChatsListComponent, ChatWindowComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppChatModule {}
