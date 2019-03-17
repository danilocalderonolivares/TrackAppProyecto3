import { IEmpleado } from 'app/shared/model/empleado.model';

export interface ITipoEmpleado {
    id?: string;
    nombreTipo?: string;
    empleados?: IEmpleado[];
}

export class TipoEmpleado implements ITipoEmpleado {
    constructor(public id?: string, public nombreTipo?: string, public empleados?: IEmpleado[]) {}
}
