import { IRuta } from 'app/shared/model/ruta.model';

export interface IUbicacion {
    id?: string;
    longitud?: number;
    latitud?: number;
    rutas?: IRuta[];
}

export class Ubicacion implements IUbicacion {
    constructor(public id?: string, public longitud?: number, public latitud?: number, public rutas?: IRuta[]) {}
}
