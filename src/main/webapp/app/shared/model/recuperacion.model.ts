import { IAdministrador } from 'app/shared/model/administrador.model';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IRecuperacion {
    id?: string;
    activo?: boolean;
    borrado?: boolean;
    admin?: IAdministrador;
    empleado?: IEmpleado;
}

export class Recuperacion implements IRecuperacion {
    constructor(
        public id?: string,
        public activo?: boolean,
        public borrado?: boolean,
        public admin?: IAdministrador,
        public empleado?: IEmpleado
    ) {
        this.activo = this.activo || false;
        this.borrado = this.borrado || false;
    }
}
