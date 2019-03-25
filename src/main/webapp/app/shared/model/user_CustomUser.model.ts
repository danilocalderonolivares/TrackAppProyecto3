import { Empleado } from 'app/shared/model/empleado.model';
import { User } from 'app/core';

export class UserCustomUser {
    public user: User;
    public empleado: Empleado;

    constructor(user: User, empleado: Empleado) {
        this.user = user;
        this.empleado = empleado;
    }
}
