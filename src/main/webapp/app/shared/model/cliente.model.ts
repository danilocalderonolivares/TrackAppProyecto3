import { IUbicacion } from 'app/shared/model/ubicacion.model';

export interface ICliente {
    id?: string;
    nombre?: string;
    cedula?: string;
    direccion?: string;
    correo?: string;
    esEmpresa?: boolean;
    borrado?: boolean;
    ubicacion?: IUbicacion;
}

export class Cliente implements ICliente {
    constructor(
        public id?: string,
        public nombre?: string,
        public cedula?: string,
        public direccion?: string,
        public correo?: string,
        public esEmpresa?: boolean,
        public borrado?: boolean,
        public ubicacion?: IUbicacion
    ) {
        this.esEmpresa = this.esEmpresa || false;
        this.borrado = this.borrado || false;
    }
}
