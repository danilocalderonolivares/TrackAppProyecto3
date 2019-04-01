import { IEmpleado } from 'app/shared/model/empleado.model';
import { IMensaje } from 'app/shared/model/mensaje.model';

export interface IChat {
    id?: string;
    nombre?: string;
    empleados?: IEmpleado[];
    mensajes?: IMensaje[];
}

export class Chat implements IChat {
    constructor(public id?: string, public nombre?: string, public empleados?: IEmpleado[], public mensajes?: IMensaje[]) {}
}
