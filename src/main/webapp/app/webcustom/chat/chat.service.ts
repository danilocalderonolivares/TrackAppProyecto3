import * as io from 'socket.io-client';
import { EventEmitter, Injectable } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { MensajeService } from 'app/entities/mensaje';
import { ChatRoomService } from 'app/entities/chat-room';
import { Mensaje } from 'app/shared/model/mensaje.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    chatSelected = new EventEmitter<ChatRoom>();

    constructor(private mensajeService: MensajeService, private chatRoomService: ChatRoomService) {
        // this.socket = io(this.url);
    }

    /*public sendMessage(message) {
        this.socket.emit('new-message', message);
    }*/

    public sendMessage(message: Mensaje, chatRoom: ChatRoom) {
        this.mensajeService.create(message).subscribe(res => {
            chatRoom.mensajes.push(res.body as Mensaje);
            this.updateChatRoomMessages(chatRoom);
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
}
