import { Component, OnInit } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { ChatRoomService } from 'app/entities/chat-room';
import { EmpleadoService } from 'app/entities/empleado';
import { User } from 'app/core';
import { Empleado } from 'app/shared/model/empleado.model';

@Component({
    selector: 'jhi-chats-list',
    templateUrl: './chats-list.component.html',
    styles: []
})
export class ChatsListComponent implements OnInit {
    chatRooms: any[];
    employeeRelationId: string;
    isSearch: boolean;
    currentChatRoomsList: ChatRoom[];

    constructor(private chatService: ChatService, private chatRoomService: ChatRoomService, private empleadosService: EmpleadoService) {}

    ngOnInit() {
        this.isSearch = false;
        this.findEmployee();
    }

    findEmployee() {
        this.empleadosService.findUserByIdRelationship(this.getCurrentLoggedUser().id).subscribe(res => {
            this.employeeRelationId = res.body.id;
            this.loadChatRoomsList();
        });
    }

    loadChatRoomsList() {
        this.chatRoomService.getChatRoomsByUser(this.employeeRelationId).subscribe(res => {
            this.chatRooms = res.body;
            this.cloneChatRoomsList();
            this.loadChatRoomsMessages(this.chatRooms[0]);
        });
    }

    loadChatRoomsMessages(chatRoom: any) {
        if (!this.isSearch) {
            this.chatService.chatRoomSelected(chatRoom);
        } else {
            const chatInfo = this.verifyChatRoomExists(chatRoom);
            if (chatInfo !== null) {
                this.chatService.chatRoomSelected(chatInfo);
                this.isSearch = false;
            } else {
                this.createChatRoom(chatRoom.id);
            }
        }
    }

    createChatRoom(userToChat: any) {}

    verifyChatRoomExists(chatRoom: any) {
        let chatInfo = null;

        for (const chat of this.currentChatRoomsList) {
            for (const miembro of chat.miembros) {
                if (miembro.id === chatRoom.id) {
                    chatInfo = chat;
                    break;
                }
            }
        }

        return chatInfo;
    }

    onKeyPressed(event: any) {
        if (event.target.value !== '') {
            this.empleadosService.getEmployeesByApproximation(event.target.value).subscribe(res => {
                this.chatRooms = res.body;
                this.filterList();
                this.isSearch = true;
            });
        } else {
            this.isSearch = false;
            this.loadChatRoomsList();
        }
    }

    cloneChatRoomsList() {
        this.currentChatRoomsList = [];
        for (const chat of this.chatRooms) {
            this.currentChatRoomsList.push(chat);
        }
    }

    filterList() {
        let index = 0;

        for (const chatRoom of this.chatRooms) {
            if (chatRoom.idUsuarioRelacion === this.getCurrentLoggedUser().id) {
                this.chatRooms.splice(index, 1);
            }
            index++;
        }
    }

    private getCurrentLoggedUser() {
        return JSON.parse(sessionStorage.getItem('user')) as User;
    }
}
