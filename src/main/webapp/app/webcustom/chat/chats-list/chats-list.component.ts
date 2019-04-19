import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { ChatRoomService } from 'app/entities/chat-room';
import { EmpleadoService } from 'app/entities/empleado';
import { User } from 'app/core';
import { Empleado } from 'app/shared/model/empleado.model';
import { Mensaje } from 'app/shared/model/mensaje.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-chats-list',
    templateUrl: './chats-list.component.html',
    styles: []
})
export class ChatsListComponent implements OnInit, OnDestroy {
    chatRooms: any[];
    currentUserLogged: any;
    isSearch: boolean;
    currentChatRoomsList: ChatRoom[];
    newMessageSubscription: Subscription;

    constructor(
        private chatService: ChatService,
        private chatRoomService: ChatRoomService,
        private empleadosService: EmpleadoService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.isSearch = false;
        this.findEmployee();

        this.newMessageSubscription = this.chatService.getMessages().subscribe(msg => {
            this.loadChatRoomsList();
        });
    }

    ngOnDestroy() {
        this.newMessageSubscription.unsubscribe();
    }

    findEmployee() {
        this.empleadosService.findUserByIdRelationship(this.getCurrentLoggedUser().id).subscribe(res => {
            this.currentUserLogged = res.body as Empleado;
            this.loadChatRoomsList();
        });
    }

    loadChatRoomsList() {
        this.chatRoomService.getChatRoomsByUser(this.currentUserLogged.id).subscribe(res => {
            this.chatRooms = res.body;
            this.cdr.detectChanges();
            this.cloneChatRoomsList();
        });
    }

    loadChatRoomsMessages(chatRoom: any) {
        if (!this.isSearch) {
            this.chatService.chatRoomSelected(chatRoom);
            this.loadChatRoomsList();
        } else {
            const chatInfo = this.verifyChatRoomExists(chatRoom);
            if (chatInfo !== null) {
                this.chatService.chatRoomSelected(chatInfo);
                this.loadChatRoomsList();
                this.isSearch = false;
            } else {
                this.createChatRoom(chatRoom);
            }
        }
        (<HTMLInputElement>document.getElementById('sortedField')).value = '';
    }

    createChatRoom(userToChat: any) {
        const chatMembers: Empleado[] = [];
        const chatMessages: Mensaje[] = [];
        const newChatRoom = new ChatRoom(null, userToChat.nombre, chatMembers, chatMessages);
        newChatRoom.miembros.push(userToChat as Empleado);
        newChatRoom.miembros.push(this.currentUserLogged as Empleado);
        this.saveAndLoadNewChatRoom(newChatRoom);
        (<HTMLInputElement>document.getElementById('sortedField')).value = '';
    }

    saveAndLoadNewChatRoom(newChatRoom: ChatRoom) {
        this.chatRoomService.create(newChatRoom).subscribe(res => {
            this.chatService.chatRoomSelected(res.body as ChatRoom);
            this.isSearch = false;
            this.currentChatRoomsList.push(res.body as ChatRoom);
            this.chatRooms = this.currentChatRoomsList;
        });
    }

    verifyChatRoomExists(chatRoom: any) {
        let chatInfo = null;

        for (const chat of this.currentChatRoomsList) {
            if (chat.nombre !== 'General') {
                for (const miembro of chat.miembros) {
                    if (miembro.id === chatRoom.id) {
                        chatInfo = chat;
                        break;
                    }
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
        const currentUser = this.currentUserLogged.nombre + ' ' + this.currentUserLogged.apellidos;
        for (const chat of this.chatRooms) {
            if (chat.nombre === currentUser) {
                chat.nombre = this.modifyChatRoomName(chat, currentUser);
            }
            this.currentChatRoomsList.push(chat);
        }
    }

    modifyChatRoomName(chat: any, currentUser: string) {
        const memberOne = chat.miembros[0].nombre + ' ' + chat.miembros[0].apellidos;
        const memberTwo = chat.miembros[1].nombre + ' ' + chat.miembros[1].apellidos;

        if (memberOne === currentUser) {
            return memberTwo;
        } else {
            return memberOne;
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

    getCurrentLoggedUser() {
        return JSON.parse(sessionStorage.getItem('user')) as User;
    }
}
