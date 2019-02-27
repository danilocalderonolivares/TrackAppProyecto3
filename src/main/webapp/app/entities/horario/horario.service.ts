import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHorario } from 'app/shared/model/horario.model';

type EntityResponseType = HttpResponse<IHorario>;
type EntityArrayResponseType = HttpResponse<IHorario[]>;

@Injectable({ providedIn: 'root' })
export class HorarioService {
    public resourceUrl = SERVER_API_URL + 'api/horarios';

    constructor(protected http: HttpClient) {}

    create(horario: IHorario): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(horario);
        return this.http
            .post<IHorario>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(horario: IHorario): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(horario);
        return this.http
            .put<IHorario>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IHorario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHorario[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(horario: IHorario): IHorario {
        const copy: IHorario = Object.assign({}, horario, {
            lunesInico: horario.lunesInico != null && horario.lunesInico.isValid() ? horario.lunesInico.format(DATE_FORMAT) : null,
            lunesFin: horario.lunesFin != null && horario.lunesFin.isValid() ? horario.lunesFin.format(DATE_FORMAT) : null,
            martesInico: horario.martesInico != null && horario.martesInico.isValid() ? horario.martesInico.format(DATE_FORMAT) : null,
            martesFin: horario.martesFin != null && horario.martesFin.isValid() ? horario.martesFin.format(DATE_FORMAT) : null,
            miercolesInico:
                horario.miercolesInico != null && horario.miercolesInico.isValid() ? horario.miercolesInico.format(DATE_FORMAT) : null,
            miercolesFin: horario.miercolesFin != null && horario.miercolesFin.isValid() ? horario.miercolesFin.format(DATE_FORMAT) : null,
            juevesInico: horario.juevesInico != null && horario.juevesInico.isValid() ? horario.juevesInico.format(DATE_FORMAT) : null,
            juevesFin: horario.juevesFin != null && horario.juevesFin.isValid() ? horario.juevesFin.format(DATE_FORMAT) : null,
            viernesInico: horario.viernesInico != null && horario.viernesInico.isValid() ? horario.viernesInico.format(DATE_FORMAT) : null,
            viernesFin: horario.viernesFin != null && horario.viernesFin.isValid() ? horario.viernesFin.format(DATE_FORMAT) : null,
            sabadoInico: horario.sabadoInico != null && horario.sabadoInico.isValid() ? horario.sabadoInico.format(DATE_FORMAT) : null,
            sabadoFin: horario.sabadoFin != null && horario.sabadoFin.isValid() ? horario.sabadoFin.format(DATE_FORMAT) : null,
            domingoInico: horario.domingoInico != null && horario.domingoInico.isValid() ? horario.domingoInico.format(DATE_FORMAT) : null,
            domingoFin: horario.domingoFin != null && horario.domingoFin.isValid() ? horario.domingoFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.lunesInico = res.body.lunesInico != null ? moment(res.body.lunesInico) : null;
            res.body.lunesFin = res.body.lunesFin != null ? moment(res.body.lunesFin) : null;
            res.body.martesInico = res.body.martesInico != null ? moment(res.body.martesInico) : null;
            res.body.martesFin = res.body.martesFin != null ? moment(res.body.martesFin) : null;
            res.body.miercolesInico = res.body.miercolesInico != null ? moment(res.body.miercolesInico) : null;
            res.body.miercolesFin = res.body.miercolesFin != null ? moment(res.body.miercolesFin) : null;
            res.body.juevesInico = res.body.juevesInico != null ? moment(res.body.juevesInico) : null;
            res.body.juevesFin = res.body.juevesFin != null ? moment(res.body.juevesFin) : null;
            res.body.viernesInico = res.body.viernesInico != null ? moment(res.body.viernesInico) : null;
            res.body.viernesFin = res.body.viernesFin != null ? moment(res.body.viernesFin) : null;
            res.body.sabadoInico = res.body.sabadoInico != null ? moment(res.body.sabadoInico) : null;
            res.body.sabadoFin = res.body.sabadoFin != null ? moment(res.body.sabadoFin) : null;
            res.body.domingoInico = res.body.domingoInico != null ? moment(res.body.domingoInico) : null;
            res.body.domingoFin = res.body.domingoFin != null ? moment(res.body.domingoFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((horario: IHorario) => {
                horario.lunesInico = horario.lunesInico != null ? moment(horario.lunesInico) : null;
                horario.lunesFin = horario.lunesFin != null ? moment(horario.lunesFin) : null;
                horario.martesInico = horario.martesInico != null ? moment(horario.martesInico) : null;
                horario.martesFin = horario.martesFin != null ? moment(horario.martesFin) : null;
                horario.miercolesInico = horario.miercolesInico != null ? moment(horario.miercolesInico) : null;
                horario.miercolesFin = horario.miercolesFin != null ? moment(horario.miercolesFin) : null;
                horario.juevesInico = horario.juevesInico != null ? moment(horario.juevesInico) : null;
                horario.juevesFin = horario.juevesFin != null ? moment(horario.juevesFin) : null;
                horario.viernesInico = horario.viernesInico != null ? moment(horario.viernesInico) : null;
                horario.viernesFin = horario.viernesFin != null ? moment(horario.viernesFin) : null;
                horario.sabadoInico = horario.sabadoInico != null ? moment(horario.sabadoInico) : null;
                horario.sabadoFin = horario.sabadoFin != null ? moment(horario.sabadoFin) : null;
                horario.domingoInico = horario.domingoInico != null ? moment(horario.domingoInico) : null;
                horario.domingoFin = horario.domingoFin != null ? moment(horario.domingoFin) : null;
            });
        }
        return res;
    }
}
