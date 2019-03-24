import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return this.http.post<IHorario>(this.resourceUrl, horario, { observe: 'response' });
    }

    update(horario: IHorario): Observable<EntityResponseType> {
        return this.http.put<IHorario>(this.resourceUrl, horario, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IHorario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHorario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
