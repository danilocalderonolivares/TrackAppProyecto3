import * as io from 'socket.io-client';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { MensajeService } from 'app/entities/mensaje';
import { ChatRoomService } from 'app/entities/chat-room';
import { Mensaje } from 'app/shared/model/mensaje.model';
import { Observable } from 'rxjs';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

@Injectable({ providedIn: 'root' })
export class ChatService implements OnInit {
    chatSelected = new EventEmitter<ChatRoom>();
    newMessage = new EventEmitter<Mensaje>();

    ngOnInit() {}

    constructor(private mensajeService: MensajeService, private chatRoomService: ChatRoomService) {}

    public sendMessage(message: Mensaje, chat: ChatRoom) {
        this.mensajeService.create(message).subscribe(res => {
            chat.mensajes.push(res.body as Mensaje);
            this.updateChatRoomMessages(chat);
            socket.emit('new-message', res.body as Mensaje);
        });
    }

    public endSocketConnection() {
        socket.emit('disconnect');
    }

    public chatRoomSelected(chat: ChatRoom) {
        this.chatSelected.emit(chat);
    }

    public updateChatRoomMessages(chat: ChatRoom) {
        this.chatRoomService.update(chat).subscribe(res => {
            console.log();
        });
    }

    public getMessages(): any {
        const newMessagesListener = new Observable(observer => {
            socket.on('new-message', function(msg) {
                observer.next(msg);
            });
        });

        return newMessagesListener;
    }
}
