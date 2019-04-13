import * as io from 'socket.io-client';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { MensajeService } from 'app/entities/mensaje';
import { ChatRoomService } from 'app/entities/chat-room';
import { Mensaje } from 'app/shared/model/mensaje.model';
import { Observable } from 'rxjs';

const socket = io('http://localhost:3000');

@Injectable({ providedIn: 'root' })
export class ChatService implements OnInit {
    chatSelected = new EventEmitter<ChatRoom>();

    ngOnInit() {}

    constructor(private mensajeService: MensajeService, private chatRoomService: ChatRoomService) {}

    public sendMessage(message: Mensaje, chatRoom: ChatRoom) {
        this.mensajeService.create(message).subscribe(res => {
            chatRoom.mensajes.push(res.body as Mensaje);
            this.updateChatRoomMessages(chatRoom);
            socket.broadcast.emit('new-message', res.body as Mensaje);
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

    public getMessages = () => {
        return Observable.create(observer => {
            socket.on('new-message', function(msg) {
                observer.next(msg);
            });
        });
    };
}
