import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IHorario {
    id?: string;
    nombre?: string;
    lunesInico?: string;
    lunesFin?: string;
    martesInico?: string;
    martesFin?: string;
    miercolesInico?: string;
    miercolesFin?: string;
    juevesInico?: string;
    juevesFin?: string;
    viernesInico?: string;
    viernesFin?: string;
    sabadoInico?: string;
    sabadoFin?: string;
    domingoInico?: string;
    domingoFin?: string;
    empleados?: IEmpleado[];
}

export class Horario implements IHorario {
    constructor(
        public id?: string,
        public nombre?: string,
        public lunesInico?: string,
        public lunesFin?: string,
        public martesInico?: string,
        public martesFin?: string,
        public miercolesInico?: string,
        public miercolesFin?: string,
        public juevesInico?: string,
        public juevesFin?: string,
        public viernesInico?: string,
        public viernesFin?: string,
        public sabadoInico?: string,
        public sabadoFin?: string,
        public domingoInico?: string,
        public domingoFin?: string,
        public empleados?: IEmpleado[]
    ) {}
}
