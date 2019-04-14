import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatService } from 'app/webcustom/chat/chat.service';
import { ChatRoom } from 'app/shared/model/chat-room.model';
import { Mensaje } from 'app/shared/model/mensaje.model';
import { User } from 'app/core';
import { Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import * as moment from 'moment';

@Component({
    selector: 'jhi-chat-window',
    templateUrl: './chat-window.component.html',
    styles: []
})
export class ChatWindowComponent implements OnInit {
    message: string;
    chatRoom: ChatRoom;
    isSender: boolean;
    currentUserLogged: any;

    constructor(private chatService: ChatService, private empleadosService: EmpleadoService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.message = '';
        this.findEmployee();
        this.isSender = true;
        this.chatRoom = new ChatRoom();

        this.chatService.chatSelected.subscribe((chatRoom: ChatRoom) => {
            this.chatRoom = chatRoom;
        });

        this.chatService.getMessages().subscribe((message: any) => {
            this.test(message);
            this.cdr.detectChanges();
        });
    }

    test(mensaje: any) {
        this.chatRoom.mensajes.push(mensaje as Mensaje);
    }

    sendMessage() {
        const messageToSend = new Mensaje(
            null,
            this.message,
            moment(new Date()),
            false,
            false,
            this.chatRoom.mensajes.length + 1,
            this.currentUserLogged
        );
        this.chatService.sendMessage(messageToSend, this.chatRoom);
        this.message = '';
    }

    onKeyPressed(event: any) {
        if (event.target.value !== '') {
            this.sendMessage();
        }
    }

    validateIsSender(mensaje: Mensaje) {
        const user = JSON.parse(sessionStorage.getItem('user')) as User;
        if (mensaje !== null) {
            if (mensaje.empleado.idUsuarioRelacion !== user.id) {
                this.isSender = false;
            } else {
                this.isSender = true;
            }
        }

        return this.isSender;
    }

    getCurrentLoggedUser() {
        return JSON.parse(sessionStorage.getItem('user')) as User;
    }

    findEmployee() {
        this.empleadosService.findUserByIdRelationship(this.getCurrentLoggedUser().id).subscribe(res => {
            this.currentUserLogged = res.body as Empleado;
        });
    }
}
