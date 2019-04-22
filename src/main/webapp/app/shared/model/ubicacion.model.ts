import { IRuta } from 'app/shared/model/ruta.model';

export interface IUbicacion {
    id?: string;
    latitud?: number;
    longitud?: number;
    nombreDireccion?: string;
    rutas?: IRuta[];
}

export class Ubicacion implements IUbicacion {
    constructor(
        public id?: string,
        public latitud?: number,
        public longitud?: number,
        public nombreDireccion?: string,
        public rutas?: IRuta[]
    ) {}
}
