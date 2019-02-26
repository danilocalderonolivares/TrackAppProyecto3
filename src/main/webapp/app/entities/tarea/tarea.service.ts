import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITarea } from 'app/shared/model/tarea.model';

type EntityResponseType = HttpResponse<ITarea>;
type EntityArrayResponseType = HttpResponse<ITarea[]>;

@Injectable({ providedIn: 'root' })
export class TareaService {
    public resourceUrl = SERVER_API_URL + 'api/tareas';

    constructor(protected http: HttpClient) {}

    create(tarea: ITarea): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tarea);
        return this.http
            .post<ITarea>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tarea: ITarea): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tarea);
        return this.http
            .put<ITarea>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ITarea>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITarea[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(tarea: ITarea): ITarea {
        const copy: ITarea = Object.assign({}, tarea, {
            inicio: tarea.inicio != null && tarea.inicio.isValid() ? tarea.inicio.format(DATE_FORMAT) : null,
            fin: tarea.fin != null && tarea.fin.isValid() ? tarea.fin.format(DATE_FORMAT) : null,
            horaInicio: tarea.horaInicio != null && tarea.horaInicio.isValid() ? tarea.horaInicio.format(DATE_FORMAT) : null,
            horaFin: tarea.horaFin != null && tarea.horaFin.isValid() ? tarea.horaFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.inicio = res.body.inicio != null ? moment(res.body.inicio) : null;
            res.body.fin = res.body.fin != null ? moment(res.body.fin) : null;
            res.body.horaInicio = res.body.horaInicio != null ? moment(res.body.horaInicio) : null;
            res.body.horaFin = res.body.horaFin != null ? moment(res.body.horaFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((tarea: ITarea) => {
                tarea.inicio = tarea.inicio != null ? moment(tarea.inicio) : null;
                tarea.fin = tarea.fin != null ? moment(tarea.fin) : null;
                tarea.horaInicio = tarea.horaInicio != null ? moment(tarea.horaInicio) : null;
                tarea.horaFin = tarea.horaFin != null ? moment(tarea.horaFin) : null;
            });
        }
        return res;
    }
}
