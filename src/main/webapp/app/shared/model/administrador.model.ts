export interface IAdministrador {
    id?: string;
    nombre?: string;
    apellidos?: string;
    correo?: string;
    password?: string;
    borrado?: boolean;
}

export class Administrador implements IAdministrador {
    constructor(
        public id?: string,
        public nombre?: string,
        public apellidos?: string,
        public correo?: string,
        public password?: string,
        public borrado?: boolean
    ) {
        this.borrado = this.borrado || false;
    }
}
