import { Component, OnInit } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { ChatRoomService } from 'app/entities/chat-room';

@Component({
    selector: 'jhi-chats-list',
    templateUrl: './chats-list.component.html',
    styles: []
})
export class ChatsListComponent implements OnInit {
    chatRooms: ChatRoom[];

    constructor(private chatService: ChatService, private chatRoomService: ChatRoomService) {}

    ngOnInit() {
        this.loadChatRoomsList();
    }

    loadChatRoomsList() {
        this.chatRoomService.query().subscribe(res => {
            this.chatRooms = res.body;
            this.loadChatRoomsMessages(this.chatRooms[0]);
        });
    }

    loadChatRoomsMessages(chatRoom: ChatRoom) {
        this.chatService.chatRoomSelected(chatRoom);
    }
}
