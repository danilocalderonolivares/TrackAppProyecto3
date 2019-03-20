import { Moment } from 'moment';
import { ISubTarea } from 'app/shared/model/sub-tarea.model';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IRuta } from 'app/shared/model/ruta.model';
import { ILog } from 'app/shared/model/log.model';
import { IUser } from 'app/core';

export interface ITarea {
    id?: string;
    title?: string;
    descripcion?: string;
    inicio?: Moment;
    fin?: Moment;
    usarRuta?: boolean;
    horaInicio?: Moment;
    horaFin?: Moment;
    notaExtra?: string;
    firma?: string;
    activa?: boolean;
    completada?: boolean;
    borrado?: boolean;
    subtarea?: ISubTarea;
    empleado?: IUser;
    ubicacion?: IUbicacion;
    cliente?: ICliente;
    ruta?: IRuta;
    logs?: ILog;
}

export class Tarea implements ITarea {
    constructor(
        public id?: string,
        public title?: string,
        public descripcion?: string,
        public inicio?: Moment,
        public fin?: Moment,
        public usarRuta?: boolean,
        public horaInicio?: Moment,
        public horaFin?: Moment,
        public notaExtra?: string,
        public firma?: string,
        public activa?: boolean,
        public completada?: boolean,
        public borrado?: boolean,
        public subtarea?: ISubTarea,
        public empleado?: IUser,
        public ubicacion?: IUbicacion,
        public cliente?: ICliente,
        public ruta?: IRuta,
        public logs?: ILog
    ) {
        this.usarRuta = this.usarRuta || false;
        this.activa = this.activa || false;
        this.completada = this.completada || false;
        this.borrado = this.borrado || false;
    }
}
