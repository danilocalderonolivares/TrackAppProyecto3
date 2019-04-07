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
    sortedName: string;
    employeeRelationId: string;

    constructor(private chatService: ChatService, private chatRoomService: ChatRoomService, private empleadosService: EmpleadoService) {}

    ngOnInit() {
        this.findEmployee();
    }

    findEmployee() {
        const currentUser = JSON.parse(sessionStorage.getItem('user')) as User;
        this.empleadosService.findUserByIdRelationship(currentUser.id).subscribe(res => {
            this.employeeRelationId = res.body.id;
            this.loadChatRoomsList();
        });
    }

    loadChatRoomsList() {
        this.chatRoomService.getChatRoomsByUser(this.employeeRelationId).subscribe(res => {
            this.chatRooms = res.body;
            this.loadChatRoomsMessages(this.chatRooms[0]);
        });
    }

    loadChatRoomsMessages(chatRoom: ChatRoom) {
        this.chatService.chatRoomSelected(chatRoom);
    }

    onKeyPressed(event: any) {
        this.sortedName = event.target.value;
        if (this.sortedName !== '') {
            this.chatRoomService.getChatRoomsByApproximation(event.target.value).subscribe(res => {
                this.fillSortedChatRooms(res);
            });
        } else {
            this.loadChatRoomsList();
        }
    }

    fillSortedChatRooms(data) {
        this.chatRooms = data.body;
        // this.searchForEmployees();
    }

    /*searchForEmployees() {
        this.empleadosService.getEmployeesByApproximation(this.sortedName).subscribe(res => {
            this.chatRooms.push(res.body);
        });
    }*/
}
