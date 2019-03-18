import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { IHorario } from 'app/shared/model/horario.model';

export interface IEmpleado {
    id?: string;
    idUsuarioRelacion?: string;
    nombre?: string;
    apellidos?: string;
    tipo?: string;
    borrado?: boolean;
    ubicacion?: IUbicacion;
    horarios?: IHorario;
}

export class Empleado implements IEmpleado {
    constructor(
        public id?: string,
        public idUsuarioRelacion?: string,
        public nombre?: string,
        public apellidos?: string,
        public tipo?: string,
        public borrado?: boolean,
        public ubicacion?: IUbicacion,
        public horarios?: IHorario
    ) {
        this.borrado = this.borrado || false;
    }
}
