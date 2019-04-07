import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { Mensaje } from 'app/shared/model/mensaje.model';

@Component({
    selector: 'jhi-chat-window',
    templateUrl: './chat-window.component.html',
    styles: []
})
export class ChatWindowComponent implements OnInit {
    message: string;
    chatRoom: ChatRoom;
    isSender: boolean;

    constructor(private chatService: ChatService) {}

    ngOnInit() {
        this.isSender = true;

        this.chatService.chatSelected.subscribe((chatRoom: ChatRoom) => {
            this.chatRoom = chatRoom;
        });
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

    validateIsSender(mensaje: Mensaje) {}
}
