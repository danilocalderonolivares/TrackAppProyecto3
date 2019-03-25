import { Ubicacion } from 'src/main/webapp/app/webcustom/empleados/mapa/ubicacion';

export class Empleado {
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public tarea: string,
        public tipo: string,
        public ubicacion: Ubicacion
    ) {}
}
