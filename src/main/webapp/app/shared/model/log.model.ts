import { Moment } from 'moment';
import { ITarea } from 'app/shared/model/tarea.model';

export interface ILog {
    id?: string;
    mensaje?: string;
    fecha?: Moment;
    tareas?: ITarea[];
}

export class Log implements ILog {
    constructor(public id?: string, public mensaje?: string, public fecha?: Moment, public tareas?: ITarea[]) {}
}
