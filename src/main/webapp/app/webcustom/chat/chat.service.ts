import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { MensajeService } from 'app/entities/mensaje';
import { ChatRoomService } from 'app/entities/chat-room';
import { Mensaje } from 'app/shared/model/mensaje.model';
import { WebsocketService } from 'app/webcustom/chat/websoket-service';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnInit {
    chatSelected = new EventEmitter<ChatRoom>();

    ngOnInit() {}

    constructor(
        private mensajeService: MensajeService,
        private chatRoomService: ChatRoomService,
        private websocketService: WebsocketService
    ) {}

    public sendMessage(message: Mensaje, chat: ChatRoom) {
        this.mensajeService.create(message).subscribe(res => {
            chat.mensajes.push(res.body as Mensaje);
            this.updateChatRoomMessages(chat);
            this.websocketService.emit('new-message', chat);
        });
    }

    public chatRoomSelected(chat: ChatRoom) {
        this.chatSelected.emit(chat);
    }

    public updateChatRoomMessages(chat: ChatRoom) {
        this.chatRoomService.update(chat).subscribe(res => {
            console.log();
        });
    }

    public getMessages() {
        return this.websocketService.listen('newMessage');
    }
}
