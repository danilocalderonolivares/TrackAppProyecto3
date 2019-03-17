export interface IUbicacion {
    id?: string;
    longitud?: number;
    latitud?: number;
    nombreDireccion?: string;
}

export class Ubicacion implements IUbicacion {
    constructor(public id?: string, public longitud?: number, public latitud?: number, public nombreDireccion?: string) {}
}
