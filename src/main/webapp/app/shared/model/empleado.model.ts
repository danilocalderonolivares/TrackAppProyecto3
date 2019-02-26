import { IAdministrador } from 'app/shared/model/administrador.model';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { IHorario } from 'app/shared/model/horario.model';

export interface IEmpleado {
    id?: string;
    nombre?: string;
    apellidos?: string;
    correo?: string;
    tipo?: string;
    password?: string;
    borrado?: boolean;
    admin?: IAdministrador;
    ubicacion?: IUbicacion;
    horarios?: IHorario;
}

export class Empleado implements IEmpleado {
    constructor(
        public id?: string,
        public nombre?: string,
        public apellidos?: string,
        public correo?: string,
        public tipo?: string,
        public password?: string,
        public borrado?: boolean,
        public admin?: IAdministrador,
        public ubicacion?: IUbicacion,
        public horarios?: IHorario
    ) {
        this.borrado = this.borrado || false;
    }
}
