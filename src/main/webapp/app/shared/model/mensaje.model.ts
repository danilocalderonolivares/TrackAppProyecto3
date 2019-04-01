import { IEmpleado } from 'app/shared/model/empleado.model';
import { IChat } from 'app/shared/model/chat.model';

export interface IMensaje {
    id?: string;
    texto?: string;
    fechaEnvio?: string;
    empleado?: IEmpleado;
    mensajes?: IChat;
}

export class Mensaje implements IMensaje {
    constructor(
        public id?: string,
        public texto?: string,
        public fechaEnvio?: string,
        public empleado?: IEmpleado,
        public mensajes?: IChat
    ) {}
}
