import * as io from 'socket.io-client';
import { EventEmitter, Injectable } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    chatSelected = new EventEmitter<ChatRoom>();

    constructor() {
        // this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public chatRoomSelected(chat: ChatRoom) {
        this.chatSelected.emit(chat);
    }
}
