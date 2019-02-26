export interface ISubTarea {
    id?: string;
    descripcion?: string;
    completado?: boolean;
}

export class SubTarea implements ISubTarea {
    constructor(public id?: string, public descripcion?: string, public completado?: boolean) {
        this.completado = this.completado || false;
    }
}
