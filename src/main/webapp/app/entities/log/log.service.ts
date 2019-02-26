import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILog } from 'app/shared/model/log.model';

type EntityResponseType = HttpResponse<ILog>;
type EntityArrayResponseType = HttpResponse<ILog[]>;

@Injectable({ providedIn: 'root' })
export class LogService {
    public resourceUrl = SERVER_API_URL + 'api/logs';

    constructor(protected http: HttpClient) {}

    create(log: ILog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(log);
        return this.http
            .post<ILog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(log: ILog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(log);
        return this.http
            .put<ILog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ILog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(log: ILog): ILog {
        const copy: ILog = Object.assign({}, log, {
            fecha: log.fecha != null && log.fecha.isValid() ? log.fecha.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((log: ILog) => {
                log.fecha = log.fecha != null ? moment(log.fecha) : null;
            });
        }
        return res;
    }
}
