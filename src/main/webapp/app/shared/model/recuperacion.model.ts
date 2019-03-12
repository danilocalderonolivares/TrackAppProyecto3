import { IUser } from 'app/core';

export interface IRecuperacion {
    id?: string;
    activo?: boolean;
    borrado?: boolean;
    admin?: IUser;
    empleado?: IUser;
}

export class Recuperacion implements IRecuperacion {
    constructor(public id?: string, public activo?: boolean, public borrado?: boolean, public admin?: IUser, public empleado?: IUser) {
        this.activo = this.activo || false;
        this.borrado = this.borrado || false;
    }
}
