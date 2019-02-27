import { Moment } from 'moment';
import { IAdministrador } from 'app/shared/model/administrador.model';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IMensaje {
    id?: string;
    texto?: string;
    fechaEnvio?: Moment;
    visto?: boolean;
    borrado?: boolean;
    admin?: IAdministrador;
    empleado?: IEmpleado;
}

export class Mensaje implements IMensaje {
    constructor(
        public id?: string,
        public texto?: string,
        public fechaEnvio?: Moment,
        public visto?: boolean,
        public borrado?: boolean,
        public admin?: IAdministrador,
        public empleado?: IEmpleado
    ) {
        this.visto = this.visto || false;
        this.borrado = this.borrado || false;
    }
}
