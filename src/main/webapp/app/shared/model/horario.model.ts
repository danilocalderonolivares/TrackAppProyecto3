import { Moment } from 'moment';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IHorario {
    id?: string;
    nombre?: string;
    lunesInico?: Moment;
    lunesFin?: Moment;
    martesInico?: Moment;
    martesFin?: Moment;
    miercolesInico?: Moment;
    miercolesFin?: Moment;
    juevesInico?: Moment;
    juevesFin?: Moment;
    viernesInico?: Moment;
    viernesFin?: Moment;
    sabadoInico?: Moment;
    sabadoFin?: Moment;
    domingoInico?: Moment;
    domingoFin?: Moment;
    empleados?: IEmpleado[];
}

export class Horario implements IHorario {
    constructor(
        public id?: string,
        public nombre?: string,
        public lunesInico?: Moment,
        public lunesFin?: Moment,
        public martesInico?: Moment,
        public martesFin?: Moment,
        public miercolesInico?: Moment,
        public miercolesFin?: Moment,
        public juevesInico?: Moment,
        public juevesFin?: Moment,
        public viernesInico?: Moment,
        public viernesFin?: Moment,
        public sabadoInico?: Moment,
        public sabadoFin?: Moment,
        public domingoInico?: Moment,
        public domingoFin?: Moment,
        public empleados?: IEmpleado[]
    ) {}
}
