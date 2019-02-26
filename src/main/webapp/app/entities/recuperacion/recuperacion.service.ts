import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecuperacion } from 'app/shared/model/recuperacion.model';

type EntityResponseType = HttpResponse<IRecuperacion>;
type EntityArrayResponseType = HttpResponse<IRecuperacion[]>;

@Injectable({ providedIn: 'root' })
export class RecuperacionService {
    public resourceUrl = SERVER_API_URL + 'api/recuperacions';

    constructor(protected http: HttpClient) {}

    create(recuperacion: IRecuperacion): Observable<EntityResponseType> {
        return this.http.post<IRecuperacion>(this.resourceUrl, recuperacion, { observe: 'response' });
    }

    update(recuperacion: IRecuperacion): Observable<EntityResponseType> {
        return this.http.put<IRecuperacion>(this.resourceUrl, recuperacion, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IRecuperacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRecuperacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
