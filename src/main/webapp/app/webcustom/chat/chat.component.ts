import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/webcustom/chat/chat.service';

@Component({
    selector: 'jhi-chat',
    templateUrl: './chat.component.html',
    styles: []
})
export class ChatComponent implements OnInit {
    constructor(private chatService: ChatService) {}

    ngOnInit() {}
}
