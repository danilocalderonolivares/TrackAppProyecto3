import { IEmpleado } from 'app/shared/model/empleado.model';
import { IMensaje } from 'app/shared/model/mensaje.model';

export interface IChatRoom {
    id?: string;
    nombre?: string;
    miembros?: IEmpleado[];
    mensajes?: IMensaje[];
}

export class ChatRoom implements IChatRoom {
    constructor(public id?: string, public nombre?: string, public miembros?: IEmpleado[], public mensajes?: IMensaje[]) {}
}
