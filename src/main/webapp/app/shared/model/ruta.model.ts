export interface IRuta {
    id?: string;
    nombre?: string;
    descripcion?: string;
    borrado?: boolean;
    puntoInicio?: string;
    puntoLLegada?: string;
}

export class Ruta implements IRuta {
    constructor(
        public id?: string,
        public nombre?: string,
        public descripcion?: string,
        public borrado?: boolean,
        public puntoInicio?: string,
        public puntoLLegada?: string
    ) {
        this.borrado = this.borrado || false;
    }
}
