import { User } from 'app/core';
import { Ubicacion } from 'app/shared/model/ubicacion.model';
import { Horario } from 'app/shared/model/horario.model';

export class UserExtra {
    constructor(public admin: User, public ubicacion: Ubicacion, public horario: Horario, public tipo: string, public borrado: boolean) {}
}
