import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { IHorario } from 'app/shared/model/horario.model';
import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { IChat } from 'app/shared/model/chat.model';

export interface IEmpleado {
    id?: string;
    idUsuarioRelacion?: string;
    nombre?: string;
    apellidos?: string;
    ubicacion?: IUbicacion;
    horarios?: IHorario;
    tipo?: ITipoEmpleado;
    empleados?: IChat;
}

export class Empleado implements IEmpleado {
    constructor(
        public id?: string,
        public idUsuarioRelacion?: string,
        public nombre?: string,
        public apellidos?: string,
        public ubicacion?: IUbicacion,
        public horarios?: IHorario,
        public tipo?: ITipoEmpleado,
        public empleados?: IChat
    ) {}
}
