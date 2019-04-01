import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/webcustom/chat/chat.service';

@Component({
    selector: 'jhi-chat-window',
    templateUrl: './chat-window.component.html',
    styles: []
})
export class ChatWindowComponent implements OnInit {
    message: string;

    constructor(private chatService: ChatService) {}

    ngOnInit() {}

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }
}
