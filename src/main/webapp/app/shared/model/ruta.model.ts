import { IUbicacion } from 'app/shared/model/ubicacion.model';

export interface IRuta {
    id?: string;
    nombre?: string;
    descripcion?: string;
    borrado?: boolean;
    ubicaciones?: IUbicacion;
}

export class Ruta implements IRuta {
    constructor(
        public id?: string,
        public nombre?: string,
        public descripcion?: string,
        public borrado?: boolean,
        public ubicaciones?: IUbicacion
    ) {
        this.borrado = this.borrado || false;
    }
}
